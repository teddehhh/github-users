'use client';
import { getUsers, getUsersCount } from './api/api';
import { Filter } from './ui/filter';
import { Table } from './ui/table';
import StoreProvider from './storeProvider';
import { useEffect, useState } from 'react';
import { IUser } from './interface/user';
import { IPagination } from './interface/pagination';
import { useAppSelector, useAppDispatch } from './hooks';
import { IFilter, selectFilter } from './slice';

export default function Home() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    pageSize: 10,
  });

  async function fetchUsers(pagination: IPagination, filter: IFilter) {
    const data = await getUsers({
      since: (pagination.page * pagination.pageSize).toString(),
      per_page: pagination.pageSize.toString(),
      filter,
    });

    setUsers(data.items);
  }

  return (
    <StoreProvider>
      <div className="flex flex-row justify-between h-full">
        <Filter pagination={pagination} fetchUsers={fetchUsers} />
        <Table
          pagination={pagination}
          setPagination={setPagination}
          totalCount={100}
          fetchUsers={fetchUsers}
          users={users}
        />
      </div>
    </StoreProvider>
  );
}
