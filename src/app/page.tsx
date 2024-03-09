'use client';
import { useEffect, useState } from 'react';
import { IUser } from './interface/user';
import { IPagination } from './interface/pagination';
import { getUsers, getUsersCount } from './api/api';

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
        since: pagination.page.toString(),
        per_page: pagination.pageSize.toString(),
      });

      setUsers(data);
    }
    fetchUsers();
  }, [pagination]);

  return <div></div>;
}
