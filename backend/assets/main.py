import asyncio
from typing import List
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from faker import Faker
import random
from loguru import logger
from datetime import datetime, timezone
from source.makefake import spin_up_fakers
from source.models import Order, Customer, Product
from source.database import create_db_and_tables, get_db
from source.enums import OrderStatus, PaymentStatus
from source.openapi import make_custom_openapi

app = FastAPI()

# Apply the custom OpenAPI schema
app.openapi = make_custom_openapi(app)

faker = Faker()


@app.on_event("startup")
async def on_startup():
  await create_db_and_tables()
  await spin_up_fakers()


@app.get("/health")
async def health_check():
  return {"status": "healthy"}


@app.get("/orders/", response_model=List[Order])
async def read_orders(db: AsyncSession = Depends(get_db)):
  result = await db.execute(select(Order))
  orders = result.scalars().all()
  return orders


@app.get("/products/", response_model=List[Product])
async def read_products(db: AsyncSession = Depends(get_db)):
  result = await db.execute(select(Product))
  products = result.scalars().all()
  return products


@app.get("/customers/", response_model=List[Customer])
async def read_customers(db: AsyncSession = Depends(get_db)):
  result = await db.execute(select(Customer))
  customers = result.scalars().all()
  return customers


@app.post("/orders/random", response_model=Order)
async def add_random_order(db: AsyncSession = Depends(get_db)):
  # Check if products exist
  result = await db.execute(select(Product))
  products = result.scalars().all()
  if not products:
    raise HTTPException(
        status_code=404, detail="No products available to create orders."
    )

  # Check if customers exist
  result = await db.execute(select(Customer))
  customers = result.scalars().all()
  if not customers:
    raise HTTPException(
        status_code=404, detail="No customers available to create orders."
    )

  # Select random product and customer
  random_product = random.choice(products)
  random_customer = random.choice(customers)

  # Check product stock
  if random_product.quantity < 1:
    raise HTTPException(
        status_code=400, detail=f"Product {random_product.name} is out of stock."
    )

  # Create the order
  random_order = Order(
      id=f"ORD{datetime.now().strftime('%Y%m%d%H%M%S%f')[:-3]}",
      productId=random_product.id,
      customerId=random_customer.id,
      status=OrderStatus.Pending,
      quantity=1,
      paymentStatus=PaymentStatus.Pending,
  )

  # Deduct product quantity
  random_product.quantity -= 1

  logger.info(f"Order created: {random_order.model_dump_json()}")

  # Commit changes to the database
  db.add(random_order)
  await db.commit()
  await db.refresh(random_order)

  return random_order


@app.post("/customers/random", response_model=Customer)
async def add_random_customer(db: AsyncSession = Depends(get_db)):
  random_customer = Customer(
      id=f"CUST{datetime.now().strftime('%Y%m%d%H%M%S%f')[:-3]}",
      name=faker.name(),
      email=faker.email(),
      password=faker.password(),
      address=faker.address().replace("\n", ", "),
  )

  logger.info(f"Customer created: {random_customer.model_dump_json()}")

  db.add(random_customer)
  await db.commit()
  await db.refresh(random_customer)

  return random_customer


