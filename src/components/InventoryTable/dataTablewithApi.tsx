"use client";

import React, { useState, useEffect, ChangeEventHandler, useMemo } from "react";
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
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash/debounce";

type Column<T> = {
  key: keyof T | string;
  title: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
};

type QueryResult<T> = {
  data: T[];
  total: number;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  queryKey: any[];
  queryFn: (params: {
    page: number;
    perPage: number;
    search?: string;
    filter?: string;
    sortKey?: string | null;
    sortOrder?: "asc" | "desc";
  }) => Promise<QueryResult<T>>;
  searchKeys?: (keyof T)[];
  filterOptions?: string[];
  showExportButton?: boolean;
  perPageOptions?: number[];
  showCustomButton?: React.ReactNode;
  placeholder?: string;
};

export default function DataTableApi<T extends Record<string, any>>({
  columns,
  queryKey,
  queryFn,
  searchKeys = [],
  filterOptions = [],
  showExportButton = true,
  placeholder = "Search in the table...",
  perPageOptions = [5, 10, 25, 50],
  showCustomButton,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState(search);
  const [filter, setFilter] = useState<string | undefined>();
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(perPageOptions[1]);

  // 🔹 TanStack Query
  // use debouncedSearch in the query key and when calling queryFn so the API
  // is only invoked after the user stops typing for 300ms
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      ...queryKey,
      page,
      perPage,
      searchData,
      filter,
      sortKey,
      sortOrder,
    ],

    queryFn: () =>
      queryFn({
        page,
        perPage,
        search: searchData,
        filter,
        sortKey,
        sortOrder,
      }),
  });
  const rows = data?.data ?? [];
  const totalPages = data?.total ?? 0;
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-4 bg-card rounded-xl shadow">
      {/* Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {searchKeys.length > 0 && (
            <Input
              placeholder={placeholder}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                debounce(() => setSearchData(e.target.value), 1500)();
              }}
              className="max-w-xs w-full sm:w-64"
            />
          )}

          {filterOptions.length > 0 && (
            <Select
              onValueChange={(val) => {
                setFilter(val);
                setPage(1);
              }}
            >
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

        <div className="w-full md:w-auto flex-row gap-2 flex justify-end">
          {showCustomButton && showCustomButton}
          {showExportButton && (
            <Button
              className="bg-mind-light-green hover:bg-mind-light-green text-white w-full md:w-40 h-10"
              onClick={() => console.log("Export Clicked")}
            >
              <ArrowUpFromLineIcon className="w-4 h-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="text-center py-10 text-gray-500">Loading data...</div>
      ) : isError ? (
        <div className="text-center py-10 text-red-500">
          Failed to load data
        </div>
      ) : rows.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No data found</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>
                <input type="checkbox" />
              </TableCell>

              {columns.map((col, index) => (
                <TableHead key={index}>
                  {col.sortable ? (
                    <button
                      onClick={() => handleSort(col.key.toString())}
                      className="flex items-center gap-1"
                    >
                      {col.title}
                      <ArrowUpDown size={14} />
                    </button>
                  ) : (
                    col.title
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((row: T, i: number) => (
              <TableRow key={i}>
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                {columns.map((col, idx) => (
                  <TableCell key={idx}>
                    {col.render ? col.render(row) : row[col.key as keyof T]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          Showing {data?.total}
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={data?.hasPreviousPage == false ? true : false}
          >
            <ChevronLeft size={16} />
          </Button>
          <span>{page}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={data?.hasNextPage == false ? true : false}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
