/* eslint-disable */
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    query: {
      state: string;
      code: string;
      scope: string;
      authuser: string;
      prompt: string;
    };

    status: 200;
  };
}>;
