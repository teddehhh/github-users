interface ITableHeaders {
  title: string;
  field: string;
  type: 'img' | 'text' | 'boolean';
  align?: 'left' | 'center' | 'right' | 'justify' | 'char';
  className?: string;
  sort?: boolean;
}

export const TABLE_HEADERS: ITableHeaders[] = [
  {
    title: '',
    field: 'avatar_url',
    type: 'img',
    align: 'center',
    className: 'w-[100px]',
  },
  { title: 'Имя', field: 'login', type: 'text' },
  { title: 'Очки', field: 'score', type: 'text', sort: false },
  { title: 'Администратор', field: 'site_admin', type: 'boolean', sort: false },
];

export const KEY_FIELD = 'login';
