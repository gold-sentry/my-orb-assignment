.PHONY: backend frontend install test

backend:
	cd backend && . venv/bin/activate && uvicorn app.main:app --reload --port 8000

frontend:
	cd frontend && npm run dev

install:
	cd backend && python -m venv venv && . venv/bin/activate && pip install fastapi uvicorn httpx pytest pytest-asyncio
	cd frontend && npm install

test-backend:
	cd backend && . venv/bin/activate && pytest -v

test-frontend:
	cd frontend && npm test -- --run

test: test-backend test-frontend