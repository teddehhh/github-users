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
import MyTableHeader from './my-table-header';
import { TABLE_HEADERS } from '../lib/const/table-headers';

interface MyTableProps {}

const MyTableSkeleton: FunctionComponent<MyTableProps> = async (props) => {
  return (
    <div className={'overflow-y-auto h-full'}>
      <Table>
        <MyTableHeader headers={TABLE_HEADERS} />
        <TableBody>
          {Array.from(Array(10).keys()).map((item) => (
            <TableRow key={item}>
              <TableCell align="center">
                <Skeleton className="w-[28px] h-[28px] bg-[#9b9b9b] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-4/5 h-[10px] bg-[#9b9b9b]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-4/5 h-[10px] bg-[#9b9b9b]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-4/5 h-[10px] bg-[#9b9b9b]" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyTableSkeleton;
