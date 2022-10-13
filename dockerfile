# construir: docker build -t dds-express .
# ejecutar: docker run -e NODE_ENV=dev  -p 3000:3000 dds-express

FROM node:16

WORKDIR /user/src/app

COPY . .

RUN npm install 

EXPOSE 3000

CMD  ["node","index.js"]
