import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { TableHeaders } from './lib';

interface TableDataProps {
  headers: Array<{ title: string; field: string }>;
  keyField: string;
  items: Array<any>;
  tableCaption?: string;
}

export function TableItems({
  headers,
  keyField,
  items,
  tableCaption,
}: TableDataProps) {
  return (
    <Table>
      <TableCaption>{tableCaption}</TableCaption>
      <TableHeaders headers={headers} />
      <TableBody>
        {items.map((item) => (
          <TableRow key={item[keyField]}>
            {headers.map((header) => (
              <TableCell key={`${item[keyField]}_${header.field}`}>
                {item[header.field]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
