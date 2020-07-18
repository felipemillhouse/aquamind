const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ['./src'],
      extensions: ['.ts', '.tsx', '.ios.tsx', '.android.tsx', '.png', '.json'],
    },
  ],
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [...plugins],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
