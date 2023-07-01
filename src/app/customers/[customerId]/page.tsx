type PageProps = {
  params: {
    customerId: string;
  };
};
export default function Page({ params }: PageProps) {
  return <div className="">{params.customerId}</div>;
}
