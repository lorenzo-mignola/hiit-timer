module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/hiit-timer/' : '/',
  pwa: {
    name: 'hiit-timer',
    themeColor: '#033f63',
    msTileColor: '#ffffff',
    manifestOptions: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      background_color: '#033f63',
    },
  },
};
