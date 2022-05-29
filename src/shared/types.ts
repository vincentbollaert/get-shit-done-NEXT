import { RTKQueryStatus } from '~/api/types';

export type Color = {
  colorId: string;
  colorValue: string;
};

export type AsyncStatus = Omit<RTKQueryStatus, 'error' | 'originalArgs'> & {
  errorMessage?: string;
};
