from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL: str = "postgresql+asyncpg://user:password@localhost:5432/mydatabase"

# Create the database engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Create an async session factory
async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Base class for models
Base = declarative_base()


# Dependency for FastAPI routes
async def get_db():
  async with async_session() as session:
    yield session
