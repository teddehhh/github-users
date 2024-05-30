'use client';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import {
  FunctionComponent,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { KEY_FIELD, TABLE_HEADERS } from '../lib/const/table-headers';
import { renderCell } from '../lib/render-cell';
import MyTableHeader from './my-table-header';

import { FILTER_APPLY_DEBOUNCE } from '@/lib/const/filter';
import { DEFAULT_PAGE } from '@/lib/const/pagination';
import { DEFAULT_SORT } from '@/lib/const/sorting';
import { Toaster, toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';
import { LOCAL_STORAGE_DATA } from '../lib/const/localStorage';
import { fetchFilteredUsers } from '../lib/data';
import useLocalStorage from '../lib/hooks/useLocalStorage';
import { IFilter, IPagination, ISorting, IUser } from '../lib/interface';
import Loader from './loader';
import MyPagination from './my-pagination';
import MyTableControl from './my-table-control';
import TableNotFound from './table-not-found';
import { getUserError } from '@/lib/const/toasts';

interface MyTableProps {
  className?: string;
}

const MyTable: FunctionComponent<MyTableProps> = (props) => {
  const { className } = props;

  const [users, setUsers] = useState<IUser[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const { states, synced } = useLocalStorage(...LOCAL_STORAGE_DATA);
  const [
    { state: pagination, setState: setPagination },
    { state: filter, setState: setFilter },
    { state: sorting, setState: setSorting },
  ] = states;

  const setPaginationWithDebounce = useDebouncedCallback(
    setPagination,
    FILTER_APPLY_DEBOUNCE
  );

  const setFilterWithReset = (obj: SetStateAction<IFilter>) => {
    setFilter(obj);
    setPaginationWithDebounce({ page: DEFAULT_PAGE } as IPagination);
  };
  const setSortingWithPaginationReset = (obj: SetStateAction<ISorting>) => {
    setSorting(obj);
    setPagination({ page: DEFAULT_PAGE } as IPagination);
  };

  const { data } = useSession();

  useEffect(() => {
    async function getUsers() {
      const { page } = pagination as IPagination;
      const { login, language } = filter as IFilter;
      const { sort, order } = sorting as ISorting;

      setShowLoader(true);
      //TODO: Добавить адаптер для данных
      const { items, total_count } = await fetchFilteredUsers(
        page,
        { login, language: language === 'all' ? '' : language },
        {
          sort: sort === DEFAULT_SORT.value ? '' : sort,
          order: sort === DEFAULT_SORT.value ? '' : order,
        },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, synced]);

  const table = useMemo(() => {
    if (users && users.length) {
      return (
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
      );
    }

    return <TableNotFound />;
  }, [users]);

  return (
    <>
      <MyTableControl
        filter={filter as IFilter}
        sorting={sorting as ISorting}
        setFilter={setFilterWithReset}
        setSorting={setSortingWithPaginationReset}
        onFilterOpenChange={setIsFilterOpened}
      />
      <div className={clsx('overflow-y-auto h-full', className)}>{table}</div>
      <MyPagination
        pagination={pagination as IPagination}
        setPagination={setPagination}
        totalCount={totalCount}
      />
      {showLoader ? <Loader /> : null}
      <Toaster
        className={clsx(
          { 'z-0': isFilterOpened },
          { 'delay-500': !isFilterOpened }
        )}
      />
    </>
  );
};

export default MyTable;
