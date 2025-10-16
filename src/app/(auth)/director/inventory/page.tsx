"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { DUMMY_DATA, STATUS_COLORS } from "@/constant/product";
import DataTable from "@/components/InventoryTable/dataTable";
import AssignInventory from "@/components/modal/assignInventory/assignInventory";
import Image from "next/image";

export default function InventoryTable() {
  const [activeTab, setActiveTab] = useState<"jobs" | "view">("view");
  type DirectorInventoryRow = {
    id: string | number;
    image: string;
    name: string;
    variantSize?: string;
    variantColor?: string;
    sku: string;
    platform: string;
    quantity: number;
    status: keyof typeof STATUS_COLORS | string;
  };

  const columnsJobs: {
    key: keyof DirectorInventoryRow | string;
    title: string;
    sortable?: boolean;
    render?: (row: DirectorInventoryRow) => React.ReactNode;
  }[] = [
    {
      key: "image",
      title: "Image",
      render: (row: DirectorInventoryRow) => (
        <Image
          width={30}
          height={10}
          src={row.image}
          alt={row.name}
          className="h-10 w-10 rounded-md object-cover"
        />
      ),
    },
    { key: "name", title: "Product Name", sortable: true },
    {
      key: "variant",
      title: "Variants",
      render: (row: DirectorInventoryRow) => (
        <div className="flex gap-2">
          <Badge className="bg-[#DBEAFE] text-black rounded-2xl">
            {row.variantSize}
          </Badge>
          <Badge variant="outline">{row.variantColor}</Badge>
        </div>
      ),
    },
    { key: "sku", title: "SKU", sortable: true },
    { key: "platform", title: "Fulfillment Point" },
    {
      key: "quantity",
      title: "Quantity",
      render: (row: DirectorInventoryRow) => <span className="text-lg">{row.quantity}</span>,
    },
    {
      key: "status",
      title: "Status",
      sortable: true,
      render: (row: DirectorInventoryRow) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            STATUS_COLORS[row.status]
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: () => (
        <Button
          variant="outline"
          onClick={() => setOpenAssignModal({ open: true, products: [] })}
          className="bg-yellow-400 hover:bg-yellow-500 text-white"
        >
          Assign
        </Button>
      ),
    },
  ];
  const columnsView: {
    key: keyof DirectorInventoryRow | string;
    title: string;
    sortable?: boolean;
    render?: (row: DirectorInventoryRow) => React.ReactNode;
  }[] = [
    {
      key: "image",
      title: "Image",
      render: (row: DirectorInventoryRow) => (
        <Image
          width={40}
          height={40}
          src={row.image}
          alt={row.name}
          className="h-10 w-10 rounded-md object-cover"
        />
      ),
    },
    { key: "name", title: "Product Name", sortable: true },
    {
      key: "variant",
      title: "Variants",
      render: (row: DirectorInventoryRow) => (
        <div className="flex gap-2">
          <Badge>{row.variantSize}</Badge>
          <Badge variant="outline">{row.variantColor}</Badge>
        </div>
      ),
    },
    { key: "sku", title: "SKU", sortable: true },
    { key: "platform", title: "Fulfillment Point" },
    {
      key: "quantity",
      title: "Quantity",
      render: (row: DirectorInventoryRow) => <span className="text-lg">{row.quantity}</span>,
    },
    {
      key: "status",
      title: "Status",
      sortable: true,
      render: (row: DirectorInventoryRow) => (
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

  type AssignProduct = {
    id: string;
    name: string;
    variant: string;
    sku: string;
    returns: number;
    quantity: number;
    img: string;
  };

  const [openAssignModal, setOpenAssignModal] = useState<{
    open: boolean;
    products: AssignProduct[];
  }>({ open: false, products: [] });
  return (
    <div className="p-6 bg-card">
      <AssignInventory
        products={openAssignModal.products}
        open={openAssignModal.open}
        setOpenModal={() => {
          setOpenAssignModal({ open: false, products: [] });
        }}
      />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Inventory</h1>
          <p className="text-sm text-gray-500">
            Manage and view inventory items
          </p>
        </div>
      </div>
      <div className="flex gap-6 mb-`  border-b border-gray-200">
        {["jobs", "view"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "jobs" | "view")}
            className={`pb-1 text-sm font-medium ${
              activeTab === tab
                ? "text-black border-b-2 border-black"
                : "text-gray-500"
            }`}
          >
            {tab === "jobs" ? "Job" : "View"}
          </button>
        ))}
      </div>

      <DataTable<DirectorInventoryRow>
        columns={activeTab === "jobs" ? columnsJobs : columnsView}
        data={(DUMMY_DATA as unknown) as DirectorInventoryRow[]}
        searchKeys={["name", "sku"]}
        filterOptions={Object.keys(STATUS_COLORS)}
      />
    </div>
  );
}
