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

interface FilterProps {
  children?: React.ReactNode;
}

const Filter: FunctionComponent<FilterProps> = (props) => {
  const { children } = props;

  /** getting URL params from client */
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  /** filter items handlers */
  const onChangeHandlers = [
    {
      key: 'name',
      onChange: useDebouncedCallback((login: string) => {
        const params = new URLSearchParams(searchParams);

        params.set('page', '1');

        if (login) {
          params.set('login', login);
        } else {
          params.delete('login');
        }

        replace(`${pathname}?${params.toString()}`);
      }, 300),
    },
    {
      key: 'lang',
      onChange: (lang: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        if (lang !== 'all') {
          params.set('lang', lang);
        } else {
          params.delete('lang');
        }

        replace(`${pathname}?${params.toString()}`);
      },
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
                const { type, handlerKey, defaultValue } = filter;
                const handlerObj = onChangeHandlers.find(
                  ({ key }) => key === handlerKey
                );

                switch (type) {
                  case 'input':
                    return (
                      <Input
                        onChange={(e) => handlerObj?.onChange(e.target.value)}
                      />
                    );
                  case 'radio':
                    const { radioItems } = filter;

                    return (
                      <RadioGroup
                        defaultValue={defaultValue}
                        onValueChange={(lang) => handlerObj?.onChange(lang)}
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
