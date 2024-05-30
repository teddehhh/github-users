import { ISelect } from '../interface/select';

export const SORTING_ITEMS: ISelect[] = [
  {
    value: 'best_match',
    label: 'по лучшему совпадению',
  },
  {
    value: 'followers',
    label: 'по подписчикам',
  },
  {
    value: 'repositories',
    label: 'по репозиториям',
  },
];

export const ORDER_ITEMS: ISelect[] = [
  {
    value: 'desc',
    label: 'по убыванию',
  },
  {
    value: 'asc',
    label: 'по возрастанию',
  },
];

export const DEFAULT_SORT = SORTING_ITEMS[0];
export const DEFAULT_ORDER: string = ORDER_ITEMS[0].label;
