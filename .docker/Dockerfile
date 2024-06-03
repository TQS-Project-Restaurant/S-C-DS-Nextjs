FROM node:22

WORKDIR /app
COPY ./app/package*.json ./

ENV NEXT_PUBLIC_IP_ADDRESS=http://localhost:8080

RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
