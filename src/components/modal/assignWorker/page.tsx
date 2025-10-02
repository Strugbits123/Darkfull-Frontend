import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const AssignWorker = ({
  open,
  setOpenModal,
  workers,
}: {
  open: boolean;
  setOpenModal: () => void;
  workers: Array<{
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
                  Assign Task To Worker
                </DialogTitle>
                <p className="text-sm text-gray-500">
                  Manage Assignment - Order Id: 1043333
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* Body Content Section */}
          <div className="px-6">
            <Table>
              {/* Header */}
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              {/* Body */}
              <TableBody>
                <TableRow>
                  <TableCell>
                    <input type="checkbox" disabled/>
                  </TableCell>
                  <TableCell>
                    <Image
                      src={"/avatars/avatar-1.jpg"}
                      alt="Worker"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">John Doe</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">Al Naf</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">Al Naf</span>
                  </TableCell>
                  <TableCell>
                    <Button className="bg-[#004370] hover:bg-[#004370] text-white w-40">
                      Mark
                    </Button>
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

export default AssignWorker;
