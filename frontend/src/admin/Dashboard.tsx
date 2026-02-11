import { useEffect, useState } from 'react';
import {
  Calendar,
  Car,
  MapPin,
  BookOpen,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';
import { dashboardAPI } from '../services/api';
import type { DashboardStats } from '../types';

const statCards = [
  { key: 'events', label: 'Total Events', icon: Calendar, color: 'bg-blue-500' },
  { key: 'cars', label: 'Cars Available', icon: Car, color: 'bg-green-500' },
  { key: 'tours', label: 'Tour Packages', icon: MapPin, color: 'bg-purple-500' },
  { key: 'bookings', label: 'Total Bookings', icon: BookOpen, color: 'bg-[#f9dc4a]' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await dashboardAPI.getStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#f9dc4a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1
          className="text-3xl font-bold text-black"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome back! Here's what's happening with your business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          const value = stats?.counts[card.key as keyof typeof stats.counts] || 0;
          return (
            <div
              key={card.key}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{card.label}</p>
                  <p
                    className="text-3xl font-bold text-black mt-2"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {value}
                  </p>
                </div>
                <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Stats */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Booking Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3
            className="text-lg font-semibold text-black mb-6"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Booking Status
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Pending', value: stats?.bookings.pending || 0, color: 'bg-yellow-500' },
              { label: 'Confirmed', value: stats?.bookings.confirmed || 0, color: 'bg-blue-500' },
              { label: 'Completed', value: stats?.bookings.completed || 0, color: 'bg-green-500' },
              { label: 'Cancelled', value: stats?.bookings.cancelled || 0, color: 'bg-red-500' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="flex-1 text-sm text-gray-600">{item.label}</span>
                <span
                  className="font-semibold text-black"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3
            className="text-lg font-semibold text-black mb-6"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Recent Bookings
          </h3>
          <div className="space-y-4">
            {stats?.recent.bookings && stats.recent.bookings.length > 0 ? (
              stats.recent.bookings.slice(0, 5).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-10 h-10 rounded-full bg-[#f9dc4a] flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-black" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black truncate">
                      {booking.customer_name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {booking.booking_type} • {booking.status}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(booking.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No recent bookings</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3
            className="text-lg font-semibold text-black"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Recent Messages
          </h3>
          <span className="text-sm text-gray-500">
            {stats?.counts.messages || 0} total messages
          </span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats?.recent.messages && stats.recent.messages.length > 0 ? (
            stats.recent.messages.slice(0, 6).map((message) => (
              <div
                key={message.id}
                className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black truncate">
                      {message.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {message.subject || 'No subject'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(message.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {message.status === 'unread' && (
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No recent messages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
