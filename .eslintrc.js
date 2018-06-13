module.exports = {
  "extends": "airbnb-base",
  "env": {
    "browser": true,
    "node": true,
    "mocha": true,
  },
  "rules": {
    "no-unused-expressions": [
      "error",
      {
        "allowTernary": true,
        "allowShortCircuit": true,
      },
    ],
  },
};
