/* =====================================================================
   CARDS — one entry per person.

   Open a specific card with ?c=<key> or #<key>, e.g.
     https://<user>.github.io/<repo>/?c=alejandro-castillo

   Images (photo, logo, background) accept a path inside this repo
   (e.g. "assets/alejandro-castillo/photo.jpg"), any URL, or a data: URI.
   ===================================================================== */
window.CARDS = {
  "alejandro-castillo": {
    person:  { name: "Alejandro Castillo", title: "Founder & Production Director", photo: "", initials: "AC" },
    company: { name: "Castillo Stage & Structures", short: "CS&S", tagline: "Stages · Truss · Scaffolding", logo: "" },
    pass:    { label: "ALL ACCESS", role: "Production", number: "CSS-0001", season: "Season 2026" },
    services: ["Concert stages", "Truss & rigging", "Scaffolding", "Political rallies", "Expos & fairs"],
    specs: [
      { k: "Stage decks",  v: "2×1 m · 750 kg/m²" },
      { k: "Truss spans",  v: "up to 18 m" },
      { k: "Tower height", v: "up to 12 m" }
    ],
    contacts: [ // type: phone | whatsapp | email | web | instagram | address | link (with href)
      { type: "phone",     label: "Call",      value: "+58 412 555 0147" },
      { type: "whatsapp",  label: "WhatsApp",  value: "+58 412 555 0147" },
      { type: "email",     label: "Email",     value: "alejandro@castillostage.com" },
      { type: "web",       label: "Website",   value: "castillostage.com" },
      { type: "instagram", label: "Instagram", value: "@castillostage" }
    ],
    theme: { accent: "#FFB547", accent2: "#FF5C8A", card: "#16151C", card2: "#201F28", ink: "#F2F1F6", steel: "#C7CAD1", stage: "#0B0A10" },
    display: "",                     // optional font for the name, e.g. "'Anton', Impact, sans-serif"
    background: { type: "stage" },   // { type:"stage" } | { type:"image", src:"assets/bg.jpg" } | { type:"gradient", value:"linear-gradient(...)" }
    saveContactButton: true          // shows a "Save contact" button that downloads a .vcf file
  }

  /* Add more people by copying the block above:
  , "maria-lopez": {
    person:  { name: "María López", title: "Event Manager", photo: "assets/maria-lopez/photo.jpg" },
    ...
  }
  */
};
