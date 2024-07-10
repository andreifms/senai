# Use a imagem oficial do Node.js como base
FROM node:14

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código do projeto
COPY . .

# Exponha a porta em que a aplicação estará rodando
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
