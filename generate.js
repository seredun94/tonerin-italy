const fs=require('fs'),path=require('path');
const CSS=`*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}:root{--gd:#2e7d32;--gm:#4caf50;--gl:#e8f5e9;--td:#333;--tl:#666;--bg:#f5f7f5;--w:#fff;--sh:0 2px 12px rgba(0,0,0,.08);--r:12px}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:var(--td);line-height:1.7;background:var(--w)}.container{max-width:1200px;margin:0 auto;padding:0 20px}.header{background:var(--w);box-shadow:0 1px 6px rgba(0,0,0,.06);position:sticky;top:0;z-index:100}.header .container{display:flex;align-items:center;justify-content:space-between;padding:12px 20px}.logo{font-size:1.6rem;font-weight:800;color:var(--gd);text-decoration:none}.nav{display:flex;gap:20px}.nav a{text-decoration:none;color:var(--td);font-size:.95rem;font-weight:500}.nav a:hover{color:var(--gm)}.breadcrumbs{padding:16px 0;font-size:.9rem;color:var(--tl)}.breadcrumbs a{color:var(--gd);text-decoration:none}.breadcrumbs a:hover{text-decoration:underline}.article{padding:40px 0 60px}.article h1{font-size:clamp(1.6rem,3vw,2.2rem);color:var(--gd);margin-bottom:20px;line-height:1.3}.article h2{font-size:clamp(1.2rem,2.5vw,1.6rem);color:var(--gd);margin:28px 0 12px}.article p{margin-bottom:16px}.article ul,.article ol{margin:0 0 16px 24px}.article li{margin-bottom:8px}.cw{display:grid;grid-template-columns:1fr 300px;gap:40px}.sidebar{padding-top:20px}.sc{background:var(--bg);padding:20px;border-radius:var(--r);margin-bottom:20px}.sc h3{color:var(--gd);font-size:1rem;margin-bottom:12px}.sc a{display:block;color:var(--gd);text-decoration:none;font-size:.9rem;padding:4px 0}.sc a:hover{text-decoration:underline}.cta-box{background:linear-gradient(135deg,var(--gd),var(--gm));color:var(--w);padding:32px;border-radius:var(--r);text-align:center;margin:40px 0}.cta-box h3{margin-bottom:12px;font-size:1.3rem}.cta-box p{margin-bottom:16px;opacity:.9}.btn{display:inline-block;background:var(--w);color:var(--gd);padding:14px 36px;border-radius:50px;font-size:1.05rem;font-weight:700;text-decoration:none;transition:transform .2s}.btn:hover{transform:translateY(-2px)}.footer{background:#1b5e20;color:rgba(255,255,255,.8);padding:40px 0 24px}.footer-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:32px;margin-bottom:32px}.footer h4{color:#fff;margin-bottom:16px}.footer a{color:rgba(255,255,255,.75);text-decoration:none;font-size:.9rem;display:block;padding:3px 0}.footer a:hover{color:#fff}.footer-bottom{border-top:1px solid rgba(255,255,255,.15);padding-top:20px;text-align:center;font-size:.85rem}.nav-toggle{display:none;background:none;border:none;font-size:1.6rem;cursor:pointer;color:var(--gd)}@media(max-width:768px){.nav-toggle{display:block}.nav{display:none;position:absolute;top:100%;left:0;right:0;background:var(--w);flex-direction:column;padding:16px 20px;box-shadow:var(--sh);gap:12px}.nav.active{display:flex}.cw{grid-template-columns:1fr}}`;

