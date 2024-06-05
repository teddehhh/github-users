import {
  TableHead,
  TableHeader as TableHeaderContainer,
  TableRow,
} from '@/components/ui/table';
import { FunctionComponent } from 'react';
import { IHeader } from '../lib/types/header';

interface TableHeaderProps {
  headers: IHeader[];
}

const TableHeader: FunctionComponent<TableHeaderProps> = (props) => {
  const { headers } = props;

  return (
    <TableHeaderContainer className="sticky top-0 bg-muted">
      <TableRow>
        {headers.map((header) => (
          <TableHead className={header.className} key={header.field}>
            {header.title}
          </TableHead>
        ))}
      </TableRow>
    </TableHeaderContainer>
  );
};

export default TableHeader;
