'use client';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import clsx from 'clsx';
import Image from 'next/image';
import { FunctionComponent, useEffect, useState } from 'react';
import MyTableHeader from './my-table-header';
import { KEY_FIELD, TABLE_HEADERS } from '../lib/const/table-headers';
import { renderCell } from '../lib/render-cell';
import { fetchFilteredUsers } from '../lib/data';
import { useSession } from 'next-auth/react';

import MyPagination from './my-pagination';
import MyTableControl from './my-table-control';
import { USERS_NOT_FOUND } from '../lib/const/my-table';

interface MyTableProps {
  filter: { login: string; lang: string };
  sorting: { sort: string; order: string };
  page: number;
  className?: string;
}

const MyTable: FunctionComponent<MyTableProps> = (props) => {
  const {
    filter: { login, lang },
    sorting: { sort, order },
    page,
    className,
  } = props;

  const [users, setUsers] = useState<{ login: string; avatar_url: string }[]>(
    []
  );
  const [totalCount, setTotalCount] = useState<number | null>(null);

  const { data } = useSession();

  useEffect(() => {
    const getUsers = async () => {
      const { items, total_count } = await fetchFilteredUsers(
        page,
        { login, lang },
        { sort, order },
        data?.accessToken ?? ''
      ).then((data) => data);

      setUsers(items);
      setTotalCount(total_count);
    };

    getUsers();
  }, [data?.accessToken, login, lang, page, sort, order]);

  if (!users.length) {
    return (
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
    );
  }

  return (
    <>
      <MyTableControl />
      <div className={clsx('overflow-y-auto h-full', className)}>
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
      </div>
      <MyPagination totalCount={totalCount} />
    </>
  );
};

export default MyTable;
