// Base API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  timestamp: string;
}

export interface ApiError {
  success: false;
  error: {
    type: string;
    code: string;
    message: string;
    statusCode: number;
    timestamp: string;
    requestId: string;
    details?: Record<string, unknown>;
    stack?: string;
  };
  meta: {
    path: string;
    method: string;
    userAgent: string;
    ip: string;
  };
}

// Auth-related types
export interface User {
  id: string;
  email: string;
  fullName: string;
  username: string;
  role: "SENDER" | "RECEIVER" | "ADMIN";
  createdAt: string;
}

export interface Session {
  id: string;
  expiresAt: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
}

export interface LoginResponse {
  user: User;
  session: Session;
  tokens: Tokens;
}

// Auth Request Types
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface VerifyUserRequest {
  email: string;
  otp: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyOtpRequest {
  otp: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ResendOtpRequest {
  email: string;
  type:
    | "EMAIL_VERIFICATION"
    | "PASSWORD_RESET"
    | "TWO_FACTOR_AUTH"
    | "PHONE_VERIFICATION";
}

export interface AcceptInvitation {
  token: string;
  password: string;
  fullName: string;
  firstName: string;
  lastName: string;
  phone: string;
}


export interface VerifyTokenResponse {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  storeName?: string;
  token?: string;
}

export interface VerifyTokenApiResponse {
  data: {
    invitation: VerifyTokenResponse;
  };
}