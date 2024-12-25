from typing import Optional
from sqlmodel import Field, SQLModel
from sqlalchemy import Column, DateTime
from sqlalchemy.sql import func
from datetime import datetime, timezone
from source.enums import OrderStatus, PaymentStatus


class Order(SQLModel, table=True):
  orderId: str = Field(primary_key=True)
  productId: str
  customerId: str
  status: OrderStatus = OrderStatus.Pending
  quantity: float
  paymentStatus: PaymentStatus = PaymentStatus.Pending
  created: Optional[datetime] = Field(
      sa_column=Column(DateTime(timezone=True), server_default=func.now())
  )
  updated: Optional[datetime] = Field(
      sa_column=Column(DateTime(timezone=True), server_default=func.now())
  )
  deleted: bool = False


class Customer(SQLModel, table=True):
  customerId: str = Field(primary_key=True)
  name: str
  email: str
  password: str
  address: str
  created: Optional[datetime] = Field(
      sa_column=Column(DateTime(timezone=True), server_default=func.now())
  )
  updated: Optional[datetime] = Field(
      sa_column=Column(DateTime(timezone=True), server_default=func.now())
  )
  deleted: bool = False


class Product(SQLModel, table=True):
  productId: str = Field(primary_key=True)
  name: str
  description: str
  price: float
  quantity: float
  created: Optional[datetime] = Field(
      sa_column=Column(DateTime(timezone=True), server_default=func.now())
  )
  updated: Optional[datetime] = Field(
      sa_column=Column(DateTime(timezone=True), server_default=func.now())
  )
  deleted: bool = False
