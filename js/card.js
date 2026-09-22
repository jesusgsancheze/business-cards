/* Card renderer — reads window.CARDS from js/cards.js. No edits needed here. */
const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));
const ICONS = {
  phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  whatsapp:'<path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.6-5.2A8.5 8.5 0 1 1 21 11.5z"/><path d="M9 9.5c.5 2.3 2.2 4 4.5 4.5l1-1.2 1.8.8"/>',
  email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  web:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>',
  address:'<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'
};
const svg = t => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[t] || ICONS.link}</svg>`;
function hrefFor(c){
  const digits = String(c.value).replace(/[^\d+]/g, "");
  switch (c.type) {
    case "phone": return "tel:" + digits;
    case "whatsapp": return "https://wa.me/" + digits.replace("+", "");
    case "email": return "mailto:" + c.value;
    case "web": return /^https?:/.test(c.value) ? c.value : "https://" + c.value;
    case "instagram": return "https://instagram.com/" + c.value.replace(/^@/, "");
    case "address": return "https://maps.google.com/?q=" + encodeURIComponent(c.value);
    default: return c.href || c.value;
  }
}
function vcard(cfg){
  const [first, ...rest] = cfg.person.name.split(" ");
  const L = ["BEGIN:VCARD","VERSION:3.0",`N:${rest.join(" ")};${first};;;`,`FN:${cfg.person.name}`,`ORG:${cfg.company.name}`,`TITLE:${cfg.person.title}`];
  cfg.contacts.forEach(c => {
    if (c.type === "phone") L.push(`TEL;TYPE=CELL:${c.value.replace(/\s/g,"")}`);
    if (c.type === "email") L.push(`EMAIL:${c.value}`);
    if (c.type === "web") L.push(`URL:${hrefFor(c)}`);
    if (c.type === "address") L.push(`ADR:;;${c.value};;;;`);
  });
  L.push("END:VCARD");
  return L.join("\n");
}
function barcode(seed){
  let h = 2166136261; for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  let out = ""; for (let i = 0; i < 34; i++){ h = Math.imul(h ^ (h >>> 13), 1274126177); out += `<i style="flex:${1 + ((h >>> 0) % 4)}"></i>`; }
  return out;
}

function render(key){
  const cfg = CARDS[key];
  const root = document.documentElement.style, t = cfg.theme || {};
  const map = { accent:"--accent", accent2:"--accent-2", card:"--card", card2:"--card-2", ink:"--ink", steel:"--steel", stage:"--stage" };
  for (const k in map) if (t[k]) root.setProperty(map[k], t[k]);
  if (cfg.display) root.setProperty("--display", cfg.display);

  const stage = $("stage"), bg = cfg.background || { type: "stage" };
  stage.dataset.bg = bg.type;
  stage.style.background = bg.type === "image" ? `center/cover no-repeat url("${bg.src}"), var(--stage)` : bg.type === "gradient" ? bg.value : "";

  $("passLabel").textContent = cfg.pass.label;
  $("passSeason").textContent = cfg.pass.season;
  $("passRole").textContent = cfg.pass.role;
  $("sealText").textContent = cfg.company.short;
  const initials = cfg.person.initials || cfg.person.name.split(" ").map(w => w[0]).slice(0,2).join("");
  $("photo").innerHTML = cfg.person.photo ? `<img src="${esc(cfg.person.photo)}" alt="${esc(cfg.person.name)}">` : `<div class="mono" aria-hidden="true">${esc(initials)}</div>`;
  $("name").textContent = cfg.person.name;
  $("title").textContent = cfg.person.title;
  $("company").textContent = cfg.company.name;
  $("services").innerHTML = (cfg.services || []).map(s => `<li>${esc(s)}</li>`).join("");
  $("barcode").innerHTML = barcode(cfg.pass.number + cfg.person.name);
  $("passNo").textContent = "Nº " + cfg.pass.number;

  $("logo").innerHTML = cfg.company.logo ? `<img src="${esc(cfg.company.logo)}" alt="${esc(cfg.company.name)}">` : esc(cfg.company.short);
  $("tagline").textContent = cfg.company.tagline;
  $("contacts").innerHTML = cfg.contacts.map((c, i) => `
    <li><a href="${esc(hrefFor(c))}" target="_blank" rel="noopener">
      <span class="ico">${svg(c.type)}</span>
      <span class="ct"><span class="cl">${esc(c.label)}</span><span class="cv" id="cv${i}">${esc(c.value)}</span></span>
    </a><button class="copy" type="button" data-i="${i}" aria-label="Copy ${esc(c.label)}">Copy</button></li>`).join("");
  $("specs").innerHTML = (cfg.specs || []).map(s => `<div><dt>${esc(s.k)}</dt><dd>${esc(s.v)}</dd></div>`).join("");

  const qr = $("qr"); qr.innerHTML = "";
  if (window.QRCode) new QRCode(qr, { text: vcard(cfg), width: 256, height: 256, colorDark: "#111014", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.M });
  else qr.innerHTML = '<div style="font:600 10px var(--mono);color:#111;display:grid;place-items:center;height:100%">QR</div>';

  $("saveBtn").hidden = !cfg.saveContactButton;
  $("saveBtn").onclick = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([vcard(cfg)], { type: "text/vcard" }));
    a.download = cfg.person.name.replace(/\s+/g, "-") + ".vcf"; a.click();
  };
  $("contacts").onclick = async e => {
    const b = e.target.closest(".copy"); if (!b) return;
    const val = cfg.contacts[b.dataset.i].value;
    try { await navigator.clipboard.writeText(val); b.textContent = "Copied"; b.classList.add("done"); }
    catch { const r = document.createRange(); r.selectNodeContents($("cv" + b.dataset.i)); getSelection().removeAllRanges(); getSelection().addRange(r); b.textContent = "Selected"; }
    setTimeout(() => { b.textContent = "Copy"; b.classList.remove("done"); }, 1600);
  };
  document.title = cfg.person.name + " · " + cfg.company.name;
}

/* ---------- Picker + routing ---------- */
const CARDS = window.CARDS || {};
const keys = Object.keys(CARDS);
const wanted = new URLSearchParams(location.search).get("c") || location.hash.slice(1);
const initial = CARDS[wanted] ? wanted : keys[0];
if (keys.length > 1) {
  const p = $("picker"); p.hidden = false;
  p.innerHTML = keys.map(k => `<option value="${k}">${esc(CARDS[k].person.name)}</option>`).join("");
  p.value = initial; p.onchange = () => { render(p.value); try { history.replaceState(null, "", "#" + p.value); } catch {} };
}
render(initial);

/* ---------- Motion: tilt, gyro, flip ---------- */
const card = $("card"), front = $("front"), back = $("back"), flipBtn = $("flipBtn");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const s = { tx: 0, ty: 0, x: 0, y: 0, flip: 0, flipT: 0, active: false, t: 0 };
let down = null;

function aim(clientX, clientY){
  const r = card.getBoundingClientRect();
  s.tx = Math.max(-1, Math.min(1, (clientX - (r.left + r.width / 2)) / (r.width * .7)));
  s.ty = Math.max(-1, Math.min(1, (clientY - (r.top + r.height / 2)) / (r.height * .7)));
  s.active = true;
}
document.addEventListener("pointermove", e => { if (e.pointerType === "mouse" || down) aim(e.clientX, e.clientY); });
document.addEventListener("pointerleave", () => { s.active = false; s.tx = s.ty = 0; });
card.addEventListener("pointerdown", e => { down = { x: e.clientX, y: e.clientY }; askGyro(); });
window.addEventListener("pointerup", e => {
  if (!down) return;
  const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y) > 8;
  const onControl = e.target.closest && e.target.closest("a,button");
  if (!moved && !onControl && card.contains(e.target)) flip();
  down = null; if (e.pointerType !== "mouse") { s.active = false; s.tx = s.ty = 0; }
});
card.addEventListener("keydown", e => { if ((e.key === "Enter" || e.key === " ") && e.target === card) { e.preventDefault(); flip(); } });
flipBtn.addEventListener("click", () => { askGyro(); flip(); });

function flip(){
  s.flipT = s.flipT ? 0 : 180;
  const showingBack = !!s.flipT;
  flipBtn.setAttribute("aria-pressed", showingBack);
  flipBtn.textContent = showingBack ? "Show front" : "Flip card";
  front.classList.toggle("inactive", showingBack); front.setAttribute("aria-hidden", showingBack);
  back.classList.toggle("inactive", !showingBack); back.setAttribute("aria-hidden", !showingBack);
}

let gyroAsked = false;
function askGyro(){
  if (gyroAsked) return; gyroAsked = true;
  const on = () => window.addEventListener("deviceorientation", e => {
    if (e.gamma == null || down) return;
    s.tx = Math.max(-1, Math.min(1, e.gamma / 25));
    s.ty = Math.max(-1, Math.min(1, (e.beta - 50) / 25));
    s.active = true;
  });
  try {
    if (typeof DeviceOrientationEvent !== "undefined" && DeviceOrientationEvent.requestPermission)
      DeviceOrientationEvent.requestPermission().then(r => r === "granted" && on()).catch(() => {});
    else on();
  } catch {}
}

function tick(now){
  s.t = now / 1000;
  let gx = s.tx, gy = s.ty;
  if (!s.active && !reduce) { gx = Math.sin(s.t * .6) * .35; gy = Math.cos(s.t * .45) * .2; } // idle drift under the lights
  s.x += (gx - s.x) * .09; s.y += (gy - s.y) * .09;
  s.flip += (s.flipT - s.flip) * (reduce ? 1 : .11);
  const mirror = s.flip > 90 ? -1 : 1;
  const angle = ((s.x * 18 + s.flip) % 360 + 360) % 360;
  const backFacing = angle > 90 && angle < 270;
  if (backFacing !== s.backFacing) {
    s.backFacing = backFacing;
    front.classList.toggle("away", backFacing);
    back.classList.toggle("away", !backFacing);
  }
  card.style.transform = `rotateX(${(-s.y * 13).toFixed(2)}deg) rotateY(${(s.x * 18 + s.flip).toFixed(2)}deg)`;
  const st = document.documentElement.style;
  st.setProperty("--mx", (50 + s.x * 50 * mirror).toFixed(1) + "%");
  st.setProperty("--my", (50 + s.y * 50).toFixed(1) + "%");
  st.setProperty("--ang", (s.x * 140 + s.y * 60).toFixed(1) + "deg");
  st.setProperty("--foil", Math.min(1, Math.hypot(s.x, s.y)).toFixed(2));
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
