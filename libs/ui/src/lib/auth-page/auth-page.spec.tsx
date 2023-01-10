import React from 'react';
import { render } from '@testing-library/react-native';

import AuthPage from './auth-page';

describe('AuthPage', () => {
  it('should render successfully', () => {
    const { container } = render(<AuthPage />);
    expect(container).toBeTruthy();
  });
});
