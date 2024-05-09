'use client';
import { IPagination } from '@/app/interface/pagination';
import {
  useState,
  useEffect,
  useRef,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';
import { TablePagination } from '../pagination';
import { TableItems } from './lib/table-items';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { IFilter, selectFilter } from '@/app/slices/filter';

const headers = [
  { title: 'Login', field: 'login' },
  { title: 'Type', field: 'type' },
];

export function Table({
  totalCount,
  fetchUsers,
  users,
  pagination,
  setPagination,
}: {
  totalCount: number;
  fetchUsers: (pagination: IPagination, filter: IFilter) => Promise<void>;
  users: any[];
  pagination: IPagination;
  setPagination: Dispatch<SetStateAction<IPagination>>;
}) {
  const { filter } = useAppSelector(selectFilter);

  useEffect(() => {
    fetchUsers(pagination, filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  return (
    <div className="flex w-3/4 flex-col justify-between m-2 border-2">
      <TableItems headers={headers} keyField="id" items={users} />
      <TablePagination
        setPagination={setPagination}
        usersCount={totalCount}
        pagination={pagination}
        className="mb-2 table-pagination"
      />
    </div>
  );
}
