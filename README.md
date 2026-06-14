# persona/log

A minimal personal event tracker for your phone. Log recurring events — workouts, medications, meals, habits — and see at a glance when you last did them.

## Features

- **Categories** — create a category for anything you want to track
- **One-tap logging** — record an event in seconds, with an optional comment
- **Time offset** — log something that happened up to 24 hours ago
- **History** — browse all entries for a category in reverse chronological order
- **Archiving** — hide categories you no longer need without losing their history

## Privacy

persona/log stores all data locally on your device using IndexedDB. No account is required. No data is transmitted to any server, processed, or shared with anyone. Uninstalling the app removes all data.

## Tech stack

- [SvelteKit](https://kit.svelte.dev/) + [Svelte 5](https://svelte.dev/)
- [Dexie](https://dexie.org/) (IndexedDB)
- [Luxon](https://moment.github.io/luxon/) (date formatting)
- [Fluent](https://projectfluent.org/) (i18n — English and Polish)
- Deployed on [Cloudflare Pages](https://pages.cloudflare.com/)

## Development

```bash
npm install
npm run dev
```

## License

AGPLv3 — see [LICENSE](LICENSE).
