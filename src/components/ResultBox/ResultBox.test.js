import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';

describe('Component ResultBox', () => {

  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });


  const plnToUsdCases = [
    { amount: 100, expected: 'PLN 100.00 = $28.57' },
    { amount: 50, expected: 'PLN 50.00 = $14.29' },
    { amount: 200, expected: 'PLN 200.00 = $57.14' },
  ];

  plnToUsdCases.forEach(({ amount, expected }) => {
    it(`should render proper info about conversion when PLN -> USD for amount ${amount}`, () => {
      render(<ResultBox from="PLN" to="USD" amount={amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(expected);
      cleanup();
    });
  });


  const usdToPlnCases = [
    { amount: 100, expected: '$100.00 = PLN 350.00' },
    { amount: 50, expected: '$50.00 = PLN 175.00' },
    { amount: 200, expected: '$200.00 = PLN 700.00' },
  ];

  usdToPlnCases.forEach(({ amount, expected }) => {
    it(`should render proper info about conversion when USD -> PLN for amount ${amount}`, () => {
      render(<ResultBox from="USD" to="PLN" amount={amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(expected);
      cleanup();
    });
  });


  const sameCurrencyCases = [
    { from: 'PLN', to: 'PLN', amount: 123, expected: 'PLN 123.00 = PLN 123.00' },
    { from: 'USD', to: 'USD', amount: 456, expected: '$456.00 = $456.00' },
  ];

  sameCurrencyCases.forEach(({ from, to, amount, expected }) => {
    it(`should render same value when from and to are equal (${from})`, () => {
      render(<ResultBox from={from} to={to} amount={amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(expected);
      cleanup();
    });
  });

  it('should render "Wrong value…" for negative amount', () => {
  render(<ResultBox from="PLN" to="USD" amount={-50} />);
  const output = screen.getByTestId('output');
  expect(output).toHaveTextContent('Wrong value…');
  cleanup();
});
});