import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import SideNav from "@/components/SideNav";
import MainNav from "@/components/MainNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className=""
      style={{ marginRight: "calc(-1*(100vw-100%))" }}
    >
      <body className={inter.className + " h-screen overflow-hidden"}>
        <div className="flex w-full h-screen  bg-gray-100  overflow-hidden">
          <SideNav />
          <div className=" flex-1 flex flex-col overflow-y-auto ">
            <div className="sticky top-0 z-10">
              <MainNav />
            </div>
            <div className="flex-1 relative">{children}</div>
          </div>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
