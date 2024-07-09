import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Dictionary App heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Dictionary App/i);
  expect(headingElement).toBeInTheDocument();
});
