'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

export default function Page() {
  // Sample data for the orders
  const orders = [
    {
      orderId: 'ORD001',
      customerName: 'John Doe',
      status: 'Pending',
      timestamp: '2024-12-14 10:30',
      amount: '$200.00',
      paymentStatus: 'Paid',
      shippingAddress: '1234 Elm St, Springfield, IL',
    },
    {
      orderId: 'ORD002',
      customerName: 'Jane Smith',
      status: 'Shipped',
      timestamp: '2024-12-13 15:45',
      amount: '$150.00',
      paymentStatus: 'Pending',
      shippingAddress: '5678 Oak Ave, Chicago, IL',
    },
    {
      orderId: 'ORD003',
      customerName: 'Sam Wilson',
      status: 'Delivered',
      timestamp: '2024-12-12 12:00',
      amount: '$80.00',
      paymentStatus: 'Paid',
      shippingAddress: '9876 Pine Dr, Miami, FL',
    },
    {
      orderId: 'ORD004',
      customerName: 'Chris Lee',
      status: 'Pending',
      timestamp: '2024-12-11 08:20',
      amount: '$220.00',
      paymentStatus: 'Pending',
      shippingAddress: '6543 Maple Blvd, Houston, TX',
    },
  ];

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
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.timestamp}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.paymentStatus}</TableCell>
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
