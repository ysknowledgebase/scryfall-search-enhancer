// CONFIG object – includes original formats and color scheme details.
const CONFIG = {
  formatData: {
    formats: [
      { value: "", text: "Select Format", color: "#007bff", sets: null },
      { value: "standard", text: "Standard", color: "blue", sets: null },
      { value: "futureStandard", text: "Future Standard", color: "green", sets: ["dsk", "blb", "otj", "big", "mkm", "lci", "woe", "fdn", "dft"] },
      { value: "frontier", text: "Frontier", color: "purple", sets: ["dsk", "blb", "otj", "big", "mkm", "fdn", "dft"] },
      { value: "fdn", text: "FDN", color: "orange", sets: ["fdn"] },
      { value: "dft", text: "DFT", color: "brown", sets: ["dft"] }
    ]
  },
  colorData: [
    { val: "W", icon: "{W}", color: "#ffd966", textColor: "#000" },
    { val: "U", icon: "{U}", color: "#1e90ff", textColor: "#fff" },
    { val: "B", icon: "{B}", color: "#000", textColor: "#fff" },
    { val: "R", icon: "{R}", color: "#ff4500", textColor: "#fff" },
    { val: "G", icon: "{G}", color: "#228b22", textColor: "#fff" },
    { val: "C", icon: "{C}", color: "#808080", textColor: "#fff" }
  ],
  typeList: [
    { label: "AR", val: "artifact" },
    { label: "EN", val: "enchantment" },
    { label: "AU", val: "aura" },
    { label: "CR", val: "creature" },
    { label: "SR", val: "sorcery" },
    { label: "IN", val: "instant" },
    { label: "EQ", val: "equipment" },
    { label: "LD", val: "land" },
    { label: "PW", val: "planeswalker" }
  ],
  rarities: [
    { label: "C", full: "common" },
    { label: "U", full: "uncommon" },
    { label: "R", full: "rare" },
    { label: "M", full: "mythic" }
  ]
};

