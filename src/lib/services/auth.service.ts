import { Verify } from "crypto";
import apiClient from "../axios/api-client";
import {
  AcceptInvitation,
  ApiResponse,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  ResendOtpRequest,
  ResetPasswordRequest,
  VerifyTokenResponse,
  VerifyUserRequest,
} from "../types/auth.types";
import { clearAuthCookies, setAuthCookies } from "../utils/cookies";

class AuthService {
  private readonly basePath = "/auth";

  /**
   * User login
   * POST /auth/user-login
   */
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post(`${this.basePath}/login`, data);

    //store token in localstorage and cookies
    if (response.data.success && response) {
      console.log("Login response:", response.data);
      const { user, tokens } = response.data.data;

      if (user.role === "STORE_ADMIN") {
        console.log('sssss')
        if (user?.store?.isActive == false) {
        } else {
          tokens.userRole = user.role; // Add userRole to tokens for cookie storage
          localStorage.setItem("accessToken", tokens.accessToken);
          localStorage.setItem("refreshToken", tokens.refreshToken);
          localStorage.setItem("user", JSON.stringify(user));

          if (typeof window !== "undefined") {
            setAuthCookies(tokens);
          }
        }
      } else {
        tokens.userRole = user.role; // Add userRole to tokens for cookie storage
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        if (typeof window !== "undefined") {
          setAuthCookies(tokens);
        }
      }
    }
    return response.data;
  }

  /**
   * Request password reset (send OTP)
   * POST /auth/forgot-password
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse> {
    const response = await apiClient.post(
      `${this.basePath}/forgot-password`,
      data
    );
    return response.data;
  }

  /**
   * Verify OTP for password reset
   * POST /auth/verify-forgot-password-otp
   */

  async verifyForgotPasswordOtp(data: VerifyUserRequest): Promise<ApiResponse> {
    const response = await apiClient.post(
      `${this.basePath}/verify-forgot-password-otp`,
      data
    );
    return response.data;
  }

  /**
   * Reset password
   * POST /auth/reset-password
   */
  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse> {
    const response = await apiClient.post(
      `${this.basePath}/reset-password`,
      data
    );
    return response.data;
  }

  /**
   * Resend verification OTP
   * POST /auth/resend-verification-otp
   */
  async resendOtp(data: ResendOtpRequest): Promise<ApiResponse> {
    const response = await apiClient.post(`${this.basePath}/resend-otp`, data);
    return response.data;
  }

  /**
   * Refresh JWT access token
   * POST /auth/refresh-token
   */
  async refreshToken(data: RefreshTokenRequest): Promise<ApiResponse> {
    const response = await apiClient.post(
      `${this.basePath}/refresh-token`,
      data
    );

    // Update tokens in localStorage on successful refresh
    if (response.data.success && response.data.data?.tokens) {
      const { tokens } = response.data.data;

      if (typeof window !== "undefined") {
        // Update localStorage
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);

        // Update cookies
        setAuthCookies(tokens);
      }
    }

    return response.data;
  }

  /**
   * Social login (Google/LinkedIn/Apple)
   * POST /auth/{provider}/login
   */
  async socialLogin(
    provider: "google" | "linkedin" | "apple",
    data: { email: string; providerId: string; idToken: string }
  ): Promise<ApiResponse<LoginResponse>> {
    console.log("Social login data:", data);
    const response = await apiClient.post(
      `${this.basePath}/${provider}/login`,
      data
    );

    // Store tokens/user same as regular login
    if (response.data.success && response.data) {
      const { tokens, user } = response.data.data;
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
        localStorage.setItem("user", JSON.stringify(user));
        tokens.userRole = user.role; // Add userRole to tokens for cookie storage
        setAuthCookies(tokens);
      }
    }

    return response.data;
  }

  /**
   * User logout
   * POST /auth/logout
   */
  async logout(): Promise<ApiResponse> {
    const response = await apiClient.post(`${this.basePath}/logout`);

    // Clear tokens and user data from localStorage on logout
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // Clear cookies
      clearAuthCookies();
    }

    return response.data;
  }

  async verifyToken(token: string): Promise<ApiResponse<VerifyTokenResponse>> {
    const response = await apiClient.get(
      `${this.basePath}/invitations/validate/${token}`
    );
    return response.data;
  }

  async acceptInvitation(data: AcceptInvitation): Promise<ApiResponse> {
    const response = await apiClient.post(
      `${this.basePath}/invitations/accept`,
      data
    );
    return response.data;
  }

  
  async createSallaConnectUrl(data: any): Promise<ApiResponse<{ url: string }>> {
    const response = await apiClient.post(`${this.basePath}/salla/connect`, data);
    return response.data;
  }
  /**
   * Get current user from localStorage
   */
  getCurrentUser() {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      return !!token;
    }
    return false;
  }

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken");
    }
    return null;
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("refreshToken");
    }
    return null;
  }
}

export const authService = new AuthService();
export default authService;
