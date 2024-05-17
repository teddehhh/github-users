'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FunctionComponent } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface FilterProps {
  children?: React.ReactNode;
}

const Filter: FunctionComponent<FilterProps> = (props) => {
  const { children } = props;

  /** getting URL params from client */
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchLogin = useDebouncedCallback((login: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');

    if (login) {
      params.set('login', login);
    } else {
      params.delete('login');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const searchLang = (lang: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (lang !== 'all') {
      params.set('lang', lang);
    } else {
      params.delete('lang');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col h-full w-full justify-between mt-4 text-sm gap-2">
      <div className="overflow-y-auto">
        <Accordion
          defaultValue={['item-1', 'item-2']}
          type="multiple"
          className="w-full"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Имя</AccordionTrigger>
            <AccordionContent>
              <Input onChange={(e) => searchLogin(e.target.value)} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Языки</AccordionTrigger>
            <AccordionContent>
              <RadioGroup
                defaultValue="all"
                onValueChange={(lang) => searchLang(lang)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="r1" />
                  <Label htmlFor="r1">All</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="html"
                    className="bg-orange-500"
                    id="r2"
                  />
                  <Label htmlFor="r2">HTML</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="css"
                    className="bg-purple-900"
                    id="r3"
                  />
                  <Label htmlFor="r3">CSS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="javascript"
                    className="bg-yellow-300"
                    id="r3"
                  />
                  <Label htmlFor="r3">JavaScript</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="c++" className="bg-pink-400" id="r3" />
                  <Label htmlFor="r3">C++</Label>
                </div>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-col gap-2 w-full mb-2">{children}</div>
    </div>
  );
};

export default Filter;
