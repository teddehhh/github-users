'use client';
import { getUsers } from '@/app/api/api';
import { IPagination } from '@/app/interface/pagination';
import { IUser } from '@/app/interface/user';
import { useState, useEffect, useRef, useMemo } from 'react';
import { TablePagination } from '../pagination';
import { TableItems } from './lib/table-items';

const headers = [
  { title: 'Login', field: 'login' },
  { title: 'Type', field: 'type' },
];

export function Table({ totalCount }: { totalCount: number }) {
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    pageSize: 10,
  });

  const [usersCount] = useState<number>(totalCount);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const data = await getUsers({
        since: (pagination.page * pagination.pageSize).toString(),
        per_page: pagination.pageSize.toString(),
      });

      setUsers(data);
    }
    fetchUsers();
  }, [pagination]);

  return (
    <div className="flex w-3/4 flex-col justify-between m-2 border-2">
      <TableItems headers={headers} keyField="id" items={users} />
      <TablePagination
        setPagination={setPagination}
        usersCount={usersCount}
        pagination={pagination}
        className="mb-2 table-pagination"
      />
    </div>
  );
}
