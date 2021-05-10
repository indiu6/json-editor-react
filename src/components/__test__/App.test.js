import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../App';

describe('Test', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment(<App />)).toMatchSnapshot();
  });
});
