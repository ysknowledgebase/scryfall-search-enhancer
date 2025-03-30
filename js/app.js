/* Version 0.5.21 */
//////////////////////
// CONFIG & DATA
//////////////////////
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
const EXPANSIONS_DATA = {
  common: [
    [
      { label: "tgt", expansions: ["target"] },
      { label: "Whev", expansions: ["whenever"] },
      { label: "each", expansions: ["each"] },
      { label: "all", expansions: ["all"] }
    ]
    // ... (other rows as needed)
  ],
  typesExpansions: [
    { label: "Art", expansions: ["artifact"] }
    // ... (other items)
  ],
  abilitiesExpansions: [
    { label: "Deathtouch", expansions: ["deathtouch"] }
    // ... (other items)
  ]
};

//////////////////////
// GLOBAL VARIABLES
//////////////////////
let expansionsInserted = new Map();
let expansionsCycleIdx = new Map();
let quotesInserted = false;
let attributes = {
  cmc: { lower: null, lowerOp: "", upper: null, upperOp: "" },
  pow: { lower: null, lowerOp: "", upper: null, upperOp: "" },
  tou: { lower: null, lowerOp: "", upper: null, upperOp: "" }
};

//////////////////////
// DUAL SLIDER SETUP
//////////////////////
function setupDualSlider(sliderId, attrName) {
  const slider = document.getElementById(sliderId);
  const track = slider.querySelector(".slider-track");
  const fill = slider.querySelector(".slider-fill");
  const scale = slider.querySelector(".slider-scale");
  const min = 0, max = 20;
  
  // Build tick marks.
  scale.innerHTML = "";
  for (let i = min; i <= max; i++) {
    const tick = document.createElement("div");
    tick.className = "tick";
    tick.style.left = ((i - min) / (max - min) * 100) + "%";
    scale.appendChild(tick);
    const tickLabel = document.createElement("div");
    tickLabel.className = "tick-label";
    tickLabel.style.left = ((i - min) / (max - min) * 100) + "%";
    tickLabel.textContent = i;
    scale.appendChild(tickLabel);
  }
  
  // Initially hide handles and fill.
  const lowerHandle = slider.querySelector(".lower-handle");
  const upperHandle = slider.querySelector(".upper-handle");
  lowerHandle.style.display = "none";
  upperHandle.style.display = "none";
  fill.style.display = "none";
  
  // Helpers.
  function valueToPos(val) {
    return (val - min) / (max - min) * slider.offsetWidth;
  }
  function posToValue(pos) {
    return Math.round(pos / slider.offsetWidth * (max - min) + min);
  }
  
  // Click handler on slider track.
  slider.addEventListener("click", function(e) {
    if(e.target.classList.contains("slider-handle")) return;
    const rect = slider.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if(lowerHandle.style.display === "none" && upperHandle.style.display === "none"){
      // Add first handle (exact match "=") and show as active.
      lowerHandle.style.display = "block";
      let snappedVal = posToValue(clickX);
      let snappedX = valueToPos(snappedVal);
      lowerHandle.style.left = snappedX + "px";
      attributes[attrName].lower = snappedVal;
      attributes[attrName].lowerOp = "=";
      lowerHandle.className = "slider-handle lower-handle active";
      updateFill();
    } else if(lowerHandle.style.display !== "none" && upperHandle.style.display === "none"){
      let currentX = parseFloat(lowerHandle.style.left);
      if(clickX > currentX){
        // Add second handle: set lower to ">=" and upper to "<=".
        upperHandle.style.display = "block";
        let snappedVal = posToValue(clickX);
        let snappedX = valueToPos(snappedVal);
        upperHandle.style.left = snappedX + "px";
        attributes[attrName].upper = snappedVal;
        attributes[attrName].upperOp = "<=";
        upperHandle.className = "slider-handle upper-handle active";
        attributes[attrName].lowerOp = ">=";
        lowerHandle.className = "slider-handle lower-handle active";
        updateFill();
      } else {
        let snappedVal = posToValue(clickX);
        let snappedX = valueToPos(snappedVal);
        lowerHandle.style.left = snappedX + "px";
        attributes[attrName].lower = snappedVal;
        updateFill();
      }
    } else {
      // Both handles exist; reposition the nearer one.
      let lowerX = parseFloat(lowerHandle.style.left);
      let upperX = parseFloat(upperHandle.style.left);
      if(Math.abs(clickX - lowerX) < Math.abs(clickX - upperX)){
        let snappedVal = posToValue(clickX);
        let snappedX = valueToPos(snappedVal);
        lowerHandle.style.left = snappedX + "px";
        attributes[attrName].lower = snappedVal;
      } else {
        let snappedVal = posToValue(clickX);
        let snappedX = valueToPos(snappedVal);
        upperHandle.style.left = snappedX + "px";
        attributes[attrName].upper = snappedVal;
      }
      updateFill();
    }
  });
  
  // Double-click handler: remove handle.
  function addDoubleClick(handle, isLower) {
    handle.addEventListener("dblclick", function(e) {
      e.stopPropagation();
      handle.style.display = "none";
      if(isLower){
        attributes[attrName].lower = null;
        attributes[attrName].lowerOp = "";
        // If upper handle exists, promote it.
        if(upperHandle.style.display !== "none"){
          lowerHandle.style.display = "block";
          lowerHandle.style.left = upperHandle.style.left;
          attributes[attrName].lower = attributes[attrName].upper;
          attributes[attrName].lowerOp = "=";
          lowerHandle.className = "slider-handle lower-handle active";
          upperHandle.style.display = "none";
        }
      } else {
        attributes[attrName].upper = null;
        attributes[attrName].upperOp = "";
        if(lowerHandle.style.display !== "none"){
          attributes[attrName].lowerOp = "=";
          lowerHandle.className = "slider-handle lower-handle active";
        }
      }
      updateFill();
    });
  }
  addDoubleClick(lowerHandle, true);
  addDoubleClick(upperHandle, false);
  
  // Draggable behavior.
  function makeDraggable(handle, isLower) {
    handle.addEventListener("mousedown", function(e) {
      e.stopPropagation();
      const rect = slider.getBoundingClientRect();
      function onMouseMove(e) {
        let newX = e.clientX - rect.left;
        if(isLower && upperHandle.style.display !== "none"){
          newX = Math.min(newX, parseFloat(upperHandle.style.left));
        }
        if(!isLower && lowerHandle.style.display !== "none"){
          newX = Math.max(newX, parseFloat(lowerHandle.style.left));
        }
        let snappedVal = posToValue(newX);
        let snappedX = valueToPos(snappedVal);
        handle.style.left = snappedX + "px";
        if(isLower){
          attributes[attrName].lower = snappedVal;
        } else {
          attributes[attrName].upper = snappedVal;
        }
        updateFill();
      }
      function onMouseUp(){
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
    
    // Toggle operator on single click.
    handle.addEventListener("click", function(e) {
      e.stopPropagation();
      if(isLower){
        if(attributes[attrName].lowerOp === "="){
          attributes[attrName].lowerOp = ">=";
          handle.classList.remove("outline");
          handle.classList.add("active");
        } else {
          attributes[attrName].lowerOp = "=";
          handle.classList.remove("active");
          handle.classList.add("outline");
        }
      } else {
        if(attributes[attrName].upperOp === "<="){
          attributes[attrName].upperOp = "<";
          handle.classList.remove("active");
          handle.classList.add("outline");
        } else {
          attributes[attrName].upperOp = "<=";
          handle.classList.remove("outline");
          handle.classList.add("active");
        }
      }
    });
  }
  makeDraggable(lowerHandle, true);
  makeDraggable(upperHandle, false);
  
  function updateFill(){
    if(lowerHandle.style.display === "none" || upperHandle.style.display === "none"){
      fill.style.display = "none";
    } else {
      let lowerX = parseFloat(lowerHandle.style.left);
      let upperX = parseFloat(upperHandle.style.left);
      fill.style.display = "block";
      fill.style.left = lowerX + "px";
      fill.style.width = (upperX - lowerX) + "px";
    }
  }
}

//////////////////////
// Autosave & Preset Functions
//////////////////////
function autoSaveSearch(){
  const settings = getSearchSettings();
  const wrapper = { timestamp: Date.now(), ...settings };
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
    let rarityQueries = [];
    rarities.forEach(r => { if(rarityMap[r]) rarityQueries.push("r:" + rarityMap[r]); });
    if(rarityQueries.length > 0){
      queryParts.push("(" + rarityQueries.join(" OR ") + ")");
    }
  }
  ["cmc", "pow", "tou"].forEach(attr => {
    if(attributes[attr].lower !== null){
      queryParts.push(attr + attributes[attr].lowerOp + attributes[attr].lower);
    }
    if(attributes[attr].upper !== null){
      queryParts.push(attr + attributes[attr].upperOp + attributes[attr].upper);
    }
  });
  if(oracle){
    // Wrap entire oracle input in quotes so all words are searched as oracle text.
    queryParts.push("oracle:" + '"' + oracle + '"');
    queryParts.push("(game:paper)");
  } else {
    queryParts.push("(game:paper)");
  }
  let url = "https://scryfall.com/search?as=grid&order=name&q=" + encodeURIComponent(queryParts.join(" "));
  return {
    format: format,
    colors: colors,
    types: types,
    rarities: rarities,
    oracle: oracle,
    attributes: attributes,
    url: url
  };
}
function performSearch(){
  let settings = getSearchSettings();
  console.log("Query:", settings.url);
  window.location.href = settings.url;
}

//////////////////////
// Preset Management Functions
//////////////////////
function savePreset(){
  let presetName = prompt("Enter a name for this preset (leave blank to use URL):");
  let settings = getSearchSettings();
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
  if(preset.attributes){
    ["cmc", "pow", "tou"].forEach(attr => {
      if(preset.attributes[attr]){
        attributes[attr] = preset.attributes[attr];
        const slider = document.getElementById(attr + "Slider");
        const lowerHandle = document.getElementById(attr + "LowerHandle");
        const upperHandle = document.getElementById(attr + "UpperHandle");
        if(attributes[attr].lower !== null){
          lowerHandle.style.display = "block";
          lowerHandle.style.left = valueToPos(attributes[attr].lower) + "px";
          // Set operator appearance.
          lowerHandle.className = (attributes[attr].lowerOp === "=") ? "slider-handle lower-handle active" : "slider-handle lower-handle active";
        } else {
          lowerHandle.style.display = "none";
        }
        if(attributes[attr].upper !== null){
          upperHandle.style.display = "block";
          upperHandle.style.left = valueToPos(attributes[attr].upper) + "px";
          upperHandle.className = (attributes[attr].upperOp === "<=") ? "slider-handle upper-handle active" : "slider-handle upper-handle active";
        } else {
          upperHandle.style.display = "none";
        }
        const fill = slider.querySelector(".slider-fill");
        if(lowerHandle.style.display !== "none" && upperHandle.style.display !== "none"){
          let lowerX = parseFloat(lowerHandle.style.left);
          let upperX = parseFloat(upperHandle.style.left);
          fill.style.display = "block";
          fill.style.left = lowerX + "px";
          fill.style.width = (upperX - lowerX) + "px";
        } else {
          fill.style.display = "none";
        }
      }
    });
  }
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

/* --- Helper for Preset Loading --- */
function valueToPos(val) {
  const slider = document.getElementById("cmcSlider");
  const min = 0, max = 20;
  return (val - min) / (max - min) * slider.offsetWidth;
}

/* --- Search Function --- */
function performSearch(){
  let settings = getSearchSettings();
  console.log("Query:", settings.url);
  window.location.href = settings.url;
}

/* --- Type Button Style Update --- */
function updateTypeButtonStyle(btn){
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

/* --- Expansions Section --- */
function buildExpansionsToggles(){
  const container = document.getElementById("expansionsContainer");
  container.innerHTML = "";
  function createGroup(headerText, items){
    const header = document.createElement("div");
    header.className = "expansion-header";
    header.textContent = headerText;
    const group = document.createElement("div");
    group.className = "expansion-group";
    items.forEach(item => {
      const btn = document.createElement("button");
      btn.className = "expansion-btn";
      btn.textContent = item.label;
      btn.addEventListener("click", function(){
        const oracle = document.getElementById("oracle");
        if(oracle.value && !oracle.value.endsWith(" ")) oracle.value += " ";
        oracle.value += item.expansions.join(" ");
      });
      group.appendChild(btn);
    });
    header.addEventListener("click", function(){
      group.style.display = (group.style.display === "none") ? "flex" : "none";
    });
    container.appendChild(header);
    container.appendChild(group);
  }
  let common = [];
  EXPANSIONS_DATA.common.forEach(row => {
    row.forEach(item => { common.push(item); });
  });
  createGroup("Common", common);
  createGroup("Types", EXPANSIONS_DATA.typesExpansions);
  createGroup("Abilities", EXPANSIONS_DATA.abilitiesExpansions);
  const clearBtn = document.createElement("button");
  clearBtn.className = "expansion-clear-btn";
  clearBtn.textContent = "Clear Expansions";
  clearBtn.addEventListener("click", function(){
    document.getElementById("oracle").value = "";
  });
  container.appendChild(clearBtn);
}

//////////////////////
// Initialization
//////////////////////
document.addEventListener("DOMContentLoaded", function(){
  setupDualSlider("cmcSlider", "cmc");
  setupDualSlider("powSlider", "pow");
  setupDualSlider("touSlider", "tou");
  
  // Color Buttons.
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
      if(color === "C" && !checkbox.checked){
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
      } else if(color !== "C" && document.querySelector('input[name="color[]"][value="C"]').checked){
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
  
  // Type Buttons.
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
  
  // Rarity Buttons (grouping with OR).
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
  
  // Partial Toggle for Types.
  document.getElementById("typePartialToggle").addEventListener("click", function(){
    let btn = document.getElementById("typePartialToggle");
    btn.textContent = (btn.textContent.trim() === "=") ? "≈" : "=";
  });
  
  // Toggle for Color Matching.
  document.getElementById("colorToggle").addEventListener("click", function(){
    let btn = document.getElementById("colorToggle");
    btn.textContent = (btn.textContent.trim() === "At Most") ? "Exactly" : "At Most";
  });
  
  // Build Expansions UI.
  buildExpansionsToggles();
  
  // Clear Buttons.
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
  
  // Action Buttons.
  document.getElementById("searchActionButton").addEventListener("click", function(){
    autoSaveSearch();
    performSearch();
  });
  document.getElementById("searchFrontierActionButton").addEventListener("click", function(){
    document.getElementById("format_selector").value = "frontier";
    autoSaveSearch();
    performSearch();
  });
  
  // Preset Management.
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
