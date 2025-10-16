"use client";

import React, { useState } from "react";

import Image from "next/image";
import { DUMMY_DATA, STATUS_COLORS } from "@/constant/product";
import DataTable from "@/components/InventoryTable/dataTable";
import { Badge } from "@/components/ui/badge";

export default function FulfillmentsTable() {
  const [activeTab, setTab] = useState("orders");
  type DirectorFulfillmentRow = {
    id: string | number;
    name: string;
    image: string;
    sku: string;
    variantSize?: string;
    variantColor?: string;
    platform?: string;
    status: keyof typeof STATUS_COLORS | string;
  };

  const orderTable: {
    key: keyof DirectorFulfillmentRow | string;
    title: string;
    sortable?: boolean;
    render?: (row: DirectorFulfillmentRow) => React.ReactNode;
  }[] = [
    {
      key: "orderId",
      title: "Order ID",
      render: (row: DirectorFulfillmentRow) => <span className="text-lg">{row.id}</span>,
    },
    {
      key: "brandName",
      title: "Brand",
      render: (row: DirectorFulfillmentRow) => <span>{row.name}</span>,
    },
    {
      key: "key",
      title: "Platform",
      render: () => (
        <Image
          alt="Platform icon"
          src={"images/platform.svg"}
          width={70}
          height={29}
        />
      ),
    },
    {
      key: "image",
      title: "Image",
      render: (row: DirectorFulfillmentRow) => (
        <Image
          width={30}
          height={10}
          src={row.image}
          alt={row.name}
          className="h-10 w-10 rounded-md object-cover"
        />
      ),
    },
    {
      key: "name",
      title: "Product Name",
      sortable: true,
      render: (row: DirectorFulfillmentRow) => <span>{row.name}</span>,
    },
    { key: "sku", title: "SKU", sortable: true },
    {
      key: "variant",
      title: "Product Variants",
      render: (row: DirectorFulfillmentRow) => (
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
      render: (row: DirectorFulfillmentRow) => (
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
  const transferTable: {
    key: keyof DirectorFulfillmentRow | string;
    title: string;
    sortable?: boolean;
    render?: (row: DirectorFulfillmentRow) => React.ReactNode;
  }[] = [
    {
      key: "transferId",
      title: "Transfer ID",
      render: (row: DirectorFulfillmentRow) => <span className="text-lg">{row.id}</span>,
    },
    {
      key: "brandName",
      title: "Brand",
      render: (row: DirectorFulfillmentRow) => <span>{row.name}</span>,
    },
    {
      key: "image",
      title: "Image",
      render: (row: DirectorFulfillmentRow) => (
        <Image
          width={30}
          height={10}
          src={row.image}
          alt={row.name}
          className="h-10 w-10 rounded-md object-cover"
        />
      ),
    },
    {
      key: "name",
      title: "Product Name",
      render: (row: DirectorFulfillmentRow) => <span>{row.name}</span>,
    },
    { key: "sku", title: "SKU", sortable: true },
    { key: "platform", title: "Product Variants" },
    {
      key: "status",
      title: "Status",
      sortable: true,
      render: (row: DirectorFulfillmentRow) => (
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
        {[
          { title: " View Orders", key: "orders" },
          { title: " View Transfer", key: "transfer" },
        ].map((tabValue) => (
          <button
            key={tabValue.key}
            onClick={() => setTab(tabValue.key as "orders" | "transfer")}
            className={`pb-1 text-sm font-medium ${
              activeTab === tabValue.key
                ? "text-black border-b-2 border-black"
                : "text-gray-500"
            }`}
          >
            {tabValue.key === "orders" ? "View Orders" : "View Transfer"}
          </button>
        ))}
      </div>
      <DataTable<DirectorFulfillmentRow>
        columns={activeTab === "transfer" ? transferTable : orderTable}
        data={DUMMY_DATA}
        searchKeys={["name", "sku"]}
        filterOptions={Object.keys(STATUS_COLORS)}
      />
    </div>
  );
}
