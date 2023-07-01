import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export default function LoadingTable({ headers }: { headers: string[] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center py-4">
          <Input placeholder="Filter collections..." className="max-w-sm" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end"></DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <Card className="overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>
                  <Skeleton className="w-2 h-2" />
                </TableHead>
                {headers.map((header) => {
                  return <TableHead key={header}>{header}</TableHead>;
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((row) => {
                return (
                  <TableRow key={row}>
                    <TableCell className="w-fit">
                      <Skeleton className="w-8 h-8" />
                    </TableCell>

                    <TableCell className="">
                      <Skeleton className="w-full h-8" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-full h-8" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-full h-8" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-full h-8" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
