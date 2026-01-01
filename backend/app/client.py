import httpx
from typing import Optional

from .config import MESSAGES_URL, REPORT_URL_TEMPLATE
from .models import Message, Report

class UsageClient:
    def __init__(self):
        self.client = httpx.AsyncClient()
        self.report_cache: dict[int, Report] = {}

    async def close(self):
        await self.client.aclose()

    async def __aenter__(self):
        return self

    async def __aexit__(self, *args):
        await self.close()

    async def fetch_messages(self) -> list[Message]:
        response = await self.client.get(MESSAGES_URL)
        response.raise_for_status()
        return [Message(**item) for item in response.json()["messages"]]

    async def fetch_report(self, report_id: int) -> Optional[Report]:
        if report_id in self.report_cache:
            return self.report_cache[report_id]

        try:
            response = await self.client.get(REPORT_URL_TEMPLATE.format(id=report_id))
            response.raise_for_status()
            report = Report(**response.json())
            self.report_cache[report_id] = report
            return report
        except httpx.HTTPError:
            return None