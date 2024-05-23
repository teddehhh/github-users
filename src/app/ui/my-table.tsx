'use client';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FunctionComponent, useEffect, useState } from 'react';
import { KEY_FIELD, TABLE_HEADERS } from '../lib/const/table-headers';
import { renderCell } from '../lib/render-cell';
import MyTableHeader from './my-table-header';

import { USERS_NOT_FOUND } from '../lib/const/my-table';
import useLocalStorage from '../lib/hooks/useLocalStorage';
import { IFilter, IPagination, ISorting, IUser } from '../lib/interface';
import MyPagination from './my-pagination';
import MyTableControl from './my-table-control';
import { fetchFilteredUsers } from '../lib/data';

interface MyTableProps {
  className?: string;
}

const MyTable: FunctionComponent<MyTableProps> = (props) => {
  const { className } = props;

  const [users, setUsers] = useState<IUser[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  const { states, synced } = useLocalStorage(
    {
      key: 'pagination',
      initialValue: { page: 1 },
    },
    {
      key: 'filter',
      initialValue: { login: '', lang: 'all' },
    },
    {
      key: 'sorting',
      initialValue: {
        sort: 'match',
        order: 'desc',
      },
    }
  );

  const [
    { state: pagination, setState: setPagination },
    { state: filter, setState: setFilter },
    { state: sorting, setState: setSorting },
  ] = states;

  const { data } = useSession();

  useEffect(() => {
    const getUsers = async () => {
      const { page } = pagination as IPagination;
      const { login, lang } = filter as IFilter;
      const { sort, order } = sorting as ISorting;

      const { items, total_count } = await fetchFilteredUsers(
        page,
        { login, lang },
        { sort, order },
        data?.accessToken ?? ''
      ).then((data) => data);

      setUsers(items);
      setTotalCount(total_count);
    };
    if (synced) {
      getUsers();
    }
  }, [data?.accessToken, filter, pagination, sorting, synced]);

  return (
    <>
      <MyTableControl
        filter={filter as IFilter}
        sorting={sorting as ISorting}
        setFilter={setFilter}
        setSorting={setSorting}
      />
      <div className={clsx('overflow-y-auto h-full', className)}>
        {users && users.length ? (
          <Table>
            <MyTableHeader headers={TABLE_HEADERS} />
            <TableBody>
              {users.map((user) => {
                return (
                  <TableRow key={user[KEY_FIELD]}>
                    {TABLE_HEADERS.map((header) => (
                      <TableCell
                        align={header?.align}
                        key={`${user[KEY_FIELD]}_${header.field}`}
                      >
                        {renderCell(user, header.field, header.type)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="h-full flex flex-row justify-center items-center gap-4">
            <Image
              src={'/github-mark.svg'}
              alt="github-logo"
              width={100}
              height={100}
            />
            <div>
              <label>{USERS_NOT_FOUND}</label>
            </div>
          </div>
        )}
      </div>
      <MyPagination
        pagination={pagination as IPagination}
        setPagination={setPagination}
        totalCount={totalCount}
      />
    </>
  );
};

export default MyTable;
