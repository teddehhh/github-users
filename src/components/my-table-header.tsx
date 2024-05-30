import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ITableHeader } from '@/lib/interface/table-header';
import { FunctionComponent } from 'react';

interface MyTableHeaderProps {
  headers: ITableHeader[];
}

const MyTableHeader: FunctionComponent<MyTableHeaderProps> = (props) => {
  const { headers } = props;

  return (
    <TableHeader className="sticky top-0 bg-muted">
      <TableRow>
        {headers.map((header) => (
          <TableHead className={header.className} key={header.field}>
            {header.title}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default MyTableHeader;
