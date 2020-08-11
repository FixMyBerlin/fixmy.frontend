module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: { version: '3.6', proposals: true }
      }
    ],
    '@babel/preset-react',
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }]
  ];

  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    [
      'babel-plugin-styled-components',
      {
        displayName: true
      }
    ],
    'babel-plugin-idx',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/proposal-object-rest-spread',
    'react-hot-loader/babel'
  ];

  const env = {
    development: {
      plugins: ['@babel/plugin-transform-react-jsx-source']
    },
    test: {
      plugins: ['transform-es2015-modules-commonjs']
    },
    production: {}
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
