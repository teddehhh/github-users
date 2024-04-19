import { getUsersCount } from './api/api';
import { Table } from './ui/table';

export default async function Home() {
  const total_count = await getUsersCount();

  return (
    <div className="flex flex-col justify-between h-full">
      <Table totalCount={total_count} />
    </div>
  );
}
