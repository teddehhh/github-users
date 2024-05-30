import { ITableHeader } from '../interface/table-header';

export const TABLE_HEADERS: ITableHeader[] = [
  {
    title: '',
    field: 'avatar_url',
    type: 'img',
    align: 'center',
    className: 'w-[100px]',
  },
  { title: 'Имя', field: 'login', type: 'text' },
  { title: 'Очки', field: 'score', type: 'text' },
  { title: 'Администратор', field: 'site_admin', type: 'boolean' },
];

export const KEY_FIELD = 'login';
