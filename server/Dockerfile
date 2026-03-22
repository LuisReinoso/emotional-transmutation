FROM node:20-slim

# Install Claude Code CLI (required by Agent SDK)
RUN npm install -g @anthropic-ai/claude-code

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY dist/ ./dist/

EXPOSE 8080
ENV PORT=8080

CMD ["node", "dist/index.js"]
