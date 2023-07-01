"use client";
type ErrorPageProps = {
  error: Error;
  reset: () => void;
};
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  console.log(error);
  return <div>There was an error</div>;
}
