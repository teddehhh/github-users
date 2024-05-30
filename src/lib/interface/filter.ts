export interface IFilterItem {
  title: string;
  type: 'input' | 'radio';
  stateKey?: string;
  defaultValue?: string;
  radioItems?: RadioItem[];
  placeholder?: string;
}

type RadioItem = {
  value: string;
  label: string;
  className?: string;
};

export interface IFilter {
  login: string;
  language: string;
}
