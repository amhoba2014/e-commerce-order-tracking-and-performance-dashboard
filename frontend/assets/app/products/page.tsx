// app/products.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip, CircularProgress } from '@mui/material';
import * as sdk from '@/sdk/sdk.gen';
import { Product } from '@/sdk/types.gen';

sdk.client.setConfig({
  baseUrl: "/api"
});

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[] | null>(null);

  // Hook to fetch products every 2 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await sdk.defaultReadProducts();
        setProducts(response.data ?? []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]); // Default to an empty array if fetch fails
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
              <TableCell>Product ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Show loading state if products is null */}
            {products === null ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                  <div>Loading Products...</div>
                </TableCell>
              </TableRow>
            ) : (
              // Render products once data is available
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
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
