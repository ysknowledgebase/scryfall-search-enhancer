/* Version 0.5.17 */
// CONFIG and EXPANSIONS_DATA remain unchanged from previous versions.
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
// (EXPANSIONS_DATA omitted for brevity; assume it is as in previous versions.)

// Global variables for expansions.
let expansionsInserted = new Map();
let expansionsCycleIdx = new Map();
let quotesInserted = false;

// Global attribute state for dual sliders.
// For each attribute, lower and upper are null if not set.
let attributes = {
  cmc: { lower: null, lowerOp: "", upper: null, upperOp: "" },
  pow: { lower: null, lowerOp: "", upper: null, upperOp: "" },
  tou: { lower: null, lowerOp: "", upper: null, upperOp: "" }
};

/* --- Dual Slider Setup --- */
function setupDualSlider(sliderId, attrName) {
  const slider = document.getElementById(sliderId);
  const track = slider.querySelector(".slider-track");
  const fill = slider.querySelector(".slider-fill");
  const scale = slider.querySelector(".slider-scale");
  const min = 0, max = 20;
  
  // Build tick marks.
  scale.innerHTML = "";
  for(let i = min; i <= max; i++){
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
  
  // Initially, no handles.
  const lowerHandle = slider.querySelector(".lower-handle");
  const upperHandle = slider.querySelector(".upper-handle");
  lowerHandle.style.display = "none";
  upperHandle.style.display = "none";
  fill.style.display = "none";
  
  // Helper: convert value to pixel position.
  function valueToPos(val) {
    return (val - min) / (max - min) * slider.offsetWidth;
  }
  // Helper: convert pixel position to snapped integer value.
  function posToValue(pos) {
    return Math.round(pos / slider.offsetWidth * (max - min) + min);
  }
  
  // Click on slider track to add or reposition handles.
  slider.addEventListener("click", function(e) {
    if(e.target.classList.contains("slider-handle") ||
       e.target.classList.contains("handle-operator")){
      return;
    }
    const rect = slider.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    // If no handles exist, add a lower handle (exact match).
    if(lowerHandle.style.display === "none" && upperHandle.style.display === "none"){
      lowerHandle.style.display = "block";
      // Snap to nearest tick.
      let snappedVal = posToValue(clickX);
      let snappedX = valueToPos(snappedVal);
      lowerHandle.style.left = snappedX + "px";
      attributes[attrName].lower = snappedVal;
      attributes[attrName].lowerOp = "=";
      lowerHandle.className = "slider-handle lower-handle active";
      updateFill();
    } else if(lowerHandle.style.display !== "none" && upperHandle.style.display === "none"){
      // One handle exists.
      let currentX = parseFloat(lowerHandle.style.left);
      if(clickX > currentX){
        upperHandle.style.display = "block";
        let snappedVal = posToValue(clickX);
        let snappedX = valueToPos(snappedVal);
        upperHandle.style.left = snappedX + "px";
        attributes[attrName].upper = snappedVal;
        attributes[attrName].upperOp = "<";
        upperHandle.className = "slider-handle upper-handle outline";
        updateFill();
      } else {
        let snappedVal = posToValue(clickX);
        let snappedX = valueToPos(snappedVal);
        lowerHandle.style.left = snappedX + "px";
        attributes[attrName].lower = snappedVal;
        updateFill();
      }
    } else {
      // Both handles exist; reposition the one closest.
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
  
  // Dragging behavior for handles.
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
        // Snap to nearest tick.
        let snappedVal = posToValue(newX);
        let snappedX = valueToPos(snappedVal);
        handle.style.left = snappedX + "px";
        if(isLower){
          attributes[attrName].lower = snappedVal;
          document.getElementById(attrName + "LowerVal").textContent = snappedVal;
        } else {
          attributes[attrName].upper = snappedVal;
          document.getElementById(attrName + "UpperVal").textContent = snappedVal;
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
    
    // Toggle operator on click.
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
        if(attributes[attrName].upperOp === "<"){
          attributes[attrName].upperOp = "<=";
          handle.classList.remove("outline");
          handle.classList.add("active");
        } else {
          attributes[attrName].upperOp = "<";
          handle.classList.remove("active");
          handle.classList.add("outline");
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

/* --- Autosave and Preset Functions --- */
// (These functions remain as in version 0.5.15 but now include the attribute state.)
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
    rarities.forEach(r => { if(rarityMap[r]) queryParts.push("r:" + rarityMap[r]); });
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
    queryParts.push("oracle:" + oracle);
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

/* --- Initialization --- */
document.addEventListener("DOMContentLoaded", function(){
  // Setup dual sliders for each attribute.
  setupDualSlider("cmcSlider", "cmc");
  setupDualSlider("powSlider", "pow");
  setupDualSlider("touSlider", "tou");
  
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
  
  // --- Build Expansions UI ---
  // (Expansions code remains unchanged from previous versions.)
  // ...
  
  // --- Clear Buttons for other sections ---
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
