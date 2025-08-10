# syntax=docker/dockerfile:1

# 1) Install deps with pnpm using lockfile
FROM node:20-alpine AS deps
WORKDIR /app
ENV CI=1
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
# Approve build scripts (pnpm v10 security) and rebuild native binaries (e.g., esbuild)
RUN pnpm approve-builds -y || true
RUN pnpm rebuild -r

# 2) Build the app
FROM node:20-alpine AS build
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Allow toggling TS type-checks (off by default)
ARG TYPECHECK=false
RUN if [ "$TYPECHECK" = "true" ]; then pnpm run build; else pnpm exec vite build; fi

# 3) Serve with nginx
FROM nginx:alpine AS runner
# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html
# SPA fallback config
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
