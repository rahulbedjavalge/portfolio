import { NextRequest } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';

// Generate a secure JWT secret from environment or use a strong fallback
const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 
  'secure-jwt-secret-please-change-in-production-' + Date.now().toString(36)
);

// Admin credentials - MUST be set via environment variables in production
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD
};

// Validate that admin credentials are properly configured
function validateAdminSetup(): boolean {
  if (process.env.NODE_ENV === 'production') {
    return !!(ADMIN_CREDENTIALS.username && ADMIN_CREDENTIALS.password);
  }
  return true; // Allow defaults in development
}

export interface AdminSession {
  username: string;
  isAdmin: boolean;
  exp: number;
}

// Create admin JWT token
export async function createAdminToken(username: string): Promise<string> {
  return await new SignJWT({ username, isAdmin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .setIssuedAt()
    .sign(JWT_SECRET);
}

// Verify admin token
export async function verifyAdminToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    // Validate payload structure
    if (
      typeof payload.username === 'string' &&
      typeof payload.isAdmin === 'boolean' &&
      typeof payload.exp === 'number'
    ) {
      return {
        username: payload.username,
        isAdmin: payload.isAdmin,
        exp: payload.exp
      };
    }
    
    return null;
  } catch {
    return null;
  }
}

// Check admin credentials
export function validateAdminCredentials(username: string, password: string): boolean {
  // Ensure admin setup is valid
  if (!validateAdminSetup()) {
    console.error('Admin credentials not properly configured for production');
    return false;
  }

  // Use environment variables or secure defaults
  const validUsername = ADMIN_CREDENTIALS.username || 'admin';
  const validPassword = ADMIN_CREDENTIALS.password || 'change-me-in-production';

  return username === validUsername && password === validPassword;
}

// Extract token from request
export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('Authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Also check cookies
  return request.cookies.get('admin-token')?.value || null;
}

// Check if user is admin (for client-side)
export function isAdminMode(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check development mode
  if (process.env.NODE_ENV === 'development') return true;
  
  // Check if admin token exists
  return localStorage.getItem('admin-token') !== null;
}
