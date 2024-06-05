'use client';

import {
  Table as TableContainer,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import {
  FunctionComponent,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { KEY_FIELD, TABLE_HEADERS } from './lib/const/headers';

import { Toaster, toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';
import { LOCAL_STORAGE_DATA } from './lib/const/localStorage';
import { fetchFilteredUsers } from '../../api/data';
import Loader from './loader/loader';
import Pagination from './pagination/pagination';
import ControlPanel from './control-panel/control-panel';
import TableNotFound from './not-found/not-found';
import { getUserError } from '@/components/table/lib/const/toasts';
import { DEFAULT_PAGE } from './pagination/lib/const';
import { FILTER_APPLY_DEBOUNCE } from './control-panel/filter/lib/const';
import { DEFAULT_SORT } from './control-panel/sorting/lib/const';
import TableHeader from './header/header';
import { IUser } from './lib/types/user';
import { IFilter } from './control-panel/filter/lib/types';
import { IPagination } from './pagination/lib/types';
import { ISorting } from './control-panel/sorting/lib/types';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import { renderCell } from './lib/utils/render-cell';
import { AxiosError } from 'axios';
import { IGitHubAPIError } from '@/api/lib/types';

interface TableProps {
  className?: string;
}

const Table: FunctionComponent<TableProps> = (props) => {
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
        .catch((error: AxiosError<IGitHubAPIError>) => {
          const { response } = error;
          const message = response?.data.message ?? '';
          const toastConfig = getUserError(message);

          toast(...toastConfig);
          setShowLoader(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, synced]);

  const table = useMemo(() => {
    if (users && users.length) {
      return (
        <TableContainer>
          <TableHeader headers={TABLE_HEADERS} />
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
        </TableContainer>
      );
    }

    return <TableNotFound />;
  }, [users]);

  return (
    <>
      <ControlPanel
        filter={filter as IFilter}
        sorting={sorting as ISorting}
        setFilter={setFilterWithReset}
        setSorting={setSortingWithPaginationReset}
        onFilterOpenChange={setIsFilterOpened}
      />
      <div className={clsx('overflow-y-auto h-full', className)}>{table}</div>
      <Pagination
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

export default Table;
