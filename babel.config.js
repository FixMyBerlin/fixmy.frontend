module.exports = (api) => {
  api.cache(true);

  const presets = [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: { version: '3.19', proposals: true },
      },
    ],
  ];

  const plugins = [
    // remove once we use ES2022
    '@babel/plugin-syntax-dynamic-import',

    // remove once we use ES2022
    '@babel/plugin-proposal-class-properties',

    // better debugging of styled components
    [
      'babel-plugin-styled-components',
      {
        displayName: true,
      },
    ],
  ];

  const env = {
    development: { plugins: ['react-refresh/babel'] },
    production: {},
    test: {
      plugins: ['transform-es2015-modules-commonjs'],
    },
  };

  return {
    presets,
    plugins,
    env,
    overrides: [
      {
        test: './node_modules/debug/**/*.js',
        sourceType: 'script',
        presets: ['@babel/preset-env'],
      },
      {
        test: './node_modules/@mapbox/mapbox-gl-draw/**/*.js',
        sourceType: 'script',
        presets: ['@babel/preset-env'],
      },
    ],
  };
};
