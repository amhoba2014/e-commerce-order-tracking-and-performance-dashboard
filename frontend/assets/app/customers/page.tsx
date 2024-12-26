'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Pagination } from '@mui/material';
import * as sdk from '@/sdk/sdk.gen';
import { Customer, PaginatedCustomersResponse } from '@/sdk/types.gen';

sdk.client.setConfig({
  baseUrl: "/api"
});

const page_size = 5

export default function CustomersPage() {
  const [customers, setCustomers] = useState<PaginatedCustomersResponse | null>(null);
  const [page, setPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track the total number of pages

  const fetchCustomers = async () => {
    try {
      const response = await sdk.defaultReadCustomers({ query: { page, size: page_size } });
      setCustomers(response.data ?? null);

      // Set the total number of pages based on the total count returned from the backend
      setTotalPages(response.data ? Math.ceil(response.data.total / page_size) : 1); // Assuming the backend returns total count
    } catch (error) {
      console.error('Error fetching customers:', error);
      setCustomers(null); // Default to an empty array if fetch fails
    }
  };

  // useEffect to fetch customers on page change and every 5 seconds
  useEffect(() => {
    // Fetch customers immediately when page changes
    fetchCustomers();

    // Set up interval to fetch customers every 5 seconds
    const intervalId = setInterval(fetchCustomers, 5000);

    // Clear interval on component unmount or when page changes
    return () => clearInterval(intervalId);
  }, [page]); // Dependency array includes 'page'

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
              <TableCell>Customer ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Show loading state if customers is null */}
            {customers === null ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                  <div>Loading Customers...</div>
                </TableCell>
              </TableRow>
            ) : (
              // Render customers once data is available
              customers.results.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.address}</TableCell>
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
