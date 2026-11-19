import { readFile, writeFile } from 'node:fs/promises';
import { icon } from './profile-icons.mjs';
import { realTechLogo } from './profile-tech-logos.mjs';

const out = new URL('../profile-assets/', import.meta.url);
const data = JSON.parse(await readFile(new URL('github-data.json', out), 'utf8'));
const art = `data:image/png;base64,${(await readFile(new URL('pirate-reference-art.png', out))).toString('base64')}`;
const brand = (await readFile(new URL('wancor-mark.svg', out), 'utf8')).replace(/^.*?<svg[^>]*>/s, '').replace(/<\/svg>\s*$/, '');
const colors = { ink: '#EDF1F7', muted: '#BDC8D8', peach: '#FFA586', crimson: '#B51A2B', navy: '#161B2F', slate: '#384358', burgundy: '#541A2E' };
const escape = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'})[character]);
const text = (x, y, value, size = 17, color = colors.ink, extra = '') => `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" ${extra}>${escape(value)}</text>`;
const panel = (x, y, width, height, radius = 10) => `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="#242F49" stroke="#384358" stroke-width="1"/>`;
const svg = (height, title, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="${height}" viewBox="0 0 1000 ${height}" role="img" aria-labelledby="title"><title id="title">${escape(title)}</title>
<defs>
 <linearGradient id="logo-shade"><stop stop-color="#161B2F" stop-opacity="0"/><stop offset=".35" stop-color="#161B2F" stop-opacity=".7"/><stop offset=".65" stop-color="#161B2F" stop-opacity=".7"/><stop offset="1" stop-color="#161B2F" stop-opacity="0"/></linearGradient>
 <linearGradient id="paper" x2="0" y2="1"><stop stop-color="#FFE1A0"/><stop offset=".5" stop-color="#EFC082"/><stop offset="1" stop-color="#FFA586"/></linearGradient>
 <linearGradient id="shade"><stop offset="0" stop-color="#161B2F"/><stop offset=".5" stop-color="#161B2F" stop-opacity=".98"/><stop offset=".72" stop-color="#161B2F" stop-opacity="0"/></linearGradient>
 <clipPath id="about-window"><rect x="16" y="48" width="968" height="232" rx="12"/></clipPath>
 <clipPath id="banner-window"><rect width="1000" height="156" rx="12"/></clipPath>
</defs><rect width="1000" height="${height}" fill="#161B2F"/><g font-family="Arial, Helvetica, sans-serif">${body}</g></svg>\n`;
async function save(name, height, title, body) { await writeFile(new URL(`${name}-premium.svg`, out), svg(height, title, body)); }

function rope(y, x = 20, width = 960) {
  return `<g fill="none" stroke-linecap="round"><path d="M${x} ${y}H${x+width}" stroke="#7D492D" stroke-width="5"/><path d="M${x} ${y-1}H${x+width}" stroke="#F0BE83" stroke-width="3"/><path d="M${x} ${y-1}H${x+width}" stroke="#805335" stroke-width="3" stroke-dasharray="1 5"/></g>`;
}
function label(value, symbol, x = 14, y = 3, width = 250) {
  return `<path d="M${x+7} ${y+3} ${x+width} ${y} ${x+width-7} ${y+12} ${x+width-3} ${y+30} ${x+1} ${y+34} ${x+7} ${y+22} ${x} ${y+24}Z" fill="url(#paper)"/>
  ${symbol==='hat' ? `<g transform="translate(${x+26} ${y+23}) scale(.56)">${hat(0,0)}</g>` : icon(symbol,x+14,y+6,24,'#182236')}${text(x+48,y+25,value,19,'#111A29','font-weight="800"')}`;
}
function hat(x, y) {
  return `<g transform="translate(${x} ${y})"><path d="M-19 0Q-18-24 0-24T19 0Z" fill="#EFC082" stroke="#805335"/><path d="M-19-5H19V1H-19Z" fill="#B51A2B"/><ellipse rx="31" ry="6" fill="#F0C285" stroke="#805335"/><path d="M-24 2Q0 7 24 2" fill="none" stroke="#805335"/></g>`;
}
function skull(x, y, scale = 1, opacity = 1) {
  return `<g transform="translate(${x} ${y}) scale(${scale})" opacity="${opacity}"><g stroke="#BDD0E3" stroke-width="6" stroke-linecap="round"><path d="m-26-20 52 45m-52 0 52-45"/></g><path d="M-18 0C-32-36 33-36 19 0L14 10v18h-29V10Z" fill="#BDD0E3"/><circle cx="-8" cy="-3" r="5" fill="#0C1728"/><circle cx="9" cy="-3" r="5" fill="#0C1728"/><path d="m0 4-3 5h6Zm-9 10v12m9-12v12m9-12v12" stroke="#0C1728"/>${hat(0,-20)}</g>`;
}

// Panoramic illustration with the real portfolio mark and editable SVG text.
await save('reference-header', 228, 'Wancor — Juan Domanico Militante, Web and Mobile Developer', `
 <g clip-path="url(#banner-window)"><svg width="1000" height="156" viewBox="0 0 1536 512" preserveAspectRatio="none"><image href="${art}" width="1536" height="1024"/></svg></g>
 <rect width="1000" height="156" fill="url(#logo-shade)"/>
 <svg x="347" y="39" width="91" height="66" viewBox="65 115 385 280">${brand}</svg>
 ${text(560,70,'WANCOR',31,colors.ink,'text-anchor="middle" font-weight="700" letter-spacing="9"')}
 ${text(560,93,'DEVELOP • BUILD • EXPLORE',10,colors.ink,'text-anchor="middle" letter-spacing="2.5"')}
 <path d="M0 153Q260 142 500 153T1000 151" fill="none" stroke="#B51A2B" stroke-width="4"/>
 ${text(500,189,'Juan Domanico Militante',32,colors.ink,'text-anchor="middle" font-weight="700"')}
 ${text(500,217,'Web & Mobile Developer | BSIT Student',17,colors.muted,'text-anchor="middle"')}
`);

for (const [name, title, symbol] of [['portfolio','PORTFOLIO','code'],['email','EMAIL','mail'],['linkedin','LINKEDIN','link']]) {
  const button = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="43" viewBox="0 0 220 43"><rect x="1" y="1" width="218" height="41" rx="21" fill="#161B2F" stroke="#B51A2B" stroke-width="1.5"/>${icon(symbol,30,11,21)}<text x="127" y="27" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="#EDF1F7" font-weight="700">${title}</text></svg>\n`;
  await writeFile(new URL(`reference-link-${name}-premium.svg`,out),button);
}

