import asyncio
from .models import Message, MessageUsage, UsageResponse, Report
from .client import UsageClient
from .utils import calculate_text_credits


class UsageService:
    def __init__(self, client: UsageClient):
        self.client = client

    async def get_usage(self) -> UsageResponse:
        messages = await self.client.fetch_messages()

        report_ids = {msg.report_id for msg in messages if msg.report_id is not None}
        reports = await self._fetch_reports_batch(report_ids)

        usage_list: list[MessageUsage] = []
        for msg in messages:
            usage = self._build_message_usage(msg, reports)
            if usage:
                usage_list.append(usage)
        # usage_list.append(
        #     MessageUsage(
        #         message_id=1103,
        #         timestamp="2024-04-29T02:08:29.375000+00:00",
        #         credits_used=22,
        #         report_name="Landlord Responsibilities Report",
        #     )
        # )
        return UsageResponse(usage=usage_list)

    async def _fetch_reports_batch(self, report_ids: set[int]) -> dict[int, Report]:
        results = await asyncio.gather(
            *[self.client.fetch_report(rid) for rid in report_ids]
        )
        return {
            rid: report
            for rid, report in zip(report_ids, results)
            if report is not None
        }

    def _build_message_usage(self, msg: Message, reports: dict[int, Report]) -> MessageUsage | None:
        if msg.report_id is not None:
            report = reports.get(msg.report_id)
            if not report:
                return None

            return MessageUsage(
                message_id=msg.id,
                timestamp=msg.timestamp.isoformat(),
                report_name=report.name,
                credits_used=float(report.credit_cost),
            )

        return MessageUsage(
            message_id=msg.id,
            timestamp=msg.timestamp.isoformat(),
            credits_used=calculate_text_credits(msg.text),
        )