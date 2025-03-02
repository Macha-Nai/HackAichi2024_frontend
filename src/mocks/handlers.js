/**
 * This file is AUTO GENERATED by [msw-auto-mock](https://github.com/zoubingwu/msw-auto-mock)
 * Feel free to commit/edit it as you need.
 */
/* eslint-disable */
/* tslint:disable */
import { HttpResponse, http } from "msw";
import { faker } from "@faker-js/faker";

faker.seed(1);

const baseURL = "";
const MAX_ARRAY_LENGTH = 20;

let i = 0;
const next = () => {
  if (i === Number.MAX_SAFE_INTEGER - 1) {
    i = 0;
  }
  return i++;
};

export const handlers = [
  http.get(`${baseURL}/users/`, async () => {
    const resultArray = [
      [await getReadUsersUsersGet200Response(), { status: 200 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/users/:userId`, async () => {
    const resultArray = [
      [await getReadUserUsersUserIdGet200Response(), { status: 200 }],
      [await getReadUserUsersUserIdGet422Response(), { status: 422 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/login`, async () => {
    const resultArray = [
      [await getGetGoogleApiLoginGet200Response(), { status: 200 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/auth/callback`, async () => {
    const resultArray = [
      [await getAuthCallbackAuthCallbackGet200Response(), { status: 200 }],
      [await getAuthCallbackAuthCallbackGet422Response(), { status: 422 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/logout`, async () => {
    const resultArray = [
      [await getLogoutLogoutGet200Response(), { status: 200 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/mail/all`, async () => {
    const resultArray = [
      [await getGetMessageByUserIdMailAllGet200Response(), { status: 200 }],
      [await getGetMessageByUserIdMailAllGet422Response(), { status: 422 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/mail/:mailId`, async () => {
    const resultArray = [
      [await getReadUserMailMailIdGet200Response(), { status: 200 }],
      [await getReadUserMailMailIdGet422Response(), { status: 422 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/health`, async () => {
    const resultArray = [
      [await getHealthHealthGet200Response(), { status: 200 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
  http.get(`${baseURL}/chatgpt/:mailId`, async () => {
    const resultArray = [
      [await getReadUsersChatgptMailIdGet200Response(), { status: 200 }],
      [await getReadUsersChatgptMailIdGet422Response(), { status: 422 }],
    ];

    return HttpResponse.json(...resultArray[next() % resultArray.length]);
  }),
];

export function getReadUsersUsersGet200Response() {
  return [
    ...new Array(faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH })).keys(),
  ].map((_) => ({
    uuid: faker.string.uuid(),
    username: faker.person.fullName(),
  }));
}

export function getReadUserUsersUserIdGet200Response() {
  return {
    uuid: faker.string.uuid(),
    username: faker.person.fullName(),
    books: [
      ...new Array(faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH })).keys(),
    ].map((_) => ({
      uuid: faker.string.uuid(),
      title: faker.lorem.words(),
    })),
  };
}

export function getReadUserUsersUserIdGet422Response() {
  return {
    detail: [
      ...new Array(faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH })).keys(),
    ].map((_) => ({
      loc: [
        ...new Array(
          faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH }),
        ).keys(),
      ].map((_) => faker.lorem.words()),
      msg: faker.lorem.words(),
      type: faker.lorem.words(),
    })),
  };
}

export function getGetGoogleApiLoginGet200Response() {
  return null;
}

export function getAuthCallbackAuthCallbackGet200Response() {
  return null;
}

export function getAuthCallbackAuthCallbackGet422Response() {
  return {
    detail: [
      ...new Array(faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH })).keys(),
    ].map((_) => ({
      loc: [
        ...new Array(
          faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH }),
        ).keys(),
      ].map((_) => faker.lorem.words()),
      msg: faker.lorem.words(),
      type: faker.lorem.words(),
    })),
  };
}

export function getLogoutLogoutGet200Response() {
  return null;
}

export function getGetMessageByUserIdMailAllGet200Response() {
  return [
    ...new Array(faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH })).keys(),
  ].map((_) => ({
    mail_id: faker.lorem.words(),
    title: faker.lorem.words(),
    body: faker.lorem.words(),
    your_name: faker.person.fullName(),
    your_mail_address: faker.lorem.words(),
    rank: faker.lorem.words(),
    send_time: faker.lorem.words(),
    send_flag: faker.datatype.boolean(),
  }));
}

export function getGetMessageByUserIdMailAllGet422Response() {
  return {
    detail: [
      ...new Array(faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH })).keys(),
    ].map((_) => ({
      loc: [
        ...new Array(
          faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH }),
        ).keys(),
      ].map((_) => faker.lorem.words()),
      msg: faker.lorem.words(),
      type: faker.lorem.words(),
    })),
  };
}

export function getReadUserMailMailIdGet200Response() {
  return {
    mail_id: faker.lorem.words(),
    title: faker.lorem.words(),
    body: faker.lorem.words(),
    your_name: faker.person.fullName(),
    your_mail_address: faker.lorem.words(),
    ai_answer: faker.lorem.words(),
    rank: faker.lorem.words(),
    send_time: faker.lorem.words(),
  };
}

export function getReadUserMailMailIdGet422Response() {
  return {
    detail: [
      ...new Array(faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH })).keys(),
    ].map((_) => ({
      loc: [
        ...new Array(
          faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH }),
        ).keys(),
      ].map((_) => faker.lorem.words()),
      msg: faker.lorem.words(),
      type: faker.lorem.words(),
    })),
  };
}

export function getHealthHealthGet200Response() {
  return null;
}

export function getReadUsersChatgptMailIdGet200Response() {
  return {
    text: faker.lorem.words(),
  };
}

export function getReadUsersChatgptMailIdGet422Response() {
  return {
    detail: [
      ...new Array(faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH })).keys(),
    ].map((_) => ({
      loc: [
        ...new Array(
          faker.number.int({ min: 1, max: MAX_ARRAY_LENGTH }),
        ).keys(),
      ].map((_) => faker.lorem.words()),
      msg: faker.lorem.words(),
      type: faker.lorem.words(),
    })),
  };
}
