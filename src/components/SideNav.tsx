"use client";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  Codepen,
  Home,
  Inbox,
  Megaphone,
  Tags,
  Users,
} from "lucide-react";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import { useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";

interface SideNavProps {}

const SideNav: FC<SideNavProps> = ({}) => {
  const [open, setOpen] = useState(false);
  const segments = useSelectedLayoutSegments();
  const toggle = () => {
    setOpen(!open);
  };
  return (
    <nav
      className={cn(
        "relative bg-primary h-screen flex flex-col justify-between z-20",
        open ? "w-72" : "w-16",
        "transition-all duration-200"
      )}
    >
      <Button
        className={cn(
          `h-5 w-5 p-0 grid place-content-center`,
          "rounded-full",
          "absolute top-5 right-0 translate-x-1/2 bg-orange-600 hover:bg-orange-600 group",
          open ? "rotate-0" : "rotate-180"
        )}
        onClick={toggle}
      >
        <ChevronLeft size={16} className={cn("")} />
      </Button>
      <ul className={cn("w-full overflow-hidden mb-auto ")}>
        <li className={cn("group border-b-2 border-slate-800")}>
          <Link
            href="/home"
            className=" w-full pl-4 h-16 flex gap-4 items-center "
          >
            <Codepen
              size={24}
              className={cn(
                "group-hover:stroke-slate-200 stroke-slate-400 shrink-0 transition-colors duration-200",
                segments[0] === "home" && "stroke-slate-200"
              )}
            />
            <div
              className={cn(
                open
                  ? "opacity-100 text-slate-400 group-hover:text-slate-200 transition-colors duration-200"
                  : "hidden",
                segments[0] === "home" && "text-slate-200"
              )}
            >
              Acidfork
            </div>
          </Link>
        </li>
        <li
          className={cn(
            "group border-l-2",
            segments[0] === "home" ? "border-orange-600" : "border-transparent"
          )}
        >
          <Link
            href="/home"
            className=" w-full pl-4 h-16 flex gap-4 items-center "
          >
            <Home
              size={24}
              className={cn(
                "group-hover:stroke-slate-200 stroke-slate-400 shrink-0 transition-colors duration-200",
                segments[0] === "home" && "stroke-slate-200"
              )}
            />
            <div
              className={cn(
                open
                  ? "opacity-100 text-slate-400 group-hover:text-slate-200 transition-colors duration-200"
                  : "hidden",
                segments[0] === "home" && "text-slate-200"
              )}
            >
              Home
            </div>
          </Link>
        </li>
        <li
          className={cn(
            "group border-l-2",
            segments[0] === "orders"
              ? "border-orange-600"
              : "border-transparent"
          )}
        >
          <Link
            href="/orders"
            className=" w-full pl-4 h-16 flex gap-4 items-center "
          >
            <Inbox
              size={24}
              className={cn(
                "group-hover:stroke-slate-200 stroke-slate-400 shrink-0 transition-colors duration-200",
                segments[0] === "orders" && "stroke-slate-200"
              )}
            />
            <div
              className={cn(
                open
                  ? "opacity-100 text-slate-400 group-hover:text-slate-200 transition-colors duration-200"
                  : "hidden",
                segments[0] === "orders" && "text-slate-200"
              )}
            >
              Orders
            </div>
          </Link>
        </li>
        <li
          className={cn(
            "group border-l-2",
            segments[0] === "products"
              ? "border-orange-600"
              : "border-transparent"
          )}
        >
          <Link
            href="/products"
            className=" w-full pl-4 h-16 flex gap-4 items-center "
          >
            <Tags
              size={24}
              className={cn(
                "group-hover:stroke-slate-200 stroke-slate-400 shrink-0 transition-colors duration-200",
                segments[0] === "products" && "stroke-slate-200"
              )}
            />
            <div
              className={cn(
                open
                  ? "opacity-100 text-slate-400 group-hover:text-slate-200 transition-colors duration-200"
                  : "hidden",
                segments[0] === "products" && "text-slate-200"
              )}
            >
              Products
            </div>
          </Link>
        </li>
        <li
          className={cn(
            "group border-l-2",
            segments[0] === "customers"
              ? "border-orange-600"
              : "border-transparent"
          )}
        >
          <Link
            href="/customers"
            className=" w-full pl-4 h-16 flex gap-4 items-center "
          >
            <Users
              size={24}
              className={cn(
                "group-hover:stroke-slate-200 stroke-slate-400 shrink-0 transition-colors duration-200",
                segments[0] === "customers" && "stroke-slate-200"
              )}
            />
            <div
              className={cn(
                open
                  ? "opacity-100 text-slate-400 group-hover:text-slate-200 transition-colors duration-200"
                  : "hidden",
                segments[0] === "customers" && "text-slate-200"
              )}
            >
              Customers
            </div>
          </Link>
        </li>
        <li
          className={cn(
            "group border-l-2",
            segments[0] === "marketing"
              ? "border-orange-600"
              : "border-transparent"
          )}
        >
          <Link
            href="/marketing"
            className=" w-full pl-4 h-16 flex gap-4 items-center "
          >
            <Megaphone
              size={24}
              className={cn(
                "group-hover:stroke-slate-200 stroke-slate-400 shrink-0 transition-colors duration-200",
                segments[0] === "marketing" && "stroke-slate-200"
              )}
            />
            <div
              className={cn(
                open
                  ? "opacity-100 text-slate-400 group-hover:text-slate-200 transition-colors duration-200"
                  : "hidden",
                segments[0] === "marketing" && "text-slate-200"
              )}
            >
              Marketing
            </div>
          </Link>
        </li>
      </ul>
      {/* <div className="p-4">
        <div className="flex items-center gap-4  w-full mb-4">
          <Avatar className="mr-2 h-12 w-12">
            <AvatarImage
              src={`/michealscott.jpg`}
              className="object-cover"
              alt={"avatar"}
            />
            <AvatarFallback>NV</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-white">Michael Scott</p>
            <p className="text-xs text-slate-400">Regional Manager</p>
          </div>
        </div>
        <Button className="flex gap-4 bg-slate-700 w-full">
          <LogOut size={24} className="rotate-180" />
          <p>Log out</p>
        </Button>
      </div> */}
    </nav>
  );
};

export default SideNav;
