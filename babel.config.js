module.exports = (api) => {
  api.cache(true);

  const presets = [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3
      }
    ]
  ];

  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-styled-components',
    'babel-plugin-idx',
    '@babel/plugin-proposal-optional-chaining',
    'react-hot-loader/babel'
  ];

  const env = {
    development: {
      plugins: ['@babel/plugin-transform-react-jsx-source']
    },
    test: {
      plugins: ['transform-es2015-modules-commonjs']
    },
    production: {
      plugins: [
        [
          'babel-plugin-styled-components',
          {
            displayName: true
          }
        ]
      ]
    }
  };

  return {
    presets,
    plugins,
    env,
    overrides: [
      {
        test: './node_modules/debug/**/*.js',
        sourceType: 'script',
        presets: [
          [
            '@babel/preset-env',
            {
              /* other options */
            }
          ]
        ]
      }
    ]
  };
};
