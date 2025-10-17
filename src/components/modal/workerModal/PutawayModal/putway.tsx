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
const PutawayModal = ({
  open,
  setOpenModal,
}: {
  open: boolean;
  setOpenModal: () => void;
  showQuantity: boolean;
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
        <DialogContent className="sm:max-w-[calc(60%-3rem)] rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              Putaway
            </DialogTitle>
            <DialogDescription className="text-1xl text-gray-600">
              Manage inbound Putaway
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Input placeholder="SKU" />

              <Select>
                <SelectTrigger className="w-full md:w-full h-10 text-[14px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="point1">Fulfillment Point 1</SelectItem>
                  <SelectItem value="point2">Fulfillment Point 2</SelectItem>
                  <SelectItem value="point3">Fulfillment Point 3</SelectItem>
                  <SelectItem value="point4">Fulfillment Point 4</SelectItem>
                  <SelectItem value="point5">Fulfillment Point 5</SelectItem>
                  <SelectItem value="point6">Fulfillment Point 6</SelectItem>
                  <SelectItem value="point7">Fulfillment Point 7</SelectItem>
                  <SelectItem value="point8">Fulfillment Point 8</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Quantity" type="number" />
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

export default PutawayModal;
