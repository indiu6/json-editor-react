import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '../Home';

describe('Test', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(<Home />);
    expect(asFragment(<Home />)).toMatchSnapshot();
  });

  it('renders the text', () => {
    render(<Home />);
    expect(screen.getByText(/Saved JSON/)).toBeInTheDocument();
  });
});
