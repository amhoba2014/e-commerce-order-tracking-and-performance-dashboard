from enum import Enum

# Define the possible values for Order status
class OrderStatus(str, Enum):
  Pending = 'Pending'
  Shipped = 'Shipped'
  Delivered = 'Delivered'

# Define the possible values for Payment status
class PaymentStatus(str, Enum):
  Paid = 'Paid'
  Pending = 'Pending'
  Failed = 'Failed'
