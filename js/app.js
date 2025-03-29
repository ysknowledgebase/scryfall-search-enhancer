// CONFIG object – includes formats, original color scheme, types, and rarities.
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

// EXPANSIONS_DATA – full expansions from your original code.
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

// On DOMContentLoaded, attach event listeners and build UI
document.addEventListener("DOMContentLoaded", function(){
  // Set up color buttons using original color scheme
  document.querySelectorAll(".color-btn").forEach(btn => {
    let color = btn.getAttribute("data-color");
    btn.style.backgroundColor = "#f8f9fa";
    btn.style.color = "#000";
    btn.addEventListener("click", function(){
      let checkbox = document.querySelector(`input[name="color[]"][value="${color}"]`);
      // Enforce mutually exclusive selection between any color and colorless ("C")
      if(color === "C" && checkbox.checked === false) {
        // If colorless is being selected, unselect any others
        document.querySelectorAll('input[name="color[]"]').forEach(chk => {
          if(chk.value !== "C") {
            chk.checked = false;
            let otherBtn = document.querySelector(`.color-btn[data-color="${chk.value}"]`);
            if(otherBtn) {
              otherBtn.style.backgroundColor = "#f8f9fa";
              otherBtn.style.color = "#000";
              otherBtn.classList.remove("selected");
            }
          }
        });
      } else if(color !== "C" && document.querySelector('input[name="color[]"][value="C"]').checked) {
        // If selecting a colored option while colorless is selected, unselect colorless
        let colorlessChk = document.querySelector('input[name="color[]"][value="C"]');
        colorlessChk.checked = false;
        let colorlessBtn = document.querySelector('.color-btn[data-color="C"]');
        if(colorlessBtn) {
          colorlessBtn.style.backgroundColor = "#f8f9fa";
          colorlessBtn.style.color = "#000";
          colorlessBtn.classList.remove("selected");
        }
      }
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
  
  // Type buttons toggle with border cues (simulate original style)
  document.querySelectorAll(".type-btn").forEach(btn => {
    btn.addEventListener("click", function(){
      let type = btn.getAttribute("data-type");
      let checkbox = document.querySelector(`input[name="type[]"][value="${type}"]`);
      checkbox.checked = !checkbox.checked;
      btn.classList.toggle("selected", checkbox.checked);
      // You can add additional border styling here if needed.
    });
  });
  
  // Rarity buttons toggle with border cues
  document.querySelectorAll(".rarity-btn").forEach(btn => {
    btn.addEventListener("click", function(){
      let rarity = btn.getAttribute("data-rarity");
      let checkbox = document.querySelector(`input[name="rarity[]"][value="${rarity}"]`);
      checkbox.checked = !checkbox.checked;
      btn.classList.toggle("selected", checkbox.checked);
    });
  });
  
  // Build Expansions UI (expanded by default)
  buildExpansionsToggles();
  
  // Clear buttons for selectors
  document.getElementById("clearFormat").addEventListener("click", function(){
    document.getElementById("format_selector").value = "";
  });
  document.getElementById("clearColor").addEventListener("click", function(){
    document.querySelectorAll('input[name="color[]"]').forEach(chk => {
      chk.checked = false;
    });
    document.querySelectorAll(".color-btn").forEach(btn => {
      btn.style.backgroundColor = "#f8f9fa";
      btn.style.color = "#000";
      btn.classList.remove("selected");
    });
  });
  document.getElementById("clearType").addEventListener("click", function(){
    document.querySelectorAll('input[name="type[]"]').forEach(chk => { chk.checked = false; });
    document.querySelectorAll(".type-btn").forEach(btn => { btn.classList.remove("selected"); });
  });
  document.getElementById("clearRarity").addEventListener("click", function(){
    document.querySelectorAll('input[name="rarity[]"]').forEach(chk => { chk.checked = false; });
    document.querySelectorAll(".rarity-btn").forEach(btn => { btn.classList.remove("selected"); });
  });
  document.getElementById("clearOracle").addEventListener("click", function(){
    document.getElementById("oracle").value = "";
  });
  
  // Action buttons
  document.getElementById("searchButton").addEventListener("click", performSearch);
  document.getElementById("searchFrontierButton").addEventListener("click", function(){
    document.getElementById("format_selector").value = "frontier";
    performSearch();
  });
  document.getElementById("clearAllButton").addEventListener("click", clearForm);
  
  // Preset management
  document.getElementById("savePresetButton").addEventListener("click", savePreset);
  document.getElementById("presetDropdown").addEventListener("change", loadPreset);
  document.getElementById("deletePresetButton").addEventListener("click", deletePreset);
  document.getElementById("exportPresetButton").addEventListener("click", exportPresets);
  document.getElementById("importPresetButton").addEventListener("click", function(){
    document.getElementById("importFile").click();
  });
  document.getElementById("importFile").addEventListener("change", importPresetsFromFile);
  
  updatePresetDropdown();
});

// Build Expansions UI from EXPANSIONS_DATA – groups are uncollapsed by default.
function buildExpansionsToggles() {
  const container = document.getElementById("expansionsContainer");
  container.innerHTML = "";
  
  // For each group in common, typesExpansions, abilitiesExpansions, build a labeled section.
  // Common group:
  let commonHeader = document.createElement("div");
  commonHeader.className = "expansion-header";
  commonHeader.textContent = "Common";
  commonHeader.addEventListener("click", function(){
    let content = commonHeader.nextElementSibling;
    content.style.display = (content.style.display === "none") ? "flex" : "none";
  });
  container.appendChild(commonHeader);
  const commonRow = document.createElement("div");
  commonRow.className = "expansion-group";
  EXPANSIONS_DATA.common.forEach(row => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "expansion-row";
    row.forEach(item => {
      const btn = document.createElement("button");
      btn.className = "expansion-btn";
      btn.textContent = item.label;
      btn.addEventListener("click", function(){
        if (!item.expansions) {
          toggleQuotes();
        } else {
          expansionsClick(item.expansions);
        }
      });
      rowDiv.appendChild(btn);
    });
    commonRow.appendChild(rowDiv);
  });
  container.appendChild(commonRow);
  
  // Types group:
  let typesHeader = document.createElement("div");
  typesHeader.className = "expansion-header";
  typesHeader.textContent = "Types";
  typesHeader.addEventListener("click", function(){
    let content = typesHeader.nextElementSibling;
    content.style.display = (content.style.display === "none") ? "flex" : "none";
  });
  container.appendChild(typesHeader);
  const typesRow = document.createElement("div");
  typesRow.className = "expansion-group";
  EXPANSIONS_DATA.typesExpansions.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "expansion-btn";
    btn.textContent = item.label;
    btn.addEventListener("click", function(){
      if (!item.expansions) {
        toggleQuotes();
      } else {
        expansionsClick(item.expansions);
      }
    });
    typesRow.appendChild(btn);
  });
  container.appendChild(typesRow);
  
  // Abilities group:
  let abilitiesHeader = document.createElement("div");
  abilitiesHeader.className = "expansion-header";
  abilitiesHeader.textContent = "Abilities";
  abilitiesHeader.addEventListener("click", function(){
    let content = abilitiesHeader.nextElementSibling;
    content.style.display = (content.style.display === "none") ? "flex" : "none";
  });
  container.appendChild(abilitiesHeader);
  const abilitiesRow = document.createElement("div");
  abilitiesRow.className = "expansion-group";
  EXPANSIONS_DATA.abilitiesExpansions.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "expansion-btn";
    btn.textContent = item.label;
    btn.addEventListener("click", function(){
      if (!item.expansions) {
        toggleQuotes();
      } else {
        expansionsClick(item.expansions);
      }
    });
    abilitiesRow.appendChild(btn);
  });
  container.appendChild(abilitiesRow);
  
  // Clear Expansions button
  const clearBtn = document.createElement("button");
  clearBtn.className = "expansion-clear-btn";
  clearBtn.textContent = "Clear Expansions";
  clearBtn.addEventListener("click", function(){
    document.getElementById("oracle").value = "";
    expansionsInserted.clear();
    expansionsCycleIdx.clear();
    quotesInserted = false;
  });
  container.appendChild(clearBtn);
}

// Expansions handling functions
function expansionsClick(arr) {
  if(arr.length === 1) {
    toggleExpansion(arr[0]);
  } else {
    multiCycleExp(arr);
  }
}
function toggleExpansion(token) {
  const oracle = document.getElementById("oracle");
  if (!oracle) return;
  const inserted = expansionsInserted.get(token) || false;
  if (!inserted) {
    if (oracle.value && !oracle.value.endsWith(" ")) oracle.value += " ";
    oracle.value += token;
    expansionsInserted.set(token, true);
  } else {
    removeLastOccurrence(oracle, token);
    expansionsInserted.set(token, false);
  }
}
function multiCycleExp(arr) {
  const key = arr[0];
  let idx = expansionsCycleIdx.get(key) || 0;
  const oracle = document.getElementById("oracle");
  if (!oracle) return;
  if (idx < arr.length) {
    if (idx === 0) {
      if (oracle.value && !oracle.value.endsWith(" ")) oracle.value += " ";
      oracle.value += arr[0];
      expansionsCycleIdx.set(key, 1);
    } else {
      removeLastOccurrence(oracle, arr[idx - 1]);
      if (oracle.value && !oracle.value.endsWith(" ")) oracle.value += " ";
      oracle.value += arr[idx];
      idx++;
      if (idx === arr.length) {
        expansionsCycleIdx.set(key, arr.length);
