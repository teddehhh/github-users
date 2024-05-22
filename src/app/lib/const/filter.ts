export const FILTER_LABEL = 'Фильтр';

type RadioItem = {
  value: string;
  label: string;
  className?: string;
};

export interface IFilterItem {
  title: string;
  type: 'input' | 'radio';
  handlerKey?: string;
  defaultValue?: string;
  radioItems?: RadioItem[];
}

export const FILTER_ITEMS: IFilterItem[] = [
  { title: 'Имя', type: 'input', handlerKey: 'name' },
  {
    title: 'Язык',
    type: 'radio',
    handlerKey: 'lang',
    defaultValue: 'all',
    radioItems: [
      { value: 'all', label: 'Все' },
      { value: 'html', label: 'HTML', className: 'bg-orange-500' },
      { value: 'css', label: 'CSS', className: 'bg-purple-900' },
      { value: 'javascript', label: 'JavaScript', className: 'bg-yellow-300' },
      { value: 'cpp', label: 'C++', className: 'bg-pink-300' },
    ],
  },
];
