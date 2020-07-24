import React from 'react';
import { render } from '@testing-library/react';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './reduxStore';

const store = createStore(rootReducer);

test('renders header', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const title = getByText(/Tic Tac Toe/i);
  expect(title).toBeInTheDocument();
});
