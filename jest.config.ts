// jest.config.ts
import { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': '@swc/jest', // Использование SWC для компиляции TypeScript
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Если используешь CSS-модули
  },
}

export default config
