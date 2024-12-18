// src/utils/canSSRGuest.js

import { parseCookies, setCookie, destroyCookie } from 'nookies';

const canSSRGuest = (fn) => {
  return async (ctx) => {
    const cookies = parseCookies(ctx);

    if (cookies['@podologia.token']) {
      return {
        redirect: {
          destination: '/agendamentos',
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
};

export default canSSRGuest;
