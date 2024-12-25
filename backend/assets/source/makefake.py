import httpx
import asyncio
import random
from loguru import logger
from faker import Faker

faker = Faker()


async def spin_up_fakers():
  asyncio.create_task(create_random_orders())
  asyncio.create_task(create_random_customers())
  asyncio.create_task(create_random_products())
  asyncio.create_task(restock_random_products())
  asyncio.create_task(update_order_statuses())


async def create_random_orders():
  async with httpx.AsyncClient() as client:
    while True:
      try:
        response = await client.post("http://localhost:8000/orders/random")
        logger.info(f"Random order created: {response.json()}")
      except Exception as e:
        logger.error(f"Error creating random order: {e}")
      await asyncio.sleep(10)


async def create_random_customers():
  async with httpx.AsyncClient() as client:
    while True:
      try:
        response = await client.post("http://localhost:8000/customers/random")
        logger.info(f"Random customer created: {response.json()}")
      except Exception as e:
        logger.error(f"Error creating random customer: {e}")
      await asyncio.sleep(120)


async def create_random_products():
  async with httpx.AsyncClient() as client:
    while True:
      try:
        response = await client.post("http://localhost:8000/products/random")
        logger.info(f"Random product created: {response.json()}")
      except Exception as e:
        logger.error(f"Error creating random product: {e}")
      await asyncio.sleep(180)


async def restock_random_products():
  async with httpx.AsyncClient() as client:
    while True:
      try:
        response = await client.post("http://localhost:8000/products/restock")
        logger.info(f"Random product restocked: {response.json()}")
      except Exception as e:
        logger.error(f"Error restocking product: {e}")
      await asyncio.sleep(60)


async def update_order_statuses():
  async with httpx.AsyncClient() as client:
    while True:
      try:
        response = await client.post("http://localhost:8000/orders/update_status")
        logger.info(f"Order statuses updated: {response.json()}")
      except Exception as e:
        logger.error(f"Error updating order statuses: {e}")
      await asyncio.sleep(random.randint(120, 240))
