import { DataTable } from "./_components/data-table";
import { columns } from "./_components/collectionColumns";
import { collections } from "./_components/data";

import CreateCollectionButton from "./_components/CreateCollectionButton";

export default function Page() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-10 pb-4 border-b">
        <h2 className="text-xl font-semibold">Collections</h2>
        <CreateCollectionButton />
      </div>
      <DataTable columns={columns} data={collections} />
    </div>
  );
}
