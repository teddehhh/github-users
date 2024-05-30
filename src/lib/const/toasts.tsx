import { Ban, Triangle, TriangleAlert } from 'lucide-react';
import { ToastParams } from '../types/toaster';

export const getUserError = (message: string): ToastParams => {
  return [
    'Не удалось загрузить данные',
    {
      descriptionClassName: 'whitespace-pre-line',
      duration: 8000,
      description: `Описание: ${message.slice(
        0,
        30
      )}...\nПопробуйте выполнить запрос позже`,
      action: { label: 'Закрыть', onClick: () => {} },
      style: {
        backgroundColor: 'hsl(var(--muted))',
        borderColor: 'hsl(var(--border))',
        color: 'hsl(var(--text))',
      },
      icon: <TriangleAlert color="orange" width={16} height={16} />,
    },
  ];
};
