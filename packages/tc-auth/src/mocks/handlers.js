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

  rest.post('/cookiesauth/login', (req, res, ctx) => res(ctx.cookie('auth-token', 'abc-123'))),
  rest.get('/cookiesauth/logout', (req, res, ctx) => res(
    ctx.cookie('auth-token', '', { maxAge: 0 }),
    ctx.cookie('csrf-token', '', { maxAge: 0 }),
  )),
  rest.get('/cookiesauth/csrf', (req, res, ctx) => res(ctx.cookie('csrf-token', 'abc-123-csrf'))),
  rest.get('/cookiesauth/session', (req, res, ctx) => {
    const authToken = req.cookies['auth-token'];

    return res(ctx.json({
      isAuthenticated: !!authToken,
    }));
  }),
];
