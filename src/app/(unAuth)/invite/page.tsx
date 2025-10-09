"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import authService from "@/lib/services/auth.service";
import {
  VerifyTokenApiResponse,
  VerifyTokenResponse,
} from "@/lib/types/auth.types";
import ApiErrorHandler from "@/lib/utils/error-handler";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { Eye, EyeOff, Loader } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
const loginSchema = z.object({
  fullName: z.string().min(2, "Full Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
  storeName: z.string().min(2, "Store Name must be at least 2 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function InvitePage() {
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  async function checkToken(token: string) {
    try {
      let value: VerifyTokenApiResponse = await authService.verifyToken(token);
      if (value?.data?.invitation) {
        setValue(
          "fullName",
          value?.data?.invitation?.firstName +
            " " +
            value?.data?.invitation?.lastName || ""
        );
        setValue("firstName", value?.data?.invitation?.firstName || "uuu");
        setValue("lastName", value?.data?.invitation?.lastName || "uuu");
        setValue("email", value?.data?.invitation?.email || "");
        setValue("phone", value?.data?.invitation?.phone || "");
        setValue("storeName", value?.data?.invitation?.storeName || "");
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        setError(error.response?.data?.message ?? "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (token) {
      checkToken(token);
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      fullName: "a",
      password: "",
      rememberMe: false,
      email: "",
      storeName: "",
      phone: "",
    },
  });

  const rememberMe = watch("rememberMe");

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      await authService.acceptInvitation({
        token: token as string,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        fullName: data.fullName,
        phone: data.phone,
      });

      setIsLoading(false);
      toast.success("Account verified successfully!");
      // Redirect to dashboard or another page
      window.location.href = "/";
    } catch (error) {
      const msg = ApiErrorHandler.getErrorMessage(error);
      setIsLoading(false);
      // Handle login error (e.g., show notification)
      console.error("Login failed:", error);
      toast.error(
        msg || "Login failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="h-screen flex-col flex items-center justify-center">
        {loading && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-4xl font-bold">
              <Loader className="animate-spin h-32 w-32" />
            </h1>
          </div>
        )}
        {!loading && error == null && (
          <div className="text-center  w-1/2">
            <h3 className="text-2xl font-semibold mt-4">Verify User</h3>

            <div className="mt-9">
              <Image
                className="mx-auto"
                src="/images/logo.svg"
                alt="login"
                width={200}
                height={200}
              />
            </div>

            <div className=" mt-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    type="email"
                    disabled
                    placeholder="your@email.com"
                    {...register("storeName")}
                    className={errors.storeName ? "border-red-500" : ""}
                  />
                  {errors.storeName && (
                    <p className="text-sm text-red-500">
                      {errors.storeName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    disabled
                    placeholder="Name"
                    {...register("firstName")}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    disabled
                    placeholder="Name"
                    {...register("lastName")}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    disabled
                    placeholder="your@email.com"
                    {...register("email")}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field, fieldState }) => (
                      <PhoneInput
                        id="phone"
                        placeholder="Enter phone number"
                        defaultCountry="US"
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        className={fieldState.error ? "border-red-500" : ""}
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...register("password")}
                      className={
                        errors.password ? "border-red-500 pr-10" : "pr-10"
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button
                  className="mt-10 w-10/12 mx-auto"
                  type="submit"
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  <p>Confirm</p>
                </Button>
              </form>
            </div>
          </div>
        )}
        {!loading && error != null && (
          <div className="text-center">
            <h1 className="text-4xl font-bold">Error</h1>
            {error == "TInvite has expired" ? (
              <Image
                className="mx-auto"
                src="/expired.gif"
                alt="login"
                width={200}
                height={200}
              />
            ) : (
              <Image
                className="mx-auto"
                src="/sad.gif"
                alt="login"
                width={200}
                height={200}
              />
            )}
            <h3 className="text-2xl font-semibold mt-4">{error}</h3>
          </div>
        )}
      </div>
    </Suspense>
  );
}
