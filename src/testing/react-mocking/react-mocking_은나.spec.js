import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfirmationIcon from '../../components/ConfirmationIcon';

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

describe('ConfirmationIcon', () => {
  it('renders ConfirmationIcon', () => {
    const { queryByTestId } = render(<ConfirmationIcon />);

    expect(queryByTestId('confirmation-container')).toBeInTheDocument();
  });
});
