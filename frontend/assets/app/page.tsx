'use client';

import * as sdk from '../sdk/sdk.gen'
import Dashboard from '@/components/dashboard'

sdk.client.setConfig({
  baseUrl: "/api"
})

export default function Page() {
  return (
    <Dashboard></Dashboard>
  )
}