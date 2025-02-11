import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '~/test-utils';
import { setIsLoggedIn } from '../../mocks/handlers/user/getUser';
import Home from '../Home';

const flows = {
  signIn: async () => {
    await userEvent.type(await screen.findByRole('textbox', { name: 'email' }), 'test@example.com');
    await userEvent.type(screen.getByLabelText('password'), 'password');
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));
  },
};

describe('<Home />', () => {
  describe('Authentication', () => {
    it('renders app after signing in', async () => {
      setIsLoggedIn(false);
      render(<Home />);

      await flows.signIn();

      await expect(screen.findByRole('complementary')).resolves.toBeInTheDocument();
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByTestId('hour-labels')).toBeInTheDocument();
      expect(screen.getByTestId('day-labels')).toBeInTheDocument();
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
