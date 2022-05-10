import dayjs from 'dayjs';

export function formatMoney(val) {
  return Number(val).toFixed(2).toLocaleString();
}

export function formatDateTime(val) {
  if (!val) {
    return '--:--';
  }
  return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
}
