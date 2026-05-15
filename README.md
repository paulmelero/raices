# Raíces

## Development

To test locally with D1:

### Run migration against local D1

pnpx wrangler d1 execute raices-db --local --file=server/database/migrations/0001_create_posts.sql

### Preview with wrangler

pnpx wrangler dev .output/server/index.mjs --assets .output/public
