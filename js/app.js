/* Version 0.5.34 */
//////////////////////
// CONFIG & DATA
//////////////////////
const CONFIG = {
  formatData: {
    formats: [
      { value: "", text: "Select Format", color: "#007bff", sets: null },
      { value: "standard", text: "Standard", color: "blue", sets: null },
      { value: "futureStandard", text: "Future Standard", color: "green", sets: ["fdn","dft","tdm","fin","eoe","spm","tla","ecl","tmt","sos"] },
      { value: "frontier", text: "Frontier", color: "purple", sets: ["dsk","blb","otj","big","mkm","fdn","dft","tdm","fin","eoe","spm","tla","ecl","tmt","sos"] },
        { value: "fdn", text: "FDN", color: "orange", sets: ["fdn"] },
        { value: "dft", text: "DFT", color: "brown",  sets: ["dft"] },
        { value: "tdm", text: "TDM", color: "red",    sets: ["tdm"] },
        { value: "fin", text: "FIN", color: "teal",    sets: ["fin"] },
        { value: "eoe", text: "EOE", color: "black",    sets: ["eoe"] },
        { value: "spm", text: "SPM", color: "pink",    sets: ["spm"] },
        { value: "tla", text: "TLA", color: "blue",    sets: ["tla"] },
        { value: "ecl", text: "ECL", color: "lightgreen",    sets: ["ecl"] },
 { value: "tmt", text: "TMT", color: "green",    sets: ["tmt"] },
        { value: "sos", text: "SOS", color: "lightblue",    sets: ["sos"] }
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

/* Version 0.5.39 */

//////////////////////
// CUSTOM FORMAT SYSTEM
//////////////////////

const CUSTOM_FORMAT_KEY = "customFormats_v1";

function loadCustomFormats() {

  try {
    return JSON.parse(
      localStorage.getItem(CUSTOM_FORMAT_KEY)
    ) || [];

  } catch {

    return [];
  }
}

function saveCustomFormats(data) {

  localStorage.setItem(
    CUSTOM_FORMAT_KEY,
    JSON.stringify(data)
  );
}

function getAllFormats() {

  const base = CONFIG.formatData.formats;
  const custom = loadCustomFormats();

  const map = new Map();

  base.forEach(f => {
    map.set(f.value, { ...f });
  });

  custom.forEach(f => {
    map.set(f.value, { ...f });
  });

  return Array.from(map.values());
}

async function fetchScryfallSets() {

  try {

    const res =
      await fetch("https://api.scryfall.com/sets");

    const data = await res.json();

    return data.data.map(s => ({
      code: s.code,
      name: s.name
    }));

  } catch {

    alert("Failed to fetch sets");

    return [];
  }
}

function updateFormatDropdown() {

  const select =
    document.getElementById("format_selector");

  if (!select) return;

  const formats = getAllFormats();

  select.innerHTML = "";

  formats.forEach(fmt => {

    const opt = document.createElement("option");

    opt.value = fmt.value;
    opt.textContent = fmt.text;

    opt.style.color =
      fmt.color || "#007bff";

    select.appendChild(opt);
  });
}

function createMiniButton(text, color) {

  const btn = document.createElement("button");

  btn.textContent = text;

  btn.style.fontSize = "12px";
  btn.style.padding = "6px";

  btn.style.backgroundColor = color;

  btn.style.color = "#fff";

  btn.style.border = "none";

  btn.style.borderRadius = "5px";

  btn.style.cursor = "pointer";

  return btn;
}

async function openFormatEditor(existingFormat = null) {

  const modal = document.createElement("div");

  modal.style.position = "fixed";

  modal.style.top = "50%";

  modal.style.left = "50%";

  modal.style.transform =
    "translate(-50%, -50%)";

  modal.style.background = "#fff";

  modal.style.padding = "15px";

  modal.style.border = "1px solid #ccc";

  modal.style.borderRadius = "8px";

  modal.style.zIndex = "999999";

  modal.style.display = "flex";

  modal.style.flexDirection = "column";

  modal.style.gap = "10px";

  modal.style.width = "350px";

  modal.style.maxHeight = "500px";
/* Version 0.5.58 */

modal.style.overflowY =
  "auto";
  const title = document.createElement("div");

  title.textContent =
    existingFormat
      ? "Edit Format"
      : "Create Format";

  title.style.fontWeight = "bold";

  const nameInput =
    document.createElement("input");

  nameInput.placeholder = "Format name";

  nameInput.style.padding = "6px";

  nameInput.value =
    existingFormat?.text || "";

  const colorInput =
    document.createElement("input");

  colorInput.type = "color";

  colorInput.value =
    existingFormat?.color || "#007bff";

 
/* Version 0.5.41 */

const searchInput =
  document.createElement("input");

searchInput.placeholder =
  "Search sets...";

searchInput.style.padding = "6px";

searchInput.style.border =
  "1px solid #ccc";

searchInput.style.borderRadius = "5px";

const setContainer =
  document.createElement("div");

setContainer.style.border =
  "1px solid #ccc";

setContainer.style.borderRadius = "5px";

setContainer.style.padding = "5px";

setContainer.style.overflowY = "auto";

setContainer.style.maxHeight = "250px";

setContainer.textContent =
  "Loading sets...";

modal.appendChild(title);

modal.appendChild(nameInput);

modal.appendChild(colorInput);

modal.appendChild(searchInput);

modal.appendChild(setContainer);

  document.body.appendChild(modal);

  const sets = await fetchScryfallSets();

  setContainer.innerHTML = "";

  const selectedSets =
    new Set(existingFormat?.sets || []);

/* Version 0.5.40 */

const setRows = [];

sets.forEach(s => {

  const row = document.createElement("div");

  row.dataset.search =
    `${s.code} ${s.name}`.toLowerCase();

  row.style.display = "flex";

  row.style.alignItems = "center";

  row.style.gap = "6px";

  row.style.cursor = "pointer";

  row.style.padding = "3px";

  row.style.borderRadius = "4px";

  const checkbox =
    document.createElement("input");

  checkbox.type = "checkbox";

  checkbox.checked =
    selectedSets.has(s.code);

  const label =
    document.createElement("span");

  label.textContent =
    `${s.code.toUpperCase()} - ${s.name}`;

  function updateStyle() {

    if (checkbox.checked) {

      row.style.backgroundColor =
        "#d0ebff";

      row.style.fontWeight = "bold";

    } else {

      row.style.backgroundColor = "";

      row.style.fontWeight = "normal";
    }
  }

  updateStyle();

 /* Version 0.5.62 */

function syncSelection() {

  if (checkbox.checked) {

    selectedSets.add(s.code);

  } else {

    selectedSets.delete(s.code);
  }

  updateStyle();
}

checkbox.addEventListener(
  "click",
  e => {

    e.stopPropagation();

    syncSelection();
  }
);

row.onclick = () => {

  checkbox.checked =
    !checkbox.checked;

  syncSelection();
};
  row.appendChild(checkbox);

  row.appendChild(label);

  setContainer.appendChild(row);

  setRows.push(row);
});

searchInput.addEventListener("input", () => {

  const q =
    searchInput.value
    .trim()
    .toLowerCase();

  setRows.forEach(row => {

    if (!q) {

      row.style.display = "flex";

      return;
    }

    const match =
      row.dataset.search.includes(q);

    row.style.display =
      match ? "flex" : "none";
  });
});

  const buttonRow =
    document.createElement("div");

  buttonRow.style.display = "flex";

  buttonRow.style.justifyContent =
    "space-between";

  const saveBtn =
    createMiniButton("Save", "#28a745");

  const cancelBtn =
    createMiniButton("Cancel", "#6c757d");

  buttonRow.appendChild(saveBtn);

  buttonRow.appendChild(cancelBtn);

  modal.appendChild(buttonRow);

  saveBtn.onclick = () => {

    const name =
      nameInput.value.trim();

    if (!name) {

      alert("Enter format name");

      return;
    }

    const custom =
      loadCustomFormats();

    const newFormat = {

      value: name,

      text: name,

      color: colorInput.value,

      sets: Array.from(selectedSets)
    };

    const idx =
      custom.findIndex(
        f => f.value === name
      );

    if (idx !== -1) {

      custom[idx] = newFormat;

    } else {

      custom.push(newFormat);
    }

    saveCustomFormats(custom);

    updateFormatDropdown();

    document.getElementById(
      "format_selector"
    ).value = name;

    document.body.removeChild(modal);
  };

  cancelBtn.onclick = () => {

    document.body.removeChild(modal);
  };
}

function deleteCurrentFormat() {

  const select =
    document.getElementById(
      "format_selector"
    );

  const value = select.value;

  if (!value) {

    alert("Select a format");

    return;
  }

  let custom =
    loadCustomFormats();

  const filtered =
    custom.filter(
      f => f.value !== value
    );

  if (filtered.length === custom.length) {

    alert("Cannot delete built-in format");

    return;
  }

  saveCustomFormats(filtered);

  updateFormatDropdown();

  select.value = "";
}

function injectFormatButtons() {

  const wrapper =
    document.querySelector(
      "#formatGroup .selector-row"
    );

  if (!wrapper) return;

  const addBtn =
    createMiniButton("+", "#28a745");

  addBtn.title = "Add Format";

  addBtn.onclick = () => {

    openFormatEditor();
  };

  const editBtn =
    createMiniButton("✎", "#17a2b8");

  editBtn.title = "Edit Format";

  editBtn.onclick = () => {

    const value =
      document.getElementById(
        "format_selector"
      ).value;

    if (!value) {

      alert("Select format");

      return;
    }

    const formats =
      getAllFormats();

    const fmt =
      formats.find(
        f => f.value === value
      );

    if (!fmt) return;

    openFormatEditor(fmt);
  };

  const deleteBtn =
    createMiniButton("🗑", "#dc3545");

  deleteBtn.title = "Delete Format";

  deleteBtn.onclick =
    deleteCurrentFormat;

  wrapper.appendChild(addBtn);

  wrapper.appendChild(editBtn);

  wrapper.appendChild(deleteBtn);
}

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

/* Version 0.5.51 */

const EXPANSION_USAGE_KEY =
  "expansionUsage_v1";

  /* Version 0.5.56 */

const CUSTOM_EXPANSIONS_KEY =
  "customExpansions_v1";

  /* Version 0.5.57 */

const FAVORITE_EXPANSIONS_KEY =
  "favoriteExpansions_v1";

/* Version 0.5.44 */

/* Version 0.5.49 */

let customTypeButtons = [];

const CUSTOM_TYPES_STORAGE_KEY =
  "customAddedTypes_v1";
let attributes = {
  cmc: { lower: null, lowerOp: "", upper: null, upperOp: "" },
  pow: { lower: null, lowerOp: "", upper: null, upperOp: "" },
  tou: { lower: null, lowerOp: "", upper: null, upperOp: "" }
};


/* Version 0.5.35 */

//////////////////////
// TEXTBOX FILTER SETUP
//////////////////////

function cycleOperator(btn) {
  const states = ["<", "<=", "="];
  let current = btn.textContent.trim();
  let idx = states.indexOf(current);
  idx = (idx + 1) % states.length;
  btn.textContent = states[idx];
}

function setupAttributeFilter(attrName) {

  const lowerInput = document.getElementById(attrName + "LowerInput");
  const upperInput = document.getElementById(attrName + "UpperInput");

  const lowerOpBtn = document.getElementById(attrName + "LowerOp");
  const upperOpBtn = document.getElementById(attrName + "UpperOp");

  lowerOpBtn.addEventListener("click", function () {
    cycleOperator(lowerOpBtn);
  });

  upperOpBtn.addEventListener("click", function () {
    cycleOperator(upperOpBtn);
  });

  function syncValues() {

    const lowerVal = lowerInput.value.trim();
    const upperVal = upperInput.value.trim();

    attributes[attrName].lower =
      lowerVal === "" ? null : parseInt(lowerVal);

    attributes[attrName].upper =
      upperVal === "" ? null : parseInt(upperVal);

    attributes[attrName].lowerOp =
      lowerVal === "" ? "" : lowerOpBtn.textContent.trim();

    attributes[attrName].upperOp =
      upperVal === "" ? "" : upperOpBtn.textContent.trim();
  }

  lowerInput.addEventListener("input", syncValues);
  upperInput.addEventListener("input", syncValues);

  syncValues();
}

/* Version 0.5.35 */

//////////////////////
// Clear Attribute Function
//////////////////////

function clearSlider(attrName) {

  attributes[attrName].lower = null;
  attributes[attrName].upper = null;

  attributes[attrName].lowerOp = "";
  attributes[attrName].upperOp = "";

  document.getElementById(attrName + "LowerInput").value = "";
  document.getElementById(attrName + "UpperInput").value = "";

  document.getElementById(attrName + "LowerOp").textContent = "<";
  document.getElementById(attrName + "UpperOp").textContent = "<";
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
/* Version 0.5.39 */

let fmtObj =
  getAllFormats().find(
    f => f.value === format
  );
/* Version 0.5.50 */

if (fmtObj && fmtObj.sets) {

  let clause =
    "(" +
    fmtObj.sets
      .map(s => "set:" + s)
      .join(" OR ") +
    ")";

  queryParts.push(clause);
}

// =========================
// STANDARD SPECIAL CASE
// =========================

else if (
  format === "standard"
) {

  queryParts.push(
    "legal:standard"
  );

  queryParts.push(
    "prefer:best"
  );
}

// =========================
// OTHER SCRYFALL FORMATS
// =========================

else {

  queryParts.push(
    "f:" + format
  );
}
  }
/* Version 0.5.37 */

/* Version 0.5.42 */

if (colors.length > 0) {

  const playableEnabled =
    document.getElementById(
      "playableColorToggle"
    ).checked;

  // =========================
  // PLAYABLE COLOR MODE
  // =========================

  if (playableEnabled) {

    const all =
      ["w","u","b","r","g"];

    let playableParts = [];

    colors.forEach(c => {

      const lower =
        c.toLowerCase();

      // Mono-color cards
      playableParts.push(
        `c:${lower}`
      );

      // Hybrid mana cards
      all.forEach(other => {

        if (other !== lower) {

          playableParts.push(
            `mana:{${lower}/${other}}`
          );
        }
      });
    });

    // Include colorless
    playableParts.push("c:c");

    let playableQuery =
      "(" +
      playableParts.join(" OR ") +
      ")";

    // Exclude off-color mana
    const excluded =
      all.filter(
        c => !colors.includes(
          c.toUpperCase()
        )
      );

    excluded.forEach(c => {

      playableQuery +=
        ` -mana:{${c}}`;
    });

    queryParts.push(
      "prefer:best"
    );

    queryParts.push(
      playableQuery
    );
  }

  // =========================
  // NORMAL COLOR MODE
  // =========================

  else {

    let colorToggle =
      document.getElementById(
        "colorToggle"
      )
      .textContent
      .trim();

    let operator = "c<=";

    if (colorToggle === "Exactly") {
      operator = "c=";
    }
    else if (colorToggle === "Include") {
      operator = "c>=";
    }

    queryParts.push(
      operator + colors.join("")
    );
  }
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
/* Version 0.5.36 */

["cmc", "pow", "tou"].forEach(attr => {

  // LEFT SIDE = LOWER BOUND
  if (attributes[attr].lower !== null) {

    let lowerOp = attributes[attr].lowerOp;

    // Convert UI operators to Scryfall lower-bound operators
    if (lowerOp === "<") {
      lowerOp = ">";
    }
    else if (lowerOp === "<=") {
      lowerOp = ">=";
    }
    else if (lowerOp === "=") {
      lowerOp = "=";
    }

    queryParts.push(
      attr + lowerOp + attributes[attr].lower
    );
  }

  // RIGHT SIDE = UPPER BOUND
  if (attributes[attr].upper !== null) {

    let upperOp = attributes[attr].upperOp;

    // Right side remains standard
    if (upperOp === "=") {
      upperOp = "=";
    }
    else if (upperOp === "<=") {
      upperOp = "<=";
    }
    else {
      upperOp = "<";
    }

    queryParts.push(
      attr + upperOp + attributes[attr].upper
    );
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
/* Version 0.5.35 */

document.getElementById(attr + "LowerInput").value =
  attributes[attr].lower !== null
    ? attributes[attr].lower
    : "";

document.getElementById(attr + "UpperInput").value =
  attributes[attr].upper !== null
    ? attributes[attr].upper
    : "";

document.getElementById(attr + "LowerOp").textContent =
  attributes[attr].lowerOp || "<";

document.getElementById(attr + "UpperOp").textContent =
  attributes[attr].upperOp || "<";
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

/* Version 0.5.44 */

//////////////////////
// CUSTOM TYPE SYSTEM
//////////////////////



function getAllSelectedTypes() {

  const result = [];

  document.querySelectorAll(".type-btn").forEach(btn => {

    const state = btn.dataset.state;

    if (state !== "default") {

      result.push({
        type: btn.dataset.type,
        state
      });
    }
  });

  return result;
}

function createCustomTypeButton(typeName) {

  const container =
    document.getElementById(
      "addedTypesContainer"
    );

  if (!container) return;

  const btn =
    document.createElement("button");

  btn.className =
    "type-btn custom-type-btn";

  btn.dataset.type =
    typeName;

  btn.dataset.state =
    "include";

  btn.textContent =
    typeName.toUpperCase();

  updateTypeButtonStyle(btn);

  btn.addEventListener(
    "click",
    function () {

      let current =
        btn.dataset.state;

      let next =
        (current === "default")
          ? "include"
          : (current === "include")
          ? "exclude"
          : "default";

      btn.dataset.state =
        next;

      updateTypeButtonStyle(btn);
      saveCustomTypes();
    }
  );

  container.appendChild(btn);

  customTypeButtons.push(btn);
  saveCustomTypes();
}
/* Version 0.5.47 */

async function fetchAllTypes() {

  try {

    // =========================
    // CREATURE TYPES
    // =========================

    const creatureRes =
      await fetch(
        "https://api.scryfall.com/catalog/creature-types"
      );

    const creatureData =
      await creatureRes.json();

    // =========================
    // STATIC NON-CREATURE TYPES
    // =========================

    const staticTypes = [

      // -------------------------
      // SUPERTYPES
      // -------------------------

      "basic",
      "legendary",
      "ongoing",
      "snow",
      "world",

      // -------------------------
      // CARD TYPES
      // -------------------------

      "artifact",
      "battle",
      "conspiracy",
      "creature",
      "dungeon",
      "enchantment",
      "instant",
      "kindred",
      "land",
      "phenomenon",
      "plane",
      "planeswalker",
      "scheme",
      "sorcery",
      "tribal",
      "vanguard",

      // -------------------------
      // ARTIFACT SUBTYPES
      // -------------------------

      "blood",
      "clue",
      "contraption",
      "equipment",
      "food",
      "fortification",
      "gold",
      "incubator",
      "junk",
      "map",
      "powerstone",
      "treasure",
      "vehicle",

      // -------------------------
      // ENCHANTMENT SUBTYPES
      // -------------------------

      "aura",
      "cartouche",
      "case",
      "class",
      "curse",
      "role",
      "rune",
      "saga",
      "shard",
      "shrine",

      // -------------------------
      // LAND SUBTYPES
      // -------------------------

      "cave",
      "desert",
      "forest",
      "gate",
      "island",
      "lair",
      "locus",
      "mine",
      "mountain",
      "plains",
      "power-plant",
      "sphere",
      "swamp",
      "tower",
      "urzas",

      // -------------------------
      // SPELL SUBTYPES
      // -------------------------

      "adventure",
      "arcane",
      "lesson",
      "omen",
      "trap",

      // -------------------------
      // BATTLE SUBTYPES
      // -------------------------

      "siege",

      // -------------------------
      // MISC
      // -------------------------

      "attraction",
      "dungeon"
    ];

    // =========================
    // MERGE
    // =========================

    const merged = [

      ...creatureData.data,
      ...staticTypes
    ];

    const unique =
      [...new Set(merged)];

    unique.sort(
      (a, b) =>
        a.localeCompare(b)
    );

    return unique;

  } catch (err) {

    console.error(err);

    alert(
      "Failed to load types"
    );

    return [];
  }
}

/* Version 0.5.46 */

/* Version 0.5.48 */
/* Version 0.5.49 */

function saveCustomTypes() {

  const data = [];

  document
    .querySelectorAll(
      ".custom-type-btn"
    )
    .forEach(btn => {

      data.push({

        type:
          btn.dataset.type,

        state:
          btn.dataset.state
      });
    });

  localStorage.setItem(
    CUSTOM_TYPES_STORAGE_KEY,
    JSON.stringify(data)
  );
}

function restoreCustomTypes() {

  try {

    const raw =
      localStorage.getItem(
        CUSTOM_TYPES_STORAGE_KEY
      );

    if (!raw) return;

    const data =
      JSON.parse(raw);

    data.forEach(obj => {

      createCustomTypeButton(
        obj.type
      );

      const btn =
        Array.from(
          document.querySelectorAll(
            ".custom-type-btn"
          )
        ).find(
          b =>
            b.dataset.type ===
            obj.type
        );

      if (btn) {

        btn.dataset.state =
          obj.state;

        updateTypeButtonStyle(
          btn
        );
      }
    });

  } catch (err) {

    console.error(err);
  }
}

function openDeleteTypePicker() {

  const modal =
    document.createElement("div");

  modal.style.position =
    "fixed";

  modal.style.top =
    "50%";

  modal.style.left =
    "50%";

  modal.style.transform =
    "translate(-50%, -50%)";

  modal.style.background =
    "#fff";

  modal.style.padding =
    "15px";

  modal.style.border =
    "1px solid #ccc";

  modal.style.borderRadius =
    "8px";

  modal.style.zIndex =
    "999999";

  modal.style.display =
    "flex";

  modal.style.flexDirection =
    "column";

  modal.style.gap =
    "10px";

  modal.style.width =
    "320px";

  const title =
    document.createElement("div");

  title.textContent =
    "Delete Added Types";

  title.style.fontWeight =
    "bold";

  modal.appendChild(title);

  const list =
    document.createElement("div");

  list.style.maxHeight =
    "300px";

  list.style.overflowY =
    "auto";

  list.style.display =
    "flex";

  list.style.flexDirection =
    "column";

  list.style.gap =
    "6px";

  modal.appendChild(list);

  const selected =
    new Set();

  const buttons =
    Array.from(
      document.querySelectorAll(
        ".custom-type-btn"
      )
    );

  if (
    buttons.length === 0
  ) {

    const empty =
      document.createElement(
        "div"
      );

    empty.textContent =
      "No added types.";

    list.appendChild(empty);
  }

  buttons.forEach(btn => {

    const row =
      document.createElement(
        "div"
      );

    row.style.display =
      "flex";

    row.style.alignItems =
      "center";

    row.style.gap =
      "8px";

    row.style.padding =
      "4px";

    row.style.cursor =
      "pointer";

    const checkbox =
      document.createElement(
        "input"
      );

    checkbox.type =
      "checkbox";

    const label =
      document.createElement(
        "span"
      );

    label.textContent =
      btn.dataset.type;

    /* Version 0.5.62 */

function syncSelection() {

  if (
    checkbox.checked
  ) {

    selected.add(btn);

  } else {

    selected.delete(btn);
  }
}

checkbox.addEventListener(
  "click",
  e => {

    e.stopPropagation();

    syncSelection();
  }
);

row.onclick = () => {

  checkbox.checked =
    !checkbox.checked;

  syncSelection();
};

    row.appendChild(
      checkbox
    );

    row.appendChild(
      label
    );

    list.appendChild(row);
  });

  const buttonRow =
    document.createElement(
      "div"
    );

  buttonRow.style.display =
    "flex";

  buttonRow.style.justifyContent =
    "space-between";

  const deleteBtn =
    createMiniButton(
      "Delete Selected",
      "#dc3545"
    );

  const closeBtn =
    createMiniButton(
      "Close",
      "#6c757d"
    );

  buttonRow.appendChild(
    deleteBtn
  );

  buttonRow.appendChild(
    closeBtn
  );

  modal.appendChild(
    buttonRow
  );

  deleteBtn.onclick =
    () => {

      selected.forEach(btn => {

        btn.remove();
      });

      saveCustomTypes();

      document.body.removeChild(
        modal
      );
    };

  closeBtn.onclick =
    () => {

      document.body.removeChild(
        modal
      );
    };

  document.body.appendChild(
    modal
  );
}

async function openTypePicker() {

  const modal =
    document.createElement("div");

  modal.style.position =
    "fixed";

  modal.style.top = "50%";

  modal.style.left = "50%";

  modal.style.transform =
    "translate(-50%, -50%)";

  modal.style.background =
    "#fff";

  modal.style.padding =
    "15px";

  modal.style.border =
    "1px solid #ccc";

  modal.style.borderRadius =
    "8px";

  modal.style.zIndex =
    "999999";

  modal.style.display =
    "flex";

  modal.style.flexDirection =
    "column";

  modal.style.gap =
    "10px";

  modal.style.width =
    "350px";

  modal.style.maxHeight =
    "500px";
    /* Version 0.5.58 */

modal.style.overflowY =
  "auto";

  // =========================
  // TITLE
  // =========================

  const title =
    document.createElement("div");

  title.textContent =
    "Add Types";

  title.style.fontWeight =
    "bold";

  // =========================
  // SEARCH
  // =========================

  const search =
    document.createElement("input");

  search.placeholder =
    "Search type...";

  search.style.padding =
    "6px";

  search.style.border =
    "1px solid #ccc";

  search.style.borderRadius =
    "5px";

  // =========================
  // LIST
  // =========================

  const list =
    document.createElement("div");

  list.style.border =
    "1px solid #ccc";

  list.style.borderRadius =
    "6px";

  list.style.maxHeight =
    "300px";

  list.style.overflowY =
    "auto";

  list.style.padding =
    "6px";

  list.textContent =
    "Loading types...";

  modal.appendChild(title);

  modal.appendChild(search);

  modal.appendChild(list);

  document.body.appendChild(
    modal
  );

  // =========================
  // LOAD TYPES
  // =========================

  const ALL_EXTRA_TYPES =
    await fetchAllTypes();

  list.innerHTML = "";

  const existing =
    new Set(
      Array.from(
        document.querySelectorAll(
          ".custom-type-btn"
        )
      ).map(
        b => b.dataset.type
      )
    );

  const selected =
    new Set();

  const rows = [];

  ALL_EXTRA_TYPES.forEach(type => {

    const row =
      document.createElement("div");

    row.dataset.search =
      type.toLowerCase();

    row.style.display =
      "flex";

    row.style.alignItems =
      "center";

    row.style.gap =
      "8px";

    row.style.padding =
      "5px";

    row.style.cursor =
      "pointer";

    row.style.borderRadius =
      "4px";

    const checkbox =
      document.createElement("input");

    checkbox.type =
      "checkbox";

    checkbox.disabled =
      existing.has(type);

    const label =
      document.createElement("span");

    label.textContent =
      type;

    if (existing.has(type)) {

      row.style.opacity =
        "0.45";

      label.textContent +=
        " (added)";
    }

    function refreshStyle() {

      if (
        checkbox.checked
      ) {

        row.style.background =
          "#d0ebff";

      } else {

        row.style.background =
          "";
      }
    }

/* Version 0.5.62 */

function syncSelection() {

  if (
    checkbox.checked
  ) {

    selected.add(type);

  } else {

    selected.delete(type);
  }

  refreshStyle();
}

checkbox.addEventListener(
  "click",
  e => {

    e.stopPropagation();

    syncSelection();
  }
);

row.onclick = () => {

  if (
    checkbox.disabled
  ) {
    return;
  }

  checkbox.checked =
    !checkbox.checked;

  syncSelection();
};
    row.appendChild(
      checkbox
    );

    row.appendChild(
      label
    );

    list.appendChild(
      row
    );

    rows.push(row);
  });

  // =========================
  // SEARCH FILTER
  // =========================

  search.addEventListener(
    "input",
    () => {

      const q =
        search.value
        .trim()
        .toLowerCase();

      rows.forEach(row => {

        if (
          !q ||
          row.dataset.search.includes(q)
        ) {

          row.style.display =
            "flex";

        } else {

          row.style.display =
            "none";
        }
      });
    }
  );

  // =========================
  // BUTTONS
  // =========================

  const buttonRow =
    document.createElement("div");

  buttonRow.style.display =
    "flex";

  buttonRow.style.justifyContent =
    "space-between";

  const addBtn =
    createMiniButton(
      "Add Selected",
      "#28a745"
    );

  const cancelBtn =
    createMiniButton(
      "Cancel",
      "#6c757d"
    );

  buttonRow.appendChild(
    addBtn
  );

  buttonRow.appendChild(
    cancelBtn
  );

  modal.appendChild(
    buttonRow
  );

  // =========================
  // ADD SELECTED
  // =========================

  addBtn.onclick =
    () => {

      selected.forEach(type => {

        createCustomTypeButton(
          type
        );
      });

      document.body.removeChild(
        modal
      );
    };

  cancelBtn.onclick =
    () => {

      document.body.removeChild(
        modal
      );
    };
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
      btn.addEventListener(
  "click",
  function(){

    insertExpansion(
      item
    );
  }
);
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

/* Version 0.5.51 */

//////////////////////
// MOST USED EXPANSIONS
//////////////////////

/* Version 0.5.55 */

function loadExpansionUsage() {

  try {

    const raw =
      JSON.parse(
        localStorage.getItem(
          EXPANSION_USAGE_KEY
        )
      ) || {};

    // =========================
    // MIGRATE OLD FORMAT
    // =========================

    Object.keys(raw).forEach(
      key => {

        // Old format:
        // "Cnt": 5

        if (
          typeof raw[key] ===
          "number"
        ) {

          raw[key] = {

            count: raw[key],

            createdAt:
              Date.now()
          };
        }

        // Missing createdAt
        if (
          raw[key].createdAt ==
          null
        ) {

          raw[key].createdAt =
            Date.now();
        }
      }
    );

    return raw;

  } catch {

    return {};
  }
}

function saveExpansionUsage(data) {

  localStorage.setItem(
    EXPANSION_USAGE_KEY,
    JSON.stringify(data)
  );
}

/* Version 0.5.56 */

function loadCustomExpansions() {

  try {

    return JSON.parse(
      localStorage.getItem(
        CUSTOM_EXPANSIONS_KEY
      )
    ) || [];

  } catch {

    return [];
  }
}

function saveCustomExpansions(data) {

  localStorage.setItem(
    CUSTOM_EXPANSIONS_KEY,
    JSON.stringify(data)
  );
}
/* Version 0.5.57 */

function loadFavoriteExpansions() {

  try {

    return JSON.parse(
      localStorage.getItem(
        FAVORITE_EXPANSIONS_KEY
      )
    ) || [];

  } catch {

    return [];
  }
}

function saveFavoriteExpansions(data) {

  localStorage.setItem(
    FAVORITE_EXPANSIONS_KEY,
    JSON.stringify(data)
  );
}

function renderFavoriteExpansionButtons() {

  const container =
    document.getElementById(
      "favoriteExpansionButtons"
    );

  if (!container) return;

  container.innerHTML = "";

  const favorites =
    loadFavoriteExpansions();

  favorites.forEach(label => {

    const item =
      getExpansionItemByLabel(
        label
      );

    if (!item) return;

    const btn =
      document.createElement(
        "button"
      );

    btn.className =
      "expansion-btn";

    btn.textContent =
      label;

    btn.addEventListener(
      "click",
      () => {

        insertExpansion(
          item
        );
      }
    );

    container.appendChild(
      btn
    );
  });
}

function getAllExpansionItems() {

  const all = [];

  EXPANSIONS_DATA.common
    .forEach(row => {

      row.forEach(item => {

        all.push(item);
      });
    });

  EXPANSIONS_DATA.typesExpansions
    .forEach(item => {

      all.push(item);
    });

  EXPANSIONS_DATA.abilitiesExpansions
    .forEach(item => {

      all.push(item);
    });

  return all;
}

function openFavoriteExpansionPicker() {

  const modal =
    document.createElement(
      "div"
    );

  modal.style.position =
    "fixed";

  modal.style.top =
    "50%";

  modal.style.left =
    "50%";

  modal.style.transform =
    "translate(-50%, -50%)";

  modal.style.background =
    "#fff";

  modal.style.padding =
    "15px";

  modal.style.border =
    "1px solid #ccc";

  modal.style.borderRadius =
    "8px";

  modal.style.zIndex =
    "999999";

  modal.style.display =
    "flex";

  modal.style.flexDirection =
    "column";

  modal.style.gap =
    "10px";

  modal.style.width =
    "350px";

  modal.style.maxHeight =
    "500px";


 modal.style.overflowY =
  "auto";
  const title =
    document.createElement(
      "div"
    );

  title.textContent =
    "Add Favorite Expansions";

  title.style.fontWeight =
    "bold";

  const search =
    document.createElement(
      "input"
    );

  search.placeholder =
    "Search expansions...";

  search.style.padding =
    "6px";

  const list =
    document.createElement(
      "div"
    );

  list.style.border =
    "1px solid #ccc";

  list.style.borderRadius =
    "6px";

  list.style.maxHeight =
    "300px";

  list.style.overflowY =
    "auto";

  list.style.padding =
    "6px";

  modal.appendChild(title);

  modal.appendChild(search);

  modal.appendChild(list);

  document.body.appendChild(
    modal
  );

  const existing =
    new Set(
      loadFavoriteExpansions()
    );

  const selected =
    new Set();

  const rows = [];

  getAllExpansionItems()
    .forEach(item => {

      const row =
        document.createElement(
          "div"
        );

/* Version 0.5.59 */

row.dataset.search =
(
  item.label +
  " " +
  (
    Array.isArray(item.expansions)
      ? item.expansions.join(" ")
      : ""
  )
).toLowerCase();

      row.style.display =
        "flex";

      row.style.alignItems =
        "center";

      row.style.gap =
        "8px";

      row.style.padding =
        "5px";

      row.style.cursor =
        "pointer";

      const checkbox =
        document.createElement(
          "input"
        );

      checkbox.type =
        "checkbox";

      checkbox.disabled =
        existing.has(
          item.label
        );

      const label =
        document.createElement(
          "span"
        );

      label.textContent =
        item.label;

      if (
        existing.has(
          item.label
        )
      ) {

        label.textContent +=
          " (favorite)";
      }

/* Version 0.5.62 */

function syncSelection() {

  if (
    checkbox.checked
  ) {

    selected.add(
      item.label
    );

  } else {

    selected.delete(
      item.label
    );
  }
}

checkbox.addEventListener(
  "click",
  e => {

    e.stopPropagation();

    syncSelection();
  }
);

row.onclick = () => {

  if (
    checkbox.disabled
  ) {
    return;
  }

  checkbox.checked =
    !checkbox.checked;

  syncSelection();
};

      row.appendChild(
        checkbox
      );

      row.appendChild(
        label
      );

      list.appendChild(
        row
      );

      rows.push(row);
    });

  search.addEventListener(
    "input",
    () => {

      const q =
        search.value
        .trim()
        .toLowerCase();

      rows.forEach(row => {

        row.style.display =
          !q ||
          row.dataset.search.includes(q)
            ? "flex"
            : "none";
      });
    }
  );

  const buttonRow =
    document.createElement(
      "div"
    );

  buttonRow.style.display =
    "flex";

  buttonRow.style.justifyContent =
    "space-between";

  const addBtn =
    createMiniButton(
      "Add Selected",
      "#28a745"
    );

  const cancelBtn =
    createMiniButton(
      "Cancel",
      "#6c757d"
    );

  buttonRow.appendChild(
    addBtn
  );

  buttonRow.appendChild(
    cancelBtn
  );

  modal.appendChild(
    buttonRow
  );

  addBtn.onclick =
    () => {

      const current =
        loadFavoriteExpansions();

      saveFavoriteExpansions([

        ...new Set([
          ...current,
          ...selected
        ])
      ]);

      renderFavoriteExpansionButtons();

      document.body.removeChild(
        modal
      );
    };

  cancelBtn.onclick =
    () => {

      document.body.removeChild(
        modal
      );
    };
}

function openDeleteFavoriteExpansionPicker() {

  const favorites =
    loadFavoriteExpansions();

  const modal =
    document.createElement(
      "div"
    );

  modal.style.position =
    "fixed";

  modal.style.top =
    "50%";

  modal.style.left =
    "50%";

  modal.style.transform =
    "translate(-50%, -50%)";

  modal.style.background =
    "#fff";

  modal.style.padding =
    "15px";

  modal.style.border =
    "1px solid #ccc";

  modal.style.borderRadius =
    "8px";

  modal.style.zIndex =
    "999999";

  modal.style.display =
    "flex";

  modal.style.flexDirection =
    "column";

  modal.style.gap =
    "10px";

  modal.style.width =
    "320px";

  const title =
    document.createElement(
      "div"
    );

  title.textContent =
    "Delete Favorites";

  title.style.fontWeight =
    "bold";

  modal.appendChild(title);

  const list =
    document.createElement(
      "div"
    );

  list.style.display =
    "flex";

  list.style.flexDirection =
    "column";

  list.style.gap =
    "6px";

  modal.appendChild(list);

  const selected =
    new Set();

  favorites.forEach(label => {

    const row =
      document.createElement(
        "div"
      );

    row.style.display =
      "flex";

    row.style.alignItems =
      "center";

    row.style.gap =
      "8px";

    row.style.cursor =
      "pointer";

    const checkbox =
      document.createElement(
        "input"
      );

    checkbox.type =
      "checkbox";

    const text =
      document.createElement(
        "span"
      );

    text.textContent =
      label;

   /* Version 0.5.62 */

function syncSelection() {

  if (
    checkbox.checked
  ) {

    selected.add(label);

  } else {

    selected.delete(label);
  }
}

checkbox.addEventListener(
  "click",
  e => {

    e.stopPropagation();

    syncSelection();
  }
);

row.onclick = () => {

  checkbox.checked =
    !checkbox.checked;

  syncSelection();
};
    row.appendChild(
      checkbox
    );

    row.appendChild(
      text
    );

    list.appendChild(
      row
    );
  });

  const row =
    document.createElement(
      "div"
    );

  row.style.display =
    "flex";

  row.style.justifyContent =
    "space-between";

  const deleteBtn =
    createMiniButton(
      "Delete",
      "#dc3545"
    );

  const cancelBtn =
    createMiniButton(
      "Cancel",
      "#6c757d"
    );

  row.appendChild(deleteBtn);

  row.appendChild(cancelBtn);

  modal.appendChild(row);

  deleteBtn.onclick =
    () => {

      if (
        !confirm(
          "Are you sure?"
        )
      ) {
        return;
      }

      const filtered =
        favorites.filter(
          x =>
            !selected.has(x)
        );

      saveFavoriteExpansions(
        filtered
      );

      renderFavoriteExpansionButtons();

      document.body.removeChild(
        modal
      );
    };

  cancelBtn.onclick =
    () => {

      document.body.removeChild(
        modal
      );
    };

  document.body.appendChild(
    modal
  );
}
function injectCustomExpansions() {

  const custom =
    loadCustomExpansions();

  custom.forEach(exp => {

    const target =
      exp.category === "Types"
        ? EXPANSIONS_DATA.typesExpansions
        : exp.category === "Abilities"
        ? EXPANSIONS_DATA.abilitiesExpansions
        : EXPANSIONS_DATA.common[0];

    target.push({

      label:
        exp.label,

      expansions:
        exp.expansions
    });
  });
}

function openCustomExpansionEditor() {

  const modal =
    document.createElement("div");

  modal.style.position =
    "fixed";

  modal.style.top =
    "50%";

  modal.style.left =
    "50%";

  modal.style.transform =
    "translate(-50%, -50%)";

  modal.style.background =
    "#fff";

  modal.style.padding =
    "15px";

  modal.style.border =
    "1px solid #ccc";

  modal.style.borderRadius =
    "8px";

  modal.style.zIndex =
    "999999";

  modal.style.display =
    "flex";

  modal.style.flexDirection =
    "column";

  modal.style.gap =
    "10px";

  modal.style.width =
    "350px";

  const title =
    document.createElement("div");

  title.textContent =
    "Add Expansion";

  title.style.fontWeight =
    "bold";

  // =========================
  // LABEL
  // =========================

  const labelInput =
    document.createElement("input");

  labelInput.placeholder =
    "Label (ex: LB)";

  labelInput.style.padding =
    "6px";

  // =========================
  // TEXT FORMS
  // =========================

  const forms = [];

  for (let i = 0; i < 3; i++) {

    const input =
      document.createElement(
        "input"
      );

    input.placeholder =
      `Expansion text ${
        i + 1
      }`;

    input.style.padding =
      "6px";

    forms.push(input);

    modal.appendChild(input);
  }

  // =========================
  // CATEGORY
  // =========================
/* Version 0.5.57 */

const favoriteCheckbox =
  document.createElement(
    "input"
  );

favoriteCheckbox.type =
  "checkbox";

const favoriteLabel =
  document.createElement(
    "label"
  );

favoriteLabel.style.display =
  "flex";

favoriteLabel.style.alignItems =
  "center";

favoriteLabel.style.gap =
  "6px";

favoriteLabel.appendChild(
  favoriteCheckbox
);

favoriteLabel.append(
  "Add to favorites"
);
  const category =
    document.createElement(
      "select"
    );

  [
    "Common",
    "Types",
    "Abilities"
  ].forEach(cat => {

    const opt =
      document.createElement(
        "option"
      );

    opt.value = cat;

    opt.textContent = cat;

    category.appendChild(
      opt
    );
  });

  category.style.padding =
    "6px";

  modal.appendChild(title);

  modal.appendChild(
    labelInput
  );
modal.appendChild(
  favoriteLabel
);
  modal.appendChild(
    category
  );

  // move forms below category
  forms.forEach(input => {

    modal.appendChild(input);
  });

  // =========================
  // BUTTONS
  // =========================

  const row =
    document.createElement("div");

  row.style.display =
    "flex";

  row.style.justifyContent =
    "space-between";

  const saveBtn =
    createMiniButton(
      "Save",
      "#28a745"
    );

  const cancelBtn =
    createMiniButton(
      "Cancel",
      "#6c757d"
    );

  row.appendChild(saveBtn);

  row.appendChild(cancelBtn);

  modal.appendChild(row);

  saveBtn.onclick =
    () => {

      const label =
        labelInput.value
        .trim();

      if (!label) {

        alert(
          "Enter label"
        );

        return;
      }

      const expansions =
        forms
          .map(
            x =>
              x.value.trim()
          )
          .filter(Boolean);

      if (
        expansions.length === 0
      ) {

        alert(
          "Enter at least one expansion"
        );

        return;
      }

      const custom =
        loadCustomExpansions();

      custom.push({

        label,

        category:
          category.value,

        expansions
      });

      saveCustomExpansions(
        custom
      );
if (
  favoriteCheckbox.checked
) {

  const favs =
    loadFavoriteExpansions();

  if (
    !favs.includes(label)
  ) {

    favs.push(label);

    saveFavoriteExpansions(
      favs
    );
  }
}

      injectCustomExpansions();

      buildExpansionsToggles();

      renderMostUsedExpansionButtons();

      document.body.removeChild(
        modal
      );
    };

  cancelBtn.onclick =
    () => {

      document.body.removeChild(
        modal
      );
    };

  document.body.appendChild(
    modal
  );
}

function openDeleteExpansionEditor() {

  const custom =
    loadCustomExpansions();

  const modal =
    document.createElement("div");

  modal.style.position =
    "fixed";

  modal.style.top =
    "50%";

  modal.style.left =
    "50%";

  modal.style.transform =
    "translate(-50%, -50%)";

  modal.style.background =
    "#fff";

  modal.style.padding =
    "15px";

  modal.style.border =
    "1px solid #ccc";

  modal.style.borderRadius =
    "8px";

  modal.style.zIndex =
    "999999";

  modal.style.display =
    "flex";

  modal.style.flexDirection =
    "column";

  modal.style.gap =
    "10px";

  modal.style.width =
    "320px";

  const title =
    document.createElement(
      "div"
    );

  title.textContent =
    "Delete Expansions";

  title.style.fontWeight =
    "bold";

  modal.appendChild(title);

  const list =
    document.createElement(
      "div"
    );

  list.style.maxHeight =
    "300px";

  list.style.overflowY =
    "auto";

  modal.appendChild(list);

  const selected =
    new Set();

  custom.forEach(exp => {

    const row =
      document.createElement(
        "div"
      );

    row.style.display =
      "flex";

    row.style.alignItems =
      "center";

    row.style.gap =
      "8px";

    row.style.padding =
      "4px";

    const checkbox =
      document.createElement(
        "input"
      );

    checkbox.type =
      "checkbox";

    const label =
      document.createElement(
        "span"
      );

    label.textContent =
      `${exp.label} → ${exp.expansions.join(", ")}`;

    row.onclick = () => {

      checkbox.checked =
        !checkbox.checked;

      if (
        checkbox.checked
      ) {

        selected.add(exp);

      } else {

        selected.delete(exp);
      }
    };

    row.appendChild(
      checkbox
    );

    row.appendChild(
      label
    );

    list.appendChild(
      row
    );
  });

  const row =
    document.createElement(
      "div"
    );

  row.style.display =
    "flex";

  row.style.justifyContent =
    "space-between";

  const deleteBtn =
    createMiniButton(
      "Delete",
      "#dc3545"
    );

  const cancelBtn =
    createMiniButton(
      "Cancel",
      "#6c757d"
    );

  row.appendChild(deleteBtn);

  row.appendChild(cancelBtn);

  modal.appendChild(row);

  deleteBtn.onclick =
    () => {

      if (
        !confirm(
          "Are you sure?"
        )
      ) {
        return;
      }

      const filtered =
        custom.filter(
          exp =>
            !selected.has(
              exp
            )
        );

      saveCustomExpansions(
        filtered
      );

      location.reload();
    };

  cancelBtn.onclick =
    () => {

      document.body.removeChild(
        modal
      );
    };

  document.body.appendChild(
    modal
  );
}

function trackExpansionUsage(label) {

  let usage =
    loadExpansionUsage();

  // =========================
  // INITIALIZE
  // =========================

  if (!usage[label]) {

    usage[label] = {

      count: 0,

      createdAt:
        Date.now()
    };
  }

  usage[label].count += 1;

  saveExpansionUsage(
    usage
  );

  renderMostUsedExpansionButtons();
}

function getExpansionItemByLabel(label) {

  const all = [];

  EXPANSIONS_DATA.common.forEach(
    row => {

      row.forEach(item => {

        all.push(item);
      });
    }
  );

  EXPANSIONS_DATA.typesExpansions
    .forEach(item => {

      all.push(item);
    });

  EXPANSIONS_DATA.abilitiesExpansions
    .forEach(item => {

      all.push(item);
    });

  return all.find(
    x => x.label === label
  );
}

function insertExpansion(item) {

  const oracle =
    document.getElementById(
      "oracle"
    );

  oracle.value =
    oracle.value.trim() + " ";

  if (
    item.label === '""'
  ) {

    toggleQuotes();

    trackExpansionUsage(
      item.label
    );

    return;
  }

  if (
    item.expansions &&
    item.expansions.length > 1
  ) {

    if (
      expansionsInserted.has(
        item.label
      )
    ) {

      let idx =
        expansionsInserted.get(
          item.label
        );

      removeLastOccurrence(
        oracle,
        item.expansions[idx]
          .trim()
      );

      idx =
        (idx + 1) %
        item.expansions.length;

      if (idx === 0) {

        expansionsInserted.delete(
          item.label
        );

      } else {

        oracle.value =
          oracle.value.trim() +
          " " +
          item.expansions[idx]
            .trim() +
          " ";

        expansionsInserted.set(
          item.label,
          idx
        );
      }

    } else {

      oracle.value =
        oracle.value.trim() +
        " " +
        item.expansions[0]
          .trim() +
        " ";

      expansionsInserted.set(
        item.label,
        0
      );
    }

  } else {

    if (
      !expansionsInserted.has(
        item.label
      )
    ) {

      oracle.value =
        oracle.value.trim() +
        " " +
        item.expansions
          .join(" ")
          .trim() +
        " ";

      expansionsInserted.set(
        item.label,
        0
      );

    } else {

      removeLastOccurrence(
        oracle,
        item.expansions
          .join(" ")
          .trim()
      );

      expansionsInserted.delete(
        item.label
      );
    }
  }

  trackExpansionUsage(
    item.label
  );
}
/* Version 0.5.54 */

function renderMostUsedExpansionButtons() {

  const container =
    document.getElementById(
      "mostUsedExpansionButtons"
    );

  if (!container) return;

  container.innerHTML = "";

  const usage =
    loadExpansionUsage();

  // =========================
  // SORTING RULES
  // =========================
  //
  // 1. Higher usage wins
  // 2. Ties preserve older slot
  //
  // This allows stable layout
  // while still allowing
  // stronger entries to replace
  // weaker top-7 entries.
  //
  // =========================

  const ranked =
    Object.entries(usage)

      .sort((a, b) => {

        // PRIMARY:
        // Higher count first

        if (
          b[1].count !==
          a[1].count
        ) {

          return (
            b[1].count -
            a[1].count
          );
        }

        // SECONDARY:
        // Older item wins ties

        return (
          a[1].createdAt -
          b[1].createdAt
        );
      })

      .slice(0, 7);

  ranked.forEach(
    ([label]) => {

      const item =
        getExpansionItemByLabel(
          label
        );

      if (!item) return;

      const btn =
        document.createElement(
          "button"
        );

      btn.className =
        "expansion-btn";

      btn.textContent =
        label;

      btn.addEventListener(
        "click",
        () => {

          insertExpansion(
            item
          );
        }
      );

      container.appendChild(
        btn
      );
    }
  );
}

//////////////////////
// Initialization
//////////////////////
document.addEventListener("DOMContentLoaded", function(){
/* Version 0.5.35 */

setupAttributeFilter("cmc");
setupAttributeFilter("pow");
setupAttributeFilter("tou");
  
  // Clear slider buttons.
  document.getElementById("clearCmc").addEventListener("click", function(){ clearSlider("cmc"); });
  document.getElementById("clearPow").addEventListener("click", function(){ clearSlider("pow"); });
  document.getElementById("clearTou").addEventListener("click", function(){ clearSlider("tou"); });
  
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

    let next =
      (current === "default")
        ? "include"
        : (current === "include")
        ? "exclude"
        : "default";

    btn.dataset.state = next;

    updateTypeButtonStyle(btn);
  });
});

/* Version 0.5.44 */

/* Version 0.5.49 */

document
  .getElementById(
    "addCustomTypeBtn"
  )
  .addEventListener(
    "click",
    openTypePicker
  );

document
  .getElementById(
    "deleteCustomTypeBtn"
  )
  .addEventListener(
    "click",
    openDeleteTypePicker
  );

restoreCustomTypes();
  
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
/* Version 0.5.37 */

// Toggle for Color Matching.
document.getElementById("colorToggle").addEventListener("click", function(){

  let btn = document.getElementById("colorToggle");

  const modes = [
    "At Most",
    "Exactly",
    "Include"
  ];

  let current = btn.textContent.trim();

  let idx = modes.indexOf(current);

  idx = (idx + 1) % modes.length;

  btn.textContent = modes[idx];

});
/* Version 0.5.51 */

// Build Expansions UI.
/* Version 0.5.56 */

/* Version 0.5.60 */

/* Version 0.5.61 */

/* Version 0.5.62 */

injectCustomExpansions();

buildExpansionsToggles();

// Delay render until DOM rebuild finishes
setTimeout(() => {

  renderFavoriteExpansionButtons();

  renderMostUsedExpansionButtons();

}, 0);

document
  .getElementById(
    "addFavoriteExpansionBtn"
  )
  .addEventListener(
    "click",
    openFavoriteExpansionPicker
  );

document
  .getElementById(
    "deleteFavoriteExpansionBtn"
  )
  .addEventListener(
    "click",
    openDeleteFavoriteExpansionPicker
  );


document
  .getElementById(
    "addExpansionBtn"
  )
  .addEventListener(
    "click",
    openCustomExpansionEditor
  );

document
  .getElementById(
    "deleteExpansionBtn"
  )
  .addEventListener(
    "click",
    openDeleteExpansionEditor
  );  


  // Clear Buttons for selectors.
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
  
  /* Version 0.5.39 */

updateFormatDropdown();

injectFormatButtons();

updatePresetDropdown();
});