await save('reference-about', 292, 'About Juan — 2 years of web and mobile development experience', `
 ${rope(26)}${label('ABOUT ME','hat',14,3,205)}
 ${panel(16,48,968,232)}
 <g clip-path="url(#about-window)"><image href="${art}" x="0" y="-285" width="1000" height="667"/><rect x="16" y="48" width="968" height="232" fill="url(#shade)"/></g>
 <g font-size="17" fill="${colors.ink}">
  <text x="38" y="85">I'm <tspan font-weight="700">Juan Domanico Militante</tspan>, a <tspan fill="#FFA586" font-weight="700">Web and Mobile Developer</tspan></text>
  <text x="38" y="109">and an Information Technology student at</text>
  <text x="38" y="133" font-weight="700">Pambayang Dalubhasaan ng Marilao.</text>
  <rect x="86" y="149" width="178" height="23" rx="3" fill="#541A2E"/>
  <text x="38" y="167">I have <tspan font-weight="700">2 years of experience</tspan> creating websites and mobile</text>
  <text x="38" y="191">applications. I enjoy building <tspan font-weight="700">simple, useful, and easy-to-use</tspan></text>
  <text x="38" y="215">systems, including <tspan font-weight="700">mobile apps that work offline</tspan> and web applications</text>
  <text x="38" y="239">for managing documents, sales, and inventory.</text>
 </g>
`);

let toolkit = rope(26)+label('TECH STACK','tools',14,3,235);
const groups = [
 ['Web Development','code',['HTML','CSS','JavaScript','TypeScript','React','Next.js','Tailwind CSS']],
 ['Mobile & Games','phone',['Kotlin','Dart','Flutter','Unity','C#']],
 ['Backend & Data','database',['Node.js','Express','PHP','Python','PostgreSQL','MySQL']],
 ['Tools & Hardware','tools',['Git','GitHub','Cloudflare','Figma','Arduino']],
];
groups.forEach(([name,symbol,items],index)=>{
 const x=16+index*246;
 toolkit+=panel(x,49,232,99)+icon(symbol,x+14,62,22)+text(x+45,79,name,15,colors.ink,'font-weight="700"');
 items.forEach((name,number)=>{toolkit+=realTechLogo(name,x+17+number*(198/items.length),105,26,'brand');});
});
await save('reference-toolkit',160,'Real technology logos in their original brand colors',toolkit);

