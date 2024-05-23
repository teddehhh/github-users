import { ToastParams } from '../types/toaster';

export const GET_USER_ERROR: ToastParams = [
  'Не удалось загрузить данные',
  {
    duration: 5000,
    description: 'Попробуйте выполнить запрос позже',
    action: { label: 'Закрыть', onClick: () => {} },
  },
];
