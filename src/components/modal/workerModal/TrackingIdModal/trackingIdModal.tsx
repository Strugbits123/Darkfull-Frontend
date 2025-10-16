import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
;
const TrackingIdModal = ({
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
        <DialogContent className="sm:max-w-[calc(35%-3rem)] rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              <h1 className="text-2xl font-semibold">Tracking ID</h1>
            </DialogTitle>
        
          </DialogHeader>
          <div className="p-6 space-y-6">
            < div className="bg-[#FFF3D3] p-4 rounded-md flex items-center gap-4 w-full h-20 justify-center">
              <span className="font-semibold text-xl"> TRK#1231231311231</span>
            
          </div>
          </div>
          <DialogFooter className="mt-10 flex flex-col md:flex-row gap-2 justify-end">
            <Button
              variant="outline"
              className="w-full md:w-40 sm:w-20 h-10 "
              onClick={() => setOpenModal()}
            >
              Cancel
            </Button>
           
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrackingIdModal;
