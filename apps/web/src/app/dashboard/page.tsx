'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';
import { Map, Calendar, DoorOpen, User, Users, Building2, MessageSquare, ArrowRight, Compass } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3 flex items-center gap-3">
            {user ? (
              <>
                <span>Welcome back, {user.name}!</span>
                <Compass className="w-12 h-12 text-blue-600" />
              </>
            ) : (
              <>
                <span>Welcome to CADT Compass</span>
                <Compass className="w-12 h-12 text-blue-600" />
              </>
            )}
          </h1>
          <p className="text-gray-600 text-lg">
            {user ? 'Quick access to campus features' : 'Explore campus features - Sign in for personalized experience'}
          </p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <QuickAccessCard
            icon={Map}
            title="Campus Map"
            description="Explore buildings and rooms"
            href="/map"
            gradient="from-blue-500 to-cyan-500"
          />
          <QuickAccessCard
            icon={Calendar}
            title="Events"
            description="Discover campus events"
            href="/events"
            gradient="from-purple-500 to-pink-500"
          />
          <QuickAccessCard
            icon={DoorOpen}
            title="Room Availability"
            description="Find available spaces"
            href="/availability"
            gradient="from-green-500 to-emerald-500"
          />
          <QuickAccessCard
            icon={User}
            title={user ? "Profile" : "Sign In"}
            description={user ? "Manage your account" : "Login for more features"}
            href={user ? "/profile" : "/login"}
            gradient="from-orange-500 to-red-500"
          />
        </div>

        {isAdmin && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span>Admin Overview</span>
              <Users className="w-6 h-6 text-blue-600" />
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <StatCard title="Total Users" value="156" change="+12%" positive={true} icon={Users} gradient="from-blue-500 to-cyan-500" />
              <StatCard title="Active Events" value="8" change="+3" positive={true} icon={Calendar} gradient="from-purple-500 to-pink-500" />
              <StatCard title="Buildings" value="3" change="0" positive={null} icon={Building2} gradient="from-green-500 to-emerald-500" />
              <StatCard title="Feedback" value="24" change="+5" positive={true} icon={MessageSquare} gradient="from-orange-500 to-red-500" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function QuickAccessCard({ icon: Icon, title, description, href, gradient }: any) {
  return (
    <Link href={href}>
      <Card className="group hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm overflow-hidden h-full">
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`}></div>
        <CardContent className="pt-8 pb-6">
          <div className={`bg-gradient-to-br ${gradient} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
            <Icon className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
          <div className="mt-4 text-blue-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
            <span>Explore</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function StatCard({ title, value, change, positive, icon: Icon, gradient }: any) {
  return (
    <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`}></div>
      <CardContent className="pt-8 pb-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`bg-gradient-to-br ${gradient} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md`}>
            <Icon className="w-6 h-6" />
          </div>
          {change !== "0" && (
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              positive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
            }`}>
              {change}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </CardContent>
    </Card>
  );
}
