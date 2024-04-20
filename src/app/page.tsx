import { getUsersCount } from './api/api';
import { Filter } from './ui/filter';
import { Table } from './ui/table';

export default async function Home() {
  const total_count = await getUsersCount();

  return (
    <div className="flex flex-row justify-between h-full">
      <Filter />
      <Table totalCount={total_count} />
    </div>
  );
}
