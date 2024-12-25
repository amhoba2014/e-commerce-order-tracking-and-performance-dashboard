from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlmodel import SQLModel

from source.models import *

DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@database:5432/postgres"

# Create the database engine
engine = create_async_engine(DATABASE_URL, echo=False)


async def create_db_and_tables():
  async with engine.begin() as conn:
    await conn.run_sync(SQLModel.metadata.create_all)

# Create an async session factory
async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Base class for models
Base = declarative_base()


async def get_db():
  async with async_session() as session:
    yield session
