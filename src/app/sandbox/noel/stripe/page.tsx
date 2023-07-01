"use client";
import { createAccount, createCheckoutSession } from "@/actions/stripe";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { useRouter } from "next/navigation";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-3xl my-20">
      <h1>Stripe Connect</h1>

      <Button
        onClick={async () => {
          const url = await createCheckoutSession();
          if (url) {
            router.push(url);
          } else {
            console.log("no url found");
          }
        }}
      >
        Create Account
      </Button>
    </div>
  );
};

export default Page;
