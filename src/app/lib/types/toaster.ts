import { Toaster, toast } from 'sonner';

export type ToastParams = Parameters<typeof toast>;
export type ToastConfig = Parameters<typeof toast>['1'];
export type ToasterThemes = Parameters<typeof Toaster>['0']['theme'];
