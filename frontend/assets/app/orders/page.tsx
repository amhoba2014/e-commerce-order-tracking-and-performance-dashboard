'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip } from '@mui/material';

export default function Page() {
  // Sample data for the orders
  const orders = [
    {
      orderId: 'ORD001',
      customerName: 'John Doe',
      status: 'Pending',
      paymentStatus: 'Paid',
      timestamp: '2024-12-14 10:30',
      amount: '$200.00',
      shippingAddress: '1234 Elm St, Springfield, IL',
    },
    {
      orderId: 'ORD002',
      customerName: 'Jane Smith',
      status: 'Shipped',
      paymentStatus: 'Pending',
      timestamp: '2024-12-13 15:45',
      amount: '$150.00',
      shippingAddress: '5678 Oak Ave, Chicago, IL',
    },
    {
      orderId: 'ORD003',
      customerName: 'Sam Wilson',
      status: 'Delivered',
      paymentStatus: 'Paid',
      timestamp: '2024-12-12 12:00',
      amount: '$80.00',
      shippingAddress: '9876 Pine Dr, Miami, FL',
    },
    {
      orderId: 'ORD004',
      customerName: 'Chris Lee',
      status: 'Pending',
      paymentStatus: 'Failed',
      timestamp: '2024-12-11 08:20',
      amount: '$220.00',
      shippingAddress: '6543 Maple Blvd, Houston, TX',
    },
  ];

  // Function to map status to badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'warning'; // yellow badge
      case 'Shipped':
        return 'info'; // blue badge
      case 'Delivered':
        return 'success'; // green badge
      default:
        return 'default'; // gray badge
    }
  };

  // Function to map payment status to badge color
  const getPaymentStatusBadgeColor = (paymentStatus) => {
    switch (paymentStatus) {
      case 'Paid':
        return 'success'; // green badge
      case 'Pending':
        return 'warning'; // yellow badge
      case 'Failed':
        return 'error'; // red badge
      default:
        return 'default'; // gray badge
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Order Amount</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Shipping Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusBadgeColor(order.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{order.timestamp}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <Chip
                    label={order.paymentStatus}
                    color={getPaymentStatusBadgeColor(order.paymentStatus)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{order.shippingAddress}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
