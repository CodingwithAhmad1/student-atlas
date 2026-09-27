"""Database session setup for FastAPI backend."""

from __future__ import annotations

import os

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker

from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite+aiosqlite:///instance/student_atlas.db")

engine = create_async_engine(DATABASE_URL, echo=False)
async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def get_db() -> AsyncSession:  # type: ignore[misc]
    async with async_session() as session:
        yield session
