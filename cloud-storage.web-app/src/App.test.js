import { render, screen } from '@testing-library/react';
import AppRoute from './routers/AppRoute';

test('renders learn react link', () => {
  render(<AppRoute />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
