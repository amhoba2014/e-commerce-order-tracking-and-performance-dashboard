import { AppBar, Toolbar, Typography, Card, CardContent } from '@mui/material';

export default function MainContent({ children }: any) {
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
        {children}
      </div>
    </div>
  )
}