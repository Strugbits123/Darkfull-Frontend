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

type Product = {
  id: string;
  brand: string;
  platform: string;
  image: string;
  name: string;
  sku: string;
  variantSize: string;
  variantColor: string;
  status:
    | "Returned"
    | "Shipped"
    | "Picked"
    | "Packed"
    | "New"
    | "Delivered"
    | "Cancelled";
};

const STATUS_COLORS: Record<string, string> = {
  Returned: "bg-orange-200 text-orange-800",
  Shipped: "bg-blue-200 text-blue-800",
  Picked: "bg-gray-300 text-gray-800",
  Packed: "bg-gray-200 text-gray-800",
  New: "bg-yellow-200 text-yellow-800",
  Delivered: "bg-green-200 text-green-800",
  Cancelled: "bg-red-200 text-red-800",
};

// Dummy data
const DUMMY_DATA: Product[] = [
  {
    id: "10454646",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Premium Wireless Headphones",
    sku: "WH-001-BLK",
    variantSize: "S",
    variantColor: "White",
    status: "Returned",
  },
  {
    id: "34567890",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Premium Wireless Headphones",
    sku: "SW-042-SLV",
    variantSize: "M",
    variantColor: "White",
    status: "Shipped",
  },
  {
    id: "56789012",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Organic Cotton T-Shirt",
    sku: "CT-WHT-M",
    variantSize: "L",
    variantColor: "White",
    status: "Delivered",
  },
  {
    id: "89012345",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Premium Leather Wallet",
    sku: "LW-BRN-001",
    variantSize: "XL",
    variantColor: "White",
    status: "Cancelled",
  },
  {
    id: "10454646",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Premium Wireless Headphones",
    sku: "WH-001-BLK",
    variantSize: "S",
    variantColor: "White",
    status: "Returned",
  },
  {
    id: "34567890",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Premium Wireless Headphones",
    sku: "SW-042-SLV",
    variantSize: "M",
    variantColor: "White",
    status: "Shipped",
  },
  {
    id: "56789012",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Organic Cotton T-Shirt",
    sku: "CT-WHT-M",
    variantSize: "L",
    variantColor: "White",
    status: "Delivered",
  },
  {
    id: "89012345",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Premium Leather Wallet",
    sku: "LW-BRN-001",
    variantSize: "XL",
    variantColor: "White",
    status: "Cancelled",
  },
  {
    id: "10454646",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Premium Wireless Headphones",
    sku: "WH-001-BLK",
    variantSize: "S",
    variantColor: "White",
    status: "Returned",
  },
  {
    id: "34567890",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Premium Wireless Headphones",
    sku: "SW-042-SLV",
    variantSize: "M",
    variantColor: "White",
    status: "Shipped",
  },
  {
    id: "56789012",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Organic Cotton T-Shirt",
    sku: "CT-WHT-M",
    variantSize: "L",
    variantColor: "White",
    status: "Delivered",
  },
  {
    id: "89012345",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Premium Leather Wallet",
    sku: "LW-BRN-001",
    variantSize: "XL",
    variantColor: "White",
    status: "Cancelled",
  },
  {
    id: "10454646",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Premium Wireless Headphones",
    sku: "WH-001-BLK",
    variantSize: "S",
    variantColor: "White",
    status: "Returned",
  },
  {
    id: "34567890",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Premium Wireless Headphones",
    sku: "SW-042-SLV",
    variantSize: "M",
    variantColor: "White",
    status: "Shipped",
  },
  {
    id: "56789012",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Organic Cotton T-Shirt",
    sku: "CT-WHT-M",
    variantSize: "L",
    variantColor: "White",
    status: "Delivered",
  },
  {
    id: "89012345",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Premium Leather Wallet",
    sku: "LW-BRN-001",
    variantSize: "XL",
    variantColor: "White",
    status: "Cancelled",
  },
  {
    id: "10454646",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Premium Wireless Headphones",
    sku: "WH-001-BLK",
    variantSize: "S",
    variantColor: "White",
    status: "Returned",
  },
  {
    id: "34567890",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Premium Wireless Headphones",
    sku: "SW-042-SLV",
    variantSize: "M",
    variantColor: "White",
    status: "Shipped",
  },
  {
    id: "56789012",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Organic Cotton T-Shirt",
    sku: "CT-WHT-M",
    variantSize: "L",
    variantColor: "White",
    status: "Delivered",
  },
  {
    id: "89012345",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Premium Leather Wallet",
    sku: "LW-BRN-001",
    variantSize: "XL",
    variantColor: "White",
    status: "Cancelled",
  },
  {
    id: "10454646",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Premium Wireless Headphones",
    sku: "WH-001-BLK",
    variantSize: "S",
    variantColor: "White",
    status: "Returned",
  },
  {
    id: "34567890",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Premium Wireless Headphones",
    sku: "SW-042-SLV",
    variantSize: "M",
    variantColor: "White",
    status: "Shipped",
  },
  {
    id: "56789012",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Organic Cotton T-Shirt",
    sku: "CT-WHT-M",
    variantSize: "L",
    variantColor: "White",
    status: "Delivered",
  },
  {
    id: "89012345",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Premium Leather Wallet",
    sku: "LW-BRN-001",
    variantSize: "XL",
    variantColor: "White",
    status: "Cancelled",
  },
  {
    id: "10454646",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Premium Wireless Headphones",
    sku: "WH-001-BLK",
    variantSize: "S",
    variantColor: "White",
    status: "Returned",
  },
  {
    id: "34567890",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Premium Wireless Headphones",
    sku: "SW-042-SLV",
    variantSize: "M",
    variantColor: "White",
    status: "Shipped",
  },
  {
    id: "56789012",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Organic Cotton T-Shirt",
    sku: "CT-WHT-M",
    variantSize: "L",
    variantColor: "White",
    status: "Delivered",
  },
  {
    id: "89012345",
    brand: "Becomfy",
    platform: "Salla",
    image: "https://via.placeholder.com/40",
    name: "Premium Leather Wallet",
    sku: "LW-BRN-001",
    variantSize: "XL",
    variantColor: "White",
    status: "Cancelled",
  },
];

export default function FulfillmentsTable() {
  const [tab, setTab] = useState("orders");
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

  return (
    <div className="p-6 bg-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Fulfillments</h1>
          <p className="text-sm text-gray-500">View orders to be fulfilled</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
          Export
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab} className="mb-4">
        <TabsList>
          <TabsTrigger value="orders">View Orders</TabsTrigger>
          <TabsTrigger value="transfer">View Transfer</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
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

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <input type="checkbox" />
            </TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>
              <button
                onClick={() => setSortKey("name")}
                className="flex items-center gap-1"
              >
                Product Name <ArrowUpDown size={14} />
              </button>
            </TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Product Variants</TableHead>
            <TableHead>
              <button
                onClick={() => setSortKey("status")}
                className="flex items-center gap-1"
              >
                Status <ArrowUpDown size={14} />
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
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.brand}</TableCell>
              <TableCell>
                <Image
                  width={70}
                  height={40}
                  src={"/images/platform.svg"}
                  alt={item.platform}
                  className=" rounded-md "
                />
              </TableCell>
              <TableCell>
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-10 w-10 rounded-md object-cover"
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Badge>{item.variantSize}</Badge>
                  <Badge variant="outline">{item.variantColor}</Badge>
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    STATUS_COLORS[item.status]
                  }`}
                >
                  {item.status}
                </span>
              </TableCell>
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
