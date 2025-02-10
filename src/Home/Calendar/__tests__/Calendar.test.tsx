import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '~/test-utils';
import { Calendar } from '../Calendar';

describe('Calendar Component', () => {
  it('allows editing a task', async () => {
    render(<Calendar />);
    await userEvent.click(await screen.findByText('Task 1'));

    await userEvent.clear(await screen.findByRole('textbox', { name: 'name' }));
    await userEvent.type(screen.getByRole('textbox', { name: 'name' }), 'Task 2');
    await userEvent.click(screen.getByRole('button', { name: 'save-task' }));

    await expect(screen.findByText('Task 2')).resolves.toBeInTheDocument();
  });

  it('allows removing a task', async () => {
    render(<Calendar />);

    await userEvent.click(await screen.findByText('Task 1'));
    await userEvent.click(await screen.findByRole('button', { name: 'remove-task' }));

    await expect(screen.findByText('Task 2')).rejects.toThrow();
  });
});
