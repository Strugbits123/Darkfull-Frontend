"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { DUMMY_DATA, STATUS_COLORS } from "@/constant/product";
import DataTable from "@/components/InventoryTable/dataTable";

export default function FulfillmentsTable() {
  const columns = [
    {
      key: "id",
      title: "Order Id",
      render: (row: any) => <span>{row.id}</span>,
    },
    {
      key: "brand",
      title: "Brand",
      render: (row: any) => <span>{row.brand}</span>,
    },
    {
      key: "platform",
      title: "Platform",
      render: (row: any) => (
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
      key: "status",
      title: "Status",
      sortable: true,
      render: (row: any) => (
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
          <h1 className="text-2xl font-bold">Fulfillments</h1>
          <p className="text-sm text-gray-500">View orders to be fulfilled</p>
        </div>
      </div>
      <div className="flex gap-6 mb-6  border-b border-gray-200">
        <button
          className={`pb-1 text-sm font-medium ${"text-black border-b-2 border-black"}`}
        >
          Jobs
        </button>
      </div>

      <DataTable
        columns={columns}
        data={DUMMY_DATA}
        searchKeys={["name", "sku"]}
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
