export async function onRequest(context) {
  const country = context.request.cf?.country || '';
  const url = new URL(context.request.url);

  // Only redirect the root path
  if (url.pathname !== '/') {
    return context.next();
  }

  const map = {
    en: ['US','GB','AU','CA','NZ','IE','ZA','SG','HK','PH','IN','NG','KE'],
    de: ['DE','AT','CH','LI'],
    fr: ['FR','BE','LU','MC','SN','CI','ML','CM'],
    es: ['ES','MX','AR','CO','CL','PE','VE','EC','GT','CU','BO','DO','HN','PY','SV','NI','CR','PA','UY'],
    pl: ['PL'],
    ro: ['RO','MD'],
    pt: ['PT','BR','AO','MZ'],
    bg: ['BG'],
    ru: ['RU','BY','KZ','KG','TJ','UZ','UA']
  };

  for (const [lang, countries] of Object.entries(map)) {
    if (countries.includes(country)) {
      return Response.redirect(url.origin + '/' + lang + '/', 302);
    }
  }

  // Default: serve Italian (root)
  return context.next();
}
