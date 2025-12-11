npm run build

# local DB
wrangler pages dev .svelte-kit/cloudflare
npx wrangler pages dev .svelte-kit/cloudflare
# or if you want to hit remote staging DB by name:
wrangler pages dev .svelte-kit/cloudflare --d1 DB=editable_db_stg

npx wrangler d1 execute DB --local --file=sql\schema.sql
npx wrangler d1 execute DB --local --file=sql\seed.sql

When staging is ready, run (without --local):
npx wrangler d1 execute DB --file=sql\schema.sql
npx wrangler d1 execute DB --file=sql\seed.sql

npx wrangler d1 execute editable_db_stg --local --file=.\sql\schema.sql
npx wrangler d1 execute editable_db_stg --local --file=.\sql\seeds.sql

# stop dev server first
Remove-Item -Recurse -Force .svelte-kit
npm run dev

