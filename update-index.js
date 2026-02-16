// Script to inject hreflang tags and language switcher into all index.html files
const fs=require('fs'),path=require('path');

const ALL_LANGS=['it','en','de','fr','es','pl','ro','pt','bg','ru'];
const LANG_LABELS={it:'IT',en:'EN',de:'DE',fr:'FR',es:'ES',pl:'PL',ro:'RO',pt:'PT',bg:'BG',ru:'RU'};

function homeUrl(lang){
  if(lang==='it') return 'https://tonerin.pages.dev/';
  return `https://tonerin.pages.dev/${lang}/`;
}

function genHreflangHome(){
  return ALL_LANGS.map(lang=>
    `    <link rel="alternate" hreflang="${lang}" href="${homeUrl(lang)}">`
  ).join('\n')+`\n    <link rel="alternate" hreflang="x-default" href="https://tonerin.pages.dev/">`;
}

function genLangSwitcherHtml(currentLang){
  const currentLabel=LANG_LABELS[currentLang];
  const links=ALL_LANGS.map(lang=>{
    const href=lang==='it'?'/':(`/${lang}/`);
    const cls=lang===currentLang?' class="active"':'';
    return `<a href="${href}"${cls}>${LANG_LABELS[lang]}</a>`;
  }).join('');
  return `            <div class="lang-sw"><button class="lang-btn" onclick="this.nextElementSibling.classList.toggle('open')">${currentLabel} &#9662;</button><div class="lang-dd">${links}</div></div>`;
}

const LANG_SWITCHER_CSS=`.lang-sw{position:relative;margin-left:8px}.lang-btn{background:none;border:1px solid #ddd;padding:5px 10px;border-radius:6px;cursor:pointer;font-size:.85rem;color:var(--text-dark,#333);white-space:nowrap}.lang-btn:hover{border-color:var(--green-main,#4caf50)}.lang-dd{display:none;position:absolute;right:0;top:calc(100% + 4px);background:var(--white,#fff);box-shadow:0 2px 12px rgba(0,0,0,.08);border-radius:8px;padding:4px 0;min-width:110px;z-index:200}.lang-dd.open{display:block}.lang-dd a{display:block;padding:5px 14px;text-decoration:none;color:var(--text-dark,#333);font-size:.85rem}.lang-dd a:hover{background:var(--green-light,#e8f5e9)}.lang-dd a.active{font-weight:700;color:var(--green-dark,#2e7d32)}`;

const LANG_SWITCHER_JS=`document.addEventListener('click',function(e){if(!e.target.closest('.lang-sw')){document.querySelectorAll('.lang-dd.open').forEach(function(d){d.classList.remove('open')});}});`;

function processFile(filePath, lang){
  if(!fs.existsSync(filePath)) return false;
  let html=fs.readFileSync(filePath,'utf8');

  // Skip if already has hreflang
  if(html.includes('hreflang')){
    console.log(`  Skipping ${filePath} - already has hreflang`);
    return false;
  }

  // 1. Insert hreflang tags before </head>
  const hreflangBlock=genHreflangHome();
  html=html.replace('</head>',`\n    <!-- Hreflang -->\n${hreflangBlock}\n</head>`);

  // 2. Insert language switcher CSS before </style>
  html=html.replace(/<\/style>/,`\n        ${LANG_SWITCHER_CSS}\n    </style>`);

  // 3. Insert language switcher inside nav (before </nav>)
  const langSwitcher=genLangSwitcherHtml(lang);
  html=html.replace(/<\/nav>\s*\n\s*<\/div>\s*\n<\/header>/,
    `\n${langSwitcher}\n        </nav>\n    </div>\n</header>`);

  // 4. Insert click-outside handler before </body>
  if(!html.includes('lang-sw')){
    // fallback: add lang switcher before </nav> with simpler regex
  }
  if(!html.includes('lang-dd.open')){
    html=html.replace('</body>',`<script>${LANG_SWITCHER_JS}</script>\n</body>`);
  }

  fs.writeFileSync(filePath,html,'utf8');
  return true;
}

// Process root index.html (Italian)
let count=0;
const rootIndex=path.join(__dirname,'index.html');
if(processFile(rootIndex,'it')) count++;
console.log(`Processed root index.html (it)`);

// Process language-specific index.html files
const langs=['en','de','fr','es','pl','ro','pt','bg','ru'];
for(const lang of langs){
  const langIndex=path.join(__dirname,lang,'index.html');
  if(processFile(langIndex,lang)) count++;
  console.log(`Processed ${lang}/index.html`);
}

console.log(`\nUpdated ${count} index.html files with hreflang tags and language switcher`);
