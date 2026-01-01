# app/main.py
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .models import UsageResponse
from .client import UsageClient
from .service import UsageService


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.client = UsageClient()
    yield
    await app.state.client.close()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Orbital Dashboard API"}


@app.get("/usage", response_model=UsageResponse)
async def get_usage() -> UsageResponse:
    service = UsageService(app.state.client)
    return await service.get_usage()