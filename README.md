# E-commerce Order Tracking and Performance Dashboard

A comprehensive e-commerce dashboard system for tracking orders, monitoring performance metrics, and analyzing business data in real-time. The system is built using a modern microservices architecture with a focus on scalability, reliability, and real-time analytics.

This repository is for demonstration purposes so there are mutliple fake data generators built into this project which you can take a look by observing the backend codebase.

We naively think that each `order` will contain only one `product`.

## 🚀 Features

- **Real-time Order Tracking**: Monitor orders from creation to delivery
- **Product Management**: Track inventory and product performance
- **Customer Management**: View and manage customer information
- **Performance Analytics**: Real-time metrics and analytics using ELK Stack
- **Modern UI**: Responsive dashboard built with Next.js and Material-UI
- **API Gateway**: Centralized API management and routing
- **Data Persistence**: PostgreSQL database for reliable data storage
- **Logging & Monitoring**: Comprehensive logging and monitoring system

## 🏗️ Architecture

The system is composed of several microservices:

- **Frontend**: Next.js application with Material-UI components
- **Backend**: FastAPI-based REST API service
- **Database**: PostgreSQL for data persistence
- **ELK Stack**:
  - Elasticsearch: Search and analytics engine
  - Logstash: Data processing pipeline
  - Kibana: Data visualization and management
- **API Gateway**: Traefik-based API gateway for routing and load balancing

## 🛠️ Technology Stack

### Frontend
- Next.js 15.0.0
- React 19.0.0
- Material-UI 6.1.9
- Tailwind CSS 3.4.4
- TypeScript 5.5.2

### Backend
- Python 3.11+
- FastAPI
- SQLModel
- AsyncPG
- Poetry for dependency management

### Database
- PostgreSQL

### Monitoring & Analytics
- Elasticsearch
- Logstash
- Kibana

### Infrastructure
- Docker
- Traefik (API Gateway)

## 🚦 Getting Started

### Prerequisites
- Docker and Docker Compose
- Git
- Typer-CLI (Install from https://typer.tiangolo.com/)

### Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/amhoba2014/e-commerce-order-tracking-and-performance-dashboard
   cd e-commerce-order-tracking-and-performance-dashboard/integration
   ```

2. Build and start the services:
   ```bash
   typer do.py run dev eliminate # just in case
   typer do.py run dev build # build container images
   typer do.py run dev setup # setup ELK
   typer do.py run dev start # run
   ```

3. Access the applications:
   - Frontend Dashboard: http://localhost
   - Backend API: http://localhost/api/docs
   - Kibana Dashboard: http://localhost:5601

## 📊 Data Models

### Order
- ID (string)
- Product ID (foreign key)
- Customer ID (foreign key)
- Status (enum: Pending, Shipped, Delivered)
- Quantity (float)
- Payment Status (enum: Paid, Pending, Failed)
- Created/Updated timestamps

### Product
- ID (string)
- Name (string)
- Description (string)
- Price (float)
- Quantity (float)
- Created/Updated timestamps

### Customer
- ID (string)
- Name (string)
- Email (string)
- Password (string)
- Address (string)
- Created/Updated timestamps

## 🧪 Development

### Directory Structure
```
.
├── backend/          # FastAPI backend service
├── database/         # PostgreSQL database
├── elasticsearch/    # Elasticsearch configuration
├── frontend/         # Next.js frontend application
├── gateway/          # Traefik API gateway
├── integration/      # Integration tests and scripts
├── kibana/          # Kibana configuration
├── logstash/        # Logstash pipeline and config
└── setup/           # Setup and initialization scripts
```

### Development Workflow
1. Make changes in the respective service directory
2. Test changes locally
3. Build and test with Docker
4. Submit pull request

## 📝 License

This project is licensed under the terms of the license included in the repository.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Submit a pull request 

## 🏆 Credits

ELK stack credit goes to https://github.com/deviantony/docker-elk for their comprehensive ELK setup.