'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-8">
          {user ? 'Quick access to campus features' : 'Explore campus features - Sign in for personalized experience'}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickAccessCard
            icon="🗺️"
            title="Campus Map"
            description="Explore buildings and rooms"
            href="/map"
            color="bg-blue-500"
          />
          <QuickAccessCard
            icon="📅"
            title="Events"
            description="Discover campus events"
            href="/events"
            color="bg-purple-500"
          />
          <QuickAccessCard
            icon="🚪"
            title="Room Availability"
            description="Find available spaces"
            href="/availability"
            color="bg-green-500"
          />
          <QuickAccessCard
            icon="👤"
            title={user ? "Profile" : "Sign In"}
            description={user ? "Manage your account" : "Login for more features"}
            href={user ? "/profile" : "/login"}
            color="bg-orange-500"
          />
        </div>

        {isAdmin && (
          <div className="mt-8 grid md:grid-cols-4 gap-6">
            <StatCard title="Total Users" value="156" change="+12%" color="bg-blue-500" />
            <StatCard title="Active Events" value="8" change="+3" color="bg-purple-500" />
            <StatCard title="Buildings" value="3" change="0" color="bg-green-500" />
            <StatCard title="Feedback" value="24" change="+5" color="bg-orange-500" />
          </div>
        )}
      </div>
    </div>
  );
}

function QuickAccessCard({ icon, title, description, href, color }: any) {
  return (
    <Link href={href}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardContent className="pt-6">
          <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl mb-4`}>
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

function StatCard({ title, value, change, color }: any) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-600">{title}</p>
          <span className="text-xs font-medium text-green-600">{change}</span>
        </div>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </CardContent>
    </Card>
  );
}
