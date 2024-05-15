import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { FunctionComponent } from 'react';
import { fetchFilteredUsers, fetchUsers } from '../lib/data';
import clsx from 'clsx';

interface MyTableProps {
  login: string;
  type: string;
  className?: string;
}

const MyTable: FunctionComponent<MyTableProps> = async (props) => {
  const { login, type, className } = props;

  const headers = [
    { title: 'Login', field: 'login' },
    { title: 'Type', field: 'type' },
  ];

  function fetchItems(login: string, type: string) {
    if (login || type) {
      return fetchFilteredUsers(login, type);
    }

    return fetchUsers();
  }

  const items: Array<any> = await fetchItems(login, type);
  const keyField = 'login';

  return (
    <div className={clsx('overflow-y-auto h-full border-2', className)}>
      <Table>
        <TableHeader className="sticky top-0 bg-[#f1f5f9]">
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header.field}>{header.title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length ? (
            items.map((item) => {
              return (
                <TableRow key={item[keyField]}>
                  {headers.map((header) => (
                    <TableCell key={`${item[keyField]}_${header.field}`}>
                      {item[header.field]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell>
                <Skeleton className="w-4/5 h-[10px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-4/5 h-[10px]" />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyTable;
