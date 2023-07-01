import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

function TabTriggerLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: string;
}) {
  return (
    <TabsTrigger asChild value={href} className="p-0">
      <Link href={href} className={`py-1.5 px-4 ${className}`}>
        {children}
      </Link>
    </TabsTrigger>
  );
}

export default function Layout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <div className="py-6 px-2 flex flex-col h-full max-w-7xl mx-auto">
      <Tabs defaultValue="/products" className="w-fit mb-8">
        <TabsList className="grid w-full grid-cols-3 bg-gray-300 gap-1">
          <TabTriggerLink href="/products">Products</TabTriggerLink>
          <TabTriggerLink href="/products/collections">
            Collections
          </TabTriggerLink>
          <TabTriggerLink href="/products/inventory">Inventory</TabTriggerLink>
        </TabsList>
      </Tabs>
      <div>{children}</div>
    </div>
  );
}
