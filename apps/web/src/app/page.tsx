import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="text-8xl">🧭</span>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            CADT Compass
          </h1>
          <p className="text-2xl text-gray-700 mb-8 font-medium">
            Your Smart Campus Navigation System
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Navigate CADT campus with ease. Find buildings, check room availability, 
            discover events, and explore campus facilities.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <Button className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg">
                Get Started
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="px-8 py-6 text-lg shadow-lg hover:bg-white">
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
              emoji="🗺️"
              color="bg-blue-500"
              title="Interactive Map"
              description="Navigate buildings, rooms, and points of interest"
            />
            <FeatureCard
              emoji="📅"
              color="bg-purple-500"
              title="Event Calendar"
              description="Stay updated with campus events and activities"
            />
            <FeatureCard
              emoji="🚪"
              color="bg-green-500"
              title="Room Availability"
              description="Check real-time room availability instantly"
            />
            <FeatureCard
              emoji="♻️"
              color="bg-emerald-500"
              title="Sustainability"
              description="Find recycling points and eco-friendly spaces"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-white rounded-2xl shadow-xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to explore CADT?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Join hundreds of students already using CADT Compass to navigate campus efficiently.
          </p>
          <Link href="/register">
            <Button className="px-10 py-6 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg">
              Get Started Now →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ emoji, color, title, description }: { 
  emoji: string; 
  color: string;
  title: string; 
  description: string;
}) {
  return (
    <Card className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-gray-100">
      <CardContent className="pt-6 text-center">
        <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg`}>
          {emoji}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
