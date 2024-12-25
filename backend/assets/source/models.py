from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime
from source.enums import OrderStatus, PaymentStatus


class Order(SQLModel, table=True):
  orderId: str = Field(primary_key=True)
  customerName: str
  status: OrderStatus
  timestamp: datetime
  amount: float
  paymentStatus: PaymentStatus
  shippingAddress: str
