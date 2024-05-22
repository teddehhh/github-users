'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { FunctionComponent } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FILTER_ITEMS, FILTER_LABEL, IFilterItem } from '../lib/const/filter';
import { IFilter } from '../lib/interface';

interface FilterProps {
  filter: IFilter;
  setFilter: (_: IFilter | ((prev: IFilter) => IFilter)) => void;
  children?: React.ReactNode;
}

const Filter: FunctionComponent<FilterProps> = (props) => {
  const { filter, setFilter, children } = props;
  const { login, lang } = filter;

  /** filter items states */
  const states = [
    {
      key: 'name',
      onChange: (login: string) => {
        setFilter((prev) => ({ ...prev, login }));
      },
      value: login,
    },
    {
      key: 'lang',
      onChange: (lang: string) => {
        setFilter((prev) => ({ ...prev, lang }));
      },
      value: lang,
    },
  ];

  const accorditionValues = Array.from(Array(FILTER_ITEMS.length).keys()).map(
    (key) => `item-${key}`
  );

  return (
    <div className="flex flex-col h-full w-full justify-between mt-4 text-sm gap-2">
      <div className="flex flex-col h-full w-full">
        <Label className="text-2xl">{FILTER_LABEL}</Label>
        <div className="overflow-y-auto p-2">
          <Accordion
            defaultValue={accorditionValues}
            type="multiple"
            className="w-full"
          >
            {FILTER_ITEMS.map((filter, index) => {
              const { title } = filter;

              const renderContent: (_: IFilterItem) => React.ReactNode = (
                filter: IFilterItem
              ) => {
                const { type, stateKey } = filter;
                const state = states.find(({ key }) => key === stateKey);

                switch (type) {
                  case 'input':
                    return (
                      <Input
                        onChange={(e) => state?.onChange(e.target.value)}
                        value={state?.value}
                      />
                    );
                  case 'radio':
                    const { radioItems } = filter;

                    return (
                      <RadioGroup
                        onValueChange={(lang) => state?.onChange(lang)}
                        defaultValue={state?.value}
                      >
                        {radioItems?.map((radioItem, index) => {
                          const { label, value, className } = radioItem;
                          const id = `r${index}`;

                          return (
                            <div
                              key={`radio_${value}`}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={value}
                                className={className}
                                id={id}
                              />
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
      <div className="flex flex-col gap-2 w-full mb-2">{children}</div>
    </div>
  );
};

export default Filter;
