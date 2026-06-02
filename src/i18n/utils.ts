import en from './en.json';
import fr from './fr.json';

export const translations = { en, fr } as const;

export type Locale = keyof typeof translations;
export type Translations = typeof en;

export const defaultLocale: Locale = 'en';
export const locales: Locale[] = ['en', 'fr'];

/**
 * Récupère les traductions pour une locale donnée.
 * Fallback sur la locale par défaut si la locale n'existe pas.
 */
export function getTranslations(locale: string): Translations {
  if (locale in translations) {
    return translations[locale as Locale];
  }
  return translations[defaultLocale];
}

/**
 * Récupère la locale depuis l'URL d'une page Astro.
 * /fr/about → 'fr'
 * /about    → 'en' (locale par défaut)
 */
export function getLocaleFromUrl(url: URL): Locale {
  const [, segment] = url.pathname.split('/');
  if (segment in translations) {
    return segment as Locale;
  }
  return defaultLocale;
}

/**
 * Construit l'URL équivalente dans une autre locale.
 * /services/azure-architecture en 'fr' → /fr/services/azure-architecture
 */
export function getLocalizedPath(path: string, targetLocale: Locale): string {
  // Normaliser le path en retirant les segments de locale existants
  let normalized = path;
  for (const loc of locales) {
    if (normalized.startsWith(`/${loc}/`)) {
      normalized = normalized.slice(`/${loc}`.length);
      break;
    }
    if (normalized === `/${loc}`) {
      normalized = '/';
      break;
    }
  }

  // Ajouter le préfixe si ce n'est pas la locale par défaut
  if (targetLocale === defaultLocale) {
    return normalized || '/';
  }
  return `/${targetLocale}${normalized === '/' ? '' : normalized}`;
}
