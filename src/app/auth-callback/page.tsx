"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { authService } from "@/lib/services/auth.service";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { setUser, setTokens } from "@/store/slices/userSlice";
import ApiErrorHandler from "@/lib/utils/error-handler";

export default function AuthCallbackPage() {
  const { data: session, status } = useSession();
  // console.log("Session data:", session);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status === "loading") return;
    (async () => {
      if (!session) {
        toast.error("SSO failed or cancelled");
        router.push("/login");
        return;
      }

      // Extract provider info from session
      const provider = (session as unknown as Record<string, unknown>)[
        "provider"
      ] as string | undefined;
      const providerId =
        ((session as unknown as Record<string, unknown>)[
          "providerAccountId"
        ] as string | undefined) ||
        (session.user &&
          ((session.user as Record<string, unknown>)["id"] as
            | string
            | undefined));
      const idToken = (session as unknown as Record<string, unknown>)[
        "idToken"
      ] as string;
      const email = session.user?.email || "";

      if (!provider || !providerId || !email) {
        toast.error("Missing SSO profile data");
        router.push("/login");
        return;
      }

      try {
        // Try login first
        const resp = await authService.socialLogin(
          provider as "google" | "linkedin" | "apple",
          { email, providerId, idToken }
        );
        if (resp.success && resp.data) {
          const { user, tokens } = resp.data;
          dispatch(setUser(user));
          dispatch(
            setTokens({
              accessToken: tokens?.accessToken ?? null,
              refreshToken: tokens?.refreshToken ?? null,
              accessTokenExpiresAt: tokens?.accessTokenExpiresAt ?? null,
              refreshTokenExpiresAt: tokens?.refreshTokenExpiresAt ?? null,
            })
          );
          toast.success(resp.message || "Logged in");
          const role = (user?.role as string | undefined) || "RECEIVER";
          if (role === "SENDER") router.push("/dashboard/sender");
          else if (role === "RECEIVER") router.push("/dashboard/receiver");
          else if (role === "ADMIN") router.push("/dashboard/admin");
          else router.push("/dashboard");
          return;
        }
        console.log("SSO login failed, response:", resp);
        // // If login failed, attempt register
        // const regResp = await authService.socialRegister(provider as 'google' | 'linkedin' | 'apple', {
        //   idToken,
        //   email,
        //   providerId,
        //   fullName,
        // });
        // if (regResp.success && regResp.data) {
        //   const { user, tokens } = regResp.data;
        //   dispatch(setUser(user));
        //   dispatch(setTokens({
        //     accessToken: tokens?.accessToken ?? null,
        //     refreshToken: tokens?.refreshToken ?? null,
        //     accessTokenExpiresAt: tokens?.accessTokenExpiresAt ?? null,
        //     refreshTokenExpiresAt: tokens?.refreshTokenExpiresAt ?? null,
        //   }));
        //   toast.success(regResp.message || 'Account created via SSO');
        //   const role = (user?.role as string | undefined) || 'RECEIVER';
        //   if (role === 'SENDER') router.push('/dashboard/sender');
        //   else if (role === 'RECEIVER') router.push('/dashboard/receiver');
        //   else if (role === 'ADMIN') router.push('/dashboard/admin');
        //   else router.push('/dashboard');
        //   return;
        // }

        // toast.error('SSO failed: ' + (resp.message || regResp.message || 'Unknown'));
        // router.push('/login');
      } catch (err) {
        console.error("SSO callback error", err);
        const msg = ApiErrorHandler.getErrorMessage(err) || "Login failed";
        toast.error(msg);
        router.push("/login");
      }
    })();
  }, [session, status, dispatch, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Processing SSO...
    </div>
  );
}
