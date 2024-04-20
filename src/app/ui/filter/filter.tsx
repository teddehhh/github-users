import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

export function Filter() {
  return (
    <div className="flex flex-col justify-between w-1/4 m-2 border-2 px-2 py-1 text-sm overflow-y-auto">
      <div>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Login</AccordionTrigger>
            <AccordionContent>
              <Input></Input>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>User Type</AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  User
                </label>
                <Checkbox id="terms" />
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
        <Button className="w-full mb-2">Apply</Button>
      </div>
    </div>
  );
}
