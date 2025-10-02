"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { DUMMY_DATA } from "@/constant/product";
import DataTable from "@/components/InventoryTable/dataTable";
import AssignModal from "@/components/modal/AssignModal/assignModal";
import AssignInventory from "@/components/modal/assignInventory/assignInventory";

const STATUS_COLORS: Record<string, string> = {
  Returned: "bg-orange-200 text-orange-800",
  Shipped: "bg-blue-200 text-blue-800",
  Picked: "bg-gray-300 text-gray-800",
  Packed: "bg-gray-200 text-gray-800",
  New: "bg-yellow-200 text-yellow-800",
  Delivered: "bg-green-200 text-green-800",
  Cancelled: "bg-red-200 text-red-800",
};

export default function InventoryTable() {
  const [activeTab, setActiveTab] = useState<"jobs" | "view">("view");
  const columnsJobs = [
    {
      key: "image",
      title: "Image",
      render: (row: any) => (
        <img
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
      render: (row: any) => (
        <div className="flex gap-2">
         <Badge className="bg-[#DBEAFE] text-black rounded-2xl">{row.variantSize}</Badge>
          <Badge variant="outline">{row.variantColor}</Badge>
        </div>
      ),
    },
    { key: "sku", title: "SKU", sortable: true },
    { key: "platform", title: "Fulfillment Point" },
    {
      key: "quantity",
      title: "Quantity",
      render: (row: any) => <span className="text-lg">{row.quantity}</span>,
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
  const columnsView = [
    {
      key: "image",
      title: "Image",
      render: (row: any) => (
        <img
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
      render: (row: any) => (
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
      render: (row: any) => <span className="text-lg">{row.quantity}</span>,
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

  const [openAssignModal, setOpenAssignModal] = useState<{
    open: boolean;
    products: any[];
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

      <DataTable
        columns={activeTab === "jobs" ? columnsJobs : columnsView}
        data={DUMMY_DATA}
        searchKeys={["name", "sku"]}
        filterOptions={Object.keys(STATUS_COLORS)}
      />
    </div>
  );
}