@app.post("/products/random", response_model=Product)
async def add_random_product(db: AsyncSession = Depends(get_db)):
  # Lists for generating meaningful product names and descriptions
  categories = [
      "Electronics", "Home & Kitchen", "Sports & Outdoors", "Books", "Toys & Games",
      "Beauty & Personal Care", "Clothing & Accessories", "Automotive", "Pet Supplies",
      "Office Products", "Garden & Outdoor", "Health & Wellness", "Food & Grocery",
      "Music & Instruments", "Art & Craft Supplies"
  ]
  adjectives = [
      "Premium", "Deluxe", "Smart", "Eco-friendly", "Portable", "Wireless", "Ergonomic",
      "Innovative", "Compact", "Multifunctional", "Durable", "Sleek", "High-performance",
      "Customizable", "Luxurious", "Efficient", "Versatile", "Cutting-edge", "Stylish",
      "Professional-grade", "User-friendly", "Advanced", "Lightweight", "Heavy-duty",
      "Energy-saving", "All-in-one", "Adjustable", "Foldable", "Rechargeable", "Waterproof"
  ]
  products = {
      "Electronics": ["Smartphone", "Laptop", "Headphones", "Smartwatch", "Tablet", "E-reader", "Bluetooth Speaker", "Drone", "Gaming Console", "Digital Camera"],
      "Home & Kitchen": ["Coffee Maker", "Blender", "Air Fryer", "Robot Vacuum", "Toaster Oven", "Instant Pot", "Juicer", "Stand Mixer", "Food Processor", "Electric Kettle"],
      "Sports & Outdoors": ["Yoga Mat", "Dumbbells", "Hiking Backpack", "Tennis Racket", "Camping Tent", "Fitness Tracker", "Bicycle", "Kayak", "Snowboard", "Golf Clubs"],
      "Books": ["Novel", "Cookbook", "Self-help Book", "Biography", "Science Fiction", "History Book", "Poetry Collection", "Graphic Novel", "Travel Guide", "Academic Textbook"],
      "Toys & Games": ["Board Game", "LEGO Set", "Remote Control Car", "Puzzle", "Action Figure", "Dollhouse", "Educational Toy", "Video Game", "Outdoor Play Equipment", "Art Set"],
      "Beauty & Personal Care": ["Hair Dryer", "Electric Toothbrush", "Skincare Set", "Makeup Kit", "Beard Trimmer", "Nail Polish Set", "Perfume", "Face Mask", "Hair Straightener", "Massage Device"],
      "Clothing & Accessories": ["Running Shoes", "Smartwatch", "Sunglasses", "Backpack", "Winter Coat", "Dress Shirt", "Yoga Pants", "Leather Wallet", "Scarf", "Hiking Boots"],
      "Automotive": ["Car Vacuum", "Dash Cam", "Jump Starter", "Car Air Purifier", "Steering Wheel Cover", "Car Phone Mount", "Tire Pressure Gauge", "Car Wax", "Seat Cushion", "Car Organizer"],
      "Pet Supplies": ["Automatic Pet Feeder", "Dog Bed", "Cat Tree", "Pet Camera", "Grooming Kit", "Interactive Toy", "Pet Carrier", "Aquarium", "Pet GPS Tracker", "Dog Harness"],
      "Office Products": ["Ergonomic Chair", "Desk Lamp", "Wireless Mouse", "Paper Shredder", "Whiteboard", "Filing Cabinet", "Label Maker", "Desk Organizer", "Printer", "Noise-Cancelling Headphones"],
      "Garden & Outdoor": ["Lawn Mower", "Patio Furniture Set", "Garden Hose", "Bird Feeder", "Outdoor Grill", "Solar Lights", "Hammock", "Pressure Washer", "Compost Bin", "Garden Tools Set"],
      "Health & Wellness": ["Fitness Tracker", "Yoga Mat", "Meditation App Subscription", "Air Purifier", "Weighted Blanket", "Foam Roller", "Blood Pressure Monitor", "Essential Oil Diffuser", "Resistance Bands", "Vitamin Supplement"],
      "Food & Grocery": ["Organic Coffee Beans", "Gourmet Chocolate Box", "Artisanal Cheese Selection", "Exotic Fruit Basket", "Specialty Tea Set", "Gluten-free Snack Pack", "Vegan Protein Powder", "Spice Gift Set", "Olive Oil Sampler", "Craft Beer Variety Pack"],
      "Music & Instruments": ["Digital Piano", "Acoustic Guitar", "Bluetooth Turntable", "Electronic Drum Set", "MIDI Controller", "Wireless Earbuds", "Karaoke Machine", "Harmonica Set", "Ukulele", "DJ Controller"],
      "Art & Craft Supplies": ["Acrylic Paint Set", "Drawing Tablet", "Sewing Machine", "Pottery Wheel", "Calligraphy Kit", "Scrapbooking Set", "Jewelry Making Kit", "Woodburning Tool", "Canvas Set", "Knitting Supplies"]
  }
  features = [
      "durability", "user-friendly interface", "long battery life", "compact design", "advanced technology",
      "energy efficiency", "wireless connectivity", "customizable settings", "ergonomic design", "high-resolution display",
      "fast charging", "voice control", "AI-powered features", "water resistance", "shock-proof construction",
      "eco-friendly materials", "noise cancellation", "multi-device compatibility", "augmented reality support", "biometric security",
      "cloud integration", "gesture control", "modular design", "self-cleaning function", "automatic updates"
  ]
  use_cases = ["home", "office", "travel", "outdoor", "fitness",
               "education", "entertainment", "professional", "creative", "everyday"]

  # Generate random product details
  category = random.choice(categories)
  adjective = random.choice(adjectives)
  product_type = random.choice(products[category])

  name = f"{adjective} {product_type}"
  description = f"High-quality {category.lower()} product. This {name.lower()} is perfect for {random.choice(use_cases)} use. Features include {', '.join(random.sample(features, 3))}."

  random_product = Product(
      id=f"PROD{datetime.now().strftime('%Y%m%d%H%M%S%f')[:-3]}",
      name=name,
      description=description,
      price=round(random.uniform(5.0, 5000.0), 2),
      quantity=random.randint(1, 50),
  )

  logger.info(f"Product created: {random_product.model_dump_json()}")

  db.add(random_product)
  await db.commit()
  await db.refresh(random_product)

  return random_product


