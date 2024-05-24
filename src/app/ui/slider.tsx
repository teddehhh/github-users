'use client';
import { Button } from '@/components/ui/button';
import { Laptop, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { FunctionComponent } from 'react';

interface SliderProps {
  dropdownOpenHandler: (_: boolean) => void;
  preventOpenHandler: (_: boolean) => void;
}

const Slider: FunctionComponent<SliderProps> = (props) => {
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
    { mode: 'system', icon: <Laptop width={20} height={20} /> },
    { mode: 'light', icon: <Sun width={20} height={20} /> },
    { mode: 'dark', icon: <Moon width={20} height={20} /> },
  ];

  return (
    <div className="flex justify-evenly w-full bg-muted rounded-sm p-1">
      {config.map(({ mode, icon }) => (
        <Button
          key={mode}
          className="p-0 w-8 h-8"
          variant={getCurrentVariant(mode)}
          onClick={() => onChangeTheme(mode)}
        >
          {icon}
        </Button>
      ))}
    </div>
  );
};

export default Slider;
