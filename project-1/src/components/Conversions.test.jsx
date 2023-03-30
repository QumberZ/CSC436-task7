import { render, screen, fireEvent } from '@testing-library/react';
import Conversions from './Conversions';

test('changes amount input value', () => {
  render(<Conversions />);
  const amountInput = screen.getByLabelText(/amount/i);
  fireEvent.change(amountInput, { target: { value: 2 } });
  expect(amountInput.value).toBe('2');
});

test('Converts any input value ', () => {
  render(<Conversions />);
  const convert = screen.getByLabelText(/amount/i);
  fireEvent.change(convert, { target: { value: 1 } });
  expect(convert.value).toBe('1');
});