// EXPANSIONS_DATA as provided
const EXPANSIONS_DATA = {
  common: [
    [
      { label: "tgt", expansions: ["target"] },
      { label: "Whev", expansions: ["whenever"] },
      { label: "each", expansions: ["each"] },
      { label: "all", expansions: ["all"] }
    ],
    [
      { label: "opp", expansions: ["opponent"] },
      { label: "plr", expansions: ["player"] },
      { label: "BF", expansions: ["battlefield"] },
      { label: "GrY", expansions: ["graveyard"] },
      { label: "LB", expansions: ["library", "libraries"] },
      { label: "hand", expansions: ["hand"] },
      { label: "life", expansions: ["life"] },
      { label: "perm", expansions: ["permanent"] },
      { label: "NC", expansions: ["noncreature"] },
      { label: "spell", expansions: ["spell"] },
      { label: "~", expansions: ["~"] },
      { label: "Tkn", expansions: ["token"] },
      { label: "Cnt", expansions: ["counter"] },
      { label: "mana", expansions: ["mana"] },
      { label: "pwr", expansions: ["power"] },
      { label: "tgh", expansions: ["toughness"] }
    ],
    [
      { label: "cyc", expansions: ["cycle"] },
      { label: "mil", expansions: ["mill"] },
      { label: "lev", expansions: ["leave"] },
      { label: "atk", expansions: ["attack"] },
      { label: "blk", expansions: ["block"] },
      { label: "dsd", expansions: ["descend"] },
      { label: "pay", expansions: ["pay"] },
      { label: "dst", expansions: ["destroy"] },
      { label: "DC", expansions: ["discard"] },
      { label: "EX", expansions: ["exile"] },
      { label: "sac", expansions: ["sacrifice"] },
      { label: "dmg", expansions: ["damage"] },
      { label: "lose", expansions: ["lose", "lost"] },
      { label: "gain", expansions: ["gain"] },
      { label: "draw", expansions: ["draw"] },
      { label: "die", expansions: ["die", "died"] },
      { label: "rtn", expansions: ["return"] },
      { label: "cast", expansions: ["cast"] },
      { label: "play", expansions: ["play"] },
      { label: "add", expansions: ["add"] },
      { label: "tap", expansions: ["tap"] }
    ],
    [
      { label: "ACT", expansions: ['": "'] },
      { label: "EB", expansions: ["enter battlefield", "enters", "enters the battlefield", "entered"] },
      { label: "+1", expansions: ["+1/+1"] },
      { label: "\"\"", expansions: undefined },
      { label: "you", expansions: ["you"] },
      { label: "ctrl", expansions: ["control"] },
      { label: "x", expansions: [' " x " '] }
    ]
  ],
  typesExpansions: [
    { label: "Art", expansions: ["artifact"] },
    { label: "Ench", expansions: ["enchantment"] },
    { label: "Aura", expansions: ["aura"] },
    { label: "Creat", expansions: ["creature"] },
    { label: "Sorc", expansions: ["sorcery"] },
    { label: "Inst", expansions: ["instant"] },
    { label: "Eqp", expansions: ["equipment"] },
    { label: "Land", expansions: ["land"] },
    { label: "PW", expansions: ["planeswalker"] }
  ],
  abilitiesExpansions: [
    { label: "Deathtouch", expansions: ["deathtouch"] },
    { label: "Defender", expansions: ["defender"] },
    { label: "Double Strike", expansions: ["double strike"] },
    { label: "Equip", expansions: ["equip"] },
    { label: "First Strike", expansions: ["first strike"] },
    { label: "Flash", expansions: ["flash"] },
    { label: "Flying", expansions: ["flying"] },
    { label: "Haste", expansions: ["haste"] },
    { label: "Hexproof", expansions: ["hexproof"] },
    { label: "Indestructible", expansions: ["indestructible"] },
    { label: "Lifelink", expansions: ["lifelink"] },
    { label: "Protection", expansions: ["protection"] },
    { label: "Reach", expansions: ["reach"] },
    { label: "Trample", expansions: ["trample"] },
    { label: "Vigilance", expansions: ["vigilance"] },
    { label: "Shadow", expansions: ["shadow"] },
    { label: "Cycling", expansions: ["cycling"] },
    { label: "Kicker", expansions: ["kicker"] },
    { label: "Flashback", expansions: ["flashback"] },
    { label: "Affinity", expansions: ["affinity"] },
    { label: "Ninjutsu", expansions: ["ninjutsu"] },
    { label: "Convoke", expansions: ["convoke"] },
    { label: "Suspend", expansions: ["suspend"] },
    { label: "Hideaway", expansions: ["hideaway"] },
    { label: "Wither", expansions: ["wither"] },
    { label: "Unearth", expansions: ["unearth"] },
    { label: "Level", expansions: ["level"] },
    { label: "Infect", expansions: ["infect"] },
    { label: "Undying", expansions: ["undying"] },
    { label: "Menace", expansions: ["menace"] },
    { label: "Prowess", expansions: ["prowess"] },
    { label: "Crew", expansions: ["crew"] }
  ]
};

// Global variables for expansions logic
let expansionsInserted = new Map();
let expansionsCycleIdx = new Map();
let quotesInserted = false;

// Attach event listeners on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function(){
  // Set up color buttons with proper color scheme
  document.querySelectorAll(".color-btn").forEach(btn => {
    let color = btn.getAttribute("data-color");
    btn.style.backgroundColor = "#f8f9fa";
    btn.style.color = "#000";
    btn.addEventListener("click", function(){
      let checkbox = document.querySelector(`input[name="color[]"][value="${color}"]`);
      checkbox.checked = !checkbox.checked;
      if(checkbox.checked){
        let cfg = CONFIG.colorData.find(c => c.val === color);
        btn.style.backgroundColor = cfg.color;
        btn.style.color = cfg.textColor;
        btn.classList.add("selected");
      } else {
        btn.style.backgroundColor = "#f8f9fa";
        btn.style.color = "#000";
        btn.classList.remove("selected");
      }
    });
  });
  
  // Type buttons toggle
  document.querySelectorAll(".type-btn").forEach(btn => {
    btn.addEventListener("click", function(){
      let type = btn.getAttribute("data-type");
      let checkbox = document.querySelector(`input[name="type[]"][value="${type}"]`);
      checkbox.checked = !checkbox.checked;
      btn.classList.toggle("selected", checkbox.checked);
    });
  });
  
  // Rarity buttons toggle
  document.querySelectorAll(".rarity-btn").forEach(btn => {
    btn.addEventListener("click", function(){
      let rarity = btn.getAttribute("data-rarity");
      let checkbox = document.querySelector(`input[name="rarity[]"][value="${rarity}"]`);
      checkbox.checked = !checkbox.checked;
      btn.classList.toggle("selected", checkbox.checked);
    });
  });
  
  // Build Expansions UI
  buildExpansionsToggles();
  
  // Action buttons
  document.getElementById("searchButton").addEventListener("click", performSearch
