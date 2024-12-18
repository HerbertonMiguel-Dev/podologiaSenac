import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { AuthTokenError } from '../api/errors/AuthTokenError';

export const canSSRAuth = (fn) => {
  return async (ctx) => {
    const cookies = parseCookies(ctx);
    const token = cookies['@podologia.token'];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        // Não excluir o cookie
        throw err; // Lança o erro para que o fluxo continue
      }
      // Outras tratativas de erro podem ser feitas aqui
    }
  };
};
