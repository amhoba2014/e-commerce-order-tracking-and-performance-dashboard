from typing import Union
from fastapi import FastAPI

from source.models import Hero


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
