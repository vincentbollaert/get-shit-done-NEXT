import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '~/test-utils';
import { getUserHandlers } from '../../mocks/handlers/user/getUser';
import { server } from '../../mocks/server';
import Home from '../Home';

describe('Home Component', () => {
  describe('Authentication', () => {
    beforeEach(() => {
      server.use(getUserHandlers.empty);
    });

    // it('shows sign in form when user is not authenticated', async () => {
    //   render(<Home />);

    //   expect(within(screen.getByTestId('modal-header')).getByText('Sign in')).toBeInTheDocument();
    //   expect(screen.getByRole('textbox', { name: 'email' })).toBeInTheDocument();
    //   expect(screen.getByLabelText('password')).toBeInTheDocument();
    //   expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    // });

    it('shows main layout after signing in', async () => {
      render(<Home />);

      userEvent.type(await screen.findByRole('textbox', { name: 'email' }), 'test@example.com');
      userEvent.type(screen.getByLabelText('password'), 'password');
      userEvent.click(screen.getByRole('button', { name: 'Sign in' }));

      await expect(screen.findByRole('complementary')).resolves.toBeInTheDocument(); // Sidebar
      expect(screen.getByRole('main')).toBeInTheDocument(); // Calendar
    });
  });

  // describe('Layout', () => {
  //   it('adjusts layout when sidebar is opened', async () => {
  //     render(<Home />);

  //     // Sign in first
  //     await userEvent.type(screen.getByRole('textbox', { name: 'email' }), 'test@example.com');
  //     await userEvent.type(screen.getByRole('password', { name: 'password' }), 'password');
  //     await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));

  //     // Open sidebar by clicking the list button
  //     await userEvent.click(screen.getByRole('button', { name: 'list' }));

  //     // Verify sidebar is open
  //     expect(screen.getByRole('complementary')).toBeInTheDocument();

  //     const wrap = screen.getByTestId('home-wrap');
  //     expect(wrap).toHaveStyle({ marginRight: expect.stringContaining('rem') });
  //   });
  // });

  // describe('Component Integration', () => {
  //   it('renders all required child components after signing in', async () => {
  //     render(<Home />);

  //     // Sign in
  //     await userEvent.type(screen.getByRole('textbox', { name: 'email' }), 'test@example.com');
  //     await userEvent.type(screen.getByRole('password', { name: 'password' }), 'password');
  //     await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));

  //     // Verify all components are present
  //     expect(screen.getByRole('complementary')).toBeInTheDocument(); // Sidebar
  //     expect(screen.getByRole('main')).toBeInTheDocument(); // Calendar
  //     expect(screen.getByTestId('hour-labels')).toBeInTheDocument();
  //     expect(screen.getByTestId('day-labels')).toBeInTheDocument();
  //   });
  // });
});
