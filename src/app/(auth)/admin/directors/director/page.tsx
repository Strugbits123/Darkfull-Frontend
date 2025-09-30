"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";

export default function CreateDirectorProfile() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="flex  justify-center   px-4   sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <Card className=" sm:w-full md:w-1/2  shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold weight-600 text-center mb-2">
            Create Director Profile
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>

          <form className="space-y-4">
            {/* Director Name */}
            <div>
              <Label htmlFor="name" className="mb-2">Director Name</Label>

              <Input id="name" placeholder="Enter director name" />
            </div>

            {/* Mobile Number */}
            <div>
                <Label htmlFor="phone" className="mb-2">Mobile Number</Label>

              <Input id="phone" placeholder="+61 123-456-789" />
            </div>

            {/* Role */}
            <div>
              <Label htmlFor="role" className="mb-2">Role</Label>
              <Input id="role" placeholder="Director" />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="mb-2">Contact Email</Label>
              <Input id="email" type="email" placeholder="contact@lifecare.com" />
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address" className="mb-2">Address</Label>
              <Textarea
                id="address"
                placeholder="123 Main Street Sydney, State 45678, Australia"
                className="resize-none"
              />
            </div>

            {/* Profile Picture Upload */}
            <div>
              <Label className="mb-2">Administrator Profile Picture</Label>
              <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-gray-50">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  Drag and drop files here
                </p>
                <p className="text-xs text-gray-400 mb-2">or</p>
                <label className="cursor-pointer">
                  <span className="px-3 py-1 bg-gray-100 text-sm rounded-md">
                    Browse Photos
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                {file && (
                  <p className="text-xs text-gray-600 mt-2">{file.name}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button className="w-full mt-2 bg-blue-900 text-white hover:bg-blue-800">
              Add Director
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
