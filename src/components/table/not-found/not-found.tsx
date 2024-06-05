import { FunctionComponent } from 'react';
import Image from 'next/image';
import { Label } from '@radix-ui/react-label';
import { USERS_NOT_FOUND } from './lib/const';

interface TableNotFoundProps {}

const TableNotFound: FunctionComponent<TableNotFoundProps> = () => {
  return (
    <div className="h-full flex flex-row justify-center items-center gap-4 max-md:not-found">
      <Image
        className="w-auto h-auto"
        priority
        src={'/not-found.png'}
        alt="github-logo"
        width={300}
        height={300}
      />
      <div>
        <Label className="whitespace-pre font-medium text-lg">
          {USERS_NOT_FOUND}
        </Label>
      </div>
    </div>
  );
};

export default TableNotFound;
