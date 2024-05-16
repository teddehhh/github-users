import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FunctionComponent } from 'react';

interface MyTableProps {}

const MyTableSkeleton: FunctionComponent<MyTableProps> = async (props) => {
  const headers = [
    { title: '', field: 'avatar_url' },
    { title: 'Логин', field: 'login' },
    { title: 'Счет', field: 'score' },
    { title: 'Админ.', field: 'site_admin' },
  ];

  return (
    <div className={'overflow-y-auto h-full border-2'}>
      <Table>
        <TableHeader className="sticky top-0 bg-[#f1f5f9]">
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header.field}>{header.title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Skeleton className="w-[28px] h-[28px] rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-4/5 h-[10px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-4/5 h-[10px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-4/5 h-[10px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className="w-[28px] h-[28px] rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-4/5 h-[10px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-4/5 h-[10px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-4/5 h-[10px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className="w-[28px] h-[28px] rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-4/5 h-[10px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-4/5 h-[10px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-4/5 h-[10px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className="w-[28px] h-[28px] rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-4/5 h-[10px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-4/5 h-[10px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-4/5 h-[10px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className="w-[28px] h-[28px] rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-4/5 h-[10px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-4/5 h-[10px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-4/5 h-[10px]" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default MyTableSkeleton;
