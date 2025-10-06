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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const ReturnModal = ({
  open,
  setOpenModal,
  products,
  showQuantity,
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
              Returns
            </DialogTitle>
            <DialogDescription className="text-1xl text-gray-600">
              Manage Inventory Adjustments and Transfers – SKU: BOXERSW
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Product Variants</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Returns</TableHead>
                  {showQuantity && <TableHead>Quantity</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <Image src={p.img} alt={p.name} width={40} height={40} />
                    </TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.variant}</TableCell>
                    <TableCell>{p.sku}</TableCell>
                    <TableCell className="items-center">
                      <div className="flex gap-4">
                        <Button size="sm" variant="outline">
                          Full
                        </Button>
                        <Button size="sm" className="bg-yellow-400 text-black">
                          Partial
                        </Button>
                      </div>
                    </TableCell>
                    {showQuantity && (
                    <TableCell className="flex gap-2 items-center">
                      <Button size="sm" variant="outline">
                        -
                      </Button>
                      <span>{p.quantity}</span>
                      <Button size="sm" variant="outline">
                        +
                      </Button>
                    </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
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

export default ReturnModal;
