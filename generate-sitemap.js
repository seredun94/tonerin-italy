// Generate sitemap.xml with all pages
const fs=require('fs'),path=require('path');

const BASE='https://tonerin.pages.dev';
const LANGS=['en','de','fr','es','pl','ro','pt','bg','ru'];
const SLUGS_BASE=['tonerin-composizione','tonerin-recensioni','tonerin-prezzo','tonerin-dove-comprare','tonerin-come-funziona','tonerin-opinioni-mediche','tonerin-ingredienti','tonerin-effetti-collaterali','tonerin-farmacia','tonerin-controindicazioni','ipertensione-rimedi-naturali','pressione-alta-sintomi','salute-cardiovascolare','pressione-sanguigna-normale'];
const SLUGS_NEW=['tonerin-funziona-davvero','tonerin-opinioni-forum','tonerin-amazon','tonerin-truffa','tonerin-come-si-usa','tonerin-risultati'];

// Check which new slugs have data
let P={};
try { P=Object.assign({},require('./pages-data.js'),require('./pages-data2.js'),require('./pages-data3.js')); } catch(e) {}
try { Object.assign(P, require('./pages-data4.js')); } catch(e) {}

const ALL_SLUGS=[...SLUGS_BASE,...SLUGS_NEW.filter(s=>P[s])];
const today=new Date().toISOString().split('T')[0];

let urls=[];

// Homepage (Italian, x-default)
urls.push({loc:`${BASE}/`,lastmod:today,priority:'1.0',changefreq:'weekly'});

// Language homepages
for(const lang of LANGS){
  urls.push({loc:`${BASE}/${lang}/`,lastmod:today,priority:'0.9',changefreq:'weekly'});
}

// Italian slug pages (root level)
for(const slug of ALL_SLUGS){
  urls.push({loc:`${BASE}/${slug}/`,lastmod:today,priority:'0.8',changefreq:'monthly'});
}

// Language slug pages
for(const lang of LANGS){
  for(const slug of ALL_SLUGS){
    if(P[slug]&&P[slug][lang]){
      urls.push({loc:`${BASE}/${lang}/${slug}/`,lastmod:today,priority:'0.7',changefreq:'monthly'});
    }
  }
}

const xml=`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(u=>`  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname,'sitemap.xml'),xml,'utf8');
console.log(`Sitemap generated with ${urls.length} URLs`);
