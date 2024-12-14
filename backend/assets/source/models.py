from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime
from source.enums import OrderStatus, PaymentStatus


class Hero(SQLModel, table=True):
  id: Optional[int] = Field(default=None, primary_key=True)
  name: str
  secret_name: str
  age: Optional[int] = None


class Order(SQLModel, table=True):
  orderId: str = Field(primary_key=True)
  customerName: str
  status: OrderStatus
  timestamp: datetime
  amount: float
  paymentStatus: PaymentStatus
  shippingAddress: str