const L={
en:{l:'en',loc:'en_US',reg:'US',place:'United States',site:'Tonerin',
nav:['Home','Benefits','Composition','How it works','Reviews','Order now'],
foot:['Tonerin','Information','Details','Health'],
footL:['Main page','Benefits','Composition','How it works','Reviews'],
footI:['Tonerin Composition','Tonerin Price','Where to Buy','How It Works','Medical Opinions'],
footD:['Ingredients','Side Effects','Tonerin in Pharmacies','Contraindications','Customer Reviews'],
footH:['Natural Hypertension Remedies','High Blood Pressure Symptoms','Cardiovascular Health','Normal Blood Pressure'],
cta:'Try Tonerin Now',ctaP:'Take care of your cardiovascular health with an effective natural supplement.',ctaBtn:'Order now',
copy:'2025 Tonerin. All rights reserved. Dietary supplement — not a medicine.',
crumbHome:'Home',related:'Related Products',guides:'Useful Guides'},

de:{l:'de',loc:'de_DE',reg:'DE',place:'Deutschland',site:'Tonerin',
nav:['Startseite','Vorteile','Zusammensetzung','Wirkung','Bewertungen','Jetzt bestellen'],
foot:['Tonerin','Informationen','Details','Gesundheit'],
footL:['Startseite','Vorteile','Zusammensetzung','Wirkung','Bewertungen'],
footI:['Tonerin Zusammensetzung','Tonerin Preis','Wo kaufen','Wirkungsweise','Ärztliche Meinungen'],
footD:['Inhaltsstoffe','Nebenwirkungen','Tonerin in Apotheken','Gegenanzeigen','Kundenbewertungen'],
footH:['Natürliche Mittel gegen Bluthochdruck','Symptome von Bluthochdruck','Herz-Kreislauf-Gesundheit','Normaler Blutdruck'],
cta:'Probieren Sie Tonerin jetzt',ctaP:'Kümmern Sie sich um Ihre Herz-Kreislauf-Gesundheit mit einem wirksamen natürlichen Nahrungsergänzungsmittel.',ctaBtn:'Jetzt bestellen',
copy:'2025 Tonerin. Alle Rechte vorbehalten. Nahrungsergänzungsmittel — kein Arzneimittel.',
crumbHome:'Startseite',related:'Verwandte Produkte',guides:'Nützliche Ratgeber'},

fr:{l:'fr',loc:'fr_FR',reg:'FR',place:'France',site:'Tonerin',
nav:['Accueil','Bienfaits','Composition','Fonctionnement','Témoignages','Commander'],
foot:['Tonerin','Informations','Détails','Santé'],
footL:['Accueil','Bienfaits','Composition','Fonctionnement','Témoignages'],
footI:['Composition Tonerin','Prix Tonerin','Où acheter','Fonctionnement','Avis médicaux'],
footD:['Ingrédients','Effets secondaires','Tonerin en pharmacie','Contre-indications','Avis clients'],
footH:['Remèdes naturels hypertension','Symptômes tension élevée','Santé cardiovasculaire','Tension artérielle normale'],
cta:'Essayez Tonerin maintenant',ctaP:'Prenez soin de votre santé cardiovasculaire avec un complément naturel efficace et sûr.',ctaBtn:'Commander maintenant',
copy:'2025 Tonerin. Tous droits réservés. Complément alimentaire — ne remplace pas un médicament.',
crumbHome:'Accueil',related:'Produits associés',guides:'Guides utiles'},

es:{l:'es',loc:'es_ES',reg:'ES',place:'España',site:'Tonerin',
nav:['Inicio','Beneficios','Composición','Cómo funciona','Reseñas','Pedir ahora'],
foot:['Tonerin','Información','Detalles','Salud'],
footL:['Inicio','Beneficios','Composición','Cómo funciona','Reseñas'],
footI:['Composición Tonerin','Precio Tonerin','Dónde comprar','Cómo funciona','Opiniones médicas'],
footD:['Ingredientes','Efectos secundarios','Tonerin en farmacias','Contraindicaciones','Reseñas de clientes'],
footH:['Remedios naturales hipertensión','Síntomas presión alta','Salud cardiovascular','Presión arterial normal'],
cta:'Prueba Tonerin ahora',ctaP:'Cuida tu salud cardiovascular con un suplemento natural eficaz y seguro.',ctaBtn:'Pedir ahora',
copy:'2025 Tonerin. Todos los derechos reservados. Complemento alimenticio — no es un medicamento.',
crumbHome:'Inicio',related:'Productos relacionados',guides:'Guías útiles'},

pl:{l:'pl',loc:'pl_PL',reg:'PL',place:'Polska',site:'Tonerin',
nav:['Strona główna','Korzyści','Skład','Jak działa','Recenzje','Zamów teraz'],
foot:['Tonerin','Informacje','Szczegóły','Zdrowie'],
footL:['Strona główna','Korzyści','Skład','Jak działa','Recenzje'],
footI:['Skład Tonerin','Cena Tonerin','Gdzie kupić','Jak działa','Opinie lekarzy'],
footD:['Składniki','Skutki uboczne','Tonerin w aptekach','Przeciwwskazania','Opinie klientów'],
footH:['Naturalne środki na nadciśnienie','Objawy wysokiego ciśnienia','Zdrowie sercowo-naczyniowe','Prawidłowe ciśnienie krwi'],
cta:'Wypróbuj Tonerin teraz',ctaP:'Zadbaj o zdrowie układu sercowo-naczyniowego dzięki skutecznemu naturalnemu suplementowi.',ctaBtn:'Zamów teraz',
copy:'2025 Tonerin. Wszelkie prawa zastrzeżone. Suplement diety — nie jest lekiem.',
crumbHome:'Strona główna',related:'Powiązane produkty',guides:'Przydatne poradniki'},

ro:{l:'ro',loc:'ro_RO',reg:'RO',place:'România',site:'Tonerin',
nav:['Acasă','Beneficii','Compoziție','Cum funcționează','Recenzii','Comandă acum'],
foot:['Tonerin','Informații','Detalii','Sănătate'],
footL:['Acasă','Beneficii','Compoziție','Cum funcționează','Recenzii'],
footI:['Compoziția Tonerin','Prețul Tonerin','De unde să cumperi','Cum funcționează','Opinii medicale'],
footD:['Ingrediente','Efecte secundare','Tonerin în farmacii','Contraindicații','Recenzii clienți'],
footH:['Remedii naturale hipertensiune','Simptome tensiune ridicată','Sănătate cardiovasculară','Tensiune arterială normală'],
cta:'Încearcă Tonerin acum',ctaP:'Ai grijă de sănătatea cardiovasculară cu un supliment natural eficient și sigur.',ctaBtn:'Comandă acum',
copy:'2025 Tonerin. Toate drepturile rezervate. Supliment alimentar — nu este un medicament.',
crumbHome:'Acasă',related:'Produse asociate',guides:'Ghiduri utile'},

pt:{l:'pt',loc:'pt_PT',reg:'PT',place:'Portugal',site:'Tonerin',
nav:['Início','Benefícios','Composição','Como funciona','Avaliações','Encomendar agora'],
foot:['Tonerin','Informações','Detalhes','Saúde'],
footL:['Início','Benefícios','Composição','Como funciona','Avaliações'],
footI:['Composição Tonerin','Preço Tonerin','Onde comprar','Como funciona','Opiniões médicas'],
footD:['Ingredientes','Efeitos secundários','Tonerin nas farmácias','Contraindicações','Avaliações de clientes'],
footH:['Remédios naturais hipertensão','Sintomas pressão alta','Saúde cardiovascular','Pressão arterial normal'],
cta:'Experimente Tonerin agora',ctaP:'Cuide da sua saúde cardiovascular com um suplemento natural eficaz e seguro.',ctaBtn:'Encomendar agora',
copy:'2025 Tonerin. Todos os direitos reservados. Suplemento alimentar — não é um medicamento.',
crumbHome:'Início',related:'Produtos relacionados',guides:'Guias úteis'},

bg:{l:'bg',loc:'bg_BG',reg:'BG',place:'България',site:'Tonerin',
nav:['Начало','Ползи','Състав','Как действа','Отзиви','Поръчайте сега'],
foot:['Tonerin','Информация','Подробности','Здраве'],
footL:['Начало','Ползи','Състав','Как действа','Отзиви'],
footI:['Състав на Tonerin','Цена на Tonerin','Откъде да купите','Как действа','Медицински мнения'],
footD:['Съставки','Странични ефекти','Tonerin в аптеките','Противопоказания','Клиентски отзиви'],
footH:['Натурални средства за хипертония','Симптоми на високо налягане','Сърдечно-съдово здраве','Нормално кръвно налягане'],
cta:'Опитайте Tonerin сега',ctaP:'Погрижете се за сърдечно-съдовото си здраве с ефективна и безопасна натурална добавка.',ctaBtn:'Поръчайте сега',
copy:'2025 Tonerin. Всички права запазени. Хранителна добавка — не е лекарство.',
crumbHome:'Начало',related:'Свързани продукти',guides:'Полезни ръководства'},

ru:{l:'ru',loc:'ru_UA',reg:'UA',place:'Україна',site:'Tonerin',
nav:['Главная','Преимущества','Состав','Как действует','Отзывы','Заказать'],
foot:['Tonerin','Информация','Подробнее','Здоровье'],
footL:['Главная','Преимущества','Состав','Как действует','Отзывы'],
footI:['Состав Tonerin','Цена Tonerin','Где купить','Как действует','Мнения врачей'],
footD:['Ингредиенты','Побочные эффекты','Tonerin в аптеках','Противопоказания','Отзывы клиентов'],
footH:['Натуральные средства от гипертонии','Симптомы высокого давления','Сердечно-сосудистое здоровье','Нормальное давление'],
cta:'Попробуйте Tonerin сейчас',ctaP:'Позаботьтесь о здоровье сердечно-сосудистой системы с эффективной натуральной добавкой.',ctaBtn:'Заказать сейчас',
copy:'2025 Tonerin. Все права защищены. Биологически активная добавка — не является лекарством.',
crumbHome:'Главная',related:'Похожие продукты',guides:'Полезные руководства'}
};

