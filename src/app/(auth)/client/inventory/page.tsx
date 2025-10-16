"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { DUMMY_DATA, STATUS_COLORS } from "@/constant/product";
import DataTable from "@/components/InventoryTable/dataTable";

type InventoryRow = {
  id: string | number;
  brand: string;
  platform: string;
  image: string;
  name: string;
  sku: string;
  variantSize?: string;
  variantColor?: string;
  status: keyof typeof STATUS_COLORS | string;
};

export default function InventoryTable() {
  const columns: {
    key: keyof InventoryRow | string;
    title: string;
    sortable?: boolean;
    render?: (row: InventoryRow) => React.ReactNode;
  }[] = [
    {
      key: "id",
      title: "Order Id",
      render: (row: InventoryRow) => <span className="text-lg">{row.id}</span>,
    },
    {
      key: "brand",
      title: "Brand",
      render: (row: InventoryRow) => <span className="text-lg">{row.brand}</span>,
    },

    {
      key: "platform",
      title: "Platform",
      render: (row: InventoryRow) => (
        <Image
          width={70}
          height={40}
          src={"/images/platform.svg"}
          alt={row.platform}
          className=" rounded-md "
        />
      ),
    },
    {
      key: "image",
      title: "Image",
      render: (row: InventoryRow) => (
        <Image
          width={40}
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
      render: (row: InventoryRow) => <span className="text-lg">{row.name}</span>,
      sortable: true,
    },
    { key: "sku", title: "SKU", sortable: true },
    {
      key: "variant",
      title: "Variants",
      render: (row: InventoryRow) => (
        <div className="flex gap-2">
          <Badge className="bg-[#DBEAFE] text-black rounded-2xl">
            {row.variantSize}
          </Badge>
          <Badge variant="outline">{row.variantColor}</Badge>
        </div>
      ),
    },
    {
      key: "status",
      title: "Status",
      sortable: true,
      render: (row: InventoryRow) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            STATUS_COLORS[row.status]
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 bg-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Inventory</h1>
          <p className="text-sm text-gray-500">
            View products, SKUS, and fulfillment points
          </p>
        </div>
      </div>
      <div className="flex gap-6 mb-6  border-b border-gray-200">
        <button
          className={`pb-1 text-sm font-medium text-black border-b-2 border-black`}
        >
          View
        </button>
      </div>

      <DataTable<InventoryRow>
        columns={columns}
        data={DUMMY_DATA}
        searchKeys={["name", "sku"]}
        filterOptions={["In Stock", "Out of Stock", "Low Stock"]}
        showExportButton={true}
        showCustomButton={
          <div>
            <Button
              variant={"outline"}
              className="w-50 mr-5 bg-[#BBF7D0] text-[#15803D] hover:bg-[#BBF7D0] hover:text-[#15803D] "
            >
              <span className="text-green-700 animate-pulse text-1xl">●</span>{" "}
              Connected to Salla
            </Button>
          </div>
        }
      />
    </div>
  );
}
