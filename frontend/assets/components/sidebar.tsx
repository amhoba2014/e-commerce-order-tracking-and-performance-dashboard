import React from 'react'
import Link from 'next/link'
import { Typography, List, ListItem, ListItemIcon, ListItemText, Divider, ButtonBase } from '@mui/material'
import { styled } from '@mui/material/styles'
import DashboardIcon from '@mui/icons-material/Dashboard'
import TableChartIcon from '@mui/icons-material/TableChart'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import ViewInArIcon from '@mui/icons-material/ViewInAr'
import LanguageIcon from '@mui/icons-material/Language'
import PersonIcon from '@mui/icons-material/Person'
import LoginIcon from '@mui/icons-material/Login'
import HowToRegIcon from '@mui/icons-material/HowToReg'

// Define a styled button with hover effects
const SidebarButton = styled(ButtonBase)(({ theme }) => ({
  width: '100%',
  borderRadius: '8px',
  padding: '10px 16px',
  textAlign: 'left',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  color: '#6c757d',
  textTransform: 'none',
  fontWeight: 400,
  transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#e9ecef',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    color: '#495057'
  }
}))

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
        ECommerce Dashboard
      </Typography>

      <List>
        <Link href={"/orders"}>
          <ListItem disablePadding>
            <SidebarButton>
              <ListItemIcon><DashboardIcon style={{ color: '#6c757d' }} /></ListItemIcon>
              <ListItemText primary="Orders" />
            </SidebarButton>
          </ListItem>
        </Link>

        {/* <ListItem disablePadding>
          <SidebarButton onClick={() => handleNavigation('/tables')}>
            <ListItemIcon><TableChartIcon style={{ color: '#6c757d' }} /></ListItemIcon>
            <ListItemText primary="Tables" />
          </SidebarButton>
        </ListItem>

        <ListItem disablePadding>
          <SidebarButton onClick={() => handleNavigation('/billing')}>
            <ListItemIcon><CreditCardIcon style={{ color: '#6c757d' }} /></ListItemIcon>
            <ListItemText primary="Billing" />
          </SidebarButton>
        </ListItem>

        <ListItem disablePadding>
          <SidebarButton onClick={() => handleNavigation('/virtual-reality')}>
            <ListItemIcon><ViewInArIcon style={{ color: '#6c757d' }} /></ListItemIcon>
            <ListItemText primary="Virtual Reality" />
          </SidebarButton>
        </ListItem>

        <ListItem disablePadding>
          <SidebarButton onClick={() => handleNavigation('/rtl')}>
            <ListItemIcon><LanguageIcon style={{ color: '#6c757d' }} /></ListItemIcon>
            <ListItemText primary="RTL" />
          </SidebarButton>
        </ListItem> */}
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
        <ListItem disablePadding>
          <SidebarButton>
            <ListItemIcon><PersonIcon style={{ color: '#6c757d' }} /></ListItemIcon>
            <ListItemText primary="Profile" />
          </SidebarButton>
        </ListItem>

        <ListItem disablePadding>
          <SidebarButton>
            <ListItemIcon><LoginIcon style={{ color: '#6c757d' }} /></ListItemIcon>
            <ListItemText primary="Sign In" />
          </SidebarButton>
        </ListItem>

        <ListItem disablePadding>
          <SidebarButton>
            <ListItemIcon><HowToRegIcon style={{ color: '#6c757d' }} /></ListItemIcon>
            <ListItemText primary="Sign Up" />
          </SidebarButton>
        </ListItem>
      </List>
    </div>
  )
}
