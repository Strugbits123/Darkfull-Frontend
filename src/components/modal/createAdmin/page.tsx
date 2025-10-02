import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const CreateAdminModal = ({
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
        <DialogContent className="sm:max-w-[calc(38%-3rem)] p-0 rounded-lg overflow-hidden">
          {/* Header Section */}
<DialogHeader className="p-6 pb-4 flex flex-col items-center justify-center text-center">
            <div className="flex items-center space-x-3">
              {/* Image Placeholder */}

              <div className="flex flex-col justify-items-center">
                <DialogTitle className="text-4xl mt-5 font-semibold">
                 Create Admin & Send Invitation
                </DialogTitle>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Create Admin & Send Invitation
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* Body Content Section */}
          <div className="px-6">
            <div className="mb-4">
              <Label className="text-sm font-medium mb-2">
                Enter Admin Name
              </Label>
              <Input className="w-full mt-2" placeholder="Admin Name" />
            </div>
            <div className="mb-4">
              <Label className="text-sm font-medium mb-2">
                Enter Admin Email
              </Label>
              <Input className="w-full mt-2" placeholder="Admin Email" />
            </div>
            <div className="mb-4">
              <Label className="text-sm font-medium mb-2">
                Enter Admin Password
              </Label>
              <Input className="w-full mt-2" placeholder="Admin Password" />
            </div>
           
          <Button
            className="sm:w-full md:w-full bg-[#004370] h-10 hover:bg-[#003057 ] text-white px-6 MD:px-8 my-6"
            onClick={() => setOpenModal()}
          >
            Confirm
          </Button>
          </div>

          {/* Footer Buttons Section */}

        </DialogContent>
      </Dialog>
    </div>
  );
};
export default CreateAdminModal;
