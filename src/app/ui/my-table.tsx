'use client';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FunctionComponent, useEffect, useState } from 'react';
import { KEY_FIELD, TABLE_HEADERS } from '../lib/const/table-headers';
import { renderCell } from '../lib/render-cell';
import MyTableHeader from './my-table-header';

import { useTheme } from 'next-themes';
import { Toaster, toast } from 'sonner';
import { LOCAL_STORAGE_DATA } from '../lib/const/localStorage';
import { USERS_NOT_FOUND } from '../lib/const/my-table';
import { getUserError } from '../lib/const/toasts';
import { fetchFilteredUsers } from '../lib/data';
import useLocalStorage from '../lib/hooks/useLocalStorage';
import { IFilter, IPagination, ISorting, IUser } from '../lib/interface';
import { ToasterThemes } from '../lib/types/toaster';
import Loader from './loader';
import MyPagination from './my-pagination';
import MyTableControl from './my-table-control';

interface MyTableProps {
  className?: string;
}

const MyTable: FunctionComponent<MyTableProps> = (props) => {
  const { className } = props;

  const [users, setUsers] = useState<IUser[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const { theme } = useTheme();
  const { states, synced } = useLocalStorage(...LOCAL_STORAGE_DATA);

  const [
    { state: pagination, setState: setPagination },
    { state: filter, setState: setFilter },
    { state: sorting, setState: setSorting },
  ] = states;

  const { data } = useSession();
  useEffect(() => {
    async function getUsers() {
      const { page } = pagination as IPagination;
      const { login, lang } = filter as IFilter;
      const { sort, order } = sorting as ISorting;

      setShowLoader(true);
      const { items, total_count } = await fetchFilteredUsers(
        page,
        { login, lang },
        { sort, order },
        data?.accessToken ?? ''
      );

      setUsers(items);
      setTotalCount(total_count);
    }

    if (synced) {
      getUsers()
        .then(() => setShowLoader(false))
        .catch((error) => {
          const strObj = (error as Error).message;
          const message = JSON.parse(strObj).message as string;
          const config = getUserError(message);

          toast(...config);
          setShowLoader(false);
        });
    }
  }, [filter, pagination, sorting, synced, data?.accessToken]);

  return (
    <>
      <MyTableControl
        filter={filter as IFilter}
        sorting={sorting as ISorting}
        setFilter={setFilter}
        setSorting={setSorting}
        onFilterOpenChange={setIsFilterOpened}
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
              className="w-auto h-auto"
              priority
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
      {showLoader ? <Loader /> : null}
      <Toaster
        theme={theme as ToasterThemes}
        className={clsx(
          { 'z-0': isFilterOpened },
          { 'delay-500': !isFilterOpened }
        )}
      />
    </>
  );
};

export default MyTable;
