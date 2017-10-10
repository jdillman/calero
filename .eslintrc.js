module.exports = {
    "parser": "babel-eslint",
    "extends": "eslint-config-airbnb",
    "extends": "airbnb",
    "env": {
      "browser": true,
      "es6": true,
      "jest": true,
    },
    "parserOptions": {
      "ecmaFeatures": {
        "experimentalObjectRestSpread": true,
        "jsx": true,
      },
      "sourceType": "module"
    },
    "plugins": [
      "react",
    ],
    "rules": {
      "import/extensions": 0,
      "import/no-extraneous-dependencies": 0,
      "react/prop-types": "off",
      "import/no-unresolved": "off", // Absolute path webpack config is a prob
      "no-use-before-define": "off", // Javascript hoists
      "linebreak-style": [
        "error",
        "unix"
      ],
      "quotes": [
        "error",
        "single"
      ],
      "semi": [
        "error",
        "always"
      ]
    }
};
