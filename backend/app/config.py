import os

MESSAGES_URL = os.getenv(
    "MESSAGES_URL",
    "https://owpublic.blob.core.windows.net/tech-task/messages/current-period"
)
REPORT_URL_TEMPLATE = os.getenv(
    "REPORT_URL_TEMPLATE",
    "https://owpublic.blob.core.windows.net/tech-task/reports/{id}"
)

CORS_ORIGINS = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://localhost:3000"
).split(",")

CHARS_PER_TOKEN = 4
TOKENS_PER_UNIT = 100
BASE_MODEL_RATE = 40
MIN_CREDITS = 1.00
CREDIT_DECIMAL_PLACES = 2