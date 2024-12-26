from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship
from sqlalchemy import Column, DateTime, ForeignKey
from sqlalchemy.sql import func
from datetime import datetime
from source.enums import OrderStatus, PaymentStatus


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
      sa_column=Column(DateTime(timezone=True),
                       server_default=func.now(), onupdate=func.now())
  )
  deleted: bool = False
  orders: List["Order"] = Relationship(back_populates="product")


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
      sa_column=Column(DateTime(timezone=True),
                       server_default=func.now(), onupdate=func.now())
  )
  deleted: bool = False
  orders: List["Order"] = Relationship(back_populates="customer")


class Order(SQLModel, table=True):
  orderId: str = Field(primary_key=True)
  productId: str = Field(foreign_key="product.productId")
  customerId: str = Field(foreign_key="customer.customerId")
  status: OrderStatus = OrderStatus.Pending
  quantity: float
  paymentStatus: PaymentStatus = PaymentStatus.Pending
  created: Optional[datetime] = Field(
      sa_column=Column(DateTime(timezone=True), server_default=func.now())
  )
  updated: Optional[datetime] = Field(
      sa_column=Column(DateTime(timezone=True),
                       server_default=func.now(), onupdate=func.now())
  )
  deleted: bool = False
  product: Product = Relationship(back_populates="orders")
  customer: Customer = Relationship(back_populates="orders")
