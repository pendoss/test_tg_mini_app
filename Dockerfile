# syntax=docker/dockerfile:1

# 1) Install deps with pnpm using lockfile
FROM node:20-alpine AS deps
WORKDIR /app
ENV CI=1
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 2) Build the app
FROM node:20-alpine AS build
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# 3) Serve with nginx
FROM nginx:alpine AS runner
# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html
# SPA fallback config
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
