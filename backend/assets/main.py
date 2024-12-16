import asyncio
import httpx
from typing import List
from fastapi import FastAPI, Depends, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from faker import Faker
import random
from datetime import datetime
from source.models import Order
from source.database import create_db_and_tables, get_db
from source.enums import OrderStatus, PaymentStatus
from source.openapi import make_custom_openapi

app = FastAPI()

# Apply the custom OpenAPI schema
app.openapi = make_custom_openapi(app)

faker = Faker()  # Initialize the Faker instance


async def create_random_orders():
  async with httpx.AsyncClient() as client:
    while True:
      try:
        response = await client.post("http://localhost:8000/orders/random")
        print(f"Created random order: {response.status_code}")
      except Exception as e:
        print(f"Error creating random order: {e}")
      await asyncio.sleep(2)


@app.on_event("startup")
async def on_startup():
  await create_db_and_tables()
  asyncio.create_task(create_random_orders())


@app.get("/orders/", response_model=List[Order])
async def read_orders(db: AsyncSession = Depends(get_db)):
  result = await db.execute(select(Order))
  orders = result.scalars().all()
  return orders


@app.post("/orders/random", response_model=Order)
async def add_random_order(db: AsyncSession = Depends(get_db)):
  random_order = Order(
      orderId=f"ORD{random.randint(1000, 9999)}",
      customerName=faker.name(),
      status=random.choice(list(OrderStatus)),
      timestamp=datetime.now(),
      amount=round(random.uniform(50.0, 500.0), 2),
      paymentStatus=random.choice(list(PaymentStatus)),
      shippingAddress=faker.address().replace("\n", ", "),
  )

  db.add(random_order)
  await db.commit()
  await db.refresh(random_order)

  return random_order
