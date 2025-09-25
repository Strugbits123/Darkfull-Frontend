import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";

const Directors = () => {
  // Define headers with keys
  const tableHeader = [
    { title: "Image", key: "image" },
    { title: "Name", key: "name" },
    { title: "Designation", key: "designation" },
    { title: "Joining Date", key: "joiningDate" },
    { title: "Platform", key: "platform" },
    { title: "Action", key: "action" },
  ];

  // Sample data
  const data = [
    {
      name: "John Doe",
      image:
        "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      designation: "Director",
      joiningDate: "2022-01-15",
      platform: "Web",
    },
    {
      name: "Jane Smith",
      image:
        "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      designation: "Director",
      joiningDate: "2022-01-15",
      platform: "Web",
    },
  ];

  return (
    <div className="p-6 ">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col space-y-1">
          <span className="text-2xl font-bold">Directors Page</span>
          <span>Manage Director Profile</span>
        </div>
        <Button variant="default" className="bg-[#004370] h-13 w-80">
          Add Director
        </Button>
      </div>

<div className="mt-10">
      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <input type="checkbox" />
            </TableHead>
            {tableHeader.map((header) => (
              <TableHead key={header.key}>{header.title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <input type="checkbox" />
              </TableCell>

              {tableHeader.map((header) => (
                <TableCell key={header.key}>
                  {header.key === "image" ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  ) : header.key === "action" ? (
                    <Button
                      variant="outline"
                      className="bg-[#004370] hover:bg-[#004370] text-white"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Profile 
                    </Button>
                  ) : (
                    item[header.key as keyof typeof item] ?? "-"
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  );
};

export default Directors;
