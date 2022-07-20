import { createServer, Factory, Model } from 'miragejs';
import { faker } from '@faker-js/faker';

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },
    factories: {
      user: Factory.extend({
        name(i: number) {
          return faker.name.findName();
        },
        email(i: number) {
          return faker.internet.email(this.name).toLowerCase();
        },
        createdAt(i: number) {
          return faker.date.recent(10, new Date()); // qualquer data nos ultimos 10 dias
        },
      }),
    },
    seeds(server) {
      server.createList('user', 200);
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
