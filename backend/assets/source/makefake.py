import httpx
import asyncio


async def spin_up_fakers():
  asyncio.create_task(create_random_orders())


async def create_random_orders():
  pass
  # async with httpx.AsyncClient() as client:
  #   while True:
  #     try:
  #       response = await client.post("http://localhost:8000/orders/random")
  #       print(f"Created random order: {response.status_code}")
  #     except Exception as e:
  #       print(f"Error creating random order: {e}")
  #     await asyncio.sleep(2)
