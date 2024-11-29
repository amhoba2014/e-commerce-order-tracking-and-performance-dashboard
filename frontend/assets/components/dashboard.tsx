import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Card, CardContent } from '@mui/material';
import Sidebar from './sidebar'

export default function Dashboard() {
  const [data, setData] = useState(null);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar></Sidebar>

      {/* Main Content */}
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        <div style={{ padding: '24px' }}>
          <Card style={{ marginBottom: '16px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Widget 1
              </Typography>
              {data ? (
                <Typography>{JSON.stringify(data, null, 2)}</Typography>
              ) : (
                <Typography>No data available</Typography>
              )}
            </CardContent>
          </Card>

          <Card style={{ marginBottom: '16px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Widget 2
              </Typography>
              <Typography>Placeholder content for Widget 2.</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Widget 3
              </Typography>
              <Typography>Placeholder content for Widget 3.</Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
