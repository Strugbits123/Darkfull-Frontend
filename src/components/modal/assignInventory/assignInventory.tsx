import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const AssignInventory = ({
  open,
  setOpenModal,
  products,
}: {
  open: boolean;
  setOpenModal: () => void;
  products: Array<{
    id: string;
    name: string;
    variant: string;
    sku: string;
    returns: number;
    quantity: number;
    img: string;
  }>;
}) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Modal 1: Manage Return Assignment */}
      <Dialog open={open} onOpenChange={() => setOpenModal()}>
        <DialogContent className="sm:max-w-[calc(38%-3rem)] p-0 rounded-lg overflow-hidden">
          {/* Header Section */}
          <DialogHeader className="p-6 pb-4 flex flex-row items-start justify-between">
            <div className="flex items-center space-x-3">
              {/* Image Placeholder */}

              <div>
                <DialogTitle className="text-2xl font-semibold">
                  Assign Inventory
                </DialogTitle>
                <p className="text-sm text-gray-500">
                  Manage Inventory Assignment - SKU: BOXERSW
                </p>
              </div>
            </div>
            {/* Close button is handled by DialogContent by default, but we'll ensure it looks right. */}
            {/* If you want to use a custom close button (like the 'x' in the image) and position it: */}
            {/* Note: shadcn/ui's DialogContent usually includes a close button. We are letting it handle the 'x'. */}
          </DialogHeader>

          <hr className="my-0 border-t border-gray-200" />

          {/* Body Content Section */}
          <div className="p-6 space-y-6">
<Table>
  {/* Header */}
  <TableHeader>
    <TableRow>
      <TableHead className="w-60">Transfer</TableHead>
      <TableHead colSpan={2} className="text-[#457561] text-[14px] font-medium">
        <div className='flex justify-between'>
            <span>To</span>
            <span>Available Quantity: 554</span>
        </div>
      </TableHead>
    </TableRow>
  </TableHeader>

  {/* Body */}
  <TableBody>
    <TableRow>
      {/* Quantity Control */}
      <TableCell>
        <div className="border rounded-md p-2 flex gap-2 items-center justify-between w-full">
          <button className="py-1 rounded-md border-2 border-gray-300 w-10 text-lg">
            -
          </button>
          <span className="mx-2 text-[14px]">1</span>
          <button className="py-1 rounded-md border-2 border-gray-300 w-10 text-lg">
            +
          </button>
        </div>
      </TableCell>

      {/* Select Warehouse */}
      <TableCell colSpan={2}>
        <Select onValueChange={(val) => console.log(val)} >
          <SelectTrigger className="w-full" style={{height: '59px'}}>
            <SelectValue placeholder="Select warehouse" />
          </SelectTrigger>
          <SelectContent>
            {["warehouse1", "warehouse2", "warehouse3"].map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>


    </TableRow>
  </TableBody>
</Table>
          </div>

          {/* Footer Buttons Section */}
          <div className="flex  space-x-3 p-6 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              className=" md:w-75 sm:w-full   h-10 px-6 py-2 hover:bg-red-800"
              onClick={() => setOpenModal()}
            >
              Cancel
            </Button>
            <Button
              className="sm:w-full md:w-75 bg-[#457561] h-10 hover:bg-[#457561] text-white px-6 py-2"
              onClick={() => setOpenModal()}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssignInventory;
