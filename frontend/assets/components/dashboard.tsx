import React, { useState } from 'react';
import Sidebar from './sidebar'
import MainContent from './main_content'

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar></Sidebar>
      <MainContent></MainContent>
    </div>
  );
}
