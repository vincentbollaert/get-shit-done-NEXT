import { useEffect, useState } from 'react';

type Params = {
  isBeingFiltered?: boolean;
  isFiltered?: boolean;
  from: number;
};
export const useSetCustomRangeLabels = ({
  isBeingFiltered,
  isFiltered,
  from,
}: Params): [number[], (current: number) => void] => {
  const [filteredRange, setFilteredRange] = useState<number[]>([]);

  const updateList = (current: number) => {
    if (!isBeingFiltered) return;
    const fromFormatted = Number(from);
    const fromToDifference = Math.max(current, fromFormatted) - Math.min(current, fromFormatted);
    const differenceArray = Array(fromToDifference)
      .fill(null)
      .map((x, index) => Math.max(current, fromFormatted) - index);
    const updatedRange = [...new Set([fromFormatted, ...differenceArray, current])];
    setFilteredRange(updatedRange);
  };

  useEffect(() => {
    if (isFiltered) {
      setFilteredRange([]);
    }
  }, [isFiltered]);

  return [filteredRange, updateList];
};
