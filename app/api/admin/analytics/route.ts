import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest, verifyAdminToken } from '@/lib/auth';
import { chatAnalytics } from '@/lib/analytics';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = getTokenFromRequest(request);
    
    if (!token) {
      return NextResponse.json(
        { error: 'No authentication token provided' },
        { status: 401 }
      );
    }

    const session = await verifyAdminToken(token);
    
    if (!session || !session.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 403 }
      );
    }

    // Get comprehensive analytics
    const summary = chatAnalytics.getAnalyticsSummary();
    const recent24h = chatAnalytics.getRecentPerformance(24);
    const recent7d = chatAnalytics.getRecentPerformance(24 * 7);
    
    // Get date-wise analytics
    const dailyBreakdown = chatAnalytics.getDailyBreakdown(7); // Last 7 days
    const hourlyBreakdown = chatAnalytics.getHourlyBreakdown(); // Today's hourly data
    const performanceTrends = chatAnalytics.getPerformanceTrends(14); // Last 14 days trends

    return NextResponse.json({
      summary,
      performance: {
        last24Hours: recent24h,
        last7Days: recent7d
      },
      dateWise: {
        dailyBreakdown,
        hourlyBreakdown,
        performanceTrends
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Admin analytics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
