import { rest } from 'msw';

export const handlers = [
  rest.post('/auth/login', (req, res, ctx) => res(ctx.json({
    accessToken: {
      value: '12345',
      expiresInUtc: '2022-04-19T06:43:27.2953284Z',
    },
    refreshToken: {
      value: 'refresh12345',
      expiresInUtc: '2022-04-19T06:43:27.2953284Z',
    },
  }))),

  rest.post('/auth/refresh', (req, res, ctx) => res(ctx.json({
    accessToken: {
      value: '12345',
      expiresInUtc: '2022-04-19T06:43:27.2953284Z',
    },
    refreshToken: {
      value: 'refresh12345',
      expiresInUtc: '2022-04-19T06:43:27.2953284Z',
    },
  }))),
];
