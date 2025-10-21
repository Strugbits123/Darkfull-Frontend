"use client";
import React, { useState } from "react";
import { PencilIcon, Send, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateAdminModal from "@/components/modal/createAdmin/page";
import DataTableApi from "@/components/InventoryTable/dataTablewithApi";
import { deletePlatform, getStores } from "@/lib/services/platfrom.service";
import type { Store } from "@/lib/services/platfrom.service";
import { TablesRowTypes } from "@/lib/types/table.types";
import { toast } from "sonner";
import ApiErrorHandler from "@/lib/utils/error-handler";
import { useQueryClient } from "@tanstack/react-query";
import { removeByIdFromQueryCaches } from "@/lib/utils";
const StorePage = () => {
  const queryClient = useQueryClient();
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
      render: (row: TablesRowTypes) => {
        return (
          <span className="">{row?.invitations?.[0]?.email || "N/A"}</span>
        );
      },
    },
    {
      key: "phone_number",
      title: "Phone Number",
      render: (row: TablesRowTypes) => {
        return (
          <span className="">{row?.invitations?.[0]?.email || "N/A"}</span>
        );
      },
    },
    {
      key: "action",
      title: "Action",
      render: (row: TablesRowTypes) => (
        <div>
          <button
            className="text-gray-600 underline bg-gray-300 rounded-md px-2 py-2 mr-3"
            onClick={() => {
              setCreateAdminModalOpen({
                open: true,
                data: row,
              });
            }}
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            className="text-red-600 underline bg-red-300 rounded-md px-2 py-2"
            onClick={() => {
              console.log("0000");
              removeDirector(String(row.id));
            }}
          >
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
          <button className="text-black  bg-[#FFE9AE] rounded-md px-2 py-2 mr-3">
            <p className="px-4"> View Client</p>
          </button>
        </div>
      ),
    },
    {
      key: "invite",
      title: "Send Invite",
      render: (row: TablesRowTypes) => (
        <div>
          <Button
            className="bg-[#20A29A] hover:bg-[#20A29A] text-white"
            disabled={row?.invitations[0]?.status === "ACCEPTED"}
          >
            <Send className="text-white" />
            <span>
              {row?.invitations[0]?.status === "ACCEPTED"
                ? "  Accepted"
                : "Send Invite"}
            </span>
          </Button>
        </div>
      ),
    },
  ];

  async function removeDirector(directorId: string) {
    try {
      const res = await deletePlatform(directorId);
      removeByIdFromQueryCaches<TablesRowTypes>(
        queryClient,
        ["users"],
        directorId,
        (item) => item.id as string | number
      );
      toast.success("Director removed successfully!");
    } catch (error) {
      const msg = ApiErrorHandler.getErrorMessage(error);
      toast.error(msg);
    }
  }
  const [createAdminModalOpen, setCreateAdminModalOpen] = useState<{
    open: boolean;
    data: any;
  }>({
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
                invitations: s.invitations.map((val) => ({
                  email: val.email,
                  status: val.status,
                  id: val?.id,
                  role: val?.role,
                  firstName: val.firstName,
                  lastName: val?.lastName,
                  fullName: val?.fullName,
                })),
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
    </div>
  );
};

export default StorePage;
