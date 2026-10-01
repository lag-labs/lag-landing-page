# syntax=docker/dockerfile:1

# Build the fully static site with Bun.
FROM oven/bun:1.4-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun --bun run build

# Serve `out/` as plain files.
FROM nginxinc/nginx-unprivileged:alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 8080
