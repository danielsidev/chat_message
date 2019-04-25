# API Chat Message

>API para aplicação de chat .

### Abra um console do MongoDB
Copie e cole um bloco de código  que se encontra em ./source/init.database.js.
Isso irá criar o banco e a collection.

### Instale as dependências 
``` bash
sudo npm install
```
### Funcionamento da aplicação:

``` bash
sudo npm run dev
```

---

## Host: http://localhost:3009 
### Os endpoints da aplicação para consulta são:
Retorna as salas de chat existentes
``` bash
ENDPOINT: GET => /api/v1/chat/rooms

```

Retorna os usuários da room: sala 
``` bash
ENDPOINT: GET => /api/v1/users/:room
param room = sala

```

Retorna as mensagens da room: sala 
``` bash
ENDPOINT: GET => /api/v1/chat/messages/:room
param room = sala

```
