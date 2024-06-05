'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React, { FunctionComponent, SetStateAction, Dispatch } from 'react';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { CLEAR_BUTTON, FILTER_ITEMS, FILTER_LABEL } from './lib/const';
import { IFilter, IFilterItem, IStateRecord } from './lib/types';

interface FilterProps {
  filter: IFilter;
  setFilter: Dispatch<SetStateAction<IFilter>>;
}

const Filter: FunctionComponent<FilterProps> = (props) => {
  const { filter, setFilter } = props;

  const filterStates: IStateRecord = Object.keys(filter).reduce(
    (prev, key) => ({
      ...prev,
      [key]: {
        onChange: (value: unknown) => {
          setFilter((prev) => ({ ...prev, [key]: value }));
        },
        value: filter[key as keyof IFilter],
      },
    }),
    {}
  );

  const renderContent: (_: IFilterItem) => React.ReactNode = (
    filter: IFilterItem
  ) => {
    const { type, stateKey, placeholder } = filter;
    const state = filterStates[stateKey as keyof typeof stateKey];

    switch (type) {
      case 'input':
        return (
          <Input
            onChange={(e) => state.onChange(e.target.value)}
            value={state.value}
            placeholder={placeholder}
          />
        );
      case 'radio':
        const { radioItems } = filter;

        return (
          <RadioGroup
            onValueChange={(value) => state?.onChange(value)}
            value={state?.value}
          >
            {radioItems?.map((radioItem, index) => {
              const { label, value, className } = radioItem;
              const id = `r${index}`;

              return (
                <div
                  key={`radio_${value}`}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem value={value} className={className} id={id} />
                  <Label htmlFor={id}>{label}</Label>
                </div>
              );
            })}
          </RadioGroup>
        );
      default:
        return <></>;
    }
  };

  const accorditionValues = Array.from(Array(FILTER_ITEMS.length).keys()).map(
    (key) => `item-${key}`
  );

  /** TODO: изменить сравнение объектов */
  const isClearButtonDisabled =
    JSON.stringify(filter) === JSON.stringify({ login: '', language: 'all' });

  return (
    <div className="flex flex-col h-full w-full justify-between mt-4 text-sm gap-2">
      <Label className="text-2xl">{FILTER_LABEL}</Label>
      <div className="flex flex-col h-full w-full overflow-y-auto">
        <div className="flex flex-col h-full w-full">
          <div className="p-2">
            <Accordion
              defaultValue={accorditionValues}
              type="multiple"
              className="w-full"
            >
              {FILTER_ITEMS.map((filter, index) => {
                const { title } = filter;
                return (
                  <AccordionItem
                    key={`filter_item_${index}`}
                    value={accorditionValues[index]}
                  >
                    <AccordionTrigger>{title}</AccordionTrigger>
                    <AccordionContent>{renderContent(filter)}</AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
      <Button
        className="gap-2"
        variant="destructive"
        disabled={isClearButtonDisabled}
        onClick={() => setFilter({ login: '', language: 'all' })}
      >
        <Trash2 width={16} height={16} />
        {CLEAR_BUTTON}
      </Button>
    </div>
  );
};

export default Filter;
