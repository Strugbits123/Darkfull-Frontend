"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  createPlatform,
  editPlatform,
  sendStoreInvitationEmailCreateStore,
} from "@/lib/services/platfrom.service";
import type { ApiResponse } from "@/lib/types/auth.types";
import type { CreateStoreResponse } from "@/lib/types/store.types";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import ApiErrorHandler from "@/lib/utils/error-handler";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { PhoneInput } from "@/components/ui/phone-input";

const createStoreSchema = z.object({
  name: z.string().min(2, "Store name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters"),
});

type CreateStoreFormData = z.infer<typeof createStoreSchema>;
type InvitationLite = {
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
};
const CreateAdminModal = ({
  open,
  setOpenModal,
  isEditModal = false,
  data,
}: {
  open: boolean;
  setOpenModal: () => void;
  isEditModal?: boolean;
  data: {
    id?: string;
    name?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    invitations?: InvitationLite[];
  } | null;
}) => {
  const [loading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<CreateStoreFormData>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  async function createStoreApi(data: CreateStoreFormData) {
    const { name, email, firstName, lastName, phoneNumber } = data;
    try {
      setIsLoading(true);
      const response: ApiResponse<CreateStoreResponse> = await createPlatform({
        name,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
      });
      await sendStoreInvitationEmailCreateStore({
        platformId: response.data?.platform?.id as string,
        email: email,
        fullName: `${firstName} ${lastName}`,
        firstName: firstName,
        lastName: lastName,
        storeName: name,
        role: "DIRECTOR",
        phoneNumber: phoneNumber,
      });
      toast.success("Store created and invitation sent successfully!");
      setOpenModal();
    } catch (error) {
      const msg = ApiErrorHandler.getErrorMessage(error);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }

  async function editStore(value: CreateStoreFormData) {
    const { name } = value;
    try {
      setIsLoading(true);
      if (!data?.id) {
        toast.error("Missing platform id");
        return;
      }
      const response: ApiResponse<CreateStoreResponse> = await editPlatform(
        data.id,
        {
          name,
          slug: name.toLowerCase().replace(/\s+/g, "-"),
        }
      );
      toast.success("Store updated successfully!");
      setOpenModal();
    } catch (error) {
      const msg = ApiErrorHandler.getErrorMessage(error);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isEditModal) {
      if (
        data &&
        data?.invitations &&
        data?.invitations?.length > 0
      ) {
        setValue("name", data?.name || "");
        setValue("email", data?.invitations?.[0].email || "");
        setValue("firstName", data?.invitations?.[0].firstName || "");
        setValue("lastName", data?.invitations?.[0].lastName || "");
        setValue("phoneNumber", data?.invitations?.[0].phoneNumber || "");
      }
    }
  }, [
    isEditModal,
    data?.name,
    data?.email,
    data?.firstName,
    data?.lastName,
    data?.invitations,
    setValue,
  ]);
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Modal 1: Manage Return Assignment */}
      <Dialog open={open} onOpenChange={() => setOpenModal()}>
        <DialogContent className="sm:max-w-[calc(38%-3rem)] p-0 rounded-lg overflow-hidden">
          {/* Header Section */}
          <DialogHeader className="p-6 pb-4 flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-3">
              {/* Image Placeholder */}

              <div className="flex flex-col justify-items-center">
                <DialogTitle className="text-4xl mt-5 font-semibold">
                  {isEditModal ? "Edit" : "Create"} Director & Send Invitation
                </DialogTitle>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  {isEditModal ? "Edit" : "Create"} Director (3rd Party
                  Logistic) & Send Invitation
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* Body Content Section */}
          <form
            onSubmit={handleSubmit(isEditModal ? editStore : createStoreApi)}
          >
            <div className="px-6">
              <div className="mb-4">
                <Label className="text-sm font-medium mb-2">Store Name</Label>
                <Input
                  placeholder="Store Name"
                  {...register("name")}
                  className={
                    errors.name ? "border-red-500 w-full mt-2" : "w-full mt-2"
                  }
                />
              </div>

              <div className="mb-4">
                <Label className="text-sm font-medium mb-2">First Name</Label>
                <Input
                  placeholder="First Name"
                  {...register("firstName")}
                  className={
                    errors.firstName
                      ? "border-red-500 w-full mt-2"
                      : "w-full mt-2"
                  }
                />
              </div>
              <div className="mb-4">
                <Label className="text-sm font-medium mb-2">Last Name</Label>
                <Input
                  placeholder="Last Name"
                  {...register("lastName")}
                  className={
                    errors.lastName
                      ? "border-red-500 w-full mt-2"
                      : "w-full mt-2"
                  }
                />
              </div>

              <div className="mb-4">
                <Label className="text-sm font-medium mb-2">Email</Label>
                <Input
                  placeholder="Admin Email"
                  className={
                    errors.email ? "border-red-500 w-full mt-2" : "w-full mt-2"
                  }
                  {...register("email")}
                />
              </div>
              <div
                className={`mb-4 ${errors.phoneNumber ? "border-red-500" : ""}`}
              >
                <Label className="text-sm font-medium mb-2">Phone Number</Label>
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      className={
                        errors.phoneNumber
                          ? "border-red-500 w-full mt-2"
                          : "w-full mt-2"
                      }
                      value={field.value}
                      onChange={(value) => field.onChange(value || "")}
                    />
                  )}
                />
                {errors.phoneNumber?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-center px-6">
              {/* Footer Buttons Section */}
              <Button
                disabled={loading}
                type="submit"
                className="sm:w-full md:w-full bg-[#004370] h-10 hover:bg-[#003057 ] text-white px-6 MD:px-8 my-6"
              >
                {isEditModal ? "Edit" : "Create"}
                {loading && (
                  <div className="ml-2 animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full" />
                )}
              </Button>
            </div>
          </form>

          {/* Footer Buttons Section */}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default CreateAdminModal;
