import React, { useState } from 'react';
import Sidebar from './sidebar'
import MainContent from './main_content'

export default function Dashboard({ children }: any) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar></Sidebar>
      <MainContent>{children}</MainContent>
    </div>
  );
}
