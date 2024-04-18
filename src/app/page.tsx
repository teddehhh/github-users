'use client';
import { useEffect, useState } from 'react';
import { IUser } from './interface/user';
import { IPagination } from './interface/pagination';
import { getUsers, getUsersCount } from './api/api';

import { TableItems } from './ui/table';
import { PaginationTable } from './ui/pagination';

export default function Home() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [usersCount, setUsersCount] = useState<number>(0);
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    async function fetchUserCount() {
      const total_count = await getUsersCount();

      setUsersCount(total_count);
    }
    fetchUserCount();
  }, []);

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
    <div className="flex flex-col justify-between h-full">
      <TableItems headers={headers} keyField="id" items={users} />
      <PaginationTable
        setPagination={setPagination}
        usersCount={usersCount}
        pagination={pagination}
      />
    </div>
  );
}
