import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PublishCard() {
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Publishing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className=" flex flex-col gap-4">
            <div className=" flex items-center gap-6">
              <div className=" w-2 h-2 rounded-full bg-green-500"></div>
              <p>Online Store</p>
            </div>
            <div className=" flex items-center gap-6">
              <div className=" w-2 h-2 rounded-full bg-green-500"></div>
              <p>Point of Sale</p>
            </div>
            <div className=" flex items-center gap-6">
              <div className=" w-2 h-2 rounded-full bg-green-500"></div>
              <p>GraphiQL App</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
