import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Application } from '../Application';
import { store } from './store';

export const ApplicationRoot = () => (
  <Provider store={store}>
    <Router>
      <Application />
    </Router>
  </Provider>
);
