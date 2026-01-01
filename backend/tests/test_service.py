# tests/test_service.py
from datetime import datetime

import pytest

from app.models import Message
from app.service import UsageService


class TestUsageService:
    async def test_empty_messages_returns_empty_usage(self, mock_client):
        mock_client.fetch_messages.return_value = []

        service = UsageService(mock_client)
        result = await service.get_usage()

        assert result.usage == []

    async def test_message_without_report_uses_text_credits(
        self, mock_client, sample_message_without_report
    ):
        mock_client.fetch_messages.return_value = [sample_message_without_report]

        service = UsageService(mock_client)
        result = await service.get_usage()

        assert len(result.usage) == 1
        assert result.usage[0].message_id == sample_message_without_report.id
        assert result.usage[0].credits_used == 1.1
        assert result.usage[0].report_name is None

    async def test_message_with_report_uses_report_credits(
        self, mock_client, sample_message_with_report, sample_report
    ):
        mock_client.fetch_messages.return_value = [sample_message_with_report]
        mock_client.fetch_report.return_value = sample_report

        service = UsageService(mock_client)
        result = await service.get_usage()

        assert len(result.usage) == 1
        assert result.usage[0].message_id == sample_message_with_report.id
        assert result.usage[0].credits_used == 50.0
        assert result.usage[0].report_name == "Sales Report"
        mock_client.fetch_report.assert_called_once_with(sample_message_with_report.report_id)

    async def test_message_with_missing_report_is_skipped(self, mock_client):
        message = Message(
            id=3,
            timestamp=datetime(2024, 1, 15, 12, 0),
            text="some text",
            report_id=999,
        )
        mock_client.fetch_messages.return_value = [message]
        mock_client.fetch_report.return_value = None

        service = UsageService(mock_client)
        result = await service.get_usage()

        assert len(result.usage) == 0

    async def test_mixed_messages(
        self, mock_client, sample_message_with_report, sample_report
    ):
        message_long_text = Message(
            id=1,
            timestamp=datetime(2024, 1, 15, 10, 0),
            text="a" * 400,
            report_id=None,
        )
        message_short_text = Message(
            id=3,
            timestamp=datetime(2024, 1, 15, 12, 0),
            text="short",
            report_id=None,
        )
        mock_client.fetch_messages.return_value = [
            message_long_text,
            sample_message_with_report,
            message_short_text,
        ]
        mock_client.fetch_report.return_value = sample_report

        service = UsageService(mock_client)
        result = await service.get_usage()

        assert len(result.usage) == 3
        assert result.usage[0].credits_used == 40.00
        assert result.usage[1].credits_used == 50.0
        assert result.usage[1].report_name == "Sales Report"
        assert result.usage[2].credits_used == 1.00

    async def test_timestamp_is_iso_formatted(
        self, mock_client, sample_message_without_report
    ):
        mock_client.fetch_messages.return_value = [sample_message_without_report]

        service = UsageService(mock_client)
        result = await service.get_usage()

        assert result.usage[0].timestamp == "2024-01-15T10:30:00"