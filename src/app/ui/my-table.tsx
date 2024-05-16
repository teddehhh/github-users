import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from '@/components/ui/table';
import { FunctionComponent } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

interface MyTableProps {
  items: any[];
  className?: string;
}

const MyTable: FunctionComponent<MyTableProps> = async (props) => {
  const { items, className } = props;

  const headers = [
    { title: '', field: 'avatar_url', type: 'img' },
    { title: 'Логин', field: 'login', type: 'text' },
    { title: 'Счет', field: 'score', type: 'text' },
    { title: 'Админ.', field: 'site_admin', type: 'boolean' },
  ];

  const keyField = 'login';

  const getFieldValue = (item: any, field: string, type: string) => {
    switch (type) {
      case 'text':
        return item[field];
      case 'img':
        return (
          <Image
            className="rounded-full"
            src={item[field]}
            alt={field}
            width={28}
            height={28}
          />
        );
      case 'boolean':
        return Boolean(item[field]) ? 'True' : 'False';
      default:
        break;
    }
  };

  if (!items.length) {
    return (
      <div className="h-full flex flex-row justify-center items-center gap-4">
        <Image
          src={'/github-mark.svg'}
          alt="github-logo"
          width={100}
          height={100}
        />
        <div>
          <label>Пользователи не нашлись {':('}</label>
        </div>
      </div>
    );
  }

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
          {items.map((item) => {
            return (
              <TableRow key={item[keyField]}>
                {headers.map((header) => (
                  <TableCell key={`${item[keyField]}_${header.field}`}>
                    {getFieldValue(item, header.field, header.type)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyTable;
