// app/customers.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';
import * as sdk from '@/sdk/sdk.gen';
import { Customer } from '@/sdk/types.gen';

sdk.client.setConfig({
  baseUrl: "/api"
});

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[] | null>(null);

  // Hook to fetch customers every 2 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await sdk.defaultReadCustomers();
        setCustomers(response.data ?? []);
      } catch (error) {
        console.error('Error fetching customers:', error);
        setCustomers([]); // Default to an empty array if fetch fails
      }
    }, 2000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

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
              customers.map((customer) => (
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
    </div>
  );
}
