from pydantic import BaseModel
from typing import List
from source.models import Order, Product, Customer


class PaginatedOrdersResponse(BaseModel):
  total: int
  page: int
  size: int
  results: List[Order]


class PaginatedProductsResponse(BaseModel):
  total: int
  page: int
  size: int
  results: List[Product]


class PaginatedCustomersResponse(BaseModel):
  total: int
  page: int
  size: int
  results: List[Customer]
