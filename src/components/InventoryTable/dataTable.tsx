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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUpFromLineIcon,
} from "lucide-react";

type Column<T> = {
  key: keyof T | string;
  title: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  searchKeys?: (keyof T)[];
  filterOptions?: string[];
    showExportButton?: boolean;
  perPageOptions?: number[];
};

export default function DataTable<T extends Record<string, any>>({
  columns,
  data,
  searchKeys = [],
  filterOptions = [],
  showExportButton = true,
  perPageOptions = [5, 10, 25, 50],
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string | undefined>();
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(perPageOptions[1]);
  // 🔍 Filtering + Searching + Sorting
  const filteredData = useMemo(() => {
    let rows = [...data];

    // Search
    if (search && searchKeys.length) {
      rows = rows.filter((row) =>
        searchKeys.some((key) =>
          row[key]?.toString().toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    // Filter
    if (filter) {
      rows = rows.filter((row) =>
        Object.values(row).some((val) => val?.toString() === filter)
      );
    }

    // Sort
    if (sortKey) {
      rows.sort((a, b) =>
        a[sortKey!].toString().localeCompare(b[sortKey!].toString())
      );
    }

    return rows;
  }, [search, filter, sortKey, data]);

  // 📄 Pagination
  const paginatedData = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredData.slice(start, start + perPage);
  }, [filteredData, page, perPage]);

  const totalPages = Math.ceil(filteredData.length / perPage);
  return (
    <div className="p-4 bg-card rounded-xl shadow">
      {/* Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
        {/* Left side (Search + Filter) */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {searchKeys.length > 0 && (
            <Input
              placeholder="Search in the table..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs w-full sm:w-64"
            />
          )}

          {filterOptions.length > 0 && (
            <Select onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-56">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Right side (Export button) */}
        <div className="w-full md:w-auto">
          {showExportButton && (
          <Button className="bg-mind-light-green hover:bg-mind-light-green text-white w-full md:w-40 h-10">
            <ArrowUpFromLineIcon className="w-4 h-4 mr-2" />
            Export
          </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>
              <input type="checkbox" />
            </TableCell>
            {columns.map((col, index) => {
              return (
                <TableHead key={index + Math.random()}>
                  {col.sortable ? (
                    <button
                      onClick={() => setSortKey(col.key.toString())}
                      className="flex items-center gap-1"
                    >
                      {col.title} <ArrowUpDown size={14} />
                    </button>
                  ) : (
                    col.title
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, i) => (
            <TableRow key={i + Math.random()}>
              <TableCell>
                {" "}
                <input type="checkbox" />{" "}
              </TableCell>
              {columns.map((col,index) => (
                <TableCell key={index + Math.random()}>
                  {col.render ? col.render(row) : row[col.key as keyof T]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2" />
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
