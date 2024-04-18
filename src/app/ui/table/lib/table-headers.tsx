import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TableHeaderProps {
  headers: {
    title: string;
    field: string;
  }[];
}

export function TableHeaders({ headers }: TableHeaderProps) {
  return (
    <TableHeader className="sticky top-0 bg-[#f1f5f9]">
      <TableRow>
        {headers.map((header) => (
          <TableHead key={header.field}>{header.title}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
