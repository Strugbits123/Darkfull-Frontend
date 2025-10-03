import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Minus, Plus } from "lucide-react";
const ReceivedModal = ({
  open,
  setOpenModal,
}: {
  open: boolean;
  setOpenModal: () => void;
}) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Modal 1: Manage Return Assignment */}
      <Dialog open={open} onOpenChange={() => setOpenModal()}>
        <DialogContent className="sm:max-w-[calc(60%-3rem)] rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              Received
            </DialogTitle>
            <DialogDescription className="text-1xl text-gray-600">
              Manage inbound received - SKU - BOXERSU
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <div className="w-full">
              <div className="flex flex-row w-full justify-between   mt-2 items-center ">
                <Button className="w-40 h-10 bg-green-800">Accept</Button>

                <div className="flex items-center border rounded-md px-2 py-2 w-80">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="p-1 border py-2 px-4 rounded-md h-10"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="flex-1 text-center">{88}</span>
                  <button
                    type="button"
                    onClick={() => {}}
                    className="p-1 border py-2 px-4 rounded-md h-10"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="text-md font-medium text-[#457561] ml-4 border rounded-md px-3 py-3   hover:bg-gray-300">
                  <span>Create a UPC for each Item</span>
                </div>
              </div>
            </div>

            <hr />
            <div className="w-full">
              <div className="flex flex-row w-full justify-between   mt-2 items-center ">
                <Button className="w-40 h-10 bg-red-800">Reject</Button>

                <div className="flex items-center border rounded-md px-2 py-2 w-80">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="p-1 border py-2 px-4 rounded-md h-10"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="flex-1 text-center">{88}</span>
                  <button
                    type="button"
                    onClick={() => {}}
                    className="p-1 border py-2 px-4 rounded-md h-10"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="text-lg font-medium  ml-4  rounded-md px-2 py-1">
                  <span className="text-red-500 text-sm">Select Reason</span>
                  <Select>
                    <SelectTrigger className="w-48 h-12 ">
                      <SelectValue
                        placeholder="Select Reason"
                        className="text-red-500"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="damaged">Damaged</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="wrong-item">Wrong Item</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-10 flex flex-col md:flex-row gap-2 justify-end">
            <Button
              variant="outline"
              className="w-full md:w-40 sm:w-20 h-10"
              onClick={() => setOpenModal()}
            >
              Cancel
            </Button>
            <Button className="bg-[#457561] text-white w-full md:w-40 sm:w-20 h-10">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReceivedModal;
