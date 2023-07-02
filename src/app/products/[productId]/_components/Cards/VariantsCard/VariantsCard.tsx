import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewVariants from "./NewVariants";
import ExistingVariants from "./ExistingVariants";

export default function VariantsCard() {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Variants</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ExistingVariants />
        <NewVariants />
      </CardContent>
    </Card>
  );
}
