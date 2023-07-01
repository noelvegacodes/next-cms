import { FC } from "react";
import YoutubeForm from "./_components/YoutubeForm";

interface pageProps {}

const Page: FC<pageProps> = async ({}) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const data = await response.json();
  console.log(data);
  const { username, email, address } = data;
  return (
    <div className="max-w-7xl mx-auto py-12">
      <div>
        <YoutubeForm user={{ username, email, channel: "ch-" + username }} />
      </div>
    </div>
  );
};

export default Page;
