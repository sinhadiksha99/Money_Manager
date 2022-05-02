FROM node:9-slim
WORKDIR .
RUN npm install
CMD ["npm","run","development"]
