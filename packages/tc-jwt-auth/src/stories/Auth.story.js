import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'JWT-auth',
  decorators: [withKnobs],
};

export const JWTAuth = () => 'jwt-here';
