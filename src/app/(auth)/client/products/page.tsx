"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DUMMY_DATA, STATUS_COLORS } from "@/constant/product";
import AssignModal from "@/components/modal/AssignModal/assignModal";
import DataTable from "@/components/InventoryTable/dataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ProductRow = {
  id: string | number;
  platform: string;
  image: string;
  name: string;
  variantSize?: string;
  variantColor?: string;
  sku: string;
  quantity: number;
};

export default function FulfillmentsTable() {
  const [openAssignModal, setOpenAssignModal] = useState<{
    open: boolean;
    products: ProductRow[];
  }>({
    open: false,
    products: [],
  });
  const columns: {
    key: keyof ProductRow | string;
    title: string;
    sortable?: boolean;
    render?: (row: ProductRow) => React.ReactNode;
  }[] = [
    {
      key: "image",
      title: "Image",
      render: (row: ProductRow) => (
        <Image
          width={70}
          height={40}
          src={"/images/platform.svg"}
          alt={row.platform}
          className=" rounded-md "
        />
      ),
    },
    { key: "name", title: "Product Name", sortable: true },
    {
      key: "variant",
      title: "Product Variants",
      render: (row: ProductRow) => (
        <div className="flex gap-2">
          <Badge className="bg-[#DBEAFE] text-black rounded-2xl">
            {row.variantSize}
          </Badge>
          <Badge variant="outline">{row.variantColor}</Badge>
        </div>
      ),
    },
    { key: "sku", title: "SKU", sortable: true },
    {
      key: "quantity",
      title: "Available Quantity",
      render: (row: ProductRow) => {
        return <span className="text-lg text-center">{row.quantity} pcs</span>;
      },
    },

    {
      key: "action",
      title: "Action",
      sortable: true,
      render: (row: ProductRow) => (
        <Button
          onClick={() => setOpenAssignModal({ open: true, products: [row] })}
          variant="outline"
          className="bg-yellow-400 hover:bg-yellow-500 text-white"
        >
          Assign
        </Button>
      ),
    },
  ];

  return (
    <div className="px-g-card ">
      <AssignModal
        open={openAssignModal.open}
        setOpenModal={() =>
          setOpenAssignModal({
            open: !openAssignModal.open,
            products: openAssignModal.products,
          })
        }
        products={(openAssignModal.products as unknown) as Array<{id: string, name: string, variant: string, sku: string, returns: number, quantity: number, img: string}>}
      />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Product Sync</h1>
          <p className="text-sm text-gray-500">
            Choose products to send to Darkful and allocate quantities across
            fulfillment points.
          </p>
        </div>
      </div>

      <div className="flex gap-6 mb-6  border-b border-gray-200">
        <button
          className={`pb-1 text-sm font-medium ${"text-black border-b-2 border-black"}`}
        >
          Jobs
        </button>
      </div>

      {/* Table */}
      <DataTable<ProductRow>
        data={(DUMMY_DATA as unknown) as ProductRow[]}
        columns={columns}
        filterOptions={Object.keys(STATUS_COLORS)}
        searchKeys={["name", "sku"]}
        showExportButton={false}
        showCustomButton={
          <div>
            <Button
              variant={"outline"}
              className="w-50 mr-5 bg-[#BBF7D0] text-[#15803D] hover:bg-[#BBF7D0] hover:text-[#15803D] "
            >
              <span className="text-green-700 animate-pulse text-1xl">●</span>{" "}
              Connected to Salla
            </Button>
            <Button className="w-50 bg-[#003366] hover:bg-[#003366] text-white">
              Sync Now
            </Button>
          </div>
        }
      />
    </div>
  );
}
