import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";

import {
  Calendar,
  Clock,
  MapPin,
  Minus,
  Package,
  Phone,
  Plus,
  Ruler,
  Scale,
  User,
} from "lucide-react";
const ShipmentModal = ({
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
              <h1 className="text-2xl font-semibold">Fulfillment</h1>
            </DialogTitle>
            <DialogDescription className="text-1xl text-gray-600">
              <p className="text-sm text-muted-foreground">
                Manage fulfillments - Shipping - Order ID: 10454699
              </p>{" "}
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 space-y-6">
            {/* Warehouse Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="w-4 h-4" />
                    <span>Origin Warehouse</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>Central Distribution Center</p>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>1234 Industrial Blvd, Newark, NJ 07102</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Operating Hours: 6:00 AM – 10:00 PM</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="w-4 h-4" />
                    <span>Warehouse Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Dispatch Date: December 12, 2024</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Handler: Mike Johnson</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Scale className="w-4 h-4" />
                    <span>Package Weight: 2.5 lbs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Ruler className="w-4 h-4" />
                    <span>Dimensions: 12" × 8" × 4"</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Status */}
            <Card className="border border-green-200 bg-green-50">
              <CardContent className="flex justify-between items-center py-3 px-4">
                <span className="text-sm text-green-700">
                  Warehouse Status: Package Processed and Dispatched
                </span>
                <Badge className="bg-green-600 hover:bg-green-700">
                  Active
                </Badge>
              </CardContent>
            </Card>

            <Separator />

            {/* Shipment Route */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Shipment Route</h2>
              <div className="flex items-center justify-between ">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
                    ●
                  </div>
                  <p className="text-sm mt-2 font-light">Origin</p>
                  <p className="text-xs font-light text-muted-foreground">
                    AI Naf loc
                  </p>
                </div>

                <div className="flex-1 border-t-2 border-green-500 mx-2 mb-10"></div>

                <div className="flex-1 border-t-2 border-gray-300 mx-2 mb-10"></div>

                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white">
                    ●
                  </div>
                  <p className="text-xs mt-2">Destination</p>
                  <p className="text-xs text-muted-foreground">
                    Los Angeles, CA
                  </p>
                </div>
              </div>
              <div className="flex-1 mt-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-green-100 text-green-700 text-center py-2 rounded-md text-xs">
                    Departed Newark Hub
                  </div>
                  <div className="bg-yellow-100 text-yellow-700 text-center py-2 rounded-md text-xs">
                    In Transit - Chicago Hub
                  </div>
                  <div className="bg-gray-300 text-gray-600 text-center py-2 rounded-md text-xs">
                    Awaiting Arrival
                  </div>
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

export default ShipmentModal;
