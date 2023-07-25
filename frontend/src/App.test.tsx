import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
  render(<App />);

  expect(await screen.findByTestId('navbar')).toBeInTheDocument();
  expect(await screen.findByTestId('home-page')).toBeInTheDocument();
});
