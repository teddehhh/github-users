'use client';
import { Button } from '@/components/ui/button';
import { Laptop, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { FunctionComponent } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SliderProps {
  dropdownOpenHandler: (_: boolean) => void;
  preventOpenHandler: (_: boolean) => void;
}

const ThemeSlider: FunctionComponent<SliderProps> = (props) => {
  const { dropdownOpenHandler, preventOpenHandler } = props;
  const { theme, setTheme } = useTheme();

  const getCurrentVariant = (buttonTheme: string) => {
    return theme === buttonTheme ? 'default' : 'ghost';
  };

  const onChangeTheme = (theme: string) => {
    setTheme(theme);
    preventOpenHandler(true);
    dropdownOpenHandler(true);
  };

  const config = [
    {
      mode: 'system',
      icon: <Laptop width={20} height={20} />,
      tooltipTitle: 'Система',
    },
    {
      mode: 'light',
      icon: <Sun width={20} height={20} />,
      tooltipTitle: 'Светлая',
    },
    {
      mode: 'dark',
      icon: <Moon width={20} height={20} />,
      tooltipTitle: 'Темная',
    },
  ];

  return (
    <div className="flex justify-evenly w-full bg-transparent rounded-sm p-1">
      {config.map(({ mode, icon, tooltipTitle }) => (
        <TooltipProvider key={mode}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="p-0 w-8 h-8"
                variant={getCurrentVariant(mode)}
                onClick={() => onChangeTheme(mode)}
              >
                {icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipTitle}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default ThemeSlider;
