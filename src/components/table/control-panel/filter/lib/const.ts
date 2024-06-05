import { IFilterItem } from './types';

export const FILTER_LABEL = 'Фильтры';

export const FILTER_ITEMS: IFilterItem[] = [
  {
    title: 'Имя',
    type: 'input',
    stateKey: 'login',
    placeholder: 'Введите имя',
  },
  {
    title: 'Язык',
    type: 'radio',
    stateKey: 'language',
    radioItems: [
      { value: 'all', label: 'Все' },
      { value: 'html', label: 'HTML', className: 'bg-orange-500' },
      { value: 'css', label: 'CSS', className: 'bg-purple-900' },
      { value: 'javascript', label: 'JavaScript', className: 'bg-yellow-300' },
      { value: 'cpp', label: 'C++', className: 'bg-pink-300' },
    ],
  },
];

export const CLEAR_BUTTON = 'Очистить';
export const FILTER_APPLY_DEBOUNCE = 1000;