@app.post("/products/restock", response_model=List[Product])
async def restock_products(db: AsyncSession = Depends(get_db)):
  result = await db.execute(select(Product))
  products = result.scalars().all()

  if not products:
    raise HTTPException(
        status_code=404, detail="No products available to restock.")

  restocked_products = []

  for product in products:
    random_quantity = random.randint(1, 10)
    product.quantity += random_quantity
    restocked_products.append(product)
    logger.info(
        f"Product restocked: {product.id} with quantity {random_quantity}")

  await db.commit()

  # Refresh all products to return updated values
  for product in restocked_products:
    await db.refresh(product)

  return restocked_products


@app.post("/orders/update_status")
async def update_random_order_status(db: AsyncSession = Depends(get_db)):
  result = await db.execute(select(Order).filter(Order.paymentStatus == PaymentStatus.Paid))
  paid_orders = result.scalars().all()

  if not paid_orders:
    raise HTTPException(
        status_code=404, detail="No paid orders available to update.")

  # Select a random paid order
  random_order = random.choice(paid_orders)

  try:
    current_index = list(OrderStatus).index(random_order.status)
    if current_index < len(OrderStatus) - 1:
      # Move to the next status
      random_order.status = list(OrderStatus)[current_index + 1]
      random_order.updated = datetime.now()
      logger.info(f"Order status updated: {random_order.model_dump_json()}")
    else:
      logger.info(
          f"Order status is already at the final state: {random_order.status}")
  except ValueError:
    raise HTTPException(
        status_code=500,
        detail=f"Invalid order status for order ID {random_order.id}")

  # Update the database
  await db.commit()
  await db.refresh(random_order)

  return {"message": f"Order ID {random_order.id} status updated to {random_order.status}"}


@app.post("/orders/update_payment_status")
async def update_payment_status(db: AsyncSession = Depends(get_db)):
  # Fetch all orders with PaymentStatus.Pending or PaymentStatus.Failed
  result = await db.execute(
      select(Order).where(
          (Order.paymentStatus == PaymentStatus.Pending) |
          (Order.paymentStatus == PaymentStatus.Failed)
      )
  )
  updateable_orders = result.scalars().all()

  if not updateable_orders:
    logger.info("No orders with pending or failed payment status found.")
    return {"message": "No orders to update."}

  # Randomly select one order from the updateable orders
  order = random.choice(updateable_orders)

  # Randomly set to Paid or Failed
  order.paymentStatus = random.choice(
      [PaymentStatus.Paid, PaymentStatus.Failed])

  order.updated = datetime.now(timezone.utc)
  logger.info(f"Payment status updated: {order.model_dump_json()}")

  await db.commit()
  return {"message": f"Payment status updated for order: {order.id}. New status: {order.paymentStatus}"}
