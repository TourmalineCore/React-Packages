import { rest } from 'msw';
import { data } from '../stories/tableData';

export const handlers = [
  rest.get('https://testhost.com/table/test', (req, res, ctx) => {
    const draw = req.url.searchParams.get('draw');

    return res(
      ctx.delay(1000),
      ctx.json({
        draw: Number(draw),
        list: data,
        totalCount: 3,
      }),
    );
  }),
];
