import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import clsx from 'clsx';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import MyTableHeader from './my-table-header';

interface MyTableProps {
  items: any[];
  className?: string;
}

const MyTable: FunctionComponent<MyTableProps> = async (props) => {
  const { items, className } = props;

  const headers: {
    title: string;
    field: string;
    type: 'img' | 'text' | 'boolean';
    align?: 'left' | 'center' | 'right' | 'justify' | 'char';
    className?: string;
    sort?: boolean;
  }[] = [
    {
      title: '',
      field: 'avatar_url',
      type: 'img',
      align: 'center',
      className: 'w-[100px]',
    },
    { title: 'Имя', field: 'login', type: 'text' },
    { title: 'Подписчики', field: 'followers', type: 'text', sort: true },
    { title: 'Репозитории', field: 'repositories', type: 'text', sort: true },
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
    <div className={clsx('overflow-y-auto h-full', className)}>
      <Table>
        <MyTableHeader headers={headers} />
        <TableBody>
          {items.map((item) => {
            return (
              <TableRow key={item[keyField]}>
                {headers.map((header) => (
                  <TableCell
                    align={header?.align}
                    key={`${item[keyField]}_${header.field}`}
                  >
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
