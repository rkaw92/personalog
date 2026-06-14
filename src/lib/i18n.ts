import { FluentBundle, FluentResource, type FluentVariable } from '@fluent/bundle';
import { negotiateLanguages } from '@fluent/langneg';
import { Settings } from 'luxon';
import enFtl from '../locales/en.ftl?raw';
import plFtl from '../locales/pl.ftl?raw';

const RESOURCES: Record<string, string> = { en: enFtl, pl: plFtl };
const DEFAULT_LOCALE = 'en';

const requested =
    typeof navigator !== 'undefined' ? [...navigator.languages] : [];

const [locale] = negotiateLanguages(requested, Object.keys(RESOURCES), {
    defaultLocale: DEFAULT_LOCALE
});

// useIsolating: false avoids the invisible Unicode bidi-isolation characters
// Fluent wraps around { $variables } by default — unwanted in a LTR-only app.
const bundle = new FluentBundle(locale, { useIsolating: false });
bundle.addResource(new FluentResource(RESOURCES[locale]));

// Keep the document language and Luxon's date formatting in sync with the UI.
if (typeof document !== 'undefined') {
    document.documentElement.lang = locale;
}
Settings.defaultLocale = locale;

export function t(id: string, args?: Record<string, FluentVariable>): string {
    const message = bundle.getMessage(id);
    return message?.value ? bundle.formatPattern(message.value, args) : id;
}

export { locale };
