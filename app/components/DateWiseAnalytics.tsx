'use client';

import React from 'react';
import { 
  Calendar, 
  TrendingUp, 
  Clock, 
  BarChart3, 
  Activity,
  Zap
} from 'lucide-react';

interface DailyData {
  date: string;
  interactions: number;
  successRate: number;
  avgResponseTime: number;
  modelUsage: Record<string, number>;
}

interface HourlyData {
  hour: string;
  interactions: number;
  avgResponseTime: number;
  successRate: number;
}

interface TrendsData {
  date: string;
  avgResponseTime: number;
  successRate: number;
  interactions: number;
}

interface DateWiseAnalyticsProps {
  dailyBreakdown: DailyData[];
  hourlyBreakdown: HourlyData[];
  performanceTrends: TrendsData[];
}

export default function DateWiseAnalytics({ 
  dailyBreakdown, 
  hourlyBreakdown, 
  performanceTrends 
}: DateWiseAnalyticsProps) {
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getMaxInteractions = (data: DailyData[] | HourlyData[] | TrendsData[]) => {
    return Math.max(...data.map(item => item.interactions || 0));
  };

  const getMaxResponseTime = (data: TrendsData[]) => {
    return Math.max(...data.map(item => item.avgResponseTime || 0));
  };

  return (
    <div className="space-y-8">
      {/* Daily Breakdown - Last 7 Days */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Daily Breakdown (Last 7 Days)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {dailyBreakdown.map((day) => (
            <div key={day.date} className="text-center">
              <div className="text-xs text-gray-500 mb-2">
                {formatDate(day.date)}
              </div>
              
              {/* Interactions Bar */}
              <div className="mb-3">
                <div className="text-sm font-medium text-gray-700 mb-1">
                  {day.interactions}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(day.interactions / getMaxInteractions(dailyBreakdown)) * 100}%` 
                    }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400 mt-1">Chats</div>
              </div>

              {/* Success Rate */}
              <div className="mb-3">
                <div className="text-sm font-medium text-green-600">
                  {day.successRate.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-400">Success</div>
              </div>

              {/* Response Time */}
              <div>
                <div className="text-sm font-medium text-purple-600">
                  {day.avgResponseTime}ms
                </div>
                <div className="text-xs text-gray-400">Avg Time</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Activity - Today */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
                            Today&apos;s Hourly Activity
        </h3>
        
        <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
          {hourlyBreakdown.map((hour) => {
            const maxInteractions = getMaxInteractions(hourlyBreakdown);
            const height = maxInteractions > 0 
              ? Math.max((hour.interactions / maxInteractions) * 100, 5) 
              : 5;
            
            return (
              <div key={hour.hour} className="text-center">
                <div className="mb-2 relative group">
                  <div 
                    className={`w-full rounded-t transition-all duration-300 ${
                      hour.interactions > 0 
                        ? 'bg-gradient-to-t from-blue-500 to-blue-400' 
                        : 'bg-gray-200'
                    }`}
                    style={{ height: `${height}px` }}
                  ></div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {hour.hour}: {hour.interactions} chats
                    <br />
                    {hour.avgResponseTime}ms avg
                    <br />
                    {hour.successRate.toFixed(1)}% success
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 transform -rotate-45 origin-center">
                  {hour.hour}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 text-xs text-gray-500 text-center">
          Hover over bars to see details
        </div>
      </div>

      {/* Performance Trends */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Performance Trends (Last 14 Days)
        </h3>
        
        <div className="space-y-6">
          {/* Response Time Trend */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Zap className="w-4 h-4 mr-1" />
              Average Response Time
            </h4>
            <div className="flex items-end space-x-1 h-20">
              {performanceTrends.map((trend) => {
                const maxTime = getMaxResponseTime(performanceTrends);
                const height = maxTime > 0 
                  ? Math.max((trend.avgResponseTime / maxTime) * 100, 5) 
                  : 5;
                
                return (
                  <div key={trend.date} className="flex-1 flex flex-col items-center group relative">
                    <div 
                      className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t transition-all duration-300"
                      style={{ height: `${height}%` }}
                    ></div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {formatDate(trend.date)}: {trend.avgResponseTime}ms
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Success Rate Trend */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Activity className="w-4 h-4 mr-1" />
              Success Rate
            </h4>
            <div className="flex items-end space-x-1 h-20">
              {performanceTrends.map((trend) => (
                <div key={`success-${trend.date}`} className="flex-1 flex flex-col items-center group relative">
                  <div 
                    className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t transition-all duration-300"
                    style={{ height: `${trend.successRate}%` }}
                  ></div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {formatDate(trend.date)}: {trend.successRate}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Interactions Trend */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <BarChart3 className="w-4 h-4 mr-1" />
              Daily Interactions
            </h4>
            <div className="flex items-end space-x-1 h-20">
              {performanceTrends.map((trend) => {
                const maxInteractions = getMaxInteractions(performanceTrends);
                const height = maxInteractions > 0 
                  ? Math.max((trend.interactions / maxInteractions) * 100, 5) 
                  : 5;
                
                return (
                  <div key={`interactions-${trend.date}`} className="flex-1 flex flex-col items-center group relative">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-300"
                      style={{ height: `${height}%` }}
                    ></div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {formatDate(trend.date)}: {trend.interactions} chats
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 text-center">
          Hover over charts to see detailed values
        </div>
      </div>
    </div>
  );
}