// Reference layout: a two-by-two project grid next to practical skills.
let projects=rope(26,20,678)+label('SELECTED PROJECTS','folder',14,3,300)+rope(26,738,245)+label('MY SKILLS','hat',722,3,215);
function projectBadge(index,x,y) {
 const drawings=[
  '<path d="M20 57C14 48 9 40 12 36c3-3 8 4 11 8V19c0-7 7-7 7 0v17V10c0-7 7-7 7 0v25V16c0-7 7-7 7 0v22-12c0-7 7-7 7 0v19c0 14-7 20-16 20-7 0-12-3-15-8Z" fill="#EDF1F7"/><path d="M12 68H52" stroke="#4582D5" stroke-width="3"/>',
  '<path d="M32 10C8 10 12 35 32 49 52 35 56 10 32 10Z" fill="#B51A2B" stroke="#FFA586" stroke-width="2"/><circle cx="32" cy="25" r="6" fill="#0C1728"/><path d="M7 54q12-10 24 0t24 0M7 64q12-10 24 0t24 0" fill="none" stroke="#62ADD7" stroke-width="4"/>',
  '<path d="M17 9H42L50 18V65H17Z" fill="none" stroke="#EDF1F7" stroke-width="3"/><path d="M13 15H9V70H43M25 26H43M25 35H43M25 44H43M25 53H39" fill="none" stroke="#EDF1F7" stroke-width="3"/>',
  '<path d="M8 16H17L24 53H51L57 27H20" fill="none" stroke="#FFD397" stroke-width="4" stroke-linecap="round"/><circle cx="29" cy="64" r="4" fill="#FFD397"/><circle cx="49" cy="64" r="4" fill="#FFD397"/><path d="M28 34H49M31 41H46" stroke="#FFA586" stroke-width="3"/>',
 ];
 return `<svg x="${x}" y="${y}" width="64" height="77" viewBox="0 0 64 77">${drawings[index]}</svg>`;
}
const work=[
 ['SigLa','phone',['A mobile sign language translator','for supported Filipino sign gestures.'],['Kotlin','Android'],'#242F49'],
 ['BAHAlerto','layers',['Flood maps, reports, alerts, and','vehicle passability guidance.'],['Flutter','Supabase'],'#242F49'],
 ['DocuLink','folder',['Document management tools','for organizing college records.'],['HTML','JavaScript','MySQL'],'#242F49'],
 ['InventoPOS','database',['Sales and inventory management','for stock and daily transactions.'],['React','CSS','MySQL'],'#541A2E'],
];
work.forEach(([name,symbol,lines,tags,tint],index)=>{
 const x=16+(index%2)*344; const y=49+Math.floor(index/2)*112;
 projects+=panel(x,y,332,101)+`<rect x="${x+10}" y="${y+12}" width="64" height="77" rx="12" fill="${tint}" stroke="#384358"/>`+projectBadge(index,x+10,y+12);
 projects+=text(x+87,y+25,name,18,colors.ink,'font-weight="700"');
 lines.forEach((line,lineIndex)=>{projects+=text(x+87,y+46+lineIndex*17,line,12);});
 let tagX=x+87;
 tags.forEach(tag=>{const width=tag.length*6+18;projects+=`<rect x="${tagX}" y="${y+76}" width="${width}" height="16" rx="8" fill="#384358"/>`+text(tagX+width/2,y+88,tag,10,colors.ink,'text-anchor="middle"');tagX+=width+6;});
});
projects+=panel(722,49,262,213);
const skills=['Web & Mobile Development','System Design','Database Management','UI/UX Implementation','API Integration','Problem Solving','Team Collaboration'];
skills.forEach((skill,index)=>{const y=74+index*25;projects+=`<path d="m738 ${y-5} 5 5 9-12" fill="none" stroke="#FFA586" stroke-width="3" stroke-linecap="round"/>`+text(762,y,skill,13);});
await save('reference-projects',276,'Selected projects and development skills',projects);

