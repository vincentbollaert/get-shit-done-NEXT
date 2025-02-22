import React from 'react';
import styled, { css } from 'styled-components';
import { useGetCurrentUserQuery } from '~/api/requests';
import { useAppSelector } from '~/Application/Root';
import { Modal, Toast } from '~/shared/components';
import {
  STYLE_COLUMN_MARGIN,
  STYLE_DAYS_HEIGHT_UNIT,
  STYLE_HOURS_WIDTH_UNIT,
  STYLE_SIDEBAR_WIDTH_UNIT,
} from '~/styles';
import { DayLabels } from './axis/DayLabels/DayLabels';
import { HourLabels } from './axis/HourLabels/HourLabels';
import { Calendar } from './Calendar/Calendar';
import { Sidebar } from './Sidebar/Sidebar';
import { SignInForm } from './SignInForm/SignInForm';

const Home = () => {
  const isSidebarOpen = useAppSelector((state) => state.app).isSidebarOpen;
  const { data: currentUser } = useGetCurrentUserQuery();

  if (!currentUser) {
    return (
      <Modal isVisible title="Sign in" width={17} onOverlayToggle={() => null}>
        <SignInForm />
      </Modal>
    );
  }

  if (currentUser) {
    return (
      <PageWrap>
        <Wrap data-testid="home-wrap" $isSidebarOpen={isSidebarOpen}>
          <HourLabels />
          <CalendarWrap>
            <DayLabels />
            <Calendar />
          </CalendarWrap>
          <Toast />
        </Wrap>
        <Sidebar />
      </PageWrap>
    );
  }

  return null;
};

export default Home;

export const PageWrap = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  background-color: var(--charcoal);
`;
export const Wrap = styled.div<{ $isSidebarOpen: boolean; children: React.ReactNode }>`
  display: flex;
  flex-grow: 1;
  position: relative;
  padding-top: ${STYLE_DAYS_HEIGHT_UNIT}rem;
  padding-left: ${STYLE_HOURS_WIDTH_UNIT}rem;
  width: 100%;
  background-color: var(--jet);

  ${(p) =>
    p.$isSidebarOpen &&
    css`
      margin-right: ${STYLE_SIDEBAR_WIDTH_UNIT}rem;
    `};
`;

export const CalendarWrap = styled.div<{ theme: { bg: string } }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 ${STYLE_COLUMN_MARGIN}rem;
  width: 100%;
  height: 100%;
  background-color: ${(p) => p.theme.bg};
`;
