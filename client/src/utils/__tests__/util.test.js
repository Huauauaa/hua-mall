import { formatDateTime, formatMoney } from '../index';

test('formatMoney', () => {
  expect(formatMoney('21')).toBe('21.00');
  expect(formatMoney(123)).toBe('123.00');
  expect(formatMoney('21.12312')).toBe('21.12');
});
test('formatDateTime', () => {
  expect(formatDateTime('2022-05-10T14:14:41.000Z')).toBe(
    '2022-05-10 22:14:41',
  );
});
