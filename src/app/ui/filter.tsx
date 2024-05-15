'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { FunctionComponent } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface FilterProps {
  children: React.ReactNode;
}

const Filter: FunctionComponent<FilterProps> = (props) => {
  const { children } = props;

  /** getting URL params from client */
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchLogin = useDebouncedCallback((login: string) => {
    const params = new URLSearchParams(searchParams);

    if (login) {
      params.set('login', login);
    } else {
      params.delete('login');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  function searchType(type: string, checked: boolean) {
    const params = new URLSearchParams(searchParams);

    const typeParam = params.get('type');

    if (checked) {
      if (!typeParam) {
        params.set('type', type);
      } else {
        params.delete('type');
      }
    } else {
      if (typeParam) {
        params.delete('type');
      } else {
        params.set('type', type === 'org' ? 'user' : 'org');
      }
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col justify-between w-1/4 border-2 px-2 py-1 text-sm overflow-y-auto">
      <div>
        <Accordion
          defaultValue={['item-1', 'item-2']}
          type="multiple"
          className="w-full"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Login</AccordionTrigger>
            <AccordionContent>
              <Input onChange={(e) => searchLogin(e.target.value)} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>User Type</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    onCheckedChange={(e) => searchType('user', Boolean(e))}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    User
                  </label>
                </div>
                <div className="flex items-center space-x-2 ">
                  <Checkbox
                    id="terms"
                    onCheckedChange={(e) => searchType('org', Boolean(e))}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Organization
                  </label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-col gap-2 w-full mb-2">{children}</div>
    </div>
  );
};

export default Filter;
