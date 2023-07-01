import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OnlineStoreCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Online Store</CardTitle>
      </CardHeader>
      <CardContent className=" flex flex-col gap-2">
        <CardDescription>Theme template</CardDescription>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Default collection" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Collection theme</SelectLabel>
              <SelectItem value=""></SelectItem>
              <SelectItem value=""></SelectItem>
              <SelectItem value=""></SelectItem>
              <SelectItem value=""></SelectItem>
              <SelectItem value=""></SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
