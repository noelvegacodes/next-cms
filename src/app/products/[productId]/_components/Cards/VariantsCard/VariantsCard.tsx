import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewVariantToggle from "./NewVariantToggle";
import ExistingVariant from "./ExistingVariant";

interface Props {
  productId: string;
  variants: { id: string; name: string; values: { value: string }[] }[];
}

export default function VariantsCard({ productId, variants }: Props) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Variants</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul>
          {variants.map((variant) => {
            return (
              <ExistingVariant
                key={variant.id}
                variantId={variant.id}
                productId={productId}
                defaultValues={{
                  type: variant.name,
                  options: variant.values.map((item) => ({
                    value: item.value,
                  })),
                }}
              />
            );
          })}
        </ul>
        <NewVariantToggle productId={productId} />
      </CardContent>
    </Card>
  );
}
