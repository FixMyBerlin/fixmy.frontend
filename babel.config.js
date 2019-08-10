module.exports = {
  "presets": [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage"
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
    "babel-plugin-styled-components",
    "babel-plugin-idx"
  ],
  "env": {
    "test": {
      "plugins": [
        "transform-es2015-modules-commonjs"
      ]
    },
    "production": {
      "plugins": [
        "babel-plugin-transform-react-remove-prop-types",
        [
          "babel-plugin-styled-components",
          {
            "displayName": false
          }
        ],
        "emotion"
      ]
    }
  }
}