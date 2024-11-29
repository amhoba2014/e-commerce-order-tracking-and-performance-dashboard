import { AppBar, Toolbar, Typography, Card, CardContent } from '@mui/material';

export default function MainContent() {
  return (
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
  )
}