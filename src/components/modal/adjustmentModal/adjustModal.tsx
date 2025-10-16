"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Minus, Plus } from "lucide-react";

// ✅ Zod Schema
const schema = z.object({
  transferQty: z.number().min(1, "At least 1 item required"),
  fromPoint: z.string().nonempty("Select From Point"),
  toPoint: z.string().nonempty("Select To Point"),
  adjustQty: z.number().min(1, "At least 1 item required"),
  reason: z.string().nonempty("Select a reason"),
});

type FormValues = z.infer<typeof schema>;

export default function AdjustmentModal({open,setValue}:{open:boolean,setValue:React.Dispatch<React.SetStateAction<boolean>>}) {

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      transferQty: 5,
      fromPoint: "",
      toPoint: "",
      adjustQty: 5,
      reason: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log("✅ Submitted:", values);
    setValue(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setValue}>
        <DialogContent className="sm:max-w-[calc(60%-3rem)] rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              Adjustments and Transfers
            </DialogTitle>
            <DialogDescription className="text-1xl text-gray-600">
              Manage Inventory Adjustments and Transfers – SKU: BOXERSW
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Transfer Section */}
              <div>
                <div className="grid grid-cols-3 gap-3 text-1xl font-medium text-gray-700 mb-2">
                  <span>Transfer</span>
                  <span>From</span>
                  <span>To</span>
                </div>

                <div className="grid grid-cols-3 gap-3 items-center">
                  {/* Transfer Qty */}
                  <FormField
                    control={form.control}
                    name="transferQty"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center border rounded-md px-2 py-1">
                          <button
                            type="button"
                            onClick={() => field.onChange(Math.max(0, field.value - 1))}
                            className="p-1"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="flex-1 text-center">{field.value}</span>
                          <button
                            type="button"
                            onClick={() => field.onChange(field.value + 1)}
                            className="p-1"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* From Point */}
                  <FormField
                    control={form.control}
                    name="fromPoint"
                    render={({ field }) => (
                      <FormItem>
                        <Select  onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="From Point" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="naf">From Al Naf Point</SelectItem>
                            <SelectItem value="warehouse">From Warehouse</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* To Point */}
                  <FormField
                    control={form.control}
                    name="toPoint"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="To Point" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="store">To Store</SelectItem>
                            <SelectItem value="warehouse">To Warehouse</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Adjust Section */}
              <div>
                <div className="grid grid-cols-2 gap-3 text-sm font-medium text-gray-700 mb-2">
                  <span>Adjust</span>
                  <span>Reason</span>
                </div>

                <div className="grid grid-cols-2 gap-3 items-center">
                  {/* Adjust Qty */}
                  <FormField
                    control={form.control}
                    name="adjustQty"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center border rounded-md px-2 py-1">
                          <button
                            type="button"
                            onClick={() => field.onChange(Math.max(0, field.value - 1))}
                            className="p-1"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="flex-1 text-center">{field.value}</span>
                          <button
                            type="button"
                            onClick={() => field.onChange(field.value + 1)}
                            className="p-1"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Reason */}
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                         onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Reason" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="damaged">Damaged</SelectItem>
                            <SelectItem value="lost">Lost</SelectItem>
                            <SelectItem value="returned">Returned</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Add Button */}
              <Button variant="outline" className="w-full justify-center text-xl">
                +
              </Button>

              {/* Footer */}
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  className="w-1/2 mr-2 h-12 hover:bg-red-500"
                  onClick={() => setValue(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-1/2 h-12 ml-2 bg-green-700 hover:bg-green-800 text-white"
                >
                  Confirm
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
