import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";
import useCurrentUser from "hooks/useCurrentUser";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();
  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notification",
      href: "/notification",
      icon: BsBellFill,
      auth: true,
      alert: currentUser?.hasNotification
    },
    {
      label: "profile",
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
      auth: true,
    },
  ];
  return (
    <>
      <div className="block sm:hidden pr-2 bg-neutral-800 h-14 fixed bottom-0 w-full z-50">
        <div className="flex justify-center items-center w-full">
          <div className=" flex items-stretch space-x-1">
            {items.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                auth={item.auth}
                alert={item.alert}
              />
            ))}
            {currentUser && (
              <SidebarItem
                onClick={() => signOut()}
                icon={BiLogOut}
                label="Logout"
              />
            )}
          </div>
        </div>
      </div>
      <div className="hidden sm:block col-span-1 h-full pr-4 md:pr-6">
        <div className="flex flex-col items-end">
          <div className="space-y-2 lg:w-[230px]">
            <SidebarLogo />
            {items.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                auth={item.auth}
                alert={item.alert}
              />
            ))}
            {currentUser && (
              <SidebarItem
                onClick={() => signOut()}
                icon={BiLogOut}
                label="Logout"
              />
            )}
            <SidebarTweetButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
