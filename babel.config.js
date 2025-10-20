module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // put any other Babel plugins here
      // The react-native-reanimated plugin MUST be the last entry
      'react-native-reanimated/plugin'
    ],
  };
};