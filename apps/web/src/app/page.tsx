import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            🧭 CADT Compass
          </h1>
          <p className="text-2xl text-gray-700 mb-8">
            Your Smart Campus Navigation System
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Navigate CADT campus with ease. Find buildings, check room availability, 
            discover events, and explore campus facilities.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <Button className="px-8 py-6 text-lg">Get Started</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="px-8 py-6 text-lg">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Features
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Powerful features to enhance your campus experience
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon="🗺️"
              title="Interactive Map"
              description="Navigate buildings, rooms, and points of interest"
            />
            <FeatureCard
              icon="📅"
              title="Event Calendar"
              description="Stay updated with campus events and activities"
            />
            <FeatureCard
              icon="🚪"
              title="Room Availability"
              description="Check real-time room availability instantly"
            />
            <FeatureCard
              icon="♻️"
              title="Sustainability"
              description="Find recycling points and eco-friendly spaces"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
