import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "../statusBedage/badage";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";


interface Order{
  id: string;
  brand: string;
  platformIcon: string;
  imageQuery: string;
  productName: string;
  sku: string;
  variantSize: string;
  variantColor: string;
  status: string;
}


export function OrdersTable({
  dataGet,
}: {
  dataGet: {
    data: Order[] 
    headers: string[]
  }
}) {
  return (
    <div className="bg-gray-50 overflow-hidden rounded-2xl  shadow-sm">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow className="border-b border-border">
            <TableHead className="w-12">
              <Checkbox aria-label="Select all orders" />
            </TableHead>
            {dataGet.headers.map((header) => (
              <TableHead
                className="text-sm font-semibold text-foreground"
                key={header}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataGet.data?.map((order: Order) => (
            <TableRow
              key={order.id}
              className="border-b border-border/80 transition-colors hover:bg-secondary"
            >
              <TableCell>
                <Checkbox aria-label={`Select order ${order.id}`} />
              </TableCell>
              <TableCell className="font-semibold text-foreground">
                {order.id}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {order.brand}
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  <Image
                    alt="Platform icon"
                    src={"images/platform.svg"}
                    width={70}
                    height={29}
                  />
                </span>
              </TableCell>
              <TableCell>
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-secondary">
                  <Image
                    src={`/.jpg?height=48&width=48&query=${order.imageQuery}`}
                    alt={order.productName}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="text-pretty text-sm text-foreground">
                {order.productName}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {order.sku}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm">
                  <Badge className="rounded-full bg-[color:var(--badge-primary-bg)] px-3 py-0.5 text-[color:var(--badge-primary-fg)]">
                    {order.variantSize}
                  </Badge>
                  <Badge className="rounded-full bg-secondary px-3 py-0.5 text-muted-foreground">
                    {order.variantColor}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={order.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end px-4 py-3">
        <Pagination aria-label="Pagination" className="justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
