'use client';

import * as sdk from '../sdk/sdk.gen'

sdk.client.setConfig({
  baseUrl: "/api"
})

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      Just a test.
      <button onClick={async () => {
        const request = await sdk.readRootGet()
        console.log(request.data)
      }}>kjkjhj</button>
    </main>
  );
}
