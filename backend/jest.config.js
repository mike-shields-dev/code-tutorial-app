module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  testMatch: ["**/__tests__/**/*.test.(ts|js)"],
  collectCoverage: true,
  coverageReporters: ["text", "lcov"],
  setupFilesAfterEnv: ["./jest.setup.ts"]
};
