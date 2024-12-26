from pydantic import BaseModel, conint
from typing import List, Optional
from source.models import Order


class PaginatedOrdersResponse(BaseModel):
  total: int
  page: int
  size: int
  results: List[Order]
