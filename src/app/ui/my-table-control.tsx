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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MyTableControlProps {}

const MyTableControl: FunctionComponent<MyTableControlProps> = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const onValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    const urlValue = value === 'match' ? '' : value;
    params.set('s', urlValue);

    replace(`${pathname}?${params.toString()}`);
  };

  const renderSelectItem = (value: string, label: string) => {
    if (value == 'match') {
      return <>{label}</>;
    }

    return <div className="flex items-center gap-2">{label}</div>;
  };

  return (
    <div className="flex flex-row items-center gap-4 px-4 py-2 bg-muted rounded-t-3xl flex-wrap">
      <Sheet>
        <SheetTrigger>
          <ChevronRight className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent side={'left'}>
          <Filter></Filter>
        </SheetContent>
      </Sheet>
      <div className="flex flex-row items-center gap-2">
        <Label>{SORT_PREFIX}</Label>
        <Select onValueChange={onValueChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={DEFAULT_SORT} />
          </SelectTrigger>
          <SelectContent>
            {SORTING_ITEMS.map(({ value, label }) => (
              <SelectItem
                key={`s_${value}`}
                value={value}
                className="w-full"
              >
                {renderSelectItem(value, label)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={onValueChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder={DEFAULT_ORDER} />
          </SelectTrigger>
          <SelectContent>
            {ORDER_ITEMS.map(({ value, label }) => (
              <SelectItem
                key={`o_${value}`}
                value={value}
                className="w-full"
              >
                {renderSelectItem(value, label)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MyTableControl;
