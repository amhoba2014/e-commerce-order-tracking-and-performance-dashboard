from typing import Union
from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from source.models import Hero
from source.models import Order
from source.database import get_db


app = FastAPI()


@app.get("/")
async def read_root():
  hero_1 = Hero(name="Deadpond", secret_name="Dive Wilson")
  hero_2 = Hero(name="Spider-Boy", secret_name="Pedro Parqueador")
  hero_3 = Hero(name="Rusty-Man", secret_name="Tommy Sharp", age=48)
  return {"Hello": "World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
  return {"item_id": item_id, "q": q}


# Endpoint to get all orders
@app.get("/orders/", response_model=list[Order])
async def read_orders(db: AsyncSession = Depends(get_db)):
  # Select all orders from the database
  result = await db.execute(select(Order))
  orders = result.scalars().all()  # Get all orders from the result
  return orders
