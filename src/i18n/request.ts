import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

type AppLocale = (typeof routing.locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }

  const resolvedLocale = locale as AppLocale;

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
  };
});
