import { FunctionComponent } from 'react';
import Filter from './filter';
import SignOutButton from './sign-out-button';

interface MyTableProps {}

const MyTable: FunctionComponent<MyTableProps> = () => {
  return (
    <div className="flex flex-row justify-between h-full">
      <Filter>
        <SignOutButton />
      </Filter>
    </div>
  );
};

export default MyTable;
