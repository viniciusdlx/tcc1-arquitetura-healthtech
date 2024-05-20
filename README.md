# API de um sistema healthtech para agendamento de consultas para pacientes.

## Inicialização da aplicação:

- `npm install` para instalação das dependências.
- `npm run start:dev` para inicialização da aplicação em desenvolvimento no modo watch (a cada arquivo salvo, será automaticamente reiniciado o servidor)
- `npm run build` para buildar a aplicação que será usada em produção
- `npm run start:prod` para inicialização da aplicação em modo de produção

## Dependências utilizadas:

- typeorm: `npm install --save @nestjs/typeorm typeorm`
- sqlite3: `npm install sqlite3`
- dotenv: `npm install dotenv`
- swagger: `npm install --save @nestjs/swagger`

## Outros comandos:

- sqlite wsl: `sqlitebrowser /home/username/path/to/healthtech.db`
- sqlite wsl to windows: `ln -s /home/username/path/to/healthtech.db /mnt/c/path/to/healthtech.db`
