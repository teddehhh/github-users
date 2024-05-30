'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface GitHubButtonIconProps {}

const GitHubButtonIcon: FunctionComponent<GitHubButtonIconProps> = () => {
  const [src, setSrc] = useState('/github-mark.svg');
  const { theme, systemTheme } = useTheme();

  const mode = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    setSrc(mode === 'dark' ? '/github-mark.svg' : '/github-mark-white.svg');
  }, [mode]);

  return <Image src={src} alt="github-logo" width={22} height={22} />;
};

export default GitHubButtonIcon;
