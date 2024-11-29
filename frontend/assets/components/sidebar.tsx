import React from 'react'
import { Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import TableChartIcon from '@mui/icons-material/TableChart'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import ViewInArIcon from '@mui/icons-material/ViewInAr'
import LanguageIcon from '@mui/icons-material/Language'
import PersonIcon from '@mui/icons-material/Person'
import LoginIcon from '@mui/icons-material/Login'
import HowToRegIcon from '@mui/icons-material/HowToReg'

export default function Sidebar() {
  return (
    <div style={{
      width: '250px',
      height: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '16px',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)'
    }}>
      <Typography variant="h6" style={{
        marginBottom: '16px',
        fontWeight: 'bold',
        color: '#343a40'
      }}>
        Argon Dashboard 2 PRO
      </Typography>

      <List>
        <ListItem component="div" style={{ borderRadius: '8px', backgroundColor: '#e9ecef' }}>
          <ListItemIcon><DashboardIcon style={{ color: '#6c757d' }} /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem component="div" style={{ borderRadius: '8px' }}>
          <ListItemIcon><TableChartIcon style={{ color: '#6c757d' }} /></ListItemIcon>
          <ListItemText primary="Tables" />
        </ListItem>

        <ListItem component="div" style={{ borderRadius: '8px' }}>
          <ListItemIcon><CreditCardIcon style={{ color: '#6c757d' }} /></ListItemIcon>
          <ListItemText primary="Billing" />
        </ListItem>

        <ListItem component="div" style={{ borderRadius: '8px' }}>
          <ListItemIcon><ViewInArIcon style={{ color: '#6c757d' }} /></ListItemIcon>
          <ListItemText primary="Virtual Reality" />
        </ListItem>

        <ListItem component="div" style={{ borderRadius: '8px' }}>
          <ListItemIcon><LanguageIcon style={{ color: '#6c757d' }} /></ListItemIcon>
          <ListItemText primary="RTL" />
        </ListItem>
      </List>

      <Divider style={{ margin: '16px 0' }} />

      <Typography variant="subtitle2" style={{
        marginBottom: '8px',
        fontWeight: 'bold',
        color: '#6c757d',
        textTransform: 'uppercase'
      }}>
        Account Pages
      </Typography>

      <List>
        <ListItem component="div" style={{ borderRadius: '8px' }}>
          <ListItemIcon><PersonIcon style={{ color: '#6c757d' }} /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>

        <ListItem component="div" style={{ borderRadius: '8px' }}>
          <ListItemIcon><LoginIcon style={{ color: '#6c757d' }} /></ListItemIcon>
          <ListItemText primary="Sign In" />
        </ListItem>

        <ListItem component="div" style={{ borderRadius: '8px' }}>
          <ListItemIcon><HowToRegIcon style={{ color: '#6c757d' }} /></ListItemIcon>
          <ListItemText primary="Sign Up" />
        </ListItem>
      </List>
    </div>
  )
}
