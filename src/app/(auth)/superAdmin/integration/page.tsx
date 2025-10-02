"use client";
import React, { useState, useMemo } from "react";
import { DUMMY_DATA, STATUS_COLORS } from "@/constant/product";
import DataTable from "@/components/InventoryTable/dataTable";
import { PencilIcon, Send, Store, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateAdminModal from "@/components/modal/createAdmin/page";
const IntegrationPage = () => {

  const integrationTable = [
    {
      key: "storeAdminName",
      title: "Store Admin Name",
      render: (row: any) => <span>{row.name}</span>,
    },
    {
      key: "adminName",
      title: "Admin Name",
      render: (row: any) => <span>{row.id}</span>,
    },
    {
      key: "admin_email",
      title: "Admin Email",
      render: (row: any) => (
        <span className="">{row.admin_email || "N/A"}</span>
      ),
    },
    {
      key: "action",
      title: "Action",
      render: (row: any) => (
        <div>
          <button className="text-gray-600 underline bg-gray-300 rounded-md px-2 py-2 mr-3">
            <PencilIcon className="w-4 h-4" />
          </button>
          <button className="text-red-600 underline bg-red-300 rounded-md px-2 py-2">
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      ),
    },
    {
      key: "invite",
      title: "Send Invite",
      render: (row: any) => (
        <div>
          <Button className="bg-[#20A29A] hover:bg-[#20A29A] text-white">
            <Send className="text-white" />
            <span>Send Invite</span>
          </Button>
        </div>
      ),
    },
  ];
  const [createAdminModalOpen, setCreateAdminModalOpen] = useState(false);

  return (
    <div className="p-6 bg-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manage Store & Admin</h1>
          <p className="text-sm text-gray-500">Manage Admin </p>
        </div>
        
      </div>
      <CreateAdminModal open={createAdminModalOpen} setOpenModal={() => setCreateAdminModalOpen(!createAdminModalOpen)} />
      
      <DataTable
        columns={integrationTable}
        data={DUMMY_DATA}
        searchKeys={[]}
        filterOptions={[]}
        showExportButton={false}
        showFilterByStatus={false}
      />
    </div>
  );
};

export default IntegrationPage;
