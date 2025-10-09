import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { useState } from "react";

const SallaModal = ({
  open,
  setOpenModal,
  closeModal
}: {
  open: boolean;
  closeModal: () => void;
  setOpenModal: (data: { clientId: string; clientPass: string }) => void;
}) => {
  const [clientId, setClientId] = useState("");
  const [clientPass, setClientPass] = useState("");
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Modal 1: Manage Return Assignment */}
      <Dialog open={open} onOpenChange={() => closeModal()}>
        <DialogContent className="sm:max-w-[calc(60%-3rem)] rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              Connect Salla
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto">
            <Label className="mt-4">Client Id</Label>
            <Input
              placeholder="Enter Client Id..."
              className="w-full"
              onChange={(e) => setClientId(e.target.value)}
            />
            <Label className="mt-4">Client Pass</Label>
            <Input
              placeholder="Enter Client pass..."
              className="w-full"
              onChange={(e) => setClientPass(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="w-full md:w-40 sm:w-20 h-10"
              onClick={() => closeModal()}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#457561] text-white w-full md:w-40 sm:w-20 h-10"
              onClick={() => {
                setOpenModal({
                  clientId,
                  clientPass,
                });
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SallaModal;
