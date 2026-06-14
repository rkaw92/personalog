# persona/log

A minimal, privacy-focused personal event logbook. Helps you answer these questions:
* Did I already do XYZ today?
* When did I last do XYZ?

## How to use

1. Go to https://personalog.pages.dev/
2. Create your first category
3. Add an entry!

Be sure not to use the app in Incognito mode - the whole point is that it saves data locally in your browser, so a browsing mode that saves nothing is hardly useful.

## Install on your phone
This is a Progressive Web App. It means you can install it as an app on your smartphone and add it to your home screen - no need to open a Web browser each time.

**Installing is recommended** - installed apps' storage is made persistent. If you use the app only through the browser and abandon it for some time (like a month), your browser such as Chrome or Firefox might decide to delete the stored data to free up space on the device, so your saved entries might vanish after a long period of disuse - especially since they are not saved to a server of any kind.

## Privacy

persona/log stores all data locally on your device using IndexedDB. No account is required. No data is transmitted to any server, processed, or shared with anyone. Uninstalling the app or clearing the website's data in the browser removes all items that you have added to the app.

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
