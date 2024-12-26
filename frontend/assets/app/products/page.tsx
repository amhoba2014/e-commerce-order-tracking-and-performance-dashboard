'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Pagination } from '@mui/material';
import * as sdk from '@/sdk/sdk.gen';
import { Product, PaginatedProductsResponse } from '@/sdk/types.gen';

sdk.client.setConfig({
  baseUrl: "/api"
});

const page_size = 5

export default function ProductsPage() {
  const [products, setProducts] = useState<PaginatedProductsResponse | null>(null);
  const [page, setPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track the total number of pages

  const fetchProducts = async () => {
    try {
      const response = await sdk.defaultReadProducts({ query: { page, size: page_size } });
      setProducts(response.data ?? null);

      // Set the total number of pages based on the total count returned from the backend
      setTotalPages(response.data ? Math.ceil(response.data.total / page_size) : 1); // Assuming the backend returns total count
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts(null); // Default to an empty array if fetch fails
    }
  };

  // useEffect to fetch products on page change and every 5 seconds
  useEffect(() => {
    // Fetch products immediately when page changes
    fetchProducts();

    // Set up interval to fetch products every 5 seconds
    const intervalId = setInterval(fetchProducts, 5000);

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
              products.results.map((product) => (
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
