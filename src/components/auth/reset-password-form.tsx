"use client";


import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "@/lib/services/auth.service";
import ApiErrorHandler from '@/lib/utils/error-handler';
import Image from "next/image";
import Link from "next/link";

const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;


export default function ResetPasswordForm({ className, ...props }: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      const email = localStorage.getItem("resetEmail");
      if (!email) {
        toast.error("No email found for password reset.");
        setIsLoading(false);
        return;
      }
      const response = await authService.resetPassword({
        email,
        newPassword: data.password,
      });
      if (response.success) {
        toast.success("Password reset successfully! You can now log in.");
        localStorage.removeItem("resetEmail");
        router.push("/login");
      } else {
        toast.error(response.message || "Failed to reset password.");
      }
    } catch (error: unknown) {
      const msg = ApiErrorHandler.getErrorMessage(error) || "Failed to reset password.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 min-h-screen items-center justify-center bg-background", className)} {...props}>
      <Card className="overflow-hidden p-0 w-full max-w-2xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8 flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Reset Password</h1>
              <p className="text-muted-foreground text-balance">
                Enter your new password
              </p>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                required
                {...form.register("password")}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                {...form.register("confirmPassword")}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
            <div className="text-center text-sm">
              Remember your password?{' '}
              <Link href="/login" className="underline underline-offset-4">Sign In</Link>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/images/auth/img-1.png"
              width={400}
              height={300}
              alt="Reset Password Illustration"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
