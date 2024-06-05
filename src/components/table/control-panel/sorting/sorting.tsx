import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowDownUp } from 'lucide-react';
import { Button } from '../../../ui/button';
import { SheetTrigger, SheetContent, Sheet } from '../../../ui/sheet';
import { SORT_PREFIX, SORT_PREFIX_BUTTON } from '../lib/const';
import {
  DEFAULT_ORDER,
  DEFAULT_SORT,
  ORDER_ITEMS,
  SORTING_ITEMS,
} from './lib/const';
import { ISorting } from './lib/types';

interface SortingProps {
  sorting: ISorting;
  setSorting: Dispatch<SetStateAction<ISorting>>;
  onFilterOpenChange: (open: boolean) => void;
}

const Sorting: FunctionComponent<SortingProps> = (props) => {
  const { sorting, setSorting, onFilterOpenChange } = props;

  const { sort, order } = sorting;

  const isOrderDisabled = sort === DEFAULT_SORT.value;

  const items = (
    <>
      <Select
        value={sort}
        onValueChange={(value) =>
          setSorting((prev) => ({ ...prev, sort: value }))
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={DEFAULT_SORT.label} />
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
        disabled={isOrderDisabled}
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
    </>
  );

  return (
    <>
      <div className="flex items-center gap-2 max-md:hidden">
        <div className="flex items-center gap-1">
          <ArrowDownUp width={16} height={16} />
          <Label>{SORT_PREFIX}</Label>
        </div>
        <div className="flex items-center gap-1">{items}</div>
      </div>
      <Sheet onOpenChange={onFilterOpenChange}>
        <SheetTrigger asChild>
          <Button className="md:hidden gap-1" variant="ghost">
            <ArrowDownUp width={16} height={16} />
            {SORT_PREFIX_BUTTON}
          </Button>
        </SheetTrigger>
        <SheetContent side={'right'}>
          <div className="flex flex-col h-full w-full mt-4 text-sm">
            <Label className="text-2xl">{SORT_PREFIX_BUTTON}</Label>
            <div className="flex flex-col h-full w-full p-2 overflow-y-auto">
              <div className="flex flex-wrap pt-2 gap-1">{items}</div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sorting;
