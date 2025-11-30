import Link from 'next/link';
import Image from 'next/image';
import { Link as LinkIcon, BookOpen, Home, Map, Calendar, DoorOpen, Info, HelpCircle, Shield, FileText, MapPin, Phone, Mail, Globe, Heart, ChevronRight, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white mt-auto">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="CADT Compass Logo" 
                width={75} 
                height={75}
                className="object-contain"
              />
              <span className="text-xl font-bold">CADT Compass</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your smart campus navigation system. Navigate CADT campus with ease and discover all its facilities.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <LinkIcon className="w-5 h-5" />
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Campus Map</span>
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Events</span>
                </Link>
              </li>
              <li>
                <Link href="/availability" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Room Availability</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span>Resources</span>
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>About CADT</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Help Center</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Privacy Policy</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Terms of Service</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span>Contact</span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-300">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>National Road 6A, Prek Leap, Chroy Changvar, Phnom Penh</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Phone className="w-5 h-5" />
                <a href="tel:+85523900054" className="hover:text-white transition-colors">
                  +855 23 900 054
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Mail className="w-5 h-5" />
                <a href="mailto:info@cadt.edu.kh" className="hover:text-white transition-colors">
                  info@cadt.edu.kh
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Globe className="w-5 h-5" />
                <a href="https://www.cadt.edu.kh" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  www.cadt.edu.kh
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} CADT Compass. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>by CADT Students</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
