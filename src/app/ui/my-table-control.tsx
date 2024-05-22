import { FunctionComponent } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ArrowDown01, ArrowDown10, ChevronRight } from 'lucide-react';
import Filter from './filter';
import {
  DEFAULT_ORDER,
  DEFAULT_SORT,
  ORDER_ITEMS,
  SORTING_ITEMS,
} from '../lib/const/sorting';
import { SORT_PREFIX } from '../lib/const/my-table-control';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { IFilter, ISorting } from '../lib/interface';

interface MyTableControlProps {
  sorting: ISorting;
  filter: IFilter;
  setSorting: (_: ISorting | ((prev: ISorting) => ISorting)) => void;
  setFilter: (_: IFilter | ((prev: IFilter) => IFilter)) => void;
}

const MyTableControl: FunctionComponent<MyTableControlProps> = (props) => {
  const { sorting, filter, setSorting, setFilter } = props;
  const { sort, order } = sorting;

  return (
    <div className="flex flex-row items-center gap-4 px-4 py-2 bg-muted rounded-t-3xl flex-wrap">
      <Sheet>
        <SheetTrigger>
          <ChevronRight className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent side={'left'}>
          <Filter filter={filter} setFilter={setFilter} />
        </SheetContent>
      </Sheet>
      <div className="flex flex-row items-center gap-2">
        <Label>{SORT_PREFIX}</Label>
        <Select
          value={sort}
          onValueChange={(value) =>
            setSorting((prev) => ({ ...prev, sort: value }))
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={DEFAULT_SORT} />
          </SelectTrigger>
          <SelectContent>
            {SORTING_ITEMS.map(({ value, label }) => (
              <SelectItem key={`s_${value}`} value={value} className="w-full">
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={order}
          onValueChange={(value) =>
            setSorting((prev) => ({ ...prev, order: value }))
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder={DEFAULT_ORDER} />
          </SelectTrigger>
          <SelectContent>
            {ORDER_ITEMS.map(({ value, label }) => (
              <SelectItem key={`o_${value}`} value={value} className="w-full">
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MyTableControl;
