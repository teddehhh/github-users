import { Button } from '@/components/ui/button';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowDown01, ArrowDown10 } from 'lucide-react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { FunctionComponent } from 'react';

interface MyTableHeaderProps {
  headers: {
    title: string;
    field: string;
    type: 'img' | 'text' | 'boolean';
    align?: 'left' | 'center' | 'right' | 'justify' | 'char';
    className?: string;
    sort?: boolean;
  }[];
}

const MyTableHeader: FunctionComponent<MyTableHeaderProps> = (props) => {
  const { headers } = props;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const getHeader = (field: string, title: string, sort?: boolean) => {
    if (sort) {
      const getSortIcon = (field: string) => {
        const params = new URLSearchParams(searchParams);
        const sort = params.get('s');
        const order = params.get('o');

        if (field === sort) {
          return order === 'desc' ? (
            <ArrowDown10 width={20} height={20} />
          ) : (
            <ArrowDown01 width={20} height={20} />
          );
        }

        return null;
      };

      const headerHandler = (field: string) => {
        const params = new URLSearchParams(searchParams);
        const sort = params.get('s');
        const order = params.get('o');

        params.set('page', '1');

        // проверка отсутствия сортировки или смены столбца
        if (!sort || sort !== field) {
          params.set('s', field);
          params.set('o', 'desc');
        } else {
          // смена направления
          if (order === 'asc') {
            params.delete('s');
            params.delete('o');
          } else {
            params.set('o', 'asc');
          }
        }

        replace(`${pathname}?${params.toString()}`);
      };

      return (
        <div className="flex items-center gap-2">
          <Button
            className="p-0 m-0"
            variant={'ghost'}
            onClick={() => headerHandler(field)}
          >
            {title}
          </Button>
          {getSortIcon(field)}
        </div>
      );
    }

    return <>{title}</>;
  };

  return (
    <TableHeader className="sticky top-0 bg-muted">
      <TableRow>
        {headers.map((header) => (
          <TableHead className={header.className} key={header.field}>
            {getHeader(header.field, header.title, header.sort)}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default MyTableHeader;
