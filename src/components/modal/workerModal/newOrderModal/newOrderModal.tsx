import DataTable from "@/components/InventoryTable/dataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


import { Scan } from "lucide-react";
import Image from "next/image";
const NewOrderModal = ({
  open,
  setOpenModal,
}: {
  open: boolean;
  setOpenModal: () => void;
}) => {
    
     const columns = [
    {
      key: "id",
      title: "Order Id",
      render: (row: any) => <span>{row.id}</span>,
    },
    
 
    {
      key: "image",
      title: "Image",
      render: (row: any) => (
        <Image
          width={70}
          height={40}
          src={row.image}
          alt={row.name}
          className="h-10 w-10 rounded-md object-cover"
        />
      ),
    },
    {
      key: "name",
      title: "Product Name",
      render: (row: any) => <span>{row.name}</span>,
      sortable: true,
    },
    {
      key: "sku",
      title: "SKU",
      render: (row: any) => <span>{row.sku}</span>,
      sortable: true,
    },
    {
      key: "variant",
      title: "Product Variants",
      render: (row: any) => (
        <div className="flex gap-2">
          <Badge className="bg-[#DBEAFE] text-black rounded-2xl">
            {row.variantSize}
          </Badge>
          <Badge variant="outline">{row.variantColor}</Badge>
        </div>
      ),
    },
    {
      key: "location",
      title: "Location",
      render: (row: any) => (
        <div className="flex gap-2">
          {row.location}
        </div>
      ),
    },
     {
      key: "trackingId",
      title: "Tracking ID",
      render: (row: any) => (
        <div className="flex gap-2">
          {row.trackingId}
        </div>
      ),
    },
    {
      key: "status",
      title: "Status",
      sortable: true,
      render: (row: any) => (
        <Button className="bg-[#FFE9AE] hover:bg[#FFE9AE] rounded-2xl">
            <span className="text-black font-medium flex items-center">
                Scan UPC
                <Scan className=" ml-3 inline mr-2 h-4 w-4 " />
            </span>
        </Button>
      ),
    },
  ];
  
  
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Modal 1: Manage Return Assignment */}
      <Dialog open={open} onOpenChange={() => setOpenModal()}>
        <DialogContent className="sm:max-w-[calc(60%-3rem)] rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              Pick
            </DialogTitle>
            <DialogDescription className="text-1xl text-gray-600">
              Manage fulfillments Picking job - Order ID: 100909
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <DataTable
              columns={columns}
              data={[...Array(10).keys()].map((i) => ({ id: i, name: `Item ${i}`, sku: `SKU-${i}` , image: 'https://via.placeholder.com/150', variantSize: 'M', variantColor: 'Red', location: 'Aisle 3', trackingId: `TRK${1000 + i}`}))}
              searchKeys={[]}
              showExportButton={false}
              showCustomButton={null}
            />
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

export default NewOrderModal;
