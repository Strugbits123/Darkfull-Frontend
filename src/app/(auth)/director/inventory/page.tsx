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
  const [search, setSearch] = useState("");
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
  let inventoryHeader = [
    { title: "Image", key: "image" },
    { title: "Product Name", key: "name" },
    { title: "Product Variants", key: "variant" },
    { title: "SKU", key: "sku" },
    { title: "Fulfillment Point", key: "platform" },
    { title: "Available Quantity", key: "quantity" },
  ];

  return (
    <div className="p-6 bg-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Inventory</h1>
          <p className="text-sm text-gray-500">
            Manage and view inventory items
          </p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
          Export
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-6  border-b border-gray-200">
        <button
          className={`pb-1 text-sm font-medium ${"text-black border-b-2 border-black"}`}
        >
          View
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search by SKU, Product Variant or name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select onValueChange={setFilter}>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Filter by SKU or Fulfillment Point" />
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

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <input type="checkbox" />
            </TableHead>

            {
              inventoryHeader.map((header) => (
                <TableHead key={header.key}>
                  {/* agar sort button dalna hai */}
                  {header.key === "status" ? (
                    <button
                      onClick={() => setSortKey("status")}
                      className="flex items-center gap-1"
                    >
                      {header.title} <ArrowUpDown size={14} />
                    </button>
                  ) : (
                    header.title
                  )}
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <input type="checkbox" />
              </TableCell>

              {
                inventoryHeader.map((header) => (
                  <TableCell key={header.key}>
                    {/* conditionally render based on key */}
                    {header.key === "image" ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                    ) : header.key === "variant" ? (
                      <div className="flex gap-2">
                        <Badge>{item.variantSize}</Badge>
                        <Badge variant="outline">{item.variantColor}</Badge>
                      </div>
                    ) : header.key === "status" ? (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          STATUS_COLORS[item.status]
                        }`}
                      >
                        {item.status}
                      </span>
                    ) : (
                      header.key == "quantity" ? (
                        <span className="font-medium text-2xl center">{item[header.key]}</span>
                      ) : (
                        item[header.key as keyof Product]
                      )
                    )}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">
          Showing {(page - 1) * perPage + 1} to{" "}
          {Math.min(page * perPage, filteredData.length)} of{" "}
          {filteredData.length} results
        </p>
        <div className="flex items-center gap-4">
          <Select onValueChange={(val) => setPerPage(Number(val))}>
            <SelectTrigger className="w-28">
              <SelectValue placeholder={`${perPage} per page`} />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 25, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size} per page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
