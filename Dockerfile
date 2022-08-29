FROM node:16

# work dir
WORKDIR /tekab/src/app

# packages & modules
COPY package*.json ./
RUN npm install
# prisma
RUN npm install -g prisma




COPY . .


RUN prisma generate
# build
RUN npm run build



# export
EXPOSE 8080
CMD ["node", "dist/main"]