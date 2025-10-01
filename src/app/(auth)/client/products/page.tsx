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
import { DUMMY_DATA, STATUS_COLORS } from "@/constant/product";
import AssignModal from "@/components/modal/AssignModal/assignModal";

export default function FulfillmentsTable() {
  const [tab, setTab] = useState("orders");
  const [search, setSearch] = useState("");
  const [openAssignModal, setOpenAssignModal] = useState({
    open: false,
    products: [],
  });
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [sortKey, setSortKey] = useState<"name" | "status" | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);

  // 🔍 Filtering + Searching + Sorting
  const filteredData = useMemo(() => {
    let data = [...DUMMY_DATA];

    if (search) {
      data = data.filter(
        (d) =>
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.sku.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter) {
      data = data.filter((d) => d.status === filter);
    }

    if (sortKey) {
      data = data.sort((a, b) =>
        a[sortKey].toString().localeCompare(b[sortKey].toString())
      );
    }

    return data;
  }, [search, filter, sortKey]);

  // 📄 Pagination
  const paginatedData = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredData.slice(start, start + perPage);
  }, [filteredData, page, perPage]);

  const totalPages = Math.ceil(filteredData.length / perPage);

  return (
    <div className="px-g-card ">
      <AssignModal
        open={openAssignModal.open}
        setOpenModal={() =>
          setOpenAssignModal({
            open: !openAssignModal.open,
            products: openAssignModal.products,
          })
        }
        products={openAssignModal.products}
      />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Product Sync</h1>
          <p className="text-sm text-gray-500">
            Choose products to send to Darkful and allocate quantities across
            fulfillment points.
          </p>
        </div>
      </div>

      {/* Tabs */}
      {/* <Tabs value={tab} onValueChange={setTab} className="mb-4">
        <TabsList>
          <TabsTrigger value="orders">View Orders</TabsTrigger>
          <TabsTrigger value="transfer">View Transfer</TabsTrigger>
        </TabsList>
      </Tabs> */}
      <div className="flex gap-6 mb-6  border-b border-gray-200">
        <button
          className={`pb-1 text-sm font-medium ${"text-black border-b-2 border-black"}`}
        >
          Jobs
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-row ">
        <div className="flex gap-4 mb-6 flex-grow">
          <Input
            placeholder="Search by SKU, Brand, or name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <Select onValueChange={setFilter}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(STATUS_COLORS).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button
            variant={"outline"}
            className="w-50 mr-5 bg-[#BBF7D0] text-[#15803D] hover:bg-[#BBF7D0] hover:text-[#15803D] "
          >
            <span className="text-green-700 animate-pulse text-1xl">●</span>{" "}
            Connected to Salla
          </Button>
          <Button className="w-50 bg-[#003366] hover:bg-[#003366] text-white">
            Sync Now
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <input type="checkbox" />
            </TableHead>
            <TableHead>Image</TableHead>
            <TableHead>
              <button
                onClick={() => setSortKey("name")}
                className="flex items-center gap-1"
              >
                Product Name <ArrowUpDown size={14} />
              </button>
            </TableHead>
            <TableHead>Product Variants</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead className="text-center">Available Quantity</TableHead>
            <TableHead>
              <button
                className="flex items-center gap-1"
              >
                Action
              </button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
              <TableCell>
                <Image
                  width={70}
                  height={40}
                  src={"/images/platform.svg"}
                  alt={item.platform}
                  className=" rounded-md "
                />
              </TableCell>
              <TableCell>{item.brand}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Badge>{item.variantSize}</Badge>
                  <Badge variant="outline">{item.variantColor}</Badge>
                </div>
              </TableCell>
              <TableCell>{item.sku}</TableCell>

              <TableCell className="text-lg text-center">
                {item.quantity}
              </TableCell>

              <TableCell>
                <Button
                  variant="outline"
                  className="bg-yellow-400 hover:bg-yellow-400 text-white"
                  onClick={() => setOpenAssignModal({ open: true, products: [item] })}
                >
                  Assign
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
       <div>

       </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft size={16} />
            </Button>
            <span>{page}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
