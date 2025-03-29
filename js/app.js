// Build the Scryfall query and redirect the user
function performSearch() {
  // Get values from the form
  var format = document.getElementById('format_selector').value;
  var colors = Array.from(document.querySelectorAll('input[name="color[]"]:checked')).map(el => el.value);
  var types = Array.from(document.querySelectorAll('input[name="type[]"]:checked')).map(el => el.value);
  var rarities = Array.from(document.querySelectorAll('input[name="rarity[]"]:checked')).map(el => el.value);
  var oracle = document.getElementById('oracle').value.trim();
  
  var queryParts = [];

  // Format mapping (using is: operator)
  if (format) {
    if (format === "standard") {
      queryParts.push("is:standard");
    } else if (format === "futureStandard") {
      queryParts.push("is:future-standard");
    } else if (format === "frontier") {
      queryParts.push("is:frontier");
    } else if (format === "fdn") {
      queryParts.push("is:fdn");
    } else if (format === "dft") {
      queryParts.push("is:dft");
    }
  }
  
  // Colors – use c>= operator to indicate at least these colors
  if (colors.length > 0) {
    queryParts.push("c>=" + colors.join(""));
  }
  
  // Types – add each type with the t: operator
  if (types.length > 0) {
    types.forEach(function(t) {
      queryParts.push("t:" + t);
    });
  }
  
  // Rarities – map abbreviations to full words
  if (rarities.length > 0) {
    const rarityMap = {"C": "common", "U": "uncommon", "R": "rare", "M": "mythic"};
    rarities.forEach(function(r) {
      if (rarityMap[r]) {
        queryParts.push("r:" + rarityMap[r]);
      }
    });
  }
  
  // Oracle text – add as free text
  if (oracle !== "") {
    queryParts.push(oracle);
  }
  
  var query = queryParts.join(" ");
  var url = "https://scryfall.com/search?q=" + encodeURIComponent(query);
  window.location.href = url;
}

// Clear the form
function clearForm() {
  document.getElementById('searchForm').reset();
}

// Preset management
function savePreset() {
  var presetName = prompt("Enter a name for this preset:");
  if (!presetName) return;
  var settings = {
    format: document.getElementById('format_selector').value,
    colors: Array.from(document.querySelectorAll('input[name="color[]"]:checked')).map(el => el.value),
    types: Array.from(document.querySelectorAll('input[name="type[]"]:checked')).map(el => el.value),
    rarities: Array.from(document.querySelectorAll('input[name="rarity[]"]:checked')).map(el => el.value),
    oracle: document.getElementById('oracle').value.trim()
  };
  localStorage.setItem("preset_" + presetName, JSON.stringify(settings));
  updatePresetDropdown();
  alert("Preset saved as: " + presetName);
}

function loadPreset() {
  var dropdown = document.getElementById("preset_dropdown");
  var key = dropdown.value;
  if (!key) return;
  var settings = JSON.parse(localStorage.getItem(key));
  if (!settings) return;
  document.getElementById('format_selector').value = settings.format || "";
  document.querySelectorAll('input[name="color[]"]').forEach(el => {
    el.checked = settings.colors.includes(el.value);
  });
  document.querySelectorAll('input[name="type[]"]').forEach(el => {
    el.checked = settings.types.includes(el.value);
  });
  document.querySelectorAll('input[name="rarity[]"]').forEach(el => {
    el.checked = settings.rarities.includes(el.value);
  });
  document.getElementById('oracle').value = settings.oracle || "";
}

function deletePreset() {
  var dropdown = document.getElementById("preset_dropdown");
  var key = dropdown.value;
  if (!key) {
    alert("Please select a preset to delete.");
    return;
  }
  if (confirm("Are you sure you want to delete preset: " + key.replace("preset_", "") + "?")) {
    localStorage.removeItem(key);
    updatePresetDropdown();
  }
}

function updatePresetDropdown() {
  var dropdown = document.getElementById("preset_dropdown");
  dropdown.innerHTML = "<option value=''>Select a preset...</option>";
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key.startsWith("preset_")) {
      var option = document.createElement("option");
      option.value = key;
      option.textContent = key.replace("preset_", "");
      dropdown.appendChild(option);
    }
  }
}

function exportPresets() {
  var exportData = {};
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key.startsWith("preset_")) {
      exportData[key] = JSON.parse(localStorage.getItem(key));
    }
  }
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
  var a = document.createElement("a");
  a.href = dataStr;
  a.download = "scryfall_presets.json";
  a.click();
}

function importPresets() {
  document.getElementById("import_file").click();
}

function importPresetsFromFile(event) {
  var file = event.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var imported = JSON.parse(e.target.result);
      for (var key in imported) {
        localStorage.setItem(key, JSON.stringify(imported[key]));
      }
      updatePresetDropdown();
      alert("Presets imported successfully.");
    } catch (err) {
      alert("Error importing presets: " + err);
    }
  };
  reader.readAsText(file);
}

// Attach event listeners for preset buttons on page load
window.addEventListener("load", function() {
  updatePresetDropdown();
  document.getElementById("savePresetButton").addEventListener("click", savePreset);
  document.getElementById("deletePresetButton").addEventListener("click", deletePreset);
  document.getElementById("exportPresetButton").addEventListener("click", exportPresets);
  document.getElementById("importPresetButton").addEventListener("click", importPresets);
  document.getElementById("import_file").addEventListener("change", importPresetsFromFile);
});
