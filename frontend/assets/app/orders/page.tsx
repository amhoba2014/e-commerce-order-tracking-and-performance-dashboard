'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip } from '@mui/material';
import * as sdk from '@/sdk/sdk.gen'
import { Order } from '@/sdk/types.gen'

sdk.client.setConfig({
  baseUrl: "/api"
})

export default function Page() {

  const [orders, setOrders] = useState<Order[]>([])

  // Hook to call the function every 2 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await sdk.defaultReadOrders()
      setOrders(response.data ?? [])
    }, 2000) // Runs every 2 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval)
  }, [])

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
