import { screen, waitFor } from '@testing-library/react';
import { render } from '~/test-utils';
import { Calendar } from '../Calendar';

describe('Calendar Component', () => {
  it('renders calendar with tasks', async () => {
    render(<Calendar />);

    // Wait for tasks to load
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    // Verify task is rendered
    await expect(screen.findByText('Task 1')).resolves.toBeInTheDocument();
  });

  // it('allows adding a new task', async () => {
  //   render(<Calendar />);

  //   // Wait for tasks to load
  //   await waitFor(() => {
  //     expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  //   });

  //   // Open add task modal
  //   const addButton = screen.getByRole('button', { name: /add task/i });
  //   await userEvent.click(addButton);

  //   // Verify modal is open
  //   expect(screen.getByText('task details')).toBeInTheDocument();

  //   // Fill in task details
  //   const nameInput = screen.getByRole('textbox', { name: /name/i });
  //   await userEvent.type(nameInput, 'New Test Task');

  //   // Submit form
  //   const submitButton = screen.getByRole('button', { name: /save/i });
  //   await userEvent.click(submitButton);

  //   // Verify new task appears
  //   expect(screen.getByText('New Test Task')).toBeInTheDocument();
  // });

  // it('allows editing a task', async () => {
  //   render(<Calendar />);

  //   // Wait for tasks to load
  //   await waitFor(() => {
  //     expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  //   });

  //   // Click on existing task
  //   const task = screen.getByText('Task 1');
  //   await userEvent.click(task);

  //   // Verify edit modal is open
  //   expect(screen.getByText('task details')).toBeInTheDocument();

  //   // Edit task name
  //   const nameInput = screen.getByRole('textbox', { name: /name/i });
  //   await userEvent.clear(nameInput);
  //   await userEvent.type(nameInput, 'Updated Task Name');

  //   // Save changes
  //   const saveButton = screen.getByRole('button', { name: /save/i });
  //   await userEvent.click(saveButton);

  //   // Verify task name is updated
  //   expect(screen.getByText('Updated Task Name')).toBeInTheDocument();
  //   expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
  // });

  // it('allows removing a task', async () => {
  //   render(<Calendar />);

  //   // Wait for tasks to load
  //   await waitFor(() => {
  //     expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  //   });

  //   // Click on existing task
  //   const task = screen.getByText('Task 1');
  //   await userEvent.click(task);

  //   // Click delete button
  //   const deleteButton = screen.getByRole('button', { name: /delete/i });
  //   await userEvent.click(deleteButton);

  //   // Verify task is removed
  //   expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
  // });
});
