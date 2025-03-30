/* Version 0.5.12 */
// CONFIG object – includes formats, original color scheme, types, and rarities.
const CONFIG = {
  formatData: {
    formats: [
      { value: "", text: "Select Format", color: "#007bff", sets: null },
      { value: "standard", text: "Standard", color: "blue", sets: null },
      { value: "futureStandard", text: "Future Standard", color: "green", sets: ["dsk", "blb", "otj", "big", "mkm", "lci", "woe", "fdn", "dft", "tdm"] },
      { value: "frontier", text: "Frontier", color: "purple", sets: ["dsk", "blb", "otj", "big", "mkm", "fdn", "dft", "tdm"] },
      { value: "fdn", text: "FDN", color: "orange", sets: ["fdn"] },
      { value: "dft", text: "DFT", color: "brown", sets: ["dft"] },
      { value: "tdm", text: "TDM", color: "#8a2be2", sets: ["tdm"] }
    ]
  },
  colorData: [
    { val: "W", icon: "assets/white.svg", color: "#ffd966", textColor: "#000" },
    { val: "U", icon: "assets/blue.svg", color: "#1e90ff", textColor: "#fff" },
    { val: "B", icon: "assets/black.svg", color: "#000", textColor: "#fff" },
    { val: "R", icon: "assets/red.svg", color: "#ff4500", textColor: "#fff" },
    { val: "G", icon: "assets/green.svg", color: "#228b22", textColor: "#fff" },
    { val: "C", icon: "assets/colorless.svg", color: "#808080", textColor: "#fff" }
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
    { label: "C", full: "common", color: "#007bff" },
    { label: "U", full: "uncommon", color: "#28a745" },
    { label: "R", full: "rare", color: "#ffc107" },
    { label: "M", full: "mythic", color: "#dc3545" }
  ]
};

// EXPANSIONS_DATA – full expansions data.
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

// Global variables for expansions handling.
let expansionsInserted = new Map();
let expansionsCycleIdx = new Map();
let quotesInserted = false;

// Autosave: Save current search state as an autosave preset (cycling autosave_1, autosave_2, autosave_3).
function autoSaveSearch(){
  const settings = getSearchSettings();
  const wrapper = { timestamp: Date.now(), settings: settings };
  // Cycle autosave keys.
  if(localStorage.getItem("autosave_3")){
    localStorage.removeItem("autosave_3");
  }
  if(localStorage.getItem("autosave_2")){
    localStorage.setItem("autosave_3", localStorage.getItem("autosave_2"));
    localStorage.removeItem("autosave_2");
  }
  if(localStorage.getItem("autosave_1")){
    localStorage.setItem("autosave_2", localStorage.getItem("autosave_1"));
    localStorage.removeItem("autosave_1");
  }
  localStorage.setItem("autosave_1", JSON.stringify(wrapper));
  updatePresetDropdown();
}

// getSearchSettings: Gather current search state.
function getSearchSettings(){
  let format = document.getElementById("format_selector").value;
  let colors = Array.from(document.querySelectorAll('input[name="color[]"]:checked')).map(el => el.value);
  let types = [];
  let partial = (document.getElementById("typePartialToggle").textContent.trim() === "≈");
  document.querySelectorAll(".type-btn").forEach(btn => {
    let state = btn.dataset.state;
    let type = btn.getAttribute("data-type");
    if(state !== "default"){
      types.push({ type: type, state: state });
    }
  });
  let rarities = Array.from(document.querySelectorAll('input[name="rarity[]"]:checked')).map(el => el.value);
  let oracle = document.getElementById("oracle").value.trim();
  // Compute jump URL using performSearch logic.
  let queryParts = [];
  if(format){
    let fmtObj = CONFIG.formatData.formats.find(f => f.value === format);
    if(fmtObj && fmtObj.sets){
      let clause = "(" + fmtObj.sets.map(s => "set:" + s).join(" OR ") + ")";
      queryParts.push(clause);
    } else {
      queryParts.push("is:" + format);
    }
  }
  if(colors.length > 0){
    let colorToggle = document.getElementById("colorToggle").textContent.trim();
    queryParts.push((colorToggle === "Exactly" ? "c=" : "c<=") + colors.join(""));
  }
  // For types, if partial toggle is active, group included types.
  if(partial){
    let included = [];
    document.querySelectorAll(".type-btn").forEach(btn => {
      if(btn.dataset.state === "include"){
        included.push("type:" + btn.getAttribute("data-type"));
      }
    });
    if(included.length > 0){
      queryParts.push("(" + included.join(" OR ") + ")");
    }
  } else {
    document.querySelectorAll(".type-btn").forEach(btn => {
      let state = btn.dataset.state;
      let type = btn.getAttribute("data-type");
      if(state === "include"){
        queryParts.push("t:" + type);
      } else if(state === "exclude"){
        queryParts.push("-t:" + type);
      }
    });
  }
  if(rarities.length > 0){
    const rarityMap = {"C": "common", "U": "uncommon", "R": "rare", "M": "mythic"};
    rarities.forEach(r => { if(rarityMap[r]) queryParts.push("r:" + rarityMap[r]); });
  }
  if(oracle){
    queryParts.push("oracle:" + oracle);
    queryParts.push("(game:paper)");
  }
  let url = "https://scryfall.com/search?as=grid&order=name&q=" + encodeURIComponent(queryParts.join(" "));
  return {
    format: format,
    colors: colors,
    types: types,
    rarities: rarities,
    oracle: oracle,
    url: url
  };
}

