import { RTKQueryStatus } from '~/api/types';

export type AsyncStatus = Omit<RTKQueryStatus, 'error' | 'originalArgs'> & {
  errorMessage?: string;
};
