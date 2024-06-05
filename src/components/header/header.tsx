import { Label } from '@/components/ui/label';
import { FunctionComponent } from 'react';

import { HEADER_TITLE } from './lib/const';
import DropdownMenu from './dropdown-menu/dropdown-menu';
import { auth } from '../../auth/auth';

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = async () => {
  /** get session */
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <div className="flex justify-between items-center py-1 px-4">
      <Label>{HEADER_TITLE}</Label>
      <DropdownMenu />
    </div>
  );
};

export default Header;
