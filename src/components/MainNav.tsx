import Link from "next/link";
import StoreSwitcher from "./StoreSwitcher";
import { Codepen } from "lucide-react";

export default function MainNav() {
  return (
    <nav className="flex items-center justify-end gap-8 h-16 px-4 bg-slate-900 border-b-2 border-slate-800">
      {/* <Codepen size={40} className="stroke-white" /> */}
      {/* <ul className="flex h-full items-center gap-8 text-sm font-semibold text-white">
        <li>
          <Link href="/customers">Customers</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/settings">Settings</Link>
        </li>
      </ul> */}

      <StoreSwitcher />
    </nav>
  );
}
