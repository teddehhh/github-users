import { ToastConfig, ToastParams } from '../types/toaster';

export const getUserError = (message: string): ToastParams => {
  return [
    'Не удалось загрузить данные',
    {
      descriptionClassName: 'whitespace-pre-line',
      duration: 5000,
      description: `Описание: ${message.slice(
        0,
        30
      )}...\nПопробуйте выполнить запрос позже`,
      action: { label: 'Закрыть', onClick: () => {} },
    },
  ];
};
