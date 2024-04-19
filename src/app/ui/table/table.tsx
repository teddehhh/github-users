'use client';
import { getUsersCount, getUsers } from '@/app/api/api';
import { IPagination } from '@/app/interface/pagination';
import { IUser } from '@/app/interface/user';
import { useState, useEffect } from 'react';
import { TablePagination } from '../pagination';
import { TableItems } from './lib/table-items';

export function Table({ totalCount }: { totalCount: number }) {
  const [users, setUsers] = useState<IUser[]>([]);
  const [usersCount] = useState<number>(totalCount);
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    pageSize: 10,
  });

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

  const headers = [
    { title: 'Login', field: 'login' },
    { title: 'Type', field: 'type' },
  ];

  return (
    <>
      <TableItems headers={headers} keyField="id" items={users} />
      <TablePagination
        setPagination={setPagination}
        usersCount={usersCount}
        pagination={pagination}
      />
    </>
  );
}
