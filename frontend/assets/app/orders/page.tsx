'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip, CircularProgress } from '@mui/material';
import * as sdk from '@/sdk/sdk.gen';
import { Order } from '@/sdk/types.gen';

sdk.client.setConfig({
  baseUrl: "/api"
});

export default function Page() {
  const [orders, setOrders] = useState<Order[] | null>(null);

  // Hook to fetch orders every 2 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await sdk.defaultReadOrders();
        setOrders(response.data ?? []);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]); // Default to an empty array if fetch fails
      }
    }, 2000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

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
              <TableCell>Customer ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Product ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Show loading state if orders is null */}
            {orders === null ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <CircularProgress />
                  <div>Loading Orders...</div>
                </TableCell>
              </TableRow>
            ) : (
              // Render orders once data is available
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerId}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={getStatusBadgeColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{order.created}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.paymentStatus}
                      color={getPaymentStatusBadgeColor(order.paymentStatus)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{order.productId}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
