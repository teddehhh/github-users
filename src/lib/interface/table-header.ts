export interface ITableHeader {
  title: string;
  field: string;
  type: 'img' | 'text' | 'boolean';
  align?: 'left' | 'center' | 'right' | 'justify' | 'char';
  className?: string;
}
