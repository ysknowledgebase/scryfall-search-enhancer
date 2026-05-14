/* Version 0.6.00 */
/* app.js */

//////////////////////
// CONFIG & DATA
//////////////////////

const CONFIG = {
  formatData: {
    formats: [
      { value: "", text: "Select Format", color: "#007bff", sets: null },
      { value: "standard", text: "Standard", color: "blue", sets: null },
      {
        value: "futureStandard",
        text: "Future Standard",
        color: "green",
        sets: ["dsk", "blb", "otj", "big", "mkm", "lci", "woe", "fdn", "dft", "tdm"]
      },
      {
        value: "frontier",
        text: "Frontier",
        color: "purple",
        sets: ["dsk", "blb", "otj", "big", "mkm", "fdn", "dft", "tdm"]
      },
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

const CUSTOM_FORMAT_KEY = "customFormats_v1";

//////////////////////
// ATTRIBUTE STATE
//////////////////////

const attributes = {
  cmc: {
    min: "",
    minOp: "<=",
    max: "",
    maxOp: "<="
  },
  pow: {
    min: "",
    minOp: "<=",
    max: "",
    maxOp: "<="
  },
  tou: {
    min: "",
    minOp: "<=",
    max: "",
    maxOp: "<="
  }
};

//////////////////////
// FORMAT STORAGE
//////////////////////

function loadCustomFormats() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_FORMAT_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCustomFormats(data) {
  localStorage.setItem(CUSTOM_FORMAT_KEY, JSON.stringify(data));
}

function getAllFormats() {
  const base = CONFIG.formatData.formats;
  const custom = loadCustomFormats();

  const map = new Map();

  base.forEach(f => map.set(f.value, { ...f }));
  custom.forEach(f => map.set(f.value, { ...f }));

  return Array.from(map.values());
}

async function fetchScryfallSets() {
  try {
    const res = await fetch("https://api.scryfall.com/sets");
    const data = await res.json();

    return data.data
      .filter(s => s.set_type !== "token")
      .map(s => ({
        code: s.code,
        name: s.name
      }));
  } catch {
    alert("Failed to fetch sets.");
    return [];
  }
}

//////////////////////
// ATTRIBUTE HELPERS
//////////////////////

function cycleOperator(current) {
  if (current === "<=") return "<";
  if (current === "<") return "=";
  return "<=";
}

function flipOperator(op) {
  if (op === "<=") return ">=";
  if (op === "<") return ">";
  return "=";
}

function updateAttributeState(attr, side, value) {
  attributes[attr][side] = value;
}

function updateOperator(attr, side, buttonEl) {
  const key = side + "Op";

  attributes[attr][key] = cycleOperator(attributes[attr][key]);

  buttonEl.textContent = attributes[attr][key];
}

//////////////////////
// FORMAT UI
//////////////////////

async function addFormatModal() {
  const modal = document.createElement("div");
  modal.className = "modal";

  const box = document.createElement("div");
  box.className = "modal-box";

  const title = document.createElement("h3");
  title.textContent = "Create Format";

  const nameInput = document.createElement("input");
  nameInput.placeholder = "Format Name";

  const colorInput = document.createElement("input");
  colorInput.type = "color";
  colorInput.value = "#007bff";

  const searchInput = document.createElement("input");
  searchInput.placeholder = "Search sets...";

  const setsContainer = document.createElement("div");
  setsContainer.className = "sets-container";

  const sets = await fetchScryfallSets();

  const selectedSets = new Set();

  function renderSets(filter = "") {
    setsContainer.innerHTML = "";

    sets
      .filter(s =>
        s.name.toLowerCase().includes(filter.toLowerCase()) ||
        s.code.toLowerCase().includes(filter.toLowerCase())
      )
      .forEach(s => {
        const row = document.createElement("div");
        row.className = "set-row";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = selectedSets.has(s.code);

        const label = document.createElement("span");
        label.textContent = `${s.code.toUpperCase()} - ${s.name}`;

        row.appendChild(checkbox);
        row.appendChild(label);

        row.onclick = () => {
          checkbox.checked = !checkbox.checked;

          if (checkbox.checked) {
            selectedSets.add(s.code);
          } else {
            selectedSets.delete(s.code);
          }

          row.classList.toggle("selected", checkbox.checked);
        };

        if (checkbox.checked) {
          row.classList.add("selected");
        }

        setsContainer.appendChild(row);
      });
  }

  renderSets();

  searchInput.addEventListener("input", () => {
    renderSets(searchInput.value);
  });

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";

  saveBtn.onclick = () => {
    const name = nameInput.value.trim();

    if (!name) {
      alert("Enter a format name.");
      return;
    }

    if (selectedSets.size === 0) {
      alert("Select at least one set.");
      return;
    }

    const newFormat = {
      value: name,
      text: name,
      color: colorInput.value,
      sets: Array.from(selectedSets)
    };

    const existing = loadCustomFormats();

    const index = existing.findIndex(f => f.value === name);

    if (index !== -1) {
      existing[index] = newFormat;
    } else {
      existing.push(newFormat);
    }

    saveCustomFormats(existing);

    populateFormatDropdown();

    document.body.removeChild(modal);
  };

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.className = "clear-btn";

  cancelBtn.onclick = () => {
    document.body.removeChild(modal);
  };

  const btnRow = document.createElement("div");
  btnRow.className = "modal-buttons";

  btnRow.appendChild(saveBtn);
  btnRow.appendChild(cancelBtn);

  box.appendChild(title);
  box.appendChild(nameInput);
  box.appendChild(colorInput);
  box.appendChild(searchInput);
  box.appendChild(setsContainer);
  box.appendChild(btnRow);

  modal.appendChild(box);

  document.body.appendChild(modal);
}

function populateFormatDropdown() {
  const selector = document.getElementById("format_selector");

  selector.innerHTML = "";

  getAllFormats().forEach(fmt => {
    const opt = document.createElement("option");

    opt.value = fmt.value;
    opt.textContent = fmt.text;
    opt.style.color = fmt.color || "#007bff";

    selector.appendChild(opt);
  });
}

//////////////////////
// QUERY BUILDING
//////////////////////

function buildAttributeQuery(attrKey) {
  const attr = attributes[attrKey];

  const query = [];

  if (attr.min !== "") {
    query.push(
      `${attrKey}${flipOperator(attr.minOp)}${attr.min}`
    );
  }

  if (attr.max !== "") {
    query.push(
      `${attrKey}${attr.maxOp}${attr.max}`
    );
  }

  return query;
}

function getSearchSettings() {
  const format = document.getElementById("format_selector").value;

  const colors = Array.from(
    document.querySelectorAll('input[name="color[]"]:checked')
  ).map(el => el.value);

  const rarities = Array.from(
    document.querySelectorAll('input[name="rarity[]"]:checked')
  ).map(el => el.value);

  const oracle = document.getElementById("oracle").value.trim();

  const queryParts = [];

  //////////////////////
  // FORMAT
  //////////////////////

  if (format) {
    const fmtObj = getAllFormats().find(f => f.value === format);

    if (fmtObj && fmtObj.sets) {
      const clause =
        "(" +
        fmtObj.sets.map(s => "set:" + s).join(" OR ") +
        ")";

      queryParts.push(clause);
    } else {
      queryParts.push("is:" + format);
    }
  }

  //////////////////////
  // COLORS
  //////////////////////

  if (colors.length > 0) {
    const toggle = document.getElementById("colorToggle").textContent.trim();

    if (toggle === "Exactly") {
      queryParts.push("c=" + colors.join(""));
    } else {
      queryParts.push("c<=" + colors.join(""));
    }
  }

  //////////////////////
  // TYPES
  //////////////////////

  document.querySelectorAll(".type-btn").forEach(btn => {
    const state = btn.dataset.state;
    const type = btn.dataset.type;

    if (state === "include") {
      queryParts.push("t:" + type);
    }

    if (state === "exclude") {
      queryParts.push("-t:" + type);
    }
  });

  //////////////////////
  // RARITIES
  //////////////////////

  if (rarities.length > 0) {
    const rarityQueries = [];

    rarities.forEach(r => {
      const cfg = CONFIG.rarities.find(x => x.label === r);

      if (cfg) {
        rarityQueries.push("r:" + cfg.full);
      }
    });

    queryParts.push("(" + rarityQueries.join(" OR ") + ")");
  }

  //////////////////////
  // ATTRIBUTES
  //////////////////////

  queryParts.push(...buildAttributeQuery("cmc"));
  queryParts.push(...buildAttributeQuery("pow"));
  queryParts.push(...buildAttributeQuery("tou"));

  //////////////////////
  // ORACLE
  //////////////////////

  if (oracle) {
    queryParts.push(`oracle:${oracle}`);
  }

  queryParts.push("(game:paper)");

  const url =
    "https://scryfall.com/search?as=grid&order=name&q=" +
    encodeURIComponent(queryParts.join(" "));

  return {
    url
  };
}

function performSearch() {
  const settings = getSearchSettings();

  window.location.href = settings.url;
}

//////////////////////
// TYPE BUTTONS
//////////////////////

function updateTypeButtonStyle(btn) {
  const state = btn.dataset.state;

  if (state === "default") {
    btn.style.backgroundColor = "transparent";
    btn.style.border = "2px solid #90ee90";
    btn.style.textDecoration = "none";
  }

  if (state === "include") {
    btn.style.backgroundColor = "#90ee90";
    btn.style.border = "2px solid #90ee90";
    btn.style.textDecoration = "none";
  }

  if (state === "exclude") {
    btn.style.backgroundColor = "#ffa8a8";
    btn.style.border = "2px solid #ffa8a8";
    btn.style.textDecoration = "line-through";
  }
}

//////////////////////
// INIT
//////////////////////

document.addEventListener("DOMContentLoaded", function () {

  //////////////////////
  // VERSION
  //////////////////////

  document.getElementById("versionIndicator").textContent = "v0.6.00";

  //////////////////////
  // FORMAT DROPDOWN
  //////////////////////

  populateFormatDropdown();

  //////////////////////
  // ADD FORMAT BUTTON
  //////////////////////

  document.getElementById("addFormatButton")
    .addEventListener("click", addFormatModal);

  //////////////////////
  // COLOR BUTTONS
  //////////////////////

  document.querySelectorAll(".color-btn").forEach(btn => {

    const color = btn.dataset.color;

    const cfg = CONFIG.colorData.find(c => c.val === color);

    btn.innerHTML =
      `<img src="${cfg.icon}" class="mana-icon">`;

    btn.addEventListener("click", function () {

      const checkbox =
        document.querySelector(
          `input[name="color[]"][value="${color}"]`
        );

      checkbox.checked = !checkbox.checked;

      if (checkbox.checked) {
        btn.style.backgroundColor = cfg.color;
        btn.style.color = cfg.textColor;
      } else {
        btn.style.backgroundColor = "#f8f9fa";
        btn.style.color = "#000";
      }
    });
  });

  //////////////////////
  // TYPE BUTTONS
  //////////////////////

  document.querySelectorAll(".type-btn").forEach(btn => {

    btn.dataset.state = "default";

    updateTypeButtonStyle(btn);

    btn.addEventListener("click", function () {

      const current = btn.dataset.state;

      let next = "default";

      if (current === "default") next = "include";
      else if (current === "include") next = "exclude";

      btn.dataset.state = next;

      updateTypeButtonStyle(btn);
    });
  });

  //////////////////////
  // RARITY BUTTONS
  //////////////////////

  document.querySelectorAll(".rarity-btn").forEach(btn => {

    const rarity = btn.dataset.rarity;

    const cfg =
      CONFIG.rarities.find(r => r.label === rarity);

    btn.addEventListener("click", function () {

      const checkbox =
        document.querySelector(
          `input[name="rarity[]"][value="${rarity}"]`
        );

      checkbox.checked = !checkbox.checked;

      if (checkbox.checked) {
        btn.style.backgroundColor = cfg.color;
        btn.style.color = "#fff";
      } else {
        btn.style.backgroundColor = "transparent";
        btn.style.color = "#000";
      }
    });
  });

  //////////////////////
  // ATTRIBUTE INPUTS
  //////////////////////

  ["cmc", "pow", "tou"].forEach(attr => {

    const minInput =
      document.getElementById(`${attr}Min`);

    const maxInput =
      document.getElementById(`${attr}Max`);

    const minOp =
      document.getElementById(`${attr}MinOp`);

    const maxOp =
      document.getElementById(`${attr}MaxOp`);

    minInput.addEventListener("input", () => {
      updateAttributeState(attr, "min", minInput.value.trim());
    });

    maxInput.addEventListener("input", () => {
      updateAttributeState(attr, "max", maxInput.value.trim());
    });

    minOp.addEventListener("click", () => {
      updateOperator(attr, "min", minOp);
    });

    maxOp.addEventListener("click", () => {
      updateOperator(attr, "max", maxOp);
    });
  });

  //////////////////////
  // COLOR TOGGLE
  //////////////////////

  document.getElementById("colorToggle")
    .addEventListener("click", function () {

      const btn = document.getElementById("colorToggle");

      btn.textContent =
        btn.textContent.trim() === "At Most"
          ? "Exactly"
          : "At Most";
    });

  //////////////////////
  // SEARCH
  //////////////////////

  document.getElementById("searchActionButton")
    .addEventListener("click", performSearch);

});