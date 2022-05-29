export const CN_HOUR_SLOTS = 'hour-slots';
export const CN_COLUMN = 'column';
export const CN_TASK_GAP = 'task-gap';

export type TaskFormValues = {
  name: string;
  from: number;
  to: number;
};

export const determineTimeFromY = ({
  y,
  hoursAxis,
  hoursDivRef,
}: {
  y: number;
  hoursDivRef?: React.MutableRefObject<HTMLDivElement | null>;
  hoursAxis: number[];
}) => {
  const hoursDivHeight = hoursDivRef?.current?.getBoundingClientRect().height || 0;
  const percentage = (y / hoursDivHeight) * 100;
  const hourMin = hoursAxis[0];
  const hourMax = hoursAxis[hoursAxis.length - 1] + 1;
  const alg = hourMin + ((hourMax - hourMin) / 100) * percentage;
  const rounded = Math.round(alg / 0.25) * 0.25;
  return rounded;
};

const generateDefaultShadowValue = (value: string) => `
  inset 0 1px 0 0 ${value},
  inset 0 -1px 0 0 ${value}
`;
export const taskShadow = (value: string) => `
  box-shadow: ${generateDefaultShadowValue(value)};
`;
export const taskShadowBeingEdited = (value: string) => `
  box-shadow:
    ${generateDefaultShadowValue(value)},
    inset 1px 2px 0 0 var(--charcoal),
    inset -1px -2px 0 0 var(--charcoal);
`;
export const placeholderShadow = (value1: string, value2: string) => `
  ${generateDefaultShadowValue(value1)},
  inset 1px 2px 0 0 ${value2},
  inset -1px -2px 0 0 ${value2};
`;
