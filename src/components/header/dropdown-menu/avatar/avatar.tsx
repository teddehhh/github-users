'use client';

import {
  Avatar as AvatarContainer,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import { FunctionComponent } from 'react';

interface AvatarProps {}

const Avatar: FunctionComponent<AvatarProps> = () => {
  /** get session */
  const { data } = useSession();

  const img = data?.user.image;
  const name = data?.user.name.slice(0, 2);

  return (
    <AvatarContainer className="w-8 h-8">
      <AvatarImage src={img} alt="user_avatar" />
      <AvatarFallback>{name}</AvatarFallback>
    </AvatarContainer>
  );
};

export default Avatar;
