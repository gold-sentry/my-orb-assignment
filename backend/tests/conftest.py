from datetime import datetime
from unittest.mock import AsyncMock

import pytest

from app.models import Message, Report


@pytest.fixture
def mock_client():
    return AsyncMock()


@pytest.fixture
def sample_report():
    return Report(id=100, name="Sales Report", credit_cost=50)


@pytest.fixture
def sample_message_with_report():
    return Message(
        id=2,
        timestamp=datetime(2024, 1, 15, 11, 0),
        text="",
        report_id=100,
    )


@pytest.fixture
def sample_message_without_report():
    return Message(
        id=1,
        timestamp=datetime(2024, 1, 15, 10, 30),
        text="Hello world",
        report_id=None,
    )