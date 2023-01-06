# construir: docker build -t dds-backend .
# ejecutar: docker run -e NODE_ENV=dev  -p 3000:3000 dds-backend

FROM node:16

WORKDIR /user/src/app

COPY . .

RUN npm install 

EXPOSE 3000

CMD  ["node","index.js"]
