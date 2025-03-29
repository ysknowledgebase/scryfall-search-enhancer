// Global configuration and variables
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
    { val: "W", icon: "{W}" },
    { val: "U", icon: "{U}" },
    { val: "B", icon: "{B}" },
    { val: "R", icon: "{R}" },
    { val: "G", icon: "{G}" },
    { val: "C", icon: "{C}" }
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

// Expansions configuration (a subset of original data)
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
      { label: "perm", expansions: ["permanent"] }
    ]
  ]
};

// Global variables for expansions logic
let expansionsInserted = new Map();
let expansionsCycleIdx = new Map();
let quotesInserted = false;

// On DOM load, attach event listeners and build UI components
document.addEventListener("DOMContentLoaded", function(){
  // Toggle for color buttons
  document.querySelectorAll(".color-btn").forEach(btn => {
    btn.addEventListener("click", function(){
      let color = btn.getAttribute("data-color");
      let checkbox = document.querySelector(`input[name="color[]"][value="${color}"]`);
      checkbox.checked = !checkbox.checked;
      btn.classList.toggle("selected", checkbox.checked);
    });
  });
  // Toggle for type buttons
  document.querySelectorAll(".type-btn").forEach(btn => {
    btn.addEventListener("click", function(){
      let type = btn.getAttribute("data-type");
      let checkbox = document.querySelector(`input[name="type[]"][value="${type}"]`);
      checkbox.checked = !checkbox.checked;
      btn.classList.toggle("selected", checkbox.checked);
    });
  });
  // Toggle for rarity buttons
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

// Build the expansions toggles UI in the designated container
function buildExpansionsToggles() {
  const container = document.getElementById("expansionsContainer");
  container.innerHTML = "";
  // For each row in EXPANSIONS_DATA.common, create a row of buttons
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
    container.appendChild(rowDiv);
  });
  // Add a clear button for expansions
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

// Handle expansion button clicks – if one expansion token, toggle it; if multiple, cycle through them
function expansionsClick(arr) {
  if(arr.length === 1) {
    toggleExpansion(arr[0]);
  } else {
    multiCycleExp(arr);
  }
}

// Toggle a single expansion token in the oracle text field
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

// Cycle through multiple expansion tokens
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

// Toggle quotes around the oracle text
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

// Remove the last occurrence of a substring from the oracle text
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

// Build Scryfall query from form inputs and call the API
function performSearch(){
  let format = document.getElementById("format_selector").value;
  let colors = Array.from(document.querySelectorAll('input[name="color[]"]:checked')).map(el => el.value);
  let types = Array.from(document.querySelectorAll('input[name="type[]"]:checked')).map(el => el.value);
  let rarities = Array.from(document.querySelectorAll('input[name="rarity[]"]:checked')).map(el => el.value);
  let oracle = document.getElementById("oracle").value.trim();
  
  let queryParts = [];
  
  // Format: use is: operator
  if(format){
    if(format === "standard") queryParts.push("is:standard");
    else if(format === "futureStandard") queryParts.push("is:future-standard");
    else if(format === "frontier") queryParts.push("is:frontier");
    else if(format === "fdn") queryParts.push("is:fdn");
    else if(format === "dft") queryParts.push("is:dft");
  }
  // Colors: use c>= operator
  if(colors.length > 0){
    queryParts.push("c>=" + colors.join(""));
  }
  // Types: add each with t:
  types.forEach(t => { queryParts.push("t:" + t); });
  // Rarities: map abbreviation to full word
  if(rarities.length > 0){
    const rarityMap = {"C": "common", "U": "uncommon", "R": "rare", "M": "mythic"};
    rarities.forEach(r => { if(rarityMap[r]) queryParts.push("r:" + rarityMap[r]); });
  }
  // Oracle text: free text search
  if(oracle) queryParts.push(oracle);
  
  let query = queryParts.join(" ");
  let apiUrl = "https://api.scryfall.com/cards/search?q=" + encodeURIComponent(query);
  console.log("Query:", query);
  console.log("API URL:", apiUrl);
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayResults(data))
    .catch(err => {
      console.error("Error fetching Scryfall data:", err);
      document.getElementById("resultsContainer").innerHTML = "<p>Error fetching results.</p>";
    });
}

// Display fetched card results
function displayResults(data){
  let container = document.getElementById("resultsContainer");
  container.innerHTML = "";
  if(data.object === "error"){
    container.innerHTML = "<p>Error: " + data.details + "</p>";
    return;
  }
  if(!data.data || data.data.length === 0){
    container.innerHTML = "<p>No results found.</p>";
    return;
  }
  data.data.forEach(card => {
    let cardDiv = document.createElement("div");
    cardDiv.className = "card";
    let imgSrc = (card.image_uris && card.image_uris.small) ? card.image_uris.small : "";
    cardDiv.innerHTML = `<img src="${imgSrc}" alt="${card.name}"><p>${card.name}</p>`;
    container.appendChild(cardDiv);
  });
}

// Clear form fields and results
function clearForm(){
  document.getElementById("format_selector").value = "";
  document.querySelectorAll('input[name="color[]"], input[name="type[]"], input[name="rarity[]"]').forEach(el => {
    el.checked = false;
  });
  document.querySelectorAll(".color-btn, .type-btn, .rarity-btn").forEach(btn => btn.classList.remove("selected"));
  document.getElementById("oracle").value = "";
  document.getElementById("resultsContainer").innerHTML = "";
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
    if(btn) btn.classList.toggle("selected", el.checked);
  });
  document.querySelectorAll('input[name="type[]"]').forEach(el => {
    el.checked = preset.types.includes(el.value);
    let btn = document.querySelector('.type-btn[data-type="' + el.value + '"]');
    if(btn) btn.classList.toggle("selected", el.checked);
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
