import ConfirmationIcon from '../../components/ConfirmationIcon';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

jest.mock('react-redux', () => {
  return {
    useSelector: jest.fn(() => ({
      show: true,
      backgroundColor: '',
      color: '',
      icon: '',
      text: '',
    })),
  };
});

describe('ConfirmationIcon Component', () => {
  it('when show=true, render ConfirmationIcon', () => {
    const { queryByTestId } = render(<ConfirmationIcon />);

    const container = queryByTestId('confirmation-container');

    expect(container).toBeInTheDocument();
  });
});
