import { Dispatch, FunctionComponent, SetStateAction } from 'react';

import { Button } from '@/components/ui/button';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter as FilterIcon } from 'lucide-react';
import { FILTER_PREFIX_BUTTON } from './lib/const';
import Filter from './filter/filter';
import Sorting from './sorting/sorting';
import { ISorting } from './sorting/lib/types';
import { IFilter } from './filter/lib/types';

interface ControlPanelProps {
  sorting: ISorting;
  filter: IFilter;
  setSorting: Dispatch<SetStateAction<ISorting>>;
  setFilter: Dispatch<SetStateAction<IFilter>>;
  onFilterOpenChange: (open: boolean) => void;
}

const ControlPanel: FunctionComponent<ControlPanelProps> = (props) => {
  const { sorting, filter, setSorting, setFilter, onFilterOpenChange } = props;

  return (
    <div className="flex justify-start items-center gap-4 px-4 py-2 bg-muted rounded-t-3xl flex-wrap max-md:table-control">
      <Sheet onOpenChange={onFilterOpenChange}>
        <SheetTrigger asChild>
          <Button className="gap-1" variant="ghost">
            <FilterIcon width={16} height={16} />
            {FILTER_PREFIX_BUTTON}
          </Button>
        </SheetTrigger>
        <SheetContent side={'left'}>
          <Filter filter={filter} setFilter={setFilter} />
        </SheetContent>
      </Sheet>
      <Sorting
        sorting={sorting}
        setSorting={setSorting}
        onFilterOpenChange={onFilterOpenChange}
      />
    </div>
  );
};

export default ControlPanel;
