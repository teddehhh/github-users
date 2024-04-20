import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { TableHeaders } from '.';
import { Skeleton } from '@/components/ui/skeleton';

interface TableDataProps {
  headers: Array<{ title: string; field: string }>;
  keyField: string;
  items: Array<any>;
}

export function TableItems({ headers, keyField, items }: TableDataProps) {
  return (
    <Table>
      <TableHeaders className="sticky top-0 bg-[#f1f5f9]" headers={headers} />
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
  );
}
