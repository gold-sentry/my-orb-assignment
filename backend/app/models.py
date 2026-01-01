from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class Message(BaseModel):
    id: int
    timestamp: datetime
    text: str
    report_id: Optional[int] = None

class Report(BaseModel):
    id: int
    name: str
    credit_cost: int

class MessageUsage(BaseModel):
    message_id: int
    timestamp: str
    report_name: Optional[str] = None
    credits_used: float

class UsageResponse(BaseModel):
    usage: list[MessageUsage]