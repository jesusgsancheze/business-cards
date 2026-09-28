/* =====================================================================
   CARDS — one entry per person.

   Open a card with ?c=<key>, and pick the language with &lang=es|en:
     https://business-cards-b6lq.onrender.com/?c=alejandro-castillo            (Spanish, default)
     https://business-cards-b6lq.onrender.com/?c=alejandro-castillo&lang=en    (English)

   Any text field can be a plain string (same in both languages) or
   { es: "…", en: "…" } for a translated version.

   Images (photo, logo, background) accept a path inside this repo
   (e.g. "assets/alejandro-castillo/photo.jpg"), any URL, or a data: URI.
   ===================================================================== */
window.CARDS = {
  "alejandro-castillo": {
    defaultLang: "es",
    person:  {
      name: "Alejandro Castillo",
      title: { es: "Fundador y Director", en: "Founder & Director" },
      photo: "",          // e.g. "assets/alejandro-castillo/photo.jpg" — empty shows the initials
      initials: "AC"
    },
    company: {
      name: "Sidney Producciones",
      tagline: { es: "Tarimas · Truss · Andamios", en: "Stages · Truss · Scaffolding" },
      logo: "",           // optional logo image for the back of the card
      seal: { ring: "SIDNEY PRODUCCIONES", center: "SP" }   // the holographic circle on the front
    },
    pass: {
      label: "ALL ACCESS",
      number: "SP-0001",
      season: { es: "Temporada 2026", en: "Season 2026" }
    },
    contacts: [ // type: phone | whatsapp | email | web | instagram | address | link (with href). label is optional.
      { type: "phone",    value: "+58 414 216 1030" },
      { type: "whatsapp", value: "+58 414 216 1030" },
      { type: "email",    value: "acastillo@sidneyproducciones.com" },
      { type: "web",      value: "sidneyproducciones.com" }
    ],
    specs: [],            // optional { k, v } pairs shown on the back, e.g. { k: { es: "Tarimas", en: "Stage decks" }, v: "2×1 m" }
    theme: { accent: "#FFB547", accent2: "#FF5C8A", card: "#16151C", card2: "#201F28", ink: "#F2F1F6", steel: "#C7CAD1", stage: "#0B0A10" },
    display: "",                     // optional font for the name, e.g. "'Anton', Impact, sans-serif"
    background: { type: "stage" },   // { type:"stage" } | { type:"image", src:"assets/bg.jpg" } | { type:"gradient", value:"linear-gradient(...)" }
    saveContactButton: true          // shows a "Save contact" button that downloads a .vcf file
  }

  /* Add more people by copying the block above:
  , "maria-lopez": {
    person:  { name: "María López", title: { es: "Gerente de Eventos", en: "Event Manager" }, photo: "assets/maria-lopez/photo.jpg" },
    ...
  }
  */
};
