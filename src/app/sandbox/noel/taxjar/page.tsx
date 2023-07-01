import { FC } from "react";

import Taxjar from "taxjar";

interface pageProps {}

const Page: FC<pageProps> = async ({}) => {
  const taxClient = new Taxjar({
    apiKey: "c1a3ec2cb71c7bcda8247afbe97830cb",
    apiUrl: Taxjar.SANDBOX_API_URL,
  });
  // const categories = await taxClient.console.log(categories);
  return <div>page</div>;
};

export default Page;
