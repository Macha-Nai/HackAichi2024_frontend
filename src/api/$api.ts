import type { AspidaClient, BasicHeaders } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_wa71oe } from './auth/callback';
import type { Methods as Methods_8eh3f1 } from './chatgpt/_mail_id@string';
import type { Methods as Methods_18qsrps } from './health';
import type { Methods as Methods_foysbh } from './is_auth';
import type { Methods as Methods_idk8rz } from './login';
import type { Methods as Methods_1rpsris } from './logout';
import type { Methods as Methods_1dmn8tt } from './mail/_mail_id@string';
import type { Methods as Methods_q6fm3b } from './mail/_mail_id@string/send_flag';
import type { Methods as Methods_1kg5xh5 } from './mail/all';
import type { Methods as Methods_1yqx1lc } from './mail/send';
import type { Methods as Methods_1xhiioa } from './users';
import type { Methods as Methods_1m2ih5q } from './users/_user_id@string';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/auth/callback';
  const PATH1 = '/chatgpt';
  const PATH2 = '/health';
  const PATH3 = '/is_auth';
  const PATH4 = '/login';
  const PATH5 = '/logout';
  const PATH6 = '/mail';
  const PATH7 = '/send_flag';
  const PATH8 = '/mail/all';
  const PATH9 = '/mail/send';
  const PATH10 = '/users';
  const GET = 'GET';
  const POST = 'POST';

  return {
    auth: {
      callback: {
        get: (option: { query: Methods_wa71oe['get']['query'], config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_wa71oe['get']['status']>(prefix, PATH0, GET, option).send(),
        $get: (option: { query: Methods_wa71oe['get']['query'], config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_wa71oe['get']['status']>(prefix, PATH0, GET, option).send().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_wa71oe['get']['query'] } | undefined) =>
          `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
    },
    chatgpt: {
      _mail_id: (val1: string) => {
        const prefix1 = `${PATH1}/${val1}`;

        return {
          /**
           * @returns Successful Response
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_8eh3f1['get']['resBody'], BasicHeaders, Methods_8eh3f1['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * @returns Successful Response
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_8eh3f1['get']['resBody'], BasicHeaders, Methods_8eh3f1['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
    },
    health: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods_18qsrps['get']['status']>(prefix, PATH2, GET, option).send(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods_18qsrps['get']['status']>(prefix, PATH2, GET, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH2}`,
    },
    is_auth: {
      /**
       * @returns Successful Response
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_foysbh['get']['resBody'], BasicHeaders, Methods_foysbh['get']['status']>(prefix, PATH3, GET, option).json(),
      /**
       * @returns Successful Response
       */
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_foysbh['get']['resBody'], BasicHeaders, Methods_foysbh['get']['status']>(prefix, PATH3, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH3}`,
    },
    login: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods_idk8rz['get']['status']>(prefix, PATH4, GET, option).send(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods_idk8rz['get']['status']>(prefix, PATH4, GET, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH4}`,
    },
    logout: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods_1rpsris['get']['status']>(prefix, PATH5, GET, option).send(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods_1rpsris['get']['status']>(prefix, PATH5, GET, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH5}`,
    },
    mail: {
      _mail_id: (val1: string) => {
        const prefix1 = `${PATH6}/${val1}`;

        return {
          send_flag: {
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods_q6fm3b['get']['status']>(prefix, `${prefix1}${PATH7}`, GET, option).send(),
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods_q6fm3b['get']['status']>(prefix, `${prefix1}${PATH7}`, GET, option).send().then(r => r.body),
            $path: () => `${prefix}${prefix1}${PATH7}`,
          },
          /**
           * @returns Successful Response
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1dmn8tt['get']['resBody'], BasicHeaders, Methods_1dmn8tt['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * @returns Successful Response
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1dmn8tt['get']['resBody'], BasicHeaders, Methods_1dmn8tt['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      all: {
        /**
         * @returns Successful Response
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1kg5xh5['get']['resBody'], BasicHeaders, Methods_1kg5xh5['get']['status']>(prefix, PATH8, GET, option).json(),
        /**
         * @returns Successful Response
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1kg5xh5['get']['resBody'], BasicHeaders, Methods_1kg5xh5['get']['status']>(prefix, PATH8, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH8}`,
      },
      send: {
        post: (option: { body: Methods_1yqx1lc['post']['reqBody'], config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_1yqx1lc['post']['status']>(prefix, PATH9, POST, option).send(),
        $post: (option: { body: Methods_1yqx1lc['post']['reqBody'], config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_1yqx1lc['post']['status']>(prefix, PATH9, POST, option).send().then(r => r.body),
        $path: () => `${prefix}${PATH9}`,
      },
    },
    users: {
      _user_id: (val1: string) => {
        const prefix1 = `${PATH10}/${val1}`;

        return {
          /**
           * @returns Successful Response
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1m2ih5q['get']['resBody'], BasicHeaders, Methods_1m2ih5q['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * @returns Successful Response
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1m2ih5q['get']['resBody'], BasicHeaders, Methods_1m2ih5q['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      /**
       * @returns Successful Response
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1xhiioa['get']['resBody'], BasicHeaders, Methods_1xhiioa['get']['status']>(prefix, PATH10, GET, option).json(),
      /**
       * @returns Successful Response
       */
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1xhiioa['get']['resBody'], BasicHeaders, Methods_1xhiioa['get']['status']>(prefix, PATH10, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH10}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
