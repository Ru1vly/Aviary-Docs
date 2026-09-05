// Brand tokens mirrored from the Aviary marketing site (app/globals.css).
export const color = {
  ink1000: '#080908',
  ink950: '#0C0D0C',
  ink900: '#121413',
  ink800: '#1A1D1B',
  ink700: '#232725',
  ink600: '#2E3330',

  bone100: '#F4F2EC',
  bone200: '#E6E3DA',
  bone300: '#CFCBC0',
  bone400: '#A8A49A',
  bone500: '#7E7B73',

  ochre400: '#E0B15A',
  ochre500: '#C9922F',
  vermilion400: '#D9694C',
  lichen400: '#8FBE7C',
  slateBlue400: '#7FA8BD',
  plum400: '#A98BB0',

  pass: '#8FBE7C',
  warn: '#E0B15A',
  fail: '#D9694C',
  info: '#7FA8BD',

  hairline: 'rgba(230, 227, 218, 0.10)',
  lineDefault: 'rgba(230, 227, 218, 0.16)',
  lineStrong: 'rgba(230, 227, 218, 0.30)',
} as const;

export const font = {
  display: 'Lancelot',
  ui: 'Geist Mono',
  code: 'Ubuntu Mono',
} as const;

export const INSTALL_COMMAND = 'npm install -g aviary';
export const GITHUB_URL = 'https://github.com/Ru1vly/Aviary';