function languageDonut(x,y,title,counts,unit) {
 const sorted=Object.entries(counts).filter(([,count])=>count>0).sort((a,b)=>b[1]-a[1]);
 const list=sorted.length<=4?sorted:sorted.slice(0,3);if(sorted.length>4)list.push(['Other',sorted.slice(3).reduce((sum,[,value])=>sum+value,0)]);
 const total=list.reduce((sum,[,value])=>sum+value,0);const circumference=2*Math.PI*43;const shades=['#FFA586','#B51A2B','#384358','#7F8FA9'];
 let result=panel(x,y,314,157)+text(x+14,y+24,title,14,colors.ink,'font-weight="700"');let offset=0;
 list.forEach(([name,count],index)=>{const fraction=count/(total||1);result+=`<circle cx="${x+76}" cy="${y+92}" r="43" fill="none" stroke="${shades[index]}" stroke-width="14" stroke-dasharray="${fraction*circumference} ${circumference}" stroke-dashoffset="${-offset*circumference}" transform="rotate(-90 ${x+76} ${y+92})"/>`;offset+=fraction;result+=`<rect x="${x+143}" y="${y+53+index*22}" width="9" height="9" fill="${shades[index]}"/>`+text(x+160,y+62+index*22,name,11)+text(x+300,y+62+index*22,`${Math.round(fraction*100)}%`,11,colors.muted,'text-anchor="end"');});
 return result+text(x+76,y+92,total,24,colors.ink,'text-anchor="middle" font-weight="700"')+text(x+76,y+110,unit,11,colors.muted,'text-anchor="middle"');
}
let streak=0;let cursor=data.days.length-1;
if(data.days[cursor]?.count===0)cursor--;
while(cursor>=0&&data.days[cursor].count>0){streak++;cursor--;}
let longest=0,run=0;for(const day of data.days){run=day.count>0?run+1:0;longest=Math.max(longest,run);}
let analytics=rope(26)+label('GITHUB ANALYTICS','chart',14,3,300);
const totals=[['code',data.publicRepos,'Repositories'],['branch',data.authoredCommits,'Commits'],['layers',data.total,'Contributions'],['user',data.followers,'Followers']];
totals.forEach(([symbol,value,title],index)=>{
 const x=16+index*142;analytics+=panel(x,49,138,87)+icon(symbol,x+55,59,25)+text(x+69,105,value,23,colors.ink,'text-anchor="middle" font-weight="700"')+text(x+69,125,title,12,colors.muted,'text-anchor="middle"');
});
analytics+=panel(596,49,388,87)+text(613,74,'GitHub Streak',17,colors.ink,'font-weight="700"')+text(616,109,`${streak} ${streak===1?'Day':'Days'}`,32,colors.peach,'font-weight="700"')+text(802,94,'Current streak',12,colors.muted)+text(802,115,`Longest: ${longest} days`,12,colors.muted)+skull(940,93,.62,.12);
analytics+=panel(16,147,318,157)+text(31,172,'Contribution History',14,colors.ink,'font-weight="700"');
const months=new Map();for(const day of data.days)months.set(day.date.slice(0,7),(months.get(day.date.slice(0,7))||0)+day.count);
const entries=[...months];const max=Math.max(1,...entries.map(([,value])=>value));const points=entries.map(([,value],index)=>[36+index*278/Math.max(1,entries.length-1),274-value/max*78]);
const path=points.map(([x,y],index)=>`${index?'L':'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
analytics+=`<path d="${path}L314 274H36Z" fill="#B51A2B" fill-opacity=".6"/><path d="${path}" fill="none" stroke="#FFA586" stroke-width="3"/>`;
entries.forEach(([month],index)=>{const [x,y]=points[index];analytics+=`<circle cx="${x}" cy="${y}" r="2" fill="#FFA586"/>`;if(index%3===0)analytics+=text(x,293,new Date(`${month}-01T00:00:00Z`).toLocaleDateString('en-US',{month:'short',timeZone:'UTC'}),10,colors.muted,'text-anchor="middle"');});
const languageEntries=Object.entries(data.languageBytes).filter(([,bytes])=>bytes>0).sort((a,b)=>b[1]-a[1]);
const languageTotal=languageEntries.reduce((sum,[,bytes])=>sum+bytes,0);
const displayedLanguages=languageEntries.slice(0,4);
if(languageEntries.length>4)displayedLanguages.push(['Other',languageEntries.slice(4).reduce((sum,[,bytes])=>sum+bytes,0)]);
analytics+=panel(346,147,314,157)+text(360,171,'Most Used Languages',14,colors.ink,'font-weight="700"');
displayedLanguages.forEach(([name,bytes],index)=>{
 const percent=bytes/(languageTotal||1)*100;const y=195+index*22;
 analytics+=text(360,y,name,11)+`<rect x="439" y="${y-8}" width="161" height="7" rx="3.5" fill="#384358"/><rect class="motion-language" x="439" y="${y-8}" width="${Math.max(1,161*percent/100).toFixed(2)}" height="7" rx="3.5" fill="${index%2===0?'#FFA586':'#B51A2B'}"><title>${escape(name)}: ${bytes} code bytes (${percent.toFixed(1)}%)</title></rect>`+text(647,y,`${percent.toFixed(1)}%`,11,colors.muted,'text-anchor="end"');
});
analytics+=languageDonut(672,147,'Languages by Commit',data.commitLanguageCounts,'commits');
await save('dashboard-reference-usage',317,`GitHub analytics — ${data.updated}; languages measured by public code bytes; current streak ${streak} days`,analytics);

let calendar=panel(16,6,968,156)+icon('chart',30,18,20)+text(60,34,'CONTRIBUTION ACTIVITY',15,colors.ink,'font-weight="700"')+text(967,34,`${data.total} contributions in the last 365 days`,12,colors.muted,'text-anchor="end"');
const weekday=new Date(`${data.days[0].date}T00:00:00Z`).getUTCDay();const heat=['#242F49','#384358','#541A2E','#B51A2B','#FFA586'];let month='';
data.days.forEach((day,index)=>{const position=weekday+index;const col=Math.floor(position/7);const row=position%7;const x=63+col*15;const y=61+row*12;const next=day.date.slice(0,7);if(next!==month&&col<51){calendar+=text(x,53,new Date(`${day.date}T00:00:00Z`).toLocaleDateString('en-US',{month:'short',timeZone:'UTC'}),9,colors.muted);month=next;}calendar+=`<rect x="${x}" y="${y}" width="12" height="10" rx="1" fill="${heat[day.level]}"><title>${day.date}: ${day.count} contributions</title></rect>`;});
calendar+=text(856,145,'Less',9,colors.muted);heat.forEach((color,index)=>{calendar+=`<rect x="${882+index*12}" y="136" width="10" height="10" fill="${color}"/>`;});calendar+=text(949,145,'More',9,colors.muted);
await save('activity-reference',173,'GitHub contribution calendar; real daily counts',calendar);

let footer=rope(26,20,430)+label('ACHIEVEMENTS','chart',14,3,260)+rope(26,500,480)+label('GET IN TOUCH','mail',492,3,250);
const certificates=[['code','JavaScript','Essentials 1','Cisco · 2026'],['code','Python','Essentials 1','Cisco · 2026'],['server','AWS Cloud','Practitioner Essentials','Course completed · 2025']];
certificates.forEach(([symbol,first,second,issuer],index)=>{const x=16+index*142;footer+=panel(x,49,134,96,10)+icon(symbol,x+54,58,26)+text(x+67,104,first,13,colors.ink,'text-anchor="middle" font-weight="700"')+text(x+67,121,second,10,colors.ink,'text-anchor="middle"')+text(x+67,137,issuer,9,colors.muted,'text-anchor="middle"');});
footer+=text(20,165,'InventoPOS milestone: 100/100 academic project · UI/UX design',11,colors.muted);
const contact=[['mail','militantejuanenricodomanico@gmail.com'],['link','portfolio.juandomanicomilitante.workers.dev'],['link','linkedin.com/in/juan-domanico-militante-b0972b363']];
contact.forEach(([symbol,value],index)=>{footer+=icon(symbol,506,53+index*27,19)+text(537,68+index*27,value,12);});
footer+=`<circle cx="927" cy="115" r="64" fill="#FFA586"/><path d="M871 154Q895 153 912 139T972 116V179H871Z" fill="#0C1728"/><g fill="#0C1728" stroke="#0C1728" stroke-linecap="round">${[0,1,2,3,4].map(i=>{const x=882+i*15;const y=143-i*4;return `<circle cx="${x}" cy="${y-13}" r="3"/><path d="M${x} ${y-10}V${y+2}m0-8-4 6m4-6 4 6m-4 2-3 8m3-8 3 8" stroke-width="2.5"/>`;}).join('')}<path d="M938 112V65M917 100H967M940 67Q969 69 969 97H940Z" stroke-width="2"/><path d="M913 106H973L961 116H926Z"/></g>`;
footer+=text(500,193,`Updated ${data.updated} · Public GitHub data · One Piece inspired fan artwork`,10,colors.muted,'text-anchor="middle"');
await save('reference-footer',205,'Completed certifications, capstone milestone, and contact details',footer);
console.log(`Reference-matched profile generated; current streak: ${streak}, longest streak: ${longest}.`);
