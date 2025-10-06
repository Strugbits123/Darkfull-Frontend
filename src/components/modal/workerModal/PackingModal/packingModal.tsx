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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const PackingModal = ({
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
              Packing
            </DialogTitle>
            <DialogDescription className="text-1xl text-gray-600">
              Manage Fulfillments - Packing job - Order ID : 100035546
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ">
              <Select>
                <SelectTrigger className="w-full md:w-full  text-[15px]">
                  <SelectValue placeholder="Carton" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="point1">Carton Point 1</SelectItem>
                  <SelectItem value="point2">Carton Point 2</SelectItem>
                  <SelectItem value="point3">Carton Point 3</SelectItem>
                  <SelectItem value="point4">Carton Point 4</SelectItem>
                  <SelectItem value="point5">Carton Point 5</SelectItem>
                  <SelectItem value="point6">Carton Point 6</SelectItem>
                  <SelectItem value="point7">Carton Point 7</SelectItem>
                  <SelectItem value="point8">Carton Point 8</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full md:w-full text-[15px]">
                  <SelectValue placeholder="Accessories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="point1">Accessories Point 1</SelectItem>
                  <SelectItem value="point2">Accessories Point 2</SelectItem>
                  <SelectItem value="point3">Accessories Point 3</SelectItem>
                  <SelectItem value="point4">Accessories Point 4</SelectItem>
                  <SelectItem value="point5">Accessories Point 5</SelectItem>
                  <SelectItem value="point6">Accessories Point 6</SelectItem>
                  <SelectItem value="point7">Accessories Point 7</SelectItem>
                  <SelectItem value="point8">Accessories Point 8</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4">
              <span className="text-[18px] font-semibold">
                {" "}
                Warehouse Location Details
              </span>

              <Input
                className="w-full mt-2 h-13"
                placeholder="Warehouse Location Details"
              />
            </div>
          </div>
          <DialogFooter className="mt-10 flex flex-col md:flex-row gap-2 justify-end">
            <Button
              variant="outline"
              className="w-full md:w-40 sm:w-20 h-10 hover:bg-gray-200"
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

export default PackingModal;
