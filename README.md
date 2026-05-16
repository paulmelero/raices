# Raíces

## Development

To test locally with D1:

### Run migration against local D1

pnpx wrangler login
pnpx wrangler d1 execute raices_db --remote --file=server/database/migrations/0001_create_posts.sql

### Preview with wrangler

pnpx wrangler dev .output/server/index.mjs --assets .output/public
