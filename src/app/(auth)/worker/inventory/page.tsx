"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";

import { DUMMY_DATA, STATUS_COLORS } from "@/constant/product";
import DataTable from "@/components/InventoryTable/dataTable";
import AssignInventory from "@/components/modal/assignInventory/assignInventory";
import PutawayModal from "@/components/modal/workerModal/PutawayModal/putway";
import ReceivedModal from "@/components/modal/workerModal/receivedModal/receivedModal";
import Image from "next/image";
import { AssignProduct, TablesRowTypes } from "@/lib/types/table.types";

export default function InventoryTable() {
  const [modalShow, setModalShow] = useState({
    receivedModal: false,
    newModal: false,
  });
  function checkTheStatus(status: string) {
    console.log(status);
    if (status === "Received") {
      setModalShow({ ...modalShow, receivedModal: true });
    } else if (status === "New") {
      setModalShow({ ...modalShow, newModal: true });
    }
  }

  const columnsView = [
    {
      key: "image",
      title: "Image",
      render: (row: TablesRowTypes) => (
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
      render: (row: TablesRowTypes) => (
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
      render: (row: TablesRowTypes) => <span className="text-lg">{row.quantity}</span>,
    },
    {
      key: "status",
      title: "Status",
      sortable: true,
      render: (row: TablesRowTypes) => (
        <button
          onClick={() => {
            checkTheStatus(row.status);
          }}
        >
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              STATUS_COLORS[row.status]
            }`}
          >
            {row.status}
          </span>
        </button>
      ),
    },
  ];

  const [openAssignModal, setOpenAssignModal] = useState<{
    open: boolean;
    products: AssignProduct[];
  }>({ open: false, products: [] });
  return (
    <div className="p-6 bg-card">
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Inventory</h1>
          <p className="text-sm text-gray-500">
            Manage and view inventory items
          </p>
        </div>
      </div>
      <div className="flex gap-6 mb-`  border-b border-gray-200">
        <button
          className={`pb-1 text-sm font-medium ${"text-black border-b-2 border-black"}`}
        >
          {"Job"}
        </button>
      </div>

      <DataTable
        columns={columnsView}
        data={(DUMMY_DATA as unknown) as TablesRowTypes[]}        searchKeys={["name", "sku"]}
        filterOptions={Object.keys(STATUS_COLORS)}
      />
      <ReceivedModal
        open={modalShow.newModal}
        setOpenModal={() =>
          setModalShow({ ...modalShow, newModal: false })
        }
      />
      <PutawayModal
        products={[]}
        showQuantity={false}
        open={modalShow.receivedModal}
        setOpenModal={() => {
          setModalShow({ ...modalShow, receivedModal: false });
        }}
      />
      <AssignInventory
        products={openAssignModal.products}
        open={openAssignModal.open}
        setOpenModal={() => {
          setOpenAssignModal({ open: false, products: [] });
        }}
      />
    </div>
  );
}
