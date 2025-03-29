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
    { label: "C", full: "common" },
    { label: "U", full: "uncommon" },
    { label: "R", full: "rare" },
    { label: "M", full: "mythic" }
  ]
};

// EXPANSIONS_DATA – full expansions from the original code.
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

// Global variables for expansions handling
let expansionsInserted = new Map();
let expansionsCycleIdx = new Map();
let quotesInserted = false;

// On DOMContentLoaded, attach event listeners and build UI
document.addEventListener("DOMContentLoaded", function(){
  // Set up color buttons using original color scheme and mana icons.
  document.querySelectorAll(".color-btn").forEach(btn => {
    let color = btn.getAttribute("data-color");
    btn.style.backgroundColor = "#f8f9fa";
    btn.style.color = "#000";
    // Set the image icon inside the button.
    let cfg = CONFIG.colorData.find(c => c.val === color);
    if(cfg){
      btn.innerHTML = `<img src="${cfg.icon}" alt="${color}" class="mana-icon">`;
    }
    btn.addEventListener("click", function(){
      let checkbox = document.querySelector(`input[name="color[]"][value="${color}"]`);
      // Enforce mutually exclusive selection: if selecting colorless ("C"), uncheck others.
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
  
  // Set up type buttons with 3 states: default, include, exclude.
  document.querySelectorAll(".type-btn").forEach(btn => {
    // We'll store a state property on each button: "default", "include", or "exclude"
    btn.dataset.state = "default";
    updateTypeButtonStyle(btn);
    btn.addEventListener("click", function(){
      let current = btn.dataset.state;
      // Cycle state: default -> include -> exclude -> default
      let next;
      if(current === "default"){
        next = "include";
      } else if(current === "include"){
        next = "exclude";
      } else {
        next = "default";
      }
      btn.dataset.state = next;
      updateTypeButtonStyle(btn);
    });
  });
  
  // Rarity buttons: simple toggle
  document.querySelectorAll(".rarity-btn").forEach(btn => {
    btn.addEventListener("click", function(){
      let rarity = btn.getAttribute("data-rarity");
      let checkbox = document.querySelector(`input[name="rarity[]"][value="${rarity}"]`);
      checkbox.checked = !checkbox.checked;
      btn.classList.toggle("selected", checkbox.checked);
    });
  });
  
  // Partial toggle for types: "=" vs "≈"
  document.getElementById("typePartialToggle").addEventListener("click", function(){
    let btn = document.getElementById("typePartialToggle");
    if(btn.textContent.trim() === "="){
      btn.textContent = "≈";
    } else {
      btn.textContent = "=";
    }
  });
  
  // Toggle for color matching: "At Most" vs "Exactly"
  document.getElementById("colorToggle").addEventListener("click", function(){
    let btn = document.getElementById("colorToggle");
    if(btn.textContent.trim() === "At Most"){
      btn.textContent = "Exactly";
    } else {
      btn.textContent = "At Most";
    }
  });
  
  // Build Expansions UI – grouped and uncollapsed by default.
  buildExpansionsToggles();
  
  // Clear buttons for each selector already attached in index.html
  
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

// Helper: Update type button style based on its state.
function updateTypeButtonStyle(btn) {
  let state = btn.dataset.state;
  // Default: light border, transparent fill
  if(state === "default"){
    btn.style.backgroundColor = "transparent";
    btn.style.border = "2px solid #90ee90"; // unselected border
    btn.style.color = "#000";
    btn.style.textDecoration = "none";
  }
  // Include: filled with green
  else if(state === "include"){
    btn.style.backgroundColor = "#90ee90";
    btn.style.border = "2px solid #90ee90";
    btn.style.color = "#000";
    btn.style.textDecoration = "none";
  }
  // Exclude: filled with red, crossed out text
  else if(state === "exclude"){
    btn.style.backgroundColor = "#ffa8a8";
    btn.style.border = "2px solid #ffa8a8";
    btn.style.color = "#000";
    btn.style.textDecoration = "line-through";
  }
}

// Build Expansions UI from EXPANSIONS_DATA with grouped collapsible sections.
function buildExpansionsToggles() {
  const container = document.getElementById("expansionsContainer");
  container.innerHTML = "";
  
  // Build a function to create a group.
  function createGroup(headerText, items) {
    let header = document.createElement("div");
    header.className = "expansion-header";
    header.textContent = headerText;
    header.addEventListener("click", function(){
      let group = header.nextElementSibling;
      group.style.display = (group.style.display === "none") ? "flex" : "none";
    });
    let groupContainer = document.createElement("div");
    groupContainer.className = "expansion-group";
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
    container.appendChild(header);
    container.appendChild(groupContainer);
  }
  
  // Common group
  let commonItems = [];
  EXPANSIONS_DATA.common.forEach(row => {
    row.forEach(item => commonItems.push(item));
  });
  createGroup("Common", commonItems);
  
  // Types group
  createGroup("Types", EXPANSIONS_DATA.typesExpansions);
  
  // Abilities group
  createGroup("Abilities", EXPANSIONS_DATA.abilitiesExpansions);
  
  // Clear Expansions button at end of group section
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

// Expansions handling functions (same as before)
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

// Build Scryfall query and redirect. Oracle text is forced with "oracle:" and appended with "(game:paper)".
function performSearch(){
  let format = document.getElementById("format_selector").value;
  let colors = Array.from(document.querySelectorAll('input[name="color[]"]:checked')).map(el => el.value);
  let types = Array.from(document.querySelectorAll('input[name="type[]"]:checked')).map(el => el.value);
  let rarities = Array.from(document.querySelectorAll('input[name="rarity[]"]:checked')).map(el => el.value);
  let oracle = document.getElementById("oracle").value.trim();
  
  let queryParts = [];
  
  // Format handling: if format has sets then build OR clause; else "is:" operator.
  if(format){
    let fmtObj = CONFIG.formatData.formats.find(f => f.value === format);
    if(fmtObj && fmtObj.sets){
      let clause = "(" + fmtObj.sets.map(s => "set:" + s).join(" OR ") + ")";
      queryParts.push(clause);
    } else {
      queryParts.push("is:" + format);
    }
  }
  // Colors: if toggle is "At Most" use "c<="; if "Exactly", use "c="
  if(colors.length > 0){
    let colorToggle = document.getElementById("colorToggle").textContent.trim();
    if(colorToggle === "Exactly"){
      queryParts.push("c=" + colors.join(""));
    } else {
      queryParts.push("c>=" + colors.join(""));
    }
  }
  // Types: for each type, check the state (include/exclude)
  document.querySelectorAll('input[name="type[]"]').forEach((chk, i) => {
    let type = chk.value;
    let btn = document.querySelector('.type-btn[data-type="' + type + '"]');
    if(btn){
      let state = btn.dataset.state;
      if(state === "include"){
        queryParts.push("t:" + type);
      } else if(state === "exclude"){
        queryParts.push("-t:" + type);
      }
    }
  });
  // Rarities
  if(rarities.length > 0){
    const rarityMap = {"C": "common", "U": "uncommon", "R": "rare", "M": "mythic"};
    rarities.forEach(r => { if(rarityMap[r]) queryParts.push("r:" + rarityMap[r]); });
  }
  // Oracle text: prepend "oracle:" and append "(game:paper)"
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

// Preset management functions
function savePreset(){
  let presetName = prompt("Enter a name for this preset:");
  if(!presetName) return;
  let preset = {
    format: document.getElementById("format_selector").value,
    colors: Array.from(document.querySelectorAll('input[name="color[]"]:checked')).map(el => el.value),
    types: Array.from(document.querySelectorAll('input[name="type[]"]:checked')).map(el => el.value),
    rarities: Array.from(document.querySelectorAll('input[name="rarity[]"]:checked')).map(el => el.value),
    oracle: document.getElementById("oracle").value.trim()
  };
  localStorage.setItem("preset_" + presetName, JSON.stringify(preset));
  updatePresetDropdown();
  alert("Preset saved as: " + presetName);
}
function loadPreset(){
  let dropdown = document.getElementById("presetDropdown");
  let key = dropdown.value;
  if(!key) return;
  let preset = JSON.parse(localStorage.getItem(key));
  document.getElementById("format_selector").value = preset.format || "";
  document.querySelectorAll('input[name="color[]"]').forEach(el => {
    el.checked = preset.colors.includes(el.value);
    let btn = document.querySelector('.color-btn[data-color="' + el.value + '"]');
    if(btn){
      let cfg = CONFIG.colorData.find(c => c.val === el.value);
      if(el.checked){
        btn.style.backgroundColor = cfg.color;
        btn.style.color = cfg.textColor;
      } else {
        btn.style.backgroundColor = "#f8f9fa";
        btn.style.color = "#000";
      }
    }
  });
  document.querySelectorAll('input[name="type[]"]').forEach(el => {
    el.checked = preset.types.includes(el.value);
    let btn = document.querySelector('.type-btn[data-type="' + el.value + '"]');
    if(btn){
      btn.dataset.state = "default"; // reset state
      if(preset.types.includes(el.value)){
        // assume included by default; you might store the state in preset if needed.
        btn.dataset.state = "include";
      }
      updateTypeButtonStyle(btn);
    }
  });
  document.querySelectorAll('input[name="rarity[]"]').forEach(el => {
    el.checked = preset.rarities.includes(el.value);
    let btn = document.querySelector('.rarity-btn[data-rarity="' + el.value + '"]');
    if(btn) btn.classList.toggle("selected", el.checked);
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
  let dropdown = document.getElementById("presetDropdown");
  dropdown.innerHTML = "<option value=''>Select a preset...</option>";
  Object.keys(localStorage).forEach(key => {
    if(key.startsWith("preset_")){
      let option = document.createElement("option");
      option.value = key;
      option.textContent = key.replace("preset_", "");
      dropdown.appendChild(option);
    }
  });
}
function exportPresets(){
  let exportObj = {};
  Object.keys(localStorage).forEach(key => {
    if(key.startsWith("preset_")){
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
