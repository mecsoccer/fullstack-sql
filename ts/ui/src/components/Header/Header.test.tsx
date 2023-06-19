import { render, screen } from '@testing-library/react';
import Header from './Header';
test('renders Header', () => {
  render(<Header logo="/logo.png" />);
  expect(screen.getByText(/Browse Asteroids/i)).toBeInTheDocument();
});
