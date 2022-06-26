import React from 'react';
import ConfirmationIcon from '../../components/ConfirmationIcon';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

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
  it('when show is true, renders ConfirmationIcon', () => {
    const { queryByTestId } = render(<ConfirmationIcon />);
    const container = queryByTestId('confirmation-container');

    expect(container).toBeInTheDocument();
  });
});
