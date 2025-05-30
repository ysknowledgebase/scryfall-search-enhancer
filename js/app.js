/* Version 0.5.29 */
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
      { label: "x", expansions: ['" x "'] }
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
    { label: "Vigilance", expansions: ["vigilance"] }
  ]
};

//////////////////////
// GLOBAL VARIABLES
//////////////////////
let expansionsInserted = new Map();
let quotesInserted = false;
let attributes = {
  cmc: { lower: null, lowerOp: "", upper: null, upperOp: "" },
  pow: { lower: null, lowerOp: "", upper: null, upperOp: "" },
  tou: { lower: null, lowerOp: "", upper: null, upperOp: "" }
};

//////////////////////
// DUAL SLIDER SETUP (Range: 0 to 11; tick 11 shown as "+")
//////////////////////
function setupDualSlider(sliderId, attrName) {
  const slider = document.getElementById(sliderId);
  slider.style.width = "100%";
  const track = slider.querySelector(".slider-track");
  const fill = slider.querySelector(".slider-fill");
  const scale = slider.querySelector(".slider-scale");
  const min = 0, max = 11; // 11 is represented as "+"
  
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
    tickLabel.textContent = (i === max) ? "+" : i;
    scale.appendChild(tickLabel);
  }
  
  // Initially hide handles and fill.
  const lowerHandle = slider.querySelector(".lower-handle");
  const upperHandle = slider.querySelector(".upper-handle");
  lowerHandle.style.display = "none";
  upperHandle.style.display = "none";
  fill.style.display = "none";
  
  // Helper functions.
  function valueToPos(val) {
    return (val - min) / (max - min) * slider.offsetWidth;
  }
  function posToValue(pos) {
    return Math.round(pos / slider.offsetWidth * (max - min) + min);
  }
  
  // Update slider note.
  function updateSliderNote() {
    const noteEl = document.getElementById(attrName + "Note");
    let noteText = "";
    if (attributes[attrName].lower !== null && attributes[attrName].upper !== null) {
      // If upper equals max, treat it as no upper bound.
      if (attributes[attrName].upper === max) {
        noteText = `${attributes[attrName].lower} ≤ ${attrName.toUpperCase()}`;
      } else {
        noteText = `${attributes[attrName].lower} ≤ ${attrName.toUpperCase()} ≤ ${attributes[attrName].upper}`;
      }
    } else if (attributes[attrName].lower !== null) {
      noteText = `${attributes[attrName].lower} ≤ ${attrName.toUpperCase()}`;
    }
    noteEl.textContent = noteText;
  }
  
  // Click handler.
  slider.addEventListener("click", function(e) {
    if(e.target.classList.contains("slider-handle")) return;
    const rect = slider.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if(lowerHandle.style.display === "none" && upperHandle.style.display === "none") {
      lowerHandle.style.display = "block";
      let snappedVal = posToValue(clickX);
      // First handle cannot be set to max.
      if(snappedVal === max) snappedVal = max - 1;
      lowerHandle.style.left = valueToPos(snappedVal) + "px";
      attributes[attrName].lower = snappedVal;
      attributes[attrName].lowerOp = "=";
      lowerHandle.className = "slider-handle lower-handle active";
      updateFill();
      updateSliderNote();
    } else if(lowerHandle.style.display !== "none" && upperHandle.style.display === "none") {
      let curX = parseFloat(lowerHandle.style.left);
      if(clickX > curX) {
        upperHandle.style.display = "block";
        let snappedVal = posToValue(clickX);
        // Allow upper handle to be max (i.e. "+")
        upperHandle.style.left = valueToPos(snappedVal) + "px";
        attributes[attrName].upper = snappedVal;
        attributes[attrName].upperOp = (snappedVal === max) ? "" : "<=";
        upperHandle.className = "slider-handle upper-handle active";
        attributes[attrName].lowerOp = ">=";
        lowerHandle.className = "slider-handle lower-handle active";
        updateFill();
        updateSliderNote();
      } else {
        let snappedVal = posToValue(clickX);
        lowerHandle.style.left = valueToPos(snappedVal) + "px";
        attributes[attrName].lower = snappedVal;
        updateFill();
        updateSliderNote();
      }
    } else {
      let lowerX = parseFloat(lowerHandle.style.left);
      let upperX = parseFloat(upperHandle.style.left);
      if(Math.abs(clickX - lowerX) < Math.abs(clickX - upperX)) {
        let snappedVal = posToValue(clickX);
        lowerHandle.style.left = valueToPos(snappedVal) + "px";
        attributes[attrName].lower = snappedVal;
      } else {
        let snappedVal = posToValue(clickX);
        upperHandle.style.left = valueToPos(snappedVal) + "px";
        attributes[attrName].upper = snappedVal;
      }
      updateFill();
      updateSliderNote();
    }
  });
  
  // Double-click handler to remove handle.
  function addDoubleClickToHandle(handle, isLower) {
    handle.addEventListener("dblclick", function(e) {
      e.stopPropagation();
      handle.style.display = "none";
      if(isLower) {
        attributes[attrName].lower = null;
        attributes[attrName].lowerOp = "";
        if(upperHandle.style.display !== "none") {
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
        if(lowerHandle.style.display !== "none") {
          attributes[attrName].lowerOp = "=";
          lowerHandle.className = "slider-handle lower-handle active";
        }
      }
      updateFill();
      updateSliderNote();
    });
  }
  addDoubleClickToHandle(lowerHandle, true);
  addDoubleClickToHandle(upperHandle, false);
  
  // Draggable functionality.
  function makeDraggable(handle, isLower) {
    handle.addEventListener("mousedown", function(e) {
      e.preventDefault();
      e.stopPropagation();
      const rect = slider.getBoundingClientRect();
      function onMouseMove(e) {
        let newX = e.clientX - rect.left;
        if(isLower && upperHandle.style.display !== "none") {
          newX = Math.min(newX, parseFloat(upperHandle.style.left));
        }
        if(!isLower && lowerHandle.style.display !== "none") {
          newX = Math.max(newX, parseFloat(lowerHandle.style.left));
        }
        let snappedVal = posToValue(newX);
        // Prevent lower handle from reaching max.
        if(isLower && snappedVal === max) snappedVal = max - 1;
        handle.style.left = valueToPos(snappedVal) + "px";
        if(isLower) {
          attributes[attrName].lower = snappedVal;
        } else {
          attributes[attrName].upper = snappedVal;
        }
        updateFill();
        updateSliderNote();
      }
      function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
    handle.addEventListener("click", function(e) {
      e.stopPropagation();
      if(isLower) {
        if(attributes[attrName].lowerOp === "=") {
          attributes[attrName].lowerOp = ">=";
          handle.classList.remove("outline");
          handle.classList.add("active");
        } else {
          // Second click on lower handle removes it.
          handle.style.display = "none";
          attributes[attrName].lower = null;
          attributes[attrName].lowerOp = "";
        }
      } else {
        if(attributes[attrName].upperOp === "<=") {
          attributes[attrName].upperOp = "<";
          handle.classList.remove("active");
          handle.classList.add("outline");
        } else {
          attributes[attrName].upperOp = "<=";
          handle.classList.remove("outline");
          handle.classList.add("active");
        }
      }
      updateSliderNote();
    });
  }
  makeDraggable(lowerHandle, true);
  makeDraggable(upperHandle, false);
  
  function updateFill() {
    if(lowerHandle.style.display === "none" || upperHandle.style.display === "none") {
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
// Oracle Quotes Toggle
//////////////////////
function toggleQuotes() {
  const oracleEl = document.getElementById("oracle");
  let text = oracleEl.value;
  if(text.startsWith('"') && text.endsWith('"')) {
    oracleEl.value = text.slice(1, -1);
  } else {
    oracleEl.value = `"${text}"`;
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
      // Do not add an upper clause if upper equals max (i.e. "+").
      if(attributes[attr].upper !== 11) {
        queryParts.push(attr + attributes[attr].upperOp + attributes[attr].upper);
      }
    }
  });
  if(oracle){
    let exactMatches = [];
    let remainder = oracle;
    let quoteRegex = /"([^"]+)"/g;
    let match;
    while((match = quoteRegex.exec(oracle)) !== null){
      exactMatches.push(match[1]);
      remainder = remainder.replace(match[0], "").trim();
    }
    exactMatches.forEach(phrase => {
      queryParts.push(`oracle:"${phrase}"`);
    });
    if(remainder){
      let words = remainder.split(/\s+/);
      let wordQueries = words.map(w => "oracle:" + w).join(" ");
      queryParts.push(wordQueries);
    }
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
// Preset Management
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
          lowerHandle.className = "slider-handle lower-handle active";
        } else {
          lowerHandle.style.display = "none";
        }
        if(attributes[attr].upper !== null){
          upperHandle.style.display = "block";
          upperHandle.style.left = valueToPos(attributes[attr].upper) + "px";
          upperHandle.className = "slider-handle upper-handle active";
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

//////////////////////
// Helper for Preset Loading (slider helper)
//////////////////////
function valueToPos(val) {
  const slider = document.getElementById("cmcSlider");
  const min = 0, max = 11;
  return (val - min) / (max - min) * slider.offsetWidth;
}

//////////////////////
// Search Function
//////////////////////
function performSearch(){
  let settings = getSearchSettings();
  console.log("Query:", settings.url);
  window.location.href = settings.url;
}

//////////////////////
// Type Button Style Update
//////////////////////
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

//////////////////////
// Expansions Section
//////////////////////
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
        oracle.value = oracle.value.trim() + " ";
        // Special case: if label is '""', then toggle wrapping.
        if(item.label === '""') {
          toggleQuotes();
          return;
        }
        // For multiple alternatives, cycle them.
        if(item.expansions && item.expansions.length > 1) {
          if(expansionsInserted.has(item.label)) {
            let idx = expansionsInserted.get(item.label);
            removeLastOccurrence(oracle, item.expansions[idx].trim());
            idx = (idx + 1) % item.expansions.length;
            if(idx === 0) {
              expansionsInserted.delete(item.label);
            } else {
              oracle.value = oracle.value.trim() + " " + item.expansions[idx].trim() + " ";
              expansionsInserted.set(item.label, idx);
            }
          } else {
            oracle.value = oracle.value.trim() + " " + item.expansions[0].trim() + " ";
            expansionsInserted.set(item.label, 0);
          }
        } else {
          // For single alternative.
          if(!expansionsInserted.has(item.label)) {
            oracle.value = oracle.value.trim() + " " + item.expansions.join(" ").trim() + " ";
            expansionsInserted.set(item.label, 0);
          } else {
            removeLastOccurrence(oracle, item.expansions.join(" ").trim());
            expansionsInserted.delete(item.label);
          }
        }
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
    expansionsInserted.clear();
  });
  container.appendChild(clearBtn);
}

//////////////////////
// Utility: Remove last occurrence of a substring.
//////////////////////
function removeLastOccurrence(oracleEl, sub) {
  let text = oracleEl.value;
  let idx = text.lastIndexOf(sub);
  if(idx !== -1){
    oracleEl.value = text.substring(0, idx) + text.substring(idx + sub.length);
  }
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
  
  // Rarity Buttons.
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
