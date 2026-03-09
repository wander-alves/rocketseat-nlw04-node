# NLW04 - nps-tracker

## Sobre
Esse projeto foi criado com base na trilha de Node.js da quarta edição do Next Level Week da Rockseat, onde criamos uma aplicação web para o gerenciamento de pesquisas de satisfação de clientes (Net Promoter Score), que é uma métrica muito importante de negócio para acompanhamento do relacionamento com os clientes.

---

## Requisitos

### Regras de negócio

- [ ] Os clientes serão cadastrados através do fluxo de criação de conta via aplicativo.
- [ ] Os usuários poderão avaliar os serviços através dos seus títulos com uma descrição da nota
  - A nota deverá ser numérica
- [ ] Disparo de e-mails
  - Seguir boas práticas para construção de um e-mail, vide [MailChimp](https://templates.mailchimp.com/getting-started/html-email-basics/)
    - O e-mail deve ter a largura entre 600px a 800px.
    - O design deve ser simples, para ter maior compatibilidade com os clients de e-mail (usar tabelas e grids).
    - Parta do príncipio de que links externos serão bloqueados por padrão, como imagens externas, etc.
    - Não construa e-mails com grandes imagens considerando apenas aparência. Elas performam mal por conta do motivo acima.
    - Utilize fontes comuns em sistemas operacionais como Verdana, Arial,Times New Roman e Georgia.
    - Evite JavaScript ou Flash, já que os clientes de e-mail tendem a desabilitar esses recursos.
    - Mobile-first, já que a grande maior parte dos dispositivos que irá consumir o e-mail utilizará celulares.
    - Prefira estilizações explícitas ao invés de shorthand.
    - Utilize estratégias para tornar as estilizações inline ao compilar o arquivo ao montar o HTML final para maior compatibilidade.
    - Utilize links absolutos para imagens e para hospedar os arquivos, utilize serviços confiáveis, como o Microsoft Bloob Storage, S3, etc.
- [ ] Os administradores devem ter acesso a métrica NPS
  - Referência: [Salesforce - Net Promoter Score](https://www.salesforce.com/br/blog/net-promoter-score/)
  - Fórmula: NPS = (Total Promotores -Total Detratores) / Total
  - Detratores: Notas entre 0 e 6
  - Neutros: Notas entre 7 e 8
  - Promotores: Notas acima de 8
  - Score: É mais flexível e depende de critérios de negócio.
    - 75% ~ 100%: Excelente
    - 50% ~ 74%: Muito bom
    - 25% ~ 49%: Razoável
    - <25%: Ruim
- [ ] Os administradores do sistema serão cadastrado pelo time de suporte manualmente.

### Melhorias
- [ ] Adaptação para utilizar as versões mais atuais dos módulos, respeitando a estrutura do projeto.
- [ ] Configuração utilizando o `tsx` para execução do TypeORM ao invés do `node-ts`.
- [ ] Inclusão de configuração do ambiente de produção com Postgres.
- [ ] Uso de validação de inputs com o `zod`.
- [ ] Estratégia de invalidação de pesquisa já respondida.


### Endpoints

- `[POST]/customers`: Adiciona um cliente a base de pesquisa.
- `[POST]/surveys`: Registra uma pesquisa.
- `[GET]/surveys`: Busca todas as pesquisas disponíveis.
- `[GET]/surveys/:surveyId/metrics`: Resgata o NPS de uma pesquisa específica.
- `[POST]/answers/:answerId`: Registra a nota de satisfação de um usuário.
- `[POST]/emails`: Envia uma pesquisa para o cliente.

---

## Tecnologias

- Node.js
- TypeScript
- DotEnv
- Jest
- TS-Node
- TS-Jest
- Supertest
- [Express](https://expressjs.com/)
- [Zod](https://zod.dev/basics)
- [TypeOrm](typeorm.io/docs/)
- [SQLite (DEV/Test)](https://sqlite.org/)
- [PosgreSQL (PROD)](https://postgres.org)
- [Nodemailer](https://nodemailer.com/)
- [Ethereal](https://ethereal.email/) (test environment)

---

## Instalação

```bash
mkdir ./node-nps-api
cd ./node-nps-api
git remote add origin https://github.com/wander-alves/rocketseat-nlw04-node.git
git pull
npm install
npm run dev
```

### Configurações

**TypeScript**

`tsconfig.json`
```json
{
  "compilerOptions": {
    "lib": ["ES2024"],
    "target": "ES2024",
    "module": "commonjs",
    "esModuleInterop": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "strictPropertyInitialization": false
  }
}
```

**Jest**

Configuração do Jest para executar o ambiente com TypeScript:

`jest.config.ts`

```typescript
import type { Config } from 'jest';

/**
 * Dependencies
 * - jest
 * - ts-jest
 * - ts-node 
*/

const config: Config = {
  bail: true,
  clearMocks: true,
  coverageProvider: 'v8',
  preset: "ts-jest",
  testMatch: [
    "**/tests/**/*.test.ts"
  ]
}

export default config;
```
*Inserir no script de teste a instrução para uso da virtualização opcional conforme documentação do Jest

`package.json`
```
...
  "test": "node --use-vm-experimental-modules ./node_modules/jest/jest.js ."
...
```
