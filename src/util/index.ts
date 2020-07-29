import prettyMilliseconds from 'pretty-ms';

export function formatTimeUtil(value: number) {
  let str = prettyMilliseconds(value, { colonNotation: true });
  if (value === 0) {
    str = str.substring(0, str.length - 1);
  } else if (value < 1000) {
    str = str.substring(0, str.length - 2);
  } else {
    const rgx = /(\d[1-9]$)|(10$)/;
    if (rgx.test(str)) {
      str += '.0';
    }
  }

  return str;
}

export function extractSingleValue(ms: number) {
  const hour = Math.trunc(ms / 3600000);
  let r = ms % 3600000;
  const minute = Math.trunc(r / 60000);
  r %= 60000;
  const second = Math.trunc(r / 1000);
  return { hour, minute, second };
}
