"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { DUMMY_DATA, STATUS_COLORS } from "@/constant/product";
import ReturnModal from "@/components/modal/returnModal/returnModal";
import DataTable from "@/components/InventoryTable/dataTable";

export default function ReturnTable() {
  const [tab, setTab] = useState("view");
  const columnsJobs = [
    {
      key: "id",
      title: "Order Id",
      render: (row: any) => <span>{row.id}</span>,
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
    { key: "name", title: "Product Name", sortable: true },
    { key: "sku", title: "SKU", sortable: true },
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
      key: "action",
      title: "Action",
      render: (row: any) => (
        <Button
          onClick={() =>
            setShowReturnModal({
              open: true,
              products: [row],
              showQuantity: true,
            })
          }
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          Return
        </Button>
      ),
    },
  ];

  const columnsOfView = [
    {
      key: "id",
      title: "Order Id",
      render: (row: any) => <span>{row.id}</span>,
    },
    {
      key: "brand",
      title: "Brand",
      sortable: true,
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
    { key: "name", title: "Product Name", sortable: true },
    { key: "sku", title: "SKU", sortable: true },
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
      key: "action",
      title: "Status",
      render: (item: any) => (
        <div className="flex flex-row gap-2">
          <Button
            variant="outline"
            className="bg-[#66C59D] hover:bg-[#66C59D] text-black hover:text-black"
          >
            Returned
          </Button>
          <Button
            onClick={() =>
              setShowReturnModal({
                open: true,
                products: [item],
                showQuantity: false,
              })
            }
            variant="outline"
            className="bg-[#FFD553] hover:bg-[#FFD553] text-black hover:text-black"
          >
            View
          </Button>
        </div>
      ),
    },
  ];

  type Product = {
    id: string;
    name: string;
    variant: string;
    sku: string;
    returns: number;
    quantity: number;
    img: string;
    // add other fields as needed
  };

  const [showReturnModal, setShowReturnModal] = useState<{
    showQuantity: boolean;
    open: boolean;
    products: Product[];
  }>({
    showQuantity: false,
    open: false,
    products: [],
  });

  return (
    <div className="p-6 bg-card">
      <ReturnModal
        open={showReturnModal.open}
        setOpenModal={() =>
          setShowReturnModal({ open: false, products: [], showQuantity: true })
        }
        products={showReturnModal.products}
        showQuantity={showReturnModal.showQuantity}
      />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Return</h1>
          <p className="text-sm text-gray-500">Assign and view return order</p>
        </div>
      </div>

      <div className="flex gap-6 mb-6  border-b border-gray-200">
        {[{ title: " View ", key: "view" }].map((tabValue) => (
          <button
            key={tabValue.key}
            onClick={() => setTab(tabValue.key as "jobs" | "view")}
            className={`pb-1 text-sm font-medium ${
              tab === tabValue.key
                ? "text-black border-b-2 border-black"
                : "text-gray-500"
            }`}
          >
            {tabValue.key === "jobs" ? "Jobs" : "View"}
          </button>
        ))}
      </div>

      <DataTable
        showExportButton={tab === "jobs" ? false : true}
        columns={tab === "jobs" ? columnsJobs : columnsOfView}

        data={DUMMY_DATA}
        searchKeys={["name", "sku"]}
        filterOptions={Object.keys(STATUS_COLORS)}
        showCustomButton={null}
      />
    </div>
  );
}
