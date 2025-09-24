"use client";

import React, { useState } from "react";
import { Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import ProfileAvatar from "@/components/common/ProfileAvatar";
import {
  DirectorProfile,
  TableColumn,
  ActionButton,
} from "@/lib/types/profile.types";
import { OrdersTable } from "@/components/fulfitmentTable/fulfitmentTable";
import TableHeader from "@/components/fulfitmentTable/tableHeader/tableHeader";
import { headers } from "next/headers";

// Mock data - replace with actual API call
const mockDirectors: DirectorProfile[] = [
  {
    id: "1",
    name: "Lila Anderson",
    email: "lila.anderson@darkful.com",
    designation: "Director",
    joiningDate: "Dec 7, 2024",
    platform: "Darkful",
    role: "Director",
    avatar: "/images/avatars/lila.jpg",
    status: "active",
    department: "Engineering",
    teamSize: 25,
  },
  {
    id: "2",
    name: "Ella Parker",
    email: "ella.parker@darkful.com",
    designation: "Director",
    joiningDate: "Aug 14, 2025",
    platform: "Darkful",
    role: "Director",
    avatar: "/images/avatars/ella.jpg",
    status: "active",
    department: "Marketing",
    teamSize: 18,
  },
  {
    id: "3",
    name: "Lisa Williams",
    email: "lisa.williams@darkful.com",
    designation: "Director",
    joiningDate: "Jun 1, 2025",
    platform: "Darkful",
    role: "Director",
    avatar: "/images/avatars/lisa.jpg",
    status: "active",
    department: "Operations",
    teamSize: 32,
  },
];

export default function DirectorProfilesPage() {
  const [directors, setDirectors] = useState<DirectorProfile[]>(mockDirectors);
  const [loading, setLoading] = useState(false);

  const handleViewProfile = (id: string) => {
    console.log("View profile:", id);
    // Navigate to profile detail page
  };

  const handleAddDirector = () => {
    console.log("Add new director");
    // Open add director modal or navigate to form
  };

  const handleDeleteDirectors = (selectedDirectors: DirectorProfile[]) => {
    console.log("Delete directors:", selectedDirectors);
    // Handle bulk delete
  };

  // Define table columns
  const columns: TableColumn<DirectorProfile>[] = [
    {
      key: "avatar",
      label: "Image",
      render: (_, row) => (
        <ProfileAvatar src={row.avatar} name={row.name} size="md" />
      ),
    },
    {
      key: "name",
      label: "Director Name",
      sortable: true,
      render: (value, row) => (
        <div className="space-y-1">
          <div className="font-medium text-gray-900 dark:text-gray-100">
            {value}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {row.email}
          </div>
        </div>
      ),
    },
    {
      key: "designation",
      label: "Designation",
      sortable: true,
      render: (value) => (
        <Badge
          variant="secondary"
          className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
        >
          {value}
        </Badge>
      ),
    },
    {
      key: "joiningDate",
      label: "Joining Date",
      sortable: true,
    },
    {
      key: "platform",
      label: "Platform",
      render: (value) => <Badge variant="outline">{value}</Badge>,
    },
  ];

  // Define action buttons
  const actions: ActionButton[] = [
    {
      label: "View Profile",
      icon: <Eye className="h-4 w-4" />,
      variant: "default",
      onClick: handleViewProfile,
    },
  ];

  let sendData = {
    headers: [
      "Order ID",
      "Brand",
      "Platform",
      "Image",
      "Product Name",
      "SKU",
      "Product Variants",
      "Status",
    ],
    data: [
      {
        id: "10454646",
        brand: "Becomefy",
        platform: "Salla",
        productName: "Premium Wireless Headphones",
        sku: "WH-001-BLK",
        variantSize: "S",
        variantColor: "White",
        status: "Returned",
        imageQuery: "modern%20wireless%20headphones",
      },
      {
        id: "34567890",
        brand: "Becomefy",
        platform: "Salla",
        productName: "Premium Wireless Headphones",
        sku: "SW-042-SLV",
        variantSize: "M",
        variantColor: "White",
        status: "Shipped",
        imageQuery: "wireless%20headphones%20silver",
      },
      {
        id: "12345678",
        brand: "Becomefy",
        platform: "Salla",
        productName: "Premium Wireless Headphones",
        sku: "CT-WHT-M",
        variantSize: "L",
        variantColor: "White",
        status: "Picked",
        imageQuery: "wireless%20headphones%20gray",
      },
      {
        id: "78901234",
        brand: "Becomefy",
        platform: "Salla",
        productName: "Premium Wireless Headphones",
        sku: "LW-BRN-001",
        variantSize: "XL",
        variantColor: "White",
        status: "Packed",
        imageQuery: "wireless%20headphones%20brown",
      },
      {
        id: "90123456",
        brand: "Becomefy",
        platform: "Salla",
        productName: "Wireless Phone Charger",
        sku: "WC-15W-WHT",
        variantSize: "S",
        variantColor: "Black",
        status: "New",
        imageQuery: "wireless%20phone%20charger",
      },
      {
        id: "98765432",
        brand: "Becomefy",
        platform: "Salla",
        productName: "Premium Wireless Headphones",
        sku: "WH-001-BLK",
        variantSize: "S",
        variantColor: "White",
        status: "Delivered",
        imageQuery: "wireless%20headphones%20black",
      },
      {
        id: "23456789",
        brand: "Becomefy",
        platform: "Salla",
        productName: "Smart Fitness Watch",
        sku: "SW-042-SLV",
        variantSize: "M",
        variantColor: "White",
        status: "Cancelled",
        imageQuery: "fitness%20watch%20silver",
      },
    ],
    filterOptions: ["All Status", "Returned", "Shipped", "Delivered"],
    headingName: "Fullfillments",
    description: "View all orders to be fulfilled",
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <TableHeader data={sendData} />
      </div>
    </div>
  );
}
