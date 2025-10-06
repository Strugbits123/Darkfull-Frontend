"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Edit } from "lucide-react";

export default function CreateManagerPage() {
  const users = [
    {
      name: "Lisa Anderson",
      email: "sarah.smith@example.com",
      store: "Fashion",
      createdDate: "Dec 7, 2024",
      role: "Manager",
    },
    {
      name: "Elsa Parker",
      email: "sarah.smith@example.com",
      store: "Zara",
      createdDate: "Aug 11, 2023",
      role: "Worker",
    },
    {
      name: "Lisa Williams",
      email: "sarah.smith@example.com",
      store: "Anne Al Bernard",
      createdDate: "Jun 1, 2025",
      role: "Manager",
    },
  ];

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Create Manager</h1>
          <p className="text-xl text-gray-500">Manage Manager Setting</p>
        </div>
        <Button className="w-45 h-12 bg-[#004370] hover:bg-[##004370] text-white">
          Add New User
        </Button>
      </div>

      {/* Table */}
      <div className="border e rounded-md overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Store Name</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>User Role</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.store}</TableCell>
                <TableCell>{user.createdDate}</TableCell>
                <TableCell>
                  <Select defaultValue={user.role}>
                    <SelectTrigger className="w-[120px] h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Worker">Worker</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="flex justify-center gap-2">
                  <Button size="icon" variant="ghost" className="text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-blue-500">
                    <Edit className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
