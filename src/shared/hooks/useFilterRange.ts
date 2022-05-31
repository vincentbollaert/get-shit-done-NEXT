import { PayloadAction } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useAppDispatch } from '~/Application/Root';

interface Props {
  from: number;
  to: number;
  // TODO: import this
  cb: ({ from, to }: { from: number; to: number }) => PayloadAction<{ from: number; to: number }>;
}
interface Filters {
  fromCustom?: number;
  toCustom?: number;
}

export const useFilterRange = ({ from, to, cb }: Props) => {
  const dispatch = useAppDispatch();
  const [{ fromDefault, toDefault }] = useState({ fromDefault: from, toDefault: to });
  const [{ fromCustom, toCustom }, applyFilters] = useState<Filters>({});

  const onFilter = (hour: number) => {
    if (!fromCustom) {
      applyFilters({ fromCustom: hour });
    } else if (!toCustom) {
      applyFilters({ toCustom: hour, fromCustom });
      dispatch(cb({ from: Math.min(fromCustom, hour), to: Math.max(fromCustom, hour) }));
    }

    if (fromCustom !== undefined && toCustom !== undefined) {
      applyFilters({});
      dispatch(cb({ from: fromDefault, to: toDefault }));
    }
  };

  return [
    {
      isFiltered: fromCustom !== undefined && toCustom !== undefined,
      isBeingFiltered: fromCustom !== undefined && toCustom === undefined,
      from: fromCustom || fromDefault,
      to: toCustom || toDefault,
    },
    onFilter,
  ] as const;
};
