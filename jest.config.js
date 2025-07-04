export default {
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testMatch: ["<rootDir>/test/*.test.js"],
  testEnvironment: "node",

};
