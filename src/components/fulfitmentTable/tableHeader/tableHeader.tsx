import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { OrdersTable } from "../fulfitmentTable";
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
interface DataInterface {
  headers?: string[];
  data?: Order[];
  filterOptions?: string[];
  headingName?: string;
  description?: string;
}

const TableHeader = ({ data }: { data: DataInterface }) => {
  return (
    <section className=" p-3">
      <header className="mb-6 space-y-2">
        <h1 className="text-balance text-3xl font-semibold text-foreground">
          {data.headingName}
        </h1>
        <p className="text-sm text-muted-foreground">{data.description}</p>
      </header>

      <Tabs defaultValue="orders" className="space-y-3">
        <TabsList className="w-70 justify-start gap-2 bg-white">
          <TabsTrigger
            value="orders"
            style={{
              border: "none",
              backgroundColor: "white",
              boxShadow: "none",
            }}
            className="w-2.5 bg-white"
          >
            View Orders
          </TabsTrigger>
          <TabsTrigger
            value="transfer"
            style={{
              border: "none",
              backgroundColor: "white",
              boxShadow: "none",
            }}
          >
            View Transfer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 flex-col gap-4 md:flex-row">
              <div className="flex items-center gap-1 h-[calc(100%)] min-w-[500px] rounded-xl border border-input bg-card px-4 text-sm text-muted-foreground shadow-sm">
                <Search className="h-4 w-4" aria-hidden="true" />
                <Input
                  type="search"
                  placeholder="Search by SKU, Brand, or name"
                  size={20}
                  className="border-none px-0 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
                />
              </div>
              <Select defaultValue={data?.filterOptions?.[0] ?? "All"}>
                <SelectTrigger className="flex-1 rounded-xl border  bg-card px-4 py-3 text-left text-sm text-muted-foreground shadow-sm md:max-w-[220px]">
                  <SelectValue placeholder="Filter by SKU, or Status" />
                </SelectTrigger>
                <SelectContent>
                  {data?.filterOptions?.map((option) => (
                    <SelectItem key={option} value={option.toLowerCase()}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="rounded-xl bg-accent px-20 py-5 text-sm font-semibold text-accent-foreground shadow-sm hover:bg-[color:color-mix(in_srgb,var(--accent)_92%,var(--card)_8%)]">
              Export
            </Button>
          </div>

          <OrdersTable dataGet={data ?? []} headers={data.headers ?? []} />
        </TabsContent>

        <TabsContent value="transfer">
          <div className="rounded-2xl border border-dashed border-border/60 p-8 text-center text-sm text-muted-foreground">
            Transfer records will appear here once available.
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default TableHeader;
