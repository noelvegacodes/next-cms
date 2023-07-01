export default function Spinner({ show }: { show: boolean }) {
  return (
    <>
      {show ? (
        <div className="h-4 w-4 mr-2 animate-spin border-2 border-t-gray-300  rounded-full" />
      ) : null}
    </>
  );
}
