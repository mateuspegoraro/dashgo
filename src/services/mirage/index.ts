import { createServer, Model } from 'miragejs';

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const date = new Date();
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({
        name: 'user',
        email: 'user@example.com',
        created_at: date.toDateString(),
      }),
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750; // para testar loadings

      this.get('/users'); // shorthand
      this.post('/users'); // shorthand

      this.namespace = ''; // resetando para nao prejudicar as rotas de api do nextjs
      this.passthrough(); // se nao encontrou no mirage segue o jogo pra nao prejudicar o nextjs
    },
  });

  return server;
}