// Page content merged from all data files
const P=Object.assign({},require('./pages-data.js'),require('./pages-data2.js'),require('./pages-data3.js'));

const SLUGS=['tonerin-composizione','tonerin-recensioni','tonerin-prezzo','tonerin-dove-comprare','tonerin-come-funziona','tonerin-opinioni-mediche','tonerin-ingredienti','tonerin-effetti-collaterali','tonerin-farmacia','tonerin-controindicazioni','ipertensione-rimedi-naturali','pressione-alta-sintomi','salute-cardiovascolare','pressione-sanguigna-normale'];
const NAV_IDS=['benefits','composition','how-it-works','reviews','order'];

function gen(lc,slug){
const c=L[lc],p=P[slug][lc];
const base=`/${lc}/`;
const sidebarSlugs=SLUGS.filter(s=>s!==slug).slice(0,5);
const guideSlugs=SLUGS.filter(s=>s!==slug&&!sidebarSlugs.includes(s)).slice(0,4);
return `<!DOCTYPE html>
<html lang="${c.l}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${p.t}</title>
<meta name="description" content="${p.d}">
<link rel="canonical" href="https://tonerin.pages.dev${base}${slug}/">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="article">
<meta property="og:title" content="${p.t}">
<meta property="og:description" content="${p.d}">
<meta property="og:url" content="https://tonerin.pages.dev${base}${slug}/">
<meta property="og:locale" content="${c.loc}">
<meta property="og:site_name" content="${c.site}">
<meta name="geo.region" content="${c.reg}">
<meta name="geo.placename" content="${c.place}">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Article","headline":"${p.t}","description":"${p.d}","url":"https://tonerin.pages.dev${base}${slug}/","inLanguage":"${c.l}","publisher":{"@type":"Organization","name":"${c.site}"},"datePublished":"2025-01-15","dateModified":"2025-06-10"}
</script>
<style>${CSS}</style>
</head>
<body>
<header class="header"><div class="container">
<a href="${base}" class="logo">Tonerin</a>
<button class="nav-toggle" onclick="document.querySelector('.nav').classList.toggle('active')" aria-label="Menu">&#9776;</button>
<nav class="nav">
<a href="${base}">${c.nav[0]}</a>
<a href="${base}#benefits">${c.nav[1]}</a>
<a href="${base}#composition">${c.nav[2]}</a>
<a href="${base}#how-it-works">${c.nav[3]}</a>
<a href="${base}#reviews">${c.nav[4]}</a>
<a href="${base}#order">${c.nav[5]}</a>
</nav>
</div></header>

<div class="container"><div class="breadcrumbs"><a href="${base}">${c.crumbHome}</a> &raquo; <span>${p.bc}</span></div></div>

<main class="article"><div class="container"><div class="cw">
<div class="main-content">
<h1>${p.h1}</h1>
${p.body}
<div class="cta-box"><h3>${c.cta}</h3><p>${c.ctaP}</p><a href="${base}#order" class="btn">${c.ctaBtn}</a></div>
</div>
<aside class="sidebar">
<div class="sc"><h3>${c.related}</h3>${sidebarSlugs.map(s=>`<a href="${base}${s}/">${P[s][lc].bc}</a>`).join('')}</div>
<div class="sc"><h3>${c.guides}</h3>${guideSlugs.map(s=>`<a href="${base}${s}/">${P[s][lc].bc}</a>`).join('')}</div>
</aside>
</div></div></main>

<footer class="footer"><div class="container"><div class="footer-grid">
<div><h4>${c.foot[0]}</h4><a href="${base}">${c.footL[0]}</a><a href="${base}#benefits">${c.footL[1]}</a><a href="${base}#composition">${c.footL[2]}</a><a href="${base}#how-it-works">${c.footL[3]}</a><a href="${base}#reviews">${c.footL[4]}</a></div>
<div><h4>${c.foot[1]}</h4>${c.footI.map((t,i)=>`<a href="${base}${SLUGS[i]}/">${t}</a>`).join('')}</div>
<div><h4>${c.foot[2]}</h4>${c.footD.map((t,i)=>`<a href="${base}${SLUGS[i+5]}/">${t}</a>`).join('')}</div>
<div><h4>${c.foot[3]}</h4>${c.footH.map((t,i)=>`<a href="${base}${SLUGS[i+10]}/">${t}</a>`).join('')}</div>
</div><div class="footer-bottom"><p>&copy; ${c.copy}</p></div></div></footer>
<script>document.querySelectorAll('a[href*="#"]').forEach(function(a){a.addEventListener('click',function(e){var h=this.getAttribute('href'),idx=h.indexOf('#');if(idx>=0){var id=h.substring(idx+1);var t=document.getElementById(id);if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});history.replaceState(null,null,location.pathname);}}});});</script>
</body></html>`;
}

let count=0;
for(const lc of Object.keys(L)){
for(const slug of SLUGS){
const dir=path.join(__dirname,lc,slug);
fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(path.join(dir,'index.html'),gen(lc,slug),'utf8');
count++;
}
}
console.log(`Generated ${count} files`);
