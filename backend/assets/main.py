from typing import Union
from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from source.models import Hero, Order
from source.database import create_db_and_tables, get_db

app = FastAPI()


@app.on_event("startup")
async def on_startup():
  await create_db_and_tables()


@app.get("/orders/", response_model=list[Order])
async def read_orders(db: AsyncSession = Depends(get_db)):
  # Select all orders from the database
  result = await db.execute(select(Order))
  orders = result.scalars().all()  # Get all orders from the result
  return orders

