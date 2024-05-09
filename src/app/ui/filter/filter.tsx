'use client';
import { useAppDispatch, useAppSelector, useAppStore } from '@/app/store/hooks';
import { IPagination } from '@/app/interface/pagination';
import { IFilter, change, selectFilter } from '@/app/slices/filter';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

export function Filter({
  fetchUsers,
  pagination,
}: {
  fetchUsers: (pagination: IPagination, filter: IFilter) => Promise<void>;
  pagination: IPagination;
}) {
  const { filter } = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col justify-between w-1/4 m-2 border-2 px-2 py-1 text-sm overflow-y-auto">
      <div>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Login</AccordionTrigger>
            <AccordionContent>
              <Input
                onChange={(event) =>
                  dispatch(
                    change({
                      ...filter,
                      login: event.target.value,
                    })
                  )
                }
                value={filter.login}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>User Type</AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked
                  disabled
                  onCheckedChange={(e) =>
                    dispatch(
                      change({
                        ...filter,
                        userType: Boolean(e)
                          ? [...filter.userType, 'user']
                          : filter.userType.filter((type) => type !== 'user'),
                      })
                    )
                  }
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  User
                </label>
                <Checkbox
                  id="terms"
                  onCheckedChange={(e) =>
                    dispatch(
                      change({
                        ...filter,
                        userType: Boolean(e)
                          ? [...filter.userType, 'org']
                          : filter.userType.filter((type) => type !== 'org'),
                      })
                    )
                  }
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Organization
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <Button
          className="w-full mb-2"
          onClick={() => {
            fetchUsers(pagination, filter);
          }}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
