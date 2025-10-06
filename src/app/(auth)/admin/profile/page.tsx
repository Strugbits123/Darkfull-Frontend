import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Pencil } from "lucide-react";
import Image from "next/image";

const ProfileSetting = () => {
  return (
    <div className="flex flex-col space-x-4">
      <div className="flex flex-col">
        <span className="font-semibold text-2xl">Profile Setting</span>
        <span className="text-muted-foreground mt-2">
          Change profile setting
        </span>
      </div>

      <div className="bg-card  mt-10 flex h-auto w-11/12 p-8 border rounded-lg hover:shadow-md transition-shadow">
        {/* Profile image with edit button */}
        <div className="relative flex items-start">
       <div className="relative inline-block">
      <Image
        src="https://media.licdn.com/dms/image/v2/D4D03AQEl6LvJpB5kjA/profile-displayphoto-shrink_200_200/B4DZbl864wGwAY-/0/1747614680377?e=2147483647&v=beta&t=6apv627QVP0Fc8epaxJRUqMsPWXHx0HdeZ_JRn2xGmc"
        alt="profile"
        width={250}
        height={250}
        className="rounded-full object-cover"
      />

      {/* Pencil button - always at bottom right */}
      <Button
        size="icon"
        variant="outline"
        className="absolute bottom-2 right-2 rounded-full bg-white shadow"
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
        </div>

        {/* Form fields */}
        <div className=" ml-5 grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-5">
          <div>
            <Label>Full Name</Label>
            <Input placeholder="Full Name" className="w-full mt-3" />
          </div>

          <div>
            <Label>Contact Email</Label>
            <Input placeholder="Contact Email" className="w-full mt-3" />
          </div>

          <div>
            <Label>Phone</Label>
            <Input placeholder="Phone" className="w-full mt-3" />
          </div>

          <div>
            <Label>Address</Label>
            <Input placeholder="Address" className="w-full mt-3" />
          </div>
          <div className="w-full md:col-span-2">
            <Label>Role</Label>
            <Input
              placeholder="Role"
              disabled
              className="w-full md:col-span-2"
            />
          </div>
          {/* Last input full width */}
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
