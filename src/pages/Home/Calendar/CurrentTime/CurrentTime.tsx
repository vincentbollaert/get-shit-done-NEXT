import add from 'date-fns/add';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import format from 'date-fns/format';
import startOfToday from 'date-fns/startOfToday';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const MINUTES_IN_DAY = 1440;

export const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentTimeRef = useRef<null | Date>(null);
  const date = new Date();
  const nowInMinutes = differenceInMinutes(date, startOfToday());
  currentTimeRef.current = currentTime;

  function updateTime() {
    setCurrentTime(add(currentTimeRef.current!, { seconds: 1 }));
  }

  useEffect(() => {
    // window.setInterval(updateTime, 1000)
  }, []);

  return (
    <Wrap top={(nowInMinutes / MINUTES_IN_DAY) * 100}>
      <Time>{format(currentTime, 'p')}</Time>
    </Wrap>
  );
};

export const Wrap = styled.div<{ theme: { currentTimeBg: string; currentTimeBorder: string }; top: number }>`
  z-index: 2;
  display: flex;
  position: absolute;
  top: ${(p) => p.top}%;
  left: 100%;
  align-items: center;
  margin-left: var(--size-xsm);
  white-space: nowrap;
`;

export const Time = styled.span<{
  theme: { currentTimeBg: string; currentTimeColor: string; currentTimeBorder: string };
}>`
  position: absolute;
  padding: 0 0.6rem;
  border-radius: 1px;
  height: 1.8rem;
  line-height: 1.7rem;
  font-size: var(--font-size-xsm);
  background: ${(p) => p.theme.currentTimeBg};
  color: ${(p) => p.theme.currentTimeColor};
`;
