import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useImmer } from "use-immer";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { insertVariant } from "@/actions/product";

export default function InputList({
  close,
  productId,
}: {
  close: () => void;
  productId: string;
}) {
  const [variant, setVariant] = useImmer<{
    type: string;
    options: Map<string, string>;
  }>({ type: "", options: new Map() });
  return (
    <>
      <form
        name="variant"
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(variant);

          const data = {
            name: variant.type,
            productId,
            values: [...variant.options.values()].map((value: string) => {
              return { value };
            }),
          };

          console.log("variant form data\n", data);
          await insertVariant(data.name, productId, data.values);
        }}
      >
        <Label className="mb-2">Option name</Label>
        <div className="flex my-4">
          <Select
            onValueChange={(e: any) => {
              setVariant((draft) => {
                draft.type = e;
              });
            }}
          >
            <SelectTrigger autoFocus className="w-full" id="select trigger">
              <SelectValue placeholder="Select a variant type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="size">Size</SelectItem>
                <SelectItem value="color">Color</SelectItem>
                <SelectItem value="material">Material</SelectItem>
                <SelectItem value="style">Style</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            autoFocus={false}
            variant={"ghost"}
            type="button"
            onClick={() => {
              setVariant((draft) => {
                draft.type = "";
                draft.options = new Map();
              });
              close();
            }}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
        <Label>Option values</Label>
        <ul>
          {[...variant.options.entries()].map(([k, v]) => {
            return (
              <li key={k} className="flex">
                <Input
                  defaultValue={v}
                  onInput={(e) => {
                    setVariant((draft) => {
                      draft.options.set(k, e.currentTarget.value);
                    });
                  }}
                />
                <Button
                  autoFocus={false}
                  variant={"ghost"}
                  type="button"
                  onClick={() => {
                    console.log("clicked trash");
                    setVariant((draft) => {
                      draft.options.delete(k);
                    });
                  }}
                >
                  {/* <Trash2 className="h-5 w-5" /> */}
                </Button>
              </li>
            );
          })}
        </ul>
        <Input
          type="text"
          className="my-4 border-black"
          onKeyDown={(e) => {
            const value = e.currentTarget.value.trim();
            if (e.key === "Enter" && value !== "") {
              setVariant((draft) => {
                draft.options.set(Math.random().toString(), value);
              });
              e.currentTarget.value = "";
            }
          }}
        />
        <Button>Submit</Button>
      </form>
    </>
  );
}
