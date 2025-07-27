'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  Clock, 
  TrendingUp, 
  Zap, 
  AlertCircle, 
  RefreshCw, 
  LogOut,
  Server,
  MessageSquare,
  Activity
} from 'lucide-react';
import { isAdminMode } from '@/lib/auth';
import DateWiseAnalytics from '@/app/components/DateWiseAnalytics';

interface AnalyticsData {
  summary: {
    totalInteractions: number;
    successRate: number;
    modelUsage: Record<string, number>;
    avgResponseTime: number;
    avgResponseTimesByModel: Record<string, number>;
    recentErrors: Array<{
      timestamp: string;
      model: string;
      responseTime: number;
      errorType?: string;
    }>;
  };
  performance: {
    last24Hours: {
      count: number;
      avgResponseTime: number;
      successRate: number;
    };
    last7Days: {
      count: number;
      avgResponseTime: number;
      successRate: number;
    };
  };
  dateWise: {
    dailyBreakdown: Array<{
      date: string;
      interactions: number;
      successRate: number;
      avgResponseTime: number;
      modelUsage: Record<string, number>;
    }>;
    hourlyBreakdown: Array<{
      hour: string;
      interactions: number;
      avgResponseTime: number;
      successRate: number;
    }>;
    performanceTrends: Array<{
      date: string;
      avgResponseTime: number;
      successRate: number;
      interactions: number;
    }>;
  };
}

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const router = useRouter();

  // Check admin access
  useEffect(() => {
    if (!isAdminMode()) {
      router.push('/admin/login');
      return;
    }
    fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('admin-token');
      const response = await fetch('/api/admin/analytics', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('admin-token');
        router.push('/admin/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const analyticsData = await response.json();
      setData(analyticsData);
      setLastUpdated(new Date());
    } catch (error) {
      setError('Failed to load analytics data');
      console.error('Analytics fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    router.push('/admin/login');
  };

  if (isLoading && !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchAnalytics}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-purple-600" />
                RahulAI Analytics
              </h1>
              <p className="text-sm text-gray-600">
                Last updated: {lastUpdated?.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchAnalytics}
                disabled={isLoading}
                className="flex items-center px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {data && (
          <>
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Interactions</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {data.summary.totalInteractions}
                    </p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  24h: {data.performance.last24Hours.count} | 7d: {data.performance.last7Days.count}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-green-600">
                      {data.summary.successRate.toFixed(1)}%
                    </p>
                  </div>
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  24h: {data.performance.last24Hours.successRate.toFixed(1)}%
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Response Time</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {data.summary.avgResponseTime}ms
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  24h: {Math.round(data.performance.last24Hours.avgResponseTime)}ms
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">System Status</p>
                    <p className="text-2xl font-bold text-green-600">Online</p>
                  </div>
                  <Activity className="w-8 h-8 text-green-600" />
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  All systems operational
                </div>
              </div>
            </div>

            {/* Model Usage & Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Model Usage */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Server className="w-5 h-5 mr-2" />
                  Model Usage
                </h3>
                <div className="space-y-3">
                  {Object.entries(data.summary.modelUsage).map(([model, count]) => {
                    const percentage = (count / data.summary.totalInteractions) * 100;
                    const modelName = model.split('/')[1]?.split(':')[0] || model;
                    
                    return (
                      <div key={model}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700 truncate">{modelName}</span>
                          <span className="text-gray-900 font-medium">{count} ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Model Performance */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Model Performance
                </h3>
                <div className="space-y-3">
                  {Object.entries(data.summary.avgResponseTimesByModel).map(([model, time]) => {
                    const modelName = model.split('/')[1]?.split(':')[0] || model;
                    const maxTime = Math.max(...Object.values(data.summary.avgResponseTimesByModel));
                    const percentage = (time / maxTime) * 100;
                    
                    return (
                      <div key={model}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700 truncate">{modelName}</span>
                          <span className="text-gray-900 font-medium">{Math.round(time)}ms</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              time < 3000 ? 'bg-green-500' : 
                              time < 5000 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Date-wise Analytics */}
            {data.dateWise && (
              <DateWiseAnalytics
                dailyBreakdown={data.dateWise.dailyBreakdown}
                hourlyBreakdown={data.dateWise.hourlyBreakdown}
                performanceTrends={data.dateWise.performanceTrends}
              />
            )}

            {/* Recent Errors */}
            {data.summary.recentErrors.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                  Recent Errors
                </h3>
                <div className="space-y-2">
                  {data.summary.recentErrors.slice(0, 5).map((error, index) => (
                    <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-red-800">
                            {error.errorType || 'Unknown Error'}
                          </p>
                          <p className="text-xs text-red-600">
                            Model: {error.model} • Response Time: {error.responseTime}ms
                          </p>
                        </div>
                        <span className="text-xs text-red-500">
                          {new Date(error.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
