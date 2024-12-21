import httpx
import asyncio
from loguru import logger

async def spin_up_fakers():
  asyncio.create_task(create_random_orders())


async def create_random_orders():
  async with httpx.AsyncClient() as client:
    while True:
      try:
        response = await client.post("http://localhost:8000/orders/random")
      except Exception as e:
        logger.error(f"Error creating random order: {e}")
      await asyncio.sleep(10)
