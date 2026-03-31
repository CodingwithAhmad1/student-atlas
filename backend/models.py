"""SQLAlchemy models for Student Atlas (FastAPI backend).

Ported from the Flask-SQLAlchemy models — same schema, plain SQLAlchemy declarative.
"""

from __future__ import annotations

from datetime import date, datetime, timezone

from sqlalchemy import Integer, String, Text, DateTime, Date, Index
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Base(DeclarativeBase):
    pass


class StudentVisaInfo(Base):
    __tablename__ = "student_visa_info"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    target_country: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    visa_name: Mapped[str] = mapped_column(String(128), nullable=False)
    overview: Mapped[str] = mapped_column(Text, nullable=False)
    legal_summary: Mapped[str] = mapped_column(Text, nullable=False)
    compliance_steps: Mapped[str] = mapped_column(Text, nullable=False)
    requirements_checklist: Mapped[str | None] = mapped_column(Text, nullable=True, default="")
    sources: Mapped[str | None] = mapped_column(Text, nullable=True, default="")
    freshness: Mapped[str | None] = mapped_column(String(16), nullable=True, default="STALE")
    last_verified: Mapped[date | None] = mapped_column(Date, nullable=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=_utcnow)


class LongTermImmigration(Base):
    __tablename__ = "long_term_immigration"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    target_country: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    category: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(256), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    key_requirements: Mapped[str] = mapped_column(Text, nullable=False)
    compliance_steps: Mapped[str | None] = mapped_column(Text, nullable=True, default="")
    sources: Mapped[str | None] = mapped_column(Text, nullable=True, default="")
    freshness: Mapped[str | None] = mapped_column(String(16), nullable=True, default="STALE")
    last_verified: Mapped[date | None] = mapped_column(Date, nullable=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=_utcnow)


class NewsUpdate(Base):
    __tablename__ = "news_updates"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    source: Mapped[str] = mapped_column(String(128), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(512), nullable=False)
    link: Mapped[str] = mapped_column(String(512), nullable=False, unique=True)
    summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    published_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=_utcnow, index=True)
    region_focus: Mapped[str] = mapped_column(String(64), nullable=False, default="General", index=True)
    mentioned_countries: Mapped[str] = mapped_column(String(2048), nullable=False, default=",", index=True)
    mentioned_regions: Mapped[str] = mapped_column(String(1024), nullable=False, default=",", index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=_utcnow)


class AppStatus(Base):
    __tablename__ = "app_status"

    key: Mapped[str] = mapped_column(String(64), primary_key=True)
    value: Mapped[str] = mapped_column(String(256), nullable=False)
