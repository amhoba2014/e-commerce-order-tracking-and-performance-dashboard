import asyncio
from typing import List
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from faker import Faker
import random
from loguru import logger
from datetime import datetime, timezone
from source.makefake import spin_up_fakers
from source.models import Order, Customer, Product
from source.database import create_db_and_tables, get_db
from source.enums import OrderStatus, PaymentStatus
from source.openapi import make_custom_openapi

app = FastAPI()

# Apply the custom OpenAPI schema
app.openapi = make_custom_openapi(app)

faker = Faker()


@app.on_event("startup")
async def on_startup():
  await create_db_and_tables()
  await spin_up_fakers()


@app.get("/health")
async def health_check():
  return {"status": "healthy"}


@app.get("/orders/", response_model=List[Order])
async def read_orders(db: AsyncSession = Depends(get_db)):
  result = await db.execute(select(Order))
  orders = result.scalars().all()
  return orders


@app.post("/orders/random", response_model=Order)
async def add_random_order(db: AsyncSession = Depends(get_db)):
  # Check if products exist
  result = await db.execute(select(Product))
  products = result.scalars().all()
  if not products:
    raise HTTPException(
        status_code=404, detail="No products available to create orders."
    )

  # Check if customers exist
  result = await db.execute(select(Customer))
  customers = result.scalars().all()
  if not customers:
    raise HTTPException(
        status_code=404, detail="No customers available to create orders."
    )

  # Select random product and customer
  random_product = random.choice(products)
  random_customer = random.choice(customers)

  # Check product stock
  if random_product.quantity < 1:
    raise HTTPException(
        status_code=400, detail=f"Product {random_product.name} is out of stock."
    )

  # Create the order
  random_order = Order(
      orderId=f"ORD{datetime.now().strftime('%Y%m%d%H%M%S%f')[:-3]}",
      productId=random_product.productId,
      customerId=random_customer.customerId,
      status=OrderStatus.Pending,
      quantity=1,
      paymentStatus=PaymentStatus.Pending,
  )

  # Deduct product quantity
  random_product.quantity -= 1

  logger.info(f"Order created: {random_order.model_dump_json()}")

  # Commit changes to the database
  db.add(random_order)
  await db.commit()
  await db.refresh(random_order)

  return random_order


@app.post("/customers/random", response_model=Customer)
async def add_random_customer(db: AsyncSession = Depends(get_db)):
  random_customer = Customer(
      customerId=f"CUST{datetime.now().strftime('%Y%m%d%H%M%S%f')[:-3]}",
      name=faker.name(),
      email=faker.email(),
      password=faker.password(),
      address=faker.address().replace("\n", ", "),
  )

  logger.info(f"Customer created: {random_customer.model_dump_json()}")

  db.add(random_customer)
  await db.commit()
  await db.refresh(random_customer)

  return random_customer


@app.post("/products/random", response_model=Product)
async def add_random_product(db: AsyncSession = Depends(get_db)):
  random_product = Product(
      productId=f"PROD{datetime.now().strftime('%Y%m%d%H%M%S%f')[:-3]}",
      name=faker.word(),
      description=faker.sentence(),
      price=round(random.uniform(5.0, 100.0), 2),
      quantity=random.randint(1, 10),
  )

  logger.info(f"Product created: {random_product.model_dump_json()}")

  db.add(random_product)
  await db.commit()
  await db.refresh(random_product)

  return random_product


@app.post("/products/restock", response_model=List[Product])
async def restock_products(db: AsyncSession = Depends(get_db)):
  result = await db.execute(select(Product))
  products = result.scalars().all()

  if not products:
    raise Exception("No products available to restock.")

  restocked_products = []

  for product in products:
    random_quantity = random.randint(1, 10)
    product.quantity += random_quantity
    restocked_products.append(product)
    logger.info(
        f"Product restocked: {product.productId} with quantity {random_quantity}")

  await db.commit()

  # Refresh all products to return updated values
  for product in restocked_products:
    await db.refresh(product)

  return restocked_products


@app.post("/orders/update_status")
async def update_random_order_status(db: AsyncSession = Depends(get_db)):
  result = await db.execute(select(Order))
  orders = result.scalars().all()

  if not orders:
    raise Exception("No orders available to update.")

  # Select a random order
  random_order = random.choice(orders)

  try:
    current_index = list(OrderStatus).index(random_order.status)
    if current_index < len(OrderStatus) - 1:
      # Move to the next status
      random_order.status = list(OrderStatus)[current_index + 1]
      random_order.updated = datetime.now()
      logger.info(f"Order status updated: {random_order.model_dump_json()}")
    else:
      logger.info(
          f"Order status is already at the final state: {random_order.status}")
  except ValueError:
    raise Exception(
        f"Invalid order status for order ID {random_order.orderId}")

  # Update the database
  await db.commit()
  await db.refresh(random_order)

  return {"message": f"Order ID {random_order.orderId} status updated to {random_order.status}"}


@app.post("/orders/update_payment_status")
async def update_payment_status(db: AsyncSession = Depends(get_db)):
    # Fetch all orders with PaymentStatus.Pending
  result = await db.execute(select(Order).where(Order.paymentStatus == PaymentStatus.Pending))
  pending_orders = result.scalars().all()

  if not pending_orders:
    logger.info("No pending orders found.")
    return {"message": "No pending orders to update."}

  # Randomly select one order from the pending orders
  order = random.choice(pending_orders)

  # Randomly set to Paid or Failed
  order.paymentStatus = random.choice(
      [PaymentStatus.Paid, PaymentStatus.Failed])
  order.updated = datetime.now(timezone.utc)
  logger.info(f"Payment status updated: {order.model_dump_json()}")

  await db.commit()
  return {"message": f"Payment status updated for order: {order.orderId}"}
