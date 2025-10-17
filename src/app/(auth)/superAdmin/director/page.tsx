"use client";
import React, { useState } from "react";
import { PencilIcon, Send, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateAdminModal from "@/components/modal/createAdmin/page";
import DataTableApi from "@/components/InventoryTable/dataTablewithApi";
import { getStores } from "@/lib/services/store.service";
import type { Store } from "@/lib/services/store.service";
import { TablesRowTypes } from "@/lib/types/table.types";
const StorePage = () => {
  const storeAdminTable = [
    {
      key: "directorName",
      title: "Director Name",
      render: (row: TablesRowTypes) => <span>{row.name}</span>,
    },
    {
      key: "directorId",
      title: "Director ID",
      render: (row: TablesRowTypes) => <span>{row.id}</span>,
    },
    {
      key: "director_email",
      title: "Director Email",
      render: (row: TablesRowTypes) => (
        <span className="">{row.admin_email || "N/A"}</span>
      ),
    },
    {
      key: "action",
      title: "Action",
      render: () => (
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
      key: "director_client",
      title: "Director Client",
      render: () => (
        <div>
          <button className="text-black underline bg-[#FFE9AE] rounded-md px-2 py-2 mr-3">
            <PencilIcon className="w-4 h-4" />
          </button>
        </div>
      ),
    },
    {
      key: "invite",
      title: "Send Invite",
      render: () => (
        <div>
          <Button className="bg-[#20A29A] hover:bg-[#20A29A] text-white">
            <Send className="text-white" />
            <span>Send Invite</span>
          </Button>
        </div>
      ),
    },
  ];
  const [createAdminModalOpen, setCreateAdminModalOpen] = useState({
    open: false,
    data: null,
  });

  return (
    <div className="p-6 bg-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manage & Create Director </h1>
          <p className="text-sm text-gray-500">Manage Director</p>
        </div>
        <Button
          className="bg-[#004370] hover:bg-[#004370] text-white h-14 w-48"
          onClick={() => setCreateAdminModalOpen({ open: true, data: null })}
        >
          <span> Create New Director</span>
        </Button>
      </div>
      {createAdminModalOpen.open && (
        <CreateAdminModal
          open={createAdminModalOpen.open}
          data={createAdminModalOpen.data}
          isEditModal={createAdminModalOpen?.data == null ? false : true}
          setOpenModal={() =>
            setCreateAdminModalOpen({ open: false, data: null })
          }
        />
      )}
      <DataTableApi<TablesRowTypes>
        columns={storeAdminTable}
        queryKey={["users"]}
        queryFn={async ({ page, perPage, search, sortKey, sortOrder }) => {
          const res = await getStores({
            page,
            limit: perPage,
            search,
            sortBy: sortKey ?? "createdAt",
            sortOrder,
          });
          const data: TablesRowTypes[] = Array.isArray(res.data)
            ? res.data.map((s: Store) => ({
                id: s.id,
                name: s.name,
                admin_email: s.creator?.email ?? "",
                // defaults to satisfy table type
                brand: "",
                platform: "",
                image: "",
                img: "",
                sku: "",
                variantSize: "",
                variantColor: "",
                status: "",
                quantity: 0,
              }))
            : [];
          return {
            data,
            total: res.total ?? 0,
          };
        }}
        placeholder="Search by Store Name, Admin Name, Store ID"
        searchKeys={["name"]}
        filterOptions={[]}
        showExportButton={false}
      />
    </div>
  );
};

export default StorePage;
