import { compilerOptions } from "./tsconfig.json";
import type { Config } from '@jest/types';
import { defaults } from "jest-config";
import { pathsToModuleNameMapper } from "ts-jest";

const config: Config.InitialOptions = {
    verbose: false,
    preset: `ts-jest`,
    testEnvironment: `jsdom`,
    testPathIgnorePatterns: [ `/node_modules/` ],
    setupFilesAfterEnv: [ `<rootDir>/setupTests.ts` ],
    moduleFileExtensions: [
        ...defaults.moduleFileExtensions,
        `ts`,
        `tsx`,
    ],
    moduleDirectories: [ `node_modules` ],
    moduleNameMapper: {
    //     // "\\.(css|less)$": `<rootDir>/tests/mocks/styleMock.ts`,
        ...pathsToModuleNameMapper(compilerOptions.paths, {
            prefix: `<rootDir>/`,
        }),
    },
    // transform: {
    //     "^.+\\.css$": "jest-transform-css",
    //     "^.+\\.svg$": `jest-svg-transformer`,
    //     "^.+\\.tsx?$": `babel-jest`,
    // },
    maxWorkers: `50%`,

};

export default config;
