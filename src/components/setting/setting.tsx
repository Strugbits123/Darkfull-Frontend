import Image from "next/image";
import Link from "next/link";

const SettingComponent = ({ role }: { role: string }) => {
  const settingList = [
    {
      role: "Admin",
      setting: [
        {
          title: "Preference",
          icon: (
            <Image
              src="/images/icons/settings.svg"
              alt="preference"
              width={80}
              height={80}
            />
          ),
        },
        {
          title: "Users",
          icon: (
            <Image
              src="/images/icons/groupUser.svg"
              alt="group user"
              width={80}
              height={80}
            />
          ),
        },
        {
          title: "Integrations",
          icon: (
            <Image
              src="/images/icons/integration.svg"
              alt="group user"
              width={80}
              height={80}
            />
          ),
        },
      ],
    },
    {
      role: "Director",
      setting: [
        {
          title: "Preference",
          icon: (
            <Image
              src="/images/icons/settings.svg"
              alt="preference"
              width={80}
              height={80}
            />
          ),
        },
        {
          title: "Users",
          href: "/director/setting/manager",
          icon: (
            <Image
              src="/images/icons/groupUser.svg"
              alt="group user"
              width={80}
              height={80}
            />
          ),
        },
        {
          title: "Fulfillments point",
          href: "/director/setting/fulfillment",

          icon: (
            <Image
              src="/images/icons/cargo.svg"
              alt="group user"
              width={80}
              height={80}
            />
          ),
        },
      ],
    },
    {
      role: "Client",
      setting: [],
    },
    {
      role: "Worker",
      setting: [],
    },
    {
      role: "Manager",
 setting: [
       
        {
          title: "Warehouse setting",
          href: "/manager/setting/manager",
          icon: (
            <Image
               src="/images/icons/cargo.svg"
              alt="group user"
              width={80}
              height={80}
            />
          ),
        },
        {
          title: "Staff Management",
          href: "/manager/setting/fulfillment",

          icon: (
            <Image
              src="/images/icons/groupUser.svg"
              alt="group user"
              width={80}
              height={80}
            />
          ),
        },
      ]
    },
  ];

  return (
    <div>
      <p className="text-3xl font-semibold">Settings Page</p>

      <p className="text-1xl mt-2"> Change Setting </p>
      <div className="md:w-[calc(90%-80px)] mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {settingList.map(
          (item) =>
            item.role === role &&
            item.setting.map((items, index) => (
              <div
                key={index}
                className="bg-white flex h-44 w-11/12 items-center justify-center p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  {items.icon}
                  <Link href={`${items.href}`}>
                    <span className="text-lg font-medium">{items.title}</span>
                  </Link>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default SettingComponent;
