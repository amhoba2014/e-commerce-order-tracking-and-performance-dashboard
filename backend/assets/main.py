from typing import List
from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from faker import Faker
import random
from datetime import datetime
from source.models import Hero, Order
from source.database import create_db_and_tables, get_db
from source.enums import OrderStatus, PaymentStatus

app = FastAPI()

faker = Faker()  # Initialize the Faker instance


@app.on_event("startup")
async def on_startup():
  await create_db_and_tables()


@app.get("/orders/", response_model=List[Order])
async def read_orders(db: AsyncSession = Depends(get_db)):
  # Select all orders from the database
  result = await db.execute(select(Order))
  orders = result.scalars().all()  # Get all orders from the result
  return orders


@app.post("/orders/random", response_model=Order)
async def add_random_order(db: AsyncSession = Depends(get_db)):
  """
  Add an order with completely random data.
  """
  # Generate random data for an order
  random_order = Order(
      orderId=f"ORD{random.randint(1000, 9999)}",
      customerName=faker.name(),
      status=random.choice(list(OrderStatus)),
      timestamp=datetime.now(),
      amount=round(random.uniform(50.0, 500.0), 2),
      paymentStatus=random.choice(list(PaymentStatus)),
      shippingAddress=faker.address().replace("\n", ", "),
  )

  # Add the order to the database
  db.add(random_order)
  await db.commit()
  # Refresh the instance to reflect changes from the DB
  await db.refresh(random_order)

  return random_order
