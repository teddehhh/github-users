import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TableHeaderProps {
  headers: {
    title: string;
    field: string;
  }[];
  className?: string;
}

export function TableHeaders({ headers, className }: TableHeaderProps) {
  return (
    <TableHeader className={className}>
      <TableRow>
        {headers.map((header, index) => (
          <TableHead key={header.field}>{header.title}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
