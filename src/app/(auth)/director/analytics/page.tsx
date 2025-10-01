"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarDays,
  Truck,
  Package,
  RefreshCcw,
  XCircle,
  Hourglass,
  ChartLine,
  Calendar,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Image from "next/image";
import { Calendar28 } from "@/components/Calender/calender";

const data = [
  { date: "20/09", orders: 560 },
  { date: "21/09", orders: 690 },
  { date: "22/09", orders: 600 },
  { date: "23/09", orders: 720 },
  { date: "24/09", orders: 650 },
];

export default function DirectorAnalytics() {
  return (
    <div className="px-3 py-3 space-y-6 bg-[#f9fafb]">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[36px] font-semibold">Director Analytics</h2>
          <p className="text-[14px] text-gray-500">View Analytics & Progress</p>
        </div>
        <div className="text-xs px-5 py-2 rounded-md bg-[#BBF7D0] text-green-700 font-medium">
          Connected with Salla
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* <Button
          variant="outline"
          className="flex items-center justify-between gap-2 w-full md:w-64 h-10 text-[14px]"
       
        </Button>  */}
        <Calendar28 showTitle={false} />
        <Select>
          <SelectTrigger className="w-full md:w-64 h-10 text-[14px]">
            <SelectValue placeholder="Fulfillment Point" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="point1">Fulfillment Point 1</SelectItem>
            <SelectItem value="point2">Fulfillment Point 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <StatCard
          title="TOTAL ORDERS"
          value="1,247"
          background="##FFFFFF"
          subtitle="Earliest: 4.2 hours"
          icon={<Calendar className="w-6 h-6 text-gray-400" />}
        />
        <StatCard
          title="IN PROGRESS"
          value="324"
          subtitle="Avg: 2.8 hours"
          background="#FFFBF0"
          icon={<Clock className="w-6 h-6 text-yellow-300" />}
        />
        <StatCard
          title="SHIPPED"
          value="456"
          subtitle="Avg: 1.5 hours"
          background="#F0F8FF"
          icon={<Truck className="w-6 h-6 text-blue-500" />}
        />
        <StatCard
          title="DELIVERED"
          value="389"
          background="#F0FFF0"
          subtitle="Avg: 4.2 hours"
          icon={<Package className="w-6 h-6 text-green-600" />}
        />
        <StatCard
          title="RETURNED"
          value="47"
          subtitle="Avg: 96.3 hours"
          background="#FFF0F0"
          icon={<RefreshCcw className="w-6 h-6 text-red-700" />}
        />
        <StatCard
          title="CANCELLED"
          value="31"
          subtitle="Avg: 6.7 hours"
          background="#FFF8F0"
          icon={<XCircle className="w-6 h-6 text-[#F97316]" />}
        />
      </div>

      {/* Chart */}
      <Card className="h-[500px]">
        <CardContent className="p-5 h-full">
          <h3 className="text-[15px] font-medium mb-4">Order Analytics</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "#6b7280", cursor: "pointer" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                domain={[450, 750]}
                padding={{ top: 20, bottom: 10 }}
              />
              <Tooltip
                contentStyle={{
                  fontSize: "12px",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
              />
              <Legend
                align="right"
                verticalAlign="top"
                iconType="circle"
                wrapperStyle={{ fontSize: "12px" }}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#3b82f1"
                strokeWidth={2}
                fontSize={24}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bottom Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MiniCard
          type="stock"
          data={[
            { label: "In Stock", value: "1,247", color: "#16A34A" },
            { label: "Out of Stock", value: "23", color: "#EF4444" },
          ]}
          title="Stock Status"
          icon={<Truck className="w-8 h-8 text-gray-400" />}
        />
        <MiniCard
          title="Earliest Order"
          type="orderTime"
          value="2h 15m"
          subtitle="Waiting time"
          icon={
            <Image
              src="/hourGlass.svg"
              width={20}
              height={20}
              alt="Fast Delivery"
            />
          }
        />
        <MiniCard
          title="48h Success Rate"
          value="94.2%"
          subtitle="On-time delivery"
          valueClass="#22C55E"
          icon={
            <Image
              src="/question.svg"
              width={20}
              height={20}
              alt="Fast Delivery"
            />
          }
        />
        <MiniCard
          title="Return Rate"
          value="0.42%"
          subtitle="This month"
          valueClass="#EF4444"
          icon={<ChartLine className="w-8 h-8 text-[#F87171]" />}
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon, background }: any) {
  return (
    <Card
      className="min-h-[110px]"
      style={{ backgroundColor: background ?? "#FFFFFF" }}
    >
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between">
          <h4 className="text-[16px] text-[#4B5563] uppercase tracking-wide font-medium">
            {title}
          </h4>
          {icon && <span className="text-gray-400">{icon}</span>}
        </div>
        <p className="text-[30px] font-bold mt-3">{value}</p>
        <p className="text-[16px] text-gray-500 weight-medium">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

function MiniCard({
  title,
  value,
  type,
  data,
  icon,
  subtitle,
  valueClass,
}: any) {
  return (
    <Card className="min-h-[100px]">
      <CardContent className="flex flex-col justify-between h-full">
        <div className="flex items-center justify-between">
          <h4 className="text-[18px] text-[#4B5563] font-semibold">{title}</h4>
          {icon && <span className="text-gray-400 ">{icon}</span>}
        </div>
        {type === "stock" && (
          <div>
            <div className="flex flex-row gap-2 w-full mt-4">
              {data ? (
                <div className="w-full flex flex-col justify-between ">
                  {data.map((item: any) => (
                    <div
                      key={item.label}
                      className="flex flex-row gap-2 justify-between py-2"
                    >
                      <p className="text-[16px] font-normal text-gray-500">
                        {item.label}
                      </p>
                      <p
                        style={{ color: item.color }}
                        className={`text-[16px] font-medium`}
                      >
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        )}
        {type !== "stock" && (
          <div>
            <div className="flex flex-row  w-full mt-2">
              <span
                className="text-[40px] font-semibold"
                style={{ color: valueClass }}
              >
                {value}
              </span>
            </div>
            <div className="flex flex-row gap-2 w-full ">
              <p className="text-[14px] font-normal text-gray-500">
                {subtitle}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
