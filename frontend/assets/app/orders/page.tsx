'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip, CircularProgress, Pagination } from '@mui/material';
import * as sdk from '@/sdk/sdk.gen';
import { Order, PaginatedOrdersResponse } from '@/sdk/types.gen';

sdk.client.setConfig({
  baseUrl: "/api"
});

const page_size = 5

export default function Page() {
  const [orders, setOrders] = useState<PaginatedOrdersResponse | null>(null);
  const [page, setPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track the total number of pages

  // Fetch orders whenever the page changes
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await sdk.defaultReadOrders({ query: { page, size: page_size } });
        setOrders(response.data ?? null);

        // Set the total number of pages based on the total count returned from the backend
        setTotalPages(response.data ? Math.ceil(response.data.total / page_size) : 1); // Assuming the backend returns total count
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders(null); // Default to an empty array if fetch fails
      }
    };

    fetchOrders();
  }, [page]);

  // Function to map status to badge color
  const getStatusBadgeColor = (status: string) => {
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
  const getPaymentStatusBadgeColor = (paymentStatus: string) => {
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

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
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
              orders.results.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerId}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={getStatusBadgeColor(order.status ?? "")}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{order.created}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.paymentStatus}
                      color={getPaymentStatusBadgeColor(order.paymentStatus ?? "")}
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

      {/* Pagination Controls */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          siblingCount={1}
        />
      </div>
    </div>
  );
}
