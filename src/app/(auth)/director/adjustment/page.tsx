"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { title } from "process";
import { DUMMY_DATA, Product } from "@/constant/product";
import AdjustmentModal from "@/components/modal/adjustmentModal/adjustModal";
import DataTable from "@/components/InventoryTable/dataTable";

const STATUS_COLORS: Record<string, string> = {
  Returned: "bg-orange-200 text-orange-800",
  Shipped: "bg-blue-200 text-blue-800",
  Picked: "bg-gray-300 text-gray-800",
  Packed: "bg-gray-200 text-gray-800",
  New: "bg-yellow-200 text-yellow-800",
  Delivered: "bg-green-200 text-green-800",
  Cancelled: "bg-red-200 text-red-800",
};

export default function AdjustmentTable() {
  const [activeTab, setActiveTab] = useState<"jobs" | "view">("jobs");
  const [showModal, setShowModal] = useState(false);
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
      key: "action",
      title: "Action",
      sortable: true,
      render: () => (
        <Button
          onClick={() => setShowModal(true)}
          variant="outline"
          className="bg-yellow-400 hover:bg-yellow-500 text-white"
        >
          Assign
        </Button>
      ),
    },
  ];
  const columnsView = [
    {
      key: "id",
      title: "Transfer ID",
      render: (row: any) => <span className="text-lg">{row.id}</span>,
    },
    {
      key: "brandName",
      title: "Brand",
      sortable: true,
      render: (row: any) => <span>{row.name}</span>,
    },
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
    {
      key: "name",
      title: "Product Name",
      sortable: true,
      render: (row: any) => <span>{row.name}</span>,
    },
    { key: "sku", title: "SKU", sortable: true },
    { key: "platform", title: "Fulfillment Point" },
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
          <h1 className="text-2xl font-bold">Adjustment</h1>
          <p className="text-sm text-gray-500">
            Assign and view returned order
          </p>
        </div>
       
      </div>

      <AdjustmentModal open={showModal} setValue={setShowModal} />
      {/* Tabs */}
      <div className="flex gap-6 mb-6  border-b border-gray-200">
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
        showExportButton={activeTab === "jobs" ? false : true}
        columns={activeTab === "jobs" ? columnsJobs : columnsView}
        data={DUMMY_DATA}
        searchKeys={["name", "sku"]}
        filterOptions={Object.keys(STATUS_COLORS)}
      />
    </div>
  );
}
