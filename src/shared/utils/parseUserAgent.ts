import parser from 'ua-parser-js';

export function parseUserAgent(userAgent) {
  const parsed = parser(userAgent);
  return {
    system: parsed?.os?.name || null,
    browser: parsed?.browser?.name || null,
  };
}
