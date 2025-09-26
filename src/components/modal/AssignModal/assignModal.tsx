import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";

const AssignModal = ({ open, setOpenModal, products }: {open: boolean, setOpenModal: () => void, products: Array<{id: string, name: string, variant: string, sku: string, returns: number, quantity: number, img: string}>}) => {
    return (
         <div className="flex flex-col gap-4 p-4">
      {/* Modal 1: Manage Return Assignment */}
      <Dialog
        open={open}
        onOpenChange={() => setOpenModal()}
      >
      <DialogContent className="sm:max-w-[calc(50%-3rem)] p-0 rounded-lg overflow-hidden">
        {/* Header Section */}
        <DialogHeader className="p-6 pb-4 flex flex-row items-start justify-between">
          <div className="flex items-center space-x-3">
            {/* Image Placeholder */}
            <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
              {/* Replace with your actual image component/tag */}
              <Image
                src={'/images/icons/settings.svg'} // Placeholder URL
                alt="Product"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold">Assign</DialogTitle>
              <p className="text-sm text-gray-500">Manage inventory assignment</p>
            </div>
          </div>
          {/* Close button is handled by DialogContent by default, but we'll ensure it looks right. */}
          {/* If you want to use a custom close button (like the 'x' in the image) and position it: */}
          {/* Note: shadcn/ui's DialogContent usually includes a close button. We are letting it handle the 'x'. */}
        </DialogHeader>
        
        <hr className="my-0 border-t border-gray-200" />
        
        {/* Body Content Section */}
        <div className="p-6 space-y-6">
          
          {/* Product Variants */}
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
              Product Variants
            </label>
            <div className="flex space-x-2 border rounded-md p-2 w-full">
              {/* Variant Badge 1 (Size) */}
              <div className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700">
                S
              </div>
              {/* Variant Badge 2 (Color) */}
              <div className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700">
                White
              </div>
            </div>
          </div>
          
          {/* Assigned Quantity */}
          <div className="w-full">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
              Assigned Quantity
            </label>
            <div className="flex items-center max-w-full">
              {/* Decrease Button (-) */}
              <Button
                variant="outline"
                size="icon"
                className="rounded-r-none h-10 w-10 border-r-0 hover:bg-green-700"
              >
                −
              </Button>
              
              {/* Quantity Input Display */}
              <Input
                type="text"
                // value={assignedQuantity}
                readOnly
                className="text-center rounded-none border-x-0 h-10 w-full focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              
              {/* Increase Button (+) */}
              <Button
                variant="outline"
                size="icon"
                className="rounded-l-none h-10 w-10 border-l-0 hover:bg-green-700"

              >
                +
              </Button>
            </div>
          </div>
        </div>
        
        {/* Footer Buttons Section */}
        <div className="flex  space-x-3 p-6 pt-4 border-t border-gray-200">
          <Button variant="outline"  className=" md:w-75 sm:w-full   h-10 px-6 py-2 hover:bg-red-800" onClick={() => setOpenModal()}>
            Cancel
          </Button>
          <Button className="sm:w-full md:w-75 bg-[#457561] h-10 hover:bg-[#457561] text-white px-6 py-2" onClick={() => setOpenModal()}>
            Confirm
          </Button>
        </div>
      </DialogContent>

    
      </Dialog>
      </div>
    );
  }

  export default AssignModal;