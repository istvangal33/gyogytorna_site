# --- 1. fázis: függőségek ---
FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- 2. fázis: fordítás ---
FROM node:22-bookworm-slim AS builder
WORKDIR /app
# a sitemap a git előzményekből olvas, ehhez kell a git
RUN apt-get update && apt-get install -y --no-install-recommends git \
    && rm -rf /var/lib/apt/lists/* \
    && git config --global --add safe.directory /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Ezek build közben égnek bele a kliens kódba — nem titkosak.
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY
ARG DEPLOY_ID
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID \
    NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY \
    DEPLOY_ID=$DEPLOY_ID \
    BUILD_STANDALONE=true \
    NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# --- 3. fázis: futtatás ---
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1

# ne rootként fusson
RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# a képoptimalizálás gyorsítótára ide kerül, kötetként csatoljuk
RUN mkdir -p .next/cache && chown nextjs:nodejs .next/cache

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]