// On DOMContentLoaded.
document.addEventListener("DOMContentLoaded", function(){
  // --- Color Buttons ---
  document.querySelectorAll(".color-btn").forEach(btn => {
    let color = btn.getAttribute("data-color");
    btn.style.backgroundColor = "#f8f9fa";
    btn.style.color = "#000";
    let cfg = CONFIG.colorData.find(c => c.val === color);
    if(cfg){
      btn.innerHTML = `<img src="${cfg.icon}" alt="${color}" class="mana-icon">`;
    }
    btn.addEventListener("click", function(){
      let checkbox = document.querySelector(`input[name="color[]"][value="${color}"]`);
      if(color === "C" && !checkbox.checked) {
        document.querySelectorAll('input[name="color[]"]').forEach(chk => {
          if(chk.value !== "C"){
            chk.checked = false;
            let otherBtn = document.querySelector(`.color-btn[data-color="${chk.value}"]`);
            if(otherBtn){
              otherBtn.style.backgroundColor = "#f8f9fa";
              otherBtn.style.color = "#000";
              otherBtn.classList.remove("selected");
            }
          }
        });
      } else if(color !== "C" && document.querySelector('input[name="color[]"][value="C"]').checked) {
        let colorlessChk = document.querySelector('input[name="color[]"][value="C"]');
        colorlessChk.checked = false;
        let colorlessBtn = document.querySelector('.color-btn[data-color="C"]');
        if(colorlessBtn){
          colorlessBtn.style.backgroundColor = "#f8f9fa";
          colorlessBtn.style.color = "#000";
          colorlessBtn.classList.remove("selected");
        }
      }
      checkbox.checked = !checkbox.checked;
      if(checkbox.checked){
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
  
  // --- Type Buttons ---
  document.querySelectorAll(".type-btn").forEach(btn => {
    btn.dataset.state = "default";
    updateTypeButtonStyle(btn);
    btn.addEventListener("click", function(){
      let current = btn.dataset.state;
      let next = (current === "default") ? "include" : (current === "include") ? "exclude" : "default";
      btn.dataset.state = next;
      updateTypeButtonStyle(btn);
    });
  });
  
  // --- Rarity Buttons ---
  document.querySelectorAll(".rarity-btn").forEach(btn => {
    let rarity = btn.getAttribute("data-rarity");
    let rCfg = CONFIG.rarities.find(r => r.label === rarity);
    btn.style.backgroundColor = "transparent";
    btn.style.border = `2px solid ${rCfg.color}`;
    btn.style.color = "#000";
    btn.addEventListener("click", function(){
      let checkbox = document.querySelector(`input[name="rarity[]"][value="${rarity}"]`);
      checkbox.checked = !checkbox.checked;
      if(checkbox.checked){
        btn.style.backgroundColor = rCfg.color;
        btn.style.color = "#fff";
      } else {
        btn.style.backgroundColor = "transparent";
        btn.style.color = "#000";
      }
      btn.classList.toggle("selected", checkbox.checked);
    });
  });
  
  // --- Partial Toggle for Types ---
  document.getElementById("typePartialToggle").addEventListener("click", function(){
    let btn = document.getElementById("typePartialToggle");
    btn.textContent = (btn.textContent.trim() === "=") ? "≈" : "=";
  });
  
  // --- Toggle for Color Matching ---
  document.getElementById("colorToggle").addEventListener("click", function(){
    let btn = document.getElementById("colorToggle");
    btn.textContent = (btn.textContent.trim() === "At Most") ? "Exactly" : "At Most";
  });
  
  // --- Build Expansions UI (Collapsed by Default) ---
  buildExpansionsToggles();
  
  // --- Clear Buttons ---
  document.getElementById("clearFormat").addEventListener("click", function(){
    document.getElementById("format_selector").value = "";
  });
  document.getElementById("clearColor").addEventListener("click", function(){
    document.querySelectorAll('input[name="color[]"]').forEach(chk => { chk.checked = false; });
    document.querySelectorAll(".color-btn").forEach(btn => {
      btn.style.backgroundColor = "#f8f9fa";
      btn.style.color = "#000";
      btn.classList.remove("selected");
    });
  });
  document.getElementById("clearType").addEventListener("click", function(){
    document.querySelectorAll('input[name="type[]"]').forEach(chk => { chk.checked = false; });
    document.querySelectorAll(".type-btn").forEach(btn => { 
      btn.dataset.state = "default";
      updateTypeButtonStyle(btn);
    });
  });
  document.getElementById("clearRarity").addEventListener("click", function(){
    document.querySelectorAll('input[name="rarity[]"]').forEach(chk => { chk.checked = false; });
    document.querySelectorAll(".rarity-btn").forEach(btn => { 
      let rarity = btn.getAttribute("data-rarity");
      let rCfg = CONFIG.rarities.find(r => r.label === rarity);
      btn.style.backgroundColor = "transparent";
      btn.style.color = "#000";
      btn.classList.remove("selected");
    });
  });
  document.getElementById("clearOracle").addEventListener("click", function(){
    document.getElementById("oracle").value = "";
  });
  
  // --- Action Buttons ---
  document.getElementById("searchActionButton").addEventListener("click", function(){
    autoSaveSearch();
    performSearch();
  });
  document.getElementById("searchFrontierActionButton").addEventListener("click", function(){
    document.getElementById("format_selector").value = "frontier";
    autoSaveSearch();
    performSearch();
  });
  // (Assuming a "Clear All" button exists if needed)
  // document.getElementById("clearAllButton").addEventListener("click", clearForm);
  
  // --- Preset Management ---
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

// Helper: Update type button style.
function updateTypeButtonStyle(btn) {
  let state = btn.dataset.state;
  if(state === "default"){
    btn.style.backgroundColor = "transparent";
    btn.style.border = "2px solid #90ee90";
    btn.style.color = "#000";
    btn.style.textDecoration = "none";
  } else if(state === "include"){
    btn.style.backgroundColor = "#90ee90";
    btn.style.border = "2px solid #90ee90";
    btn.style.color = "#000";
    btn.style.textDecoration = "none";
  } else if(state === "exclude"){
    btn.style.backgroundColor = "#ffa8a8";
    btn.style.border = "2px solid #ffa8a8";
    btn.style.color = "#000";
    btn.style.textDecoration = "line-through";
  }
}

// Build Expansions UI with grouped collapsible sections (collapsed by default).
function buildExpansionsToggles() {
  const container = document.getElementById("expansionsContainer");
  container.innerHTML = "";
  
  function createGroup(headerText, items) {
    let header = document.createElement("div");
    header.className = "expansion-header";
    header.textContent = headerText;
    let groupContainer = document.createElement("div");
    groupContainer.className = "expansion-group";
    groupContainer.style.display = "none";
    items.forEach(item => {
      let btn = document.createElement("button");
      btn.className = "expansion-btn";
      btn.textContent = item.label;
      btn.addEventListener("click", function(){
        if (!item.expansions) {
          toggleQuotes();
        } else {
          expansionsClick(item.expansions);
        }
      });
      groupContainer.appendChild(btn);
    });
    header.addEventListener("click", function(){
      groupContainer.style.display = (groupContainer.style.display === "none") ? "flex" : "none";
    });
    container.appendChild(header);
    container.appendChild(groupContainer);
  }
  
  // Common group.
  let commonItems = [];
  EXPANSIONS_DATA.common.forEach(row => {
    row.forEach(item => { commonItems.push(item); });
  });
  createGroup("Common", commonItems);
  
  // Types group.
  createGroup("Types", EXPANSIONS_DATA.typesExpansions);
  
  // Abilities group.
  createGroup("Abilities", EXPANSIONS_DATA.abilitiesExpansions);
  
  // Clear Expansions button.
  let clearBtn = document.createElement("button");
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

// Expansions handling functions.
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
      } else {
        expansionsCycleIdx.set(key, idx);
      }
    }
  } else {
    removeLastOccurrence(oracle, arr[arr.length - 1]);
    expansionsCycleIdx.set(key, 0);
  }
}
function toggleQuotes() {
  const oracle = document.getElementById("oracle");
  if (!oracle) return;
  if (!quotesInserted) {
    oracle.value = '"' + oracle.value + '"';
    quotesInserted = true;
  } else {
    if (oracle.value.startsWith('"') && oracle.value.endsWith('"')) {
      oracle.value = oracle.value.slice(1, -1);
    }
    quotesInserted = false;
  }
}
function removeLastOccurrence(oracle, sub) {
  const text = oracle.value;
  let index = text.lastIndexOf(" " + sub);
  if (index !== -1) {
    oracle.value = text.slice(0, index) + text.slice(index + sub.length + 1);
    return;
  }
  index = text.lastIndexOf(sub);
  if (index !== -1) {
    oracle.value = text.slice(0, index) + text.slice(index + sub.length);
  }
}

// Build Scryfall query and redirect.
// For types, if the partial toggle ("≈") is active, group included types with OR.
function performSearch(){
  let format = document.getElementById("format_selector").value;
  let colors = Array.from(document.querySelectorAll('input[name="color[]"]:checked')).map(el => el.value);
  let queryParts = [];
  
  // Format.
  if(format){
    let fmtObj = CONFIG.formatData.formats.find(f => f.value === format);
    if(fmtObj && fmtObj.sets){
      let clause = "(" + fmtObj.sets.map(s => "set:" + s).join(" OR ") + ")";
      queryParts.push(clause);
    } else {
      queryParts.push("is:" + format);
    }
  }
  
  // Colors.
  if(colors.length > 0){
    let colorToggle = document.getElementById("colorToggle").textContent.trim();
    queryParts.push((colorToggle === "Exactly" ? "c=" : "c<=") + colors.join(""));
  }
  
  // Types.
  let partial = (document.getElementById("typePartialToggle").textContent.trim() === "≈");
  if(partial){
    let included = [];
    document.querySelectorAll(".type-btn").forEach(btn => {
      if(btn.dataset.state === "include"){
        included.push("type:" + btn.getAttribute("data-type"));
      }
    });
    if(included.length > 0){
      queryParts.push("(" + included.join(" OR ") + ")");
    }
  } else {
    document.querySelectorAll(".type-btn").forEach(btn => {
      let state = btn.dataset.state;
      let type = btn.getAttribute("data-type");
      if(state === "include") {
        queryParts.push("t:" + type);
      } else if(state === "exclude") {
        queryParts.push("-t:" + type);
      }
    });
  }
  
  // Rarities.
  let rarities = Array.from(document.querySelectorAll('input[name="rarity[]"]:checked')).map(el => el.value);
  if(rarities.length > 0){
    const rarityMap = {"C": "common", "U": "uncommon", "R": "rare", "M": "mythic"};
    rarities.forEach(r => { if(rarityMap[r]) queryParts.push("r:" + rarityMap[r]); });
  }
  
  // Oracle.
  let oracle = document.getElementById("oracle").value.trim();
  if(oracle){
    queryParts.push("oracle:" + oracle);
    queryParts.push("(game:paper)");
  }
  
  let query = queryParts.join(" ");
  let targetUrl = "https://scryfall.com/search?as=grid&order=name&q=" + encodeURIComponent(query);
  console.log("Query:", query);
  console.log("Redirecting to:", targetUrl);
  
  window.location.href = targetUrl;
}

// Preset management functions.
// Save preset: saves current search state along with computed jump URL and timestamp.
// If preset name is blank, use the URL as the name.
function savePreset(){
  let presetName = prompt("Enter a name for this preset (leave blank to use URL):");
  let settings = getSearchSettings();
  // Add timestamp.
  settings.timestamp = Date.now();
  if(!presetName || presetName.trim() === ""){
    presetName = settings.url;
  }
  localStorage.setItem("preset_" + presetName, JSON.stringify(settings));
  updatePresetDropdown();
  alert("Preset saved as: " + presetName);
}
function loadPreset(){
  let dropdown = document.getElementById("presetDropdown");
  let key = dropdown.value;
  if(!key) return;
  let preset = JSON.parse(localStorage.getItem(key));
  document.getElementById("format_selector").value = preset.format || "";
  
  // Load colors.
  document.querySelectorAll('input[name="color[]"]').forEach(el => {
    el.checked = preset.colors.includes(el.value);
    let btn = document.querySelector('.color-btn[data-color="' + el.value + '"]');
    let cfg = CONFIG.colorData.find(c => c.val === el.value);
    if(btn){
      if(el.checked){
        btn.style.backgroundColor = cfg.color;
        btn.style.color = cfg.textColor;
      } else {
        btn.style.backgroundColor = "#f8f9fa";
        btn.style.color = "#000";
      }
    }
  });
  
  // Load types.
  document.querySelectorAll(".type-btn").forEach(btn => {
    btn.dataset.state = "default";
    updateTypeButtonStyle(btn);
  });
  if(preset.types){
    preset.types.forEach(obj => {
      let btn = document.querySelector('.type-btn[data-type="' + obj.type + '"]');
      if(btn){
        btn.dataset.state = obj.state;
        updateTypeButtonStyle(btn);
      }
    });
  }
  
  // Load rarities.
  document.querySelectorAll('input[name="rarity[]"]').forEach(el => {
    el.checked = preset.rarities.includes(el.value);
    let btn = document.querySelector('.rarity-btn[data-rarity="' + el.value + '"]');
    let rCfg = CONFIG.rarities.find(r => r.label === el.value);
    if(btn){
      if(el.checked){
        btn.style.backgroundColor = rCfg.color;
        btn.style.color = "#fff";
      } else {
        btn.style.backgroundColor = "transparent";
        btn.style.color = "#000";
      }
      btn.classList.toggle("selected", el.checked);
    }
  });
  
  document.getElementById("oracle").value = preset.oracle || "";
}
function deletePreset(){
  let dropdown = document.getElementById("presetDropdown");
  let key = dropdown.value;
  if(!key){
    alert("Please select a preset to delete.");
    return;
  }
  if(confirm("Are you sure you want to delete preset: " + key.replace("preset_", "") + "?")){
    localStorage.removeItem(key);
    updatePresetDropdown();
  }
}
function updatePresetDropdown(){
  let autosaves = [];
  let presets = [];
  Object.keys(localStorage).forEach(key => {
    if(key.startsWith("autosave_")){
      try {
        let item = JSON.parse(localStorage.getItem(key));
        autosaves.push({ key: key, timestamp: item.timestamp || 0 });
      } catch(e){}
    } else if(key.startsWith("preset_")){
      try {
        let item = JSON.parse(localStorage.getItem(key));
        presets.push({ key: key, timestamp: item.timestamp || 0 });
      } catch(e){}
    }
  });
  // Sort autosaves and presets descending by timestamp.
  autosaves.sort((a,b) => b.timestamp - a.timestamp);
  presets.sort((a,b) => b.timestamp - a.timestamp);
  
  let dropdown = document.getElementById("presetDropdown");
  dropdown.innerHTML = "<option value=''>Select a preset...</option>";
  autosaves.forEach(item => {
    let option = document.createElement("option");
    option.value = item.key;
    option.textContent = item.key;
    dropdown.appendChild(option);
  });
  presets.forEach(item => {
    let option = document.createElement("option");
    option.value = item.key;
    // Strip "preset_" prefix for display.
    option.textContent = item.key.replace("preset_", "");
    dropdown.appendChild(option);
  });
}
function exportPresets(){
  let exportObj = {};
  Object.keys(localStorage).forEach(key => {
    if(key.startsWith("preset_") || key.startsWith("autosave_")){
      exportObj[key] = JSON.parse(localStorage.getItem(key));
    }
  });
  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
  let a = document.createElement("a");
  a.href = dataStr;
  a.download = "scryfall_presets.json";
  a.click();
}
function importPresetsFromFile(event){
  let file = event.target.files[0];
  if(!file) return;
  let reader = new FileReader();
  reader.onload = function(e){
    try{
      let imported = JSON.parse(e.target.result);
      Object.keys(imported).forEach(key => {
        localStorage.setItem(key, JSON.stringify(imported[key]));
      });
      updatePresetDropdown();
      alert("Presets imported successfully.");
    } catch(err){
      alert("Error importing presets: " + err);
    }
  };
  reader.readAsText(file);
}

// Also, autoSaveSearch is called when a search is performed.
function autoSaveSearch(){
  const settings = getSearchSettings();
  // Wrap settings with a timestamp.
  const wrapper = { timestamp: Date.now(), ...settings };
  // Cycle autosave keys: autosave_1, autosave_2, autosave_3.
  if(localStorage.getItem("autosave_3")){
    localStorage.removeItem("autosave_3");
  }
  if(localStorage.getItem("autosave_2")){
    localStorage.setItem("autosave_3", localStorage.getItem("autosave_2"));
    localStorage.removeItem("autosave_2");
  }
  if(localStorage.getItem("autosave_1")){
    localStorage.setItem("autosave_2", localStorage.getItem("autosave_1"));
    localStorage.removeItem("autosave_1");
  }
  localStorage.setItem("autosave_1", JSON.stringify(wrapper));
  updatePresetDropdown();
}

// getSearchSettings: Gather current search state.
function getSearchSettings(){
  let format = document.getElementById("format_selector").value;
  let colors = Array.from(document.querySelectorAll('input[name="color[]"]:checked')).map(el => el.value);
  let types = [];
  let partial = (document.getElementById("typePartialToggle").textContent.trim() === "≈");
  document.querySelectorAll(".type-btn").forEach(btn => {
    let state = btn.dataset.state;
    let type = btn.getAttribute("data-type");
    if(state !== "default"){
      types.push({ type: type, state: state });
    }
  });
  let rarities = Array.from(document.querySelectorAll('input[name="rarity[]"]:checked')).map(el => el.value);
  let oracle = document.getElementById("oracle").value.trim();
  let queryParts = [];
  if(format){
    let fmtObj = CONFIG.formatData.formats.find(f => f.value === format);
    if(fmtObj && fmtObj.sets){
      let clause = "(" + fmtObj.sets.map(s => "set:" + s).join(" OR ") + ")";
      queryParts.push(clause);
    } else {
      queryParts.push("is:" + format);
    }
  }
  if(colors.length > 0){
    let colorToggle = document.getElementById("colorToggle").textContent.trim();
    queryParts.push((colorToggle === "Exactly" ? "c=" : "c<=") + colors.join(""));
  }
  if(partial){
    let included = [];
    document.querySelectorAll(".type-btn").forEach(btn => {
      if(btn.dataset.state === "include"){
        included.push("type:" + btn.getAttribute("data-type"));
      }
    });
    if(included.length > 0){
      queryParts.push("(" + included.join(" OR ") + ")");
    }
  } else {
    document.querySelectorAll(".type-btn").forEach(btn => {
      let state = btn.dataset.state;
      let type = btn.getAttribute("data-type");
      if(state === "include"){
        queryParts.push("t:" + type);
      } else if(state === "exclude"){
        queryParts.push("-t:" + type);
      }
    });
  }
  if(rarities.length > 0){
    const rarityMap = {"C": "common", "U": "uncommon", "R": "rare", "M": "mythic"};
    rarities.forEach(r => { if(rarityMap[r]) queryParts.push("r:" + rarityMap[r]); });
  }
  if(oracle){
    queryParts.push("oracle:" + oracle);
    queryParts.push("(game:paper)");
  }
  let url = "https://scryfall.com/search?as=grid&order=name&q=" + encodeURIComponent(queryParts.join(" "));
  return {
    format: format,
    colors: colors,
    types: types,
    rarities: rarities,
    oracle: oracle,
    url: url
  };
}
