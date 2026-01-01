from .config import (
    CHARS_PER_TOKEN,
    TOKENS_PER_UNIT,
    BASE_MODEL_RATE,
    MIN_CREDITS,
    CREDIT_DECIMAL_PLACES,
)
def calculate_text_credits(text: str) -> float:
    estimated_tokens = len(text) / CHARS_PER_TOKEN
    credits = (estimated_tokens / TOKENS_PER_UNIT) * BASE_MODEL_RATE
    return round(max(credits, MIN_CREDITS), CREDIT_DECIMAL_PLACES)