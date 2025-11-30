'use client';

import { useAuthStore } from '@/stores/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DebugPage() {
  const { user, token, isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Debug Information</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Authenticated:</span>
                  <span className={isAuthenticated ? 'text-green-600' : 'text-red-600'}>
                    {isAuthenticated ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Has Token:</span>
                  <span className={token ? 'text-green-600' : 'text-red-600'}>
                    {token ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent>
              {user ? (
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                  {JSON.stringify(user, null, 2)}
                </pre>
              ) : (
                <p className="text-gray-500">No user data available</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Environment Variables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">API URL:</span>
                  <span className="text-gray-700">{process.env.NEXT_PUBLIC_API_URL || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Google Client ID:</span>
                  <span className="text-gray-700">
                    {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? 'Set' : 'Not set'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Token (First 50 chars)</CardTitle>
            </CardHeader>
            <CardContent>
              {token ? (
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-xs">
                  {token.substring(0, 50)}...
                </pre>
              ) : (
                <p className="text-gray-500">No token available</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
