interface ChatAnalytics {
  timestamp: string;
  model: string;
  responseTime: number;
  success: boolean;
  messageLength: number;
  errorType?: string;
  userAgent?: string;
}

class ChatAnalyticsService {
  private events: ChatAnalytics[] = [];
  private readonly maxEvents = 1000; // Keep last 1000 events in memory

  // Track AI chat interaction
  trackChatInteraction(data: {
    model: string;
    responseTime: number;
    success: boolean;
    messageLength: number;
    errorType?: string;
  }) {
    const analytics: ChatAnalytics = {
      timestamp: new Date().toISOString(),
      model: data.model,
      responseTime: data.responseTime,
      success: data.success,
      messageLength: data.messageLength,
      errorType: data.errorType,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server'
    };

    this.events.push(analytics);
    
    // Keep only recent events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }

    // Log to console for development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Chat Analytics:', analytics);
    }

    // Send to local storage for persistence
    this.saveToLocalStorage();
  }

  // Get analytics summary
  getAnalyticsSummary() {
    const totalInteractions = this.events.length;
    if (totalInteractions === 0) {
      return {
        totalInteractions: 0,
        successRate: 0,
        modelUsage: {},
        avgResponseTime: 0,
        avgResponseTimesByModel: {},
        recentErrors: []
      };
    }

    const successRate = (this.events.filter(e => e.success).length / totalInteractions) * 100;
    
    const modelUsage = this.events.reduce((acc, event) => {
      acc[event.model] = (acc[event.model] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const avgResponseTime = this.events.reduce((sum, event) => sum + event.responseTime, 0) / totalInteractions;

    const responseTimesByModel = this.events.reduce((acc, event) => {
      if (!acc[event.model]) acc[event.model] = [];
      acc[event.model].push(event.responseTime);
      return acc;
    }, {} as Record<string, number[]>);

    const avgResponseTimesByModel = Object.entries(responseTimesByModel).reduce((acc, [model, times]) => {
      acc[model] = times.reduce((sum, time) => sum + time, 0) / times.length;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalInteractions,
      successRate: Math.round(successRate * 100) / 100,
      modelUsage,
      avgResponseTime: Math.round(avgResponseTime),
      avgResponseTimesByModel,
      recentErrors: this.events.filter(e => !e.success).slice(-5)
    };
  }

  // Save to localStorage for persistence
  private saveToLocalStorage() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('rahulai_chat_analytics', JSON.stringify(this.events.slice(-100))); // Keep last 100
      } catch (error) {
        console.warn('Failed to save analytics to localStorage:', error);
      }
    }
  }

  // Load from localStorage
  loadFromLocalStorage() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('rahulai_chat_analytics');
        if (stored) {
          this.events = JSON.parse(stored);
        }
      } catch (error) {
        console.warn('Failed to load analytics from localStorage:', error);
      }
    }
  }

  // Get recent performance metrics
  getRecentPerformance(hours: number = 24) {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    const recentEvents = this.events.filter(e => new Date(e.timestamp) > cutoff);
    
    if (recentEvents.length === 0) {
      return {
        count: 0,
        avgResponseTime: 0,
        successRate: 0
      };
    }

    return {
      count: recentEvents.length,
      avgResponseTime: recentEvents.reduce((sum, e) => sum + e.responseTime, 0) / recentEvents.length,
      successRate: (recentEvents.filter(e => e.success).length / recentEvents.length) * 100
    };
  }

  // Get all events for admin access
  getAllEvents(): ChatAnalytics[] {
    return [...this.events];
  }

  // Get analytics by date range
  getAnalyticsByDateRange(startDate: Date, endDate: Date) {
    const filteredEvents = this.events.filter(event => {
      const eventDate = new Date(event.timestamp);
      return eventDate >= startDate && eventDate <= endDate;
    });

    return this.calculateMetrics(filteredEvents);
  }

  // Get daily breakdown for a date range
  getDailyBreakdown(days: number = 7) {
    const today = new Date();
    const breakdown: Array<{
      date: string;
      interactions: number;
      successRate: number;
      avgResponseTime: number;
      modelUsage: Record<string, number>;
    }> = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const dayEvents = this.events.filter(event => {
        const eventDate = new Date(event.timestamp);
        return eventDate >= date && eventDate < nextDate;
      });

      const metrics = this.calculateMetrics(dayEvents);
      
      breakdown.push({
        date: date.toISOString().split('T')[0], // YYYY-MM-DD format
        interactions: dayEvents.length,
        successRate: metrics.successRate,
        avgResponseTime: metrics.avgResponseTime,
        modelUsage: metrics.modelUsage
      });
    }

    return breakdown;
  }

  // Get hourly breakdown for today
  getHourlyBreakdown() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const breakdown: Array<{
      hour: string;
      interactions: number;
      avgResponseTime: number;
      successRate: number;
    }> = [];

    for (let hour = 0; hour < 24; hour++) {
      const hourStart = new Date(today);
      hourStart.setHours(hour);
      const hourEnd = new Date(today);
      hourEnd.setHours(hour + 1);

      const hourEvents = this.events.filter(event => {
        const eventDate = new Date(event.timestamp);
        return eventDate >= hourStart && eventDate < hourEnd;
      });

      const metrics = this.calculateMetrics(hourEvents);
      
      breakdown.push({
        hour: `${hour.toString().padStart(2, '0')}:00`,
        interactions: hourEvents.length,
        avgResponseTime: metrics.avgResponseTime,
        successRate: metrics.successRate
      });
    }

    return breakdown;
  }

  // Helper method to calculate metrics for any event array
  private calculateMetrics(events: ChatAnalytics[]) {
    if (events.length === 0) {
      return {
        totalInteractions: 0,
        successRate: 0,
        modelUsage: {},
        avgResponseTime: 0,
        avgResponseTimesByModel: {},
        recentErrors: []
      };
    }

    const successRate = (events.filter(e => e.success).length / events.length) * 100;
    
    const modelUsage = events.reduce((acc, event) => {
      acc[event.model] = (acc[event.model] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const avgResponseTime = events.reduce((sum, event) => sum + event.responseTime, 0) / events.length;

    const responseTimesByModel = events.reduce((acc, event) => {
      if (!acc[event.model]) acc[event.model] = [];
      acc[event.model].push(event.responseTime);
      return acc;
    }, {} as Record<string, number[]>);

    const avgResponseTimesByModel = Object.entries(responseTimesByModel).reduce((acc, [model, times]) => {
      acc[model] = times.reduce((sum, time) => sum + time, 0) / times.length;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalInteractions: events.length,
      successRate: Math.round(successRate * 100) / 100,
      modelUsage,
      avgResponseTime: Math.round(avgResponseTime),
      avgResponseTimesByModel,
      recentErrors: events.filter(e => !e.success).slice(-5)
    };
  }

  // Get performance trends
  getPerformanceTrends(days: number = 30) {
    const trends: Array<{
      date: string;
      avgResponseTime: number;
      successRate: number;
      interactions: number;
    }> = [];

    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const dayEvents = this.events.filter(event => {
        const eventDate = new Date(event.timestamp);
        return eventDate >= date && eventDate < nextDate;
      });

      const successfulEvents = dayEvents.filter(e => e.success);
      const avgResponseTime = dayEvents.length > 0 
        ? dayEvents.reduce((sum, e) => sum + e.responseTime, 0) / dayEvents.length 
        : 0;
      const successRate = dayEvents.length > 0 
        ? (successfulEvents.length / dayEvents.length) * 100 
        : 0;

      trends.push({
        date: date.toISOString().split('T')[0],
        avgResponseTime: Math.round(avgResponseTime),
        successRate: Math.round(successRate * 100) / 100,
        interactions: dayEvents.length
      });
    }

    return trends;
  }
}

// Create singleton instance
export const chatAnalytics = new ChatAnalyticsService();

// Analytics hook for React components
export const useChatAnalytics = () => {
  return {
    track: chatAnalytics.trackChatInteraction.bind(chatAnalytics),
    getSummary: chatAnalytics.getAnalyticsSummary.bind(chatAnalytics),
    getRecentPerformance: chatAnalytics.getRecentPerformance.bind(chatAnalytics)
  };
};
