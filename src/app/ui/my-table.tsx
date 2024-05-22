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
import { IFilter, IPagination, ISorting, IUser } from '../lib/interface';

interface MyTableProps {
  className?: string;
}

const MyTable: FunctionComponent<MyTableProps> = (props) => {
  const { className } = props;

  const [users, setUsers] = useState<IUser[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  const [pagination, setPagination] = useState<IPagination>({ page: 1 });
  const [filter, setFilter] = useState<IFilter>({ login: '', lang: 'all' });
  const [sorting, setSorting] = useState<ISorting>({
    sort: 'match',
    order: 'desc',
  });

  const states = [
    {
      state: pagination,
      setState: setPagination,
      name: 'pagination',
      initialState: '{"page":1}',
    },
    {
      state: filter,
      setState: setFilter,
      name: 'filter',
      initialState: '{"login":"","lang":"all"}',
    },
    {
      state: sorting,
      setState: setSorting,
      name: 'sorting',
      initialState: '{"sort":"match","order":"desc"}',
    },
  ];

  useEffect(() => {
    states.map(({ state, setState, name, initialState }) => {
      const items = localStorage.getItem(name) || initialState;

      if (items !== JSON.stringify(state)) {
        setState(JSON.parse(items));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('pagination', JSON.stringify(pagination));
  }, [pagination]);
  useEffect(() => {
    localStorage.setItem('filter', JSON.stringify(filter));
  }, [filter]);
  useEffect(() => {
    localStorage.setItem('sorting', JSON.stringify(sorting));
  }, [sorting]);

  const { data } = useSession();

  useEffect(() => {
    const getUsers = async () => {
      const { items, total_count } = await fetchFilteredUsers(
        pagination.page,
        { login: filter.login, lang: filter.lang },
        { sort: sorting.sort, order: sorting.order },
        data?.accessToken ?? ''
      ).then((data) => data);

      setUsers(items);
      setTotalCount(total_count);
    };

    getUsers();
  }, [data?.accessToken, filter.lang, filter.login, pagination, sorting.order, sorting.sort]);

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
      <MyTableControl
        filter={filter}
        sorting={sorting}
        setFilter={setFilter}
        setSorting={setSorting}
      />
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
      <MyPagination
        pagination={pagination}
        setPagination={setPagination}
        totalCount={111}
      />
    </>
  );
};

export default MyTable;
