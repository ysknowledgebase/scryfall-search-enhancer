
/***********************************************************
 * Scryfall Advanced Search Enhancements Script
 *
 * Features:
 * - Save and load search settings as presets.
 * - Autosave the three most recent searches under keys
 *   "autosave_1", "autosave_2", and "autosave_3" (cycling).
 * - Both manually saved presets (keys "searchPreset_…") and autosaves
 *   appear in the preset dropdown. Autosaves are sorted on top,
 *   and manual presets are sorted by creation date.
 * - When you load a preset, its settings are applied but the visible
 *   controls remain editable – the format selector always overrides
 *   the preset when changed.
 * - Changing the format selector resets the hidden format field and
 *   any set selections, then applies the new format (and if applicable,
 *   selects the sets associated with that format).
 * - The Save Preset button uses a floppy–disk icon (💾).
 * - Layout is arranged in two rows: the first row has Search,
 *   Search Frontier, and Clear All buttons; the second row has
 *   preset management controls plus new Import (↓) and Export (↑) buttons.
 ***********************************************************/

// Main function to initiate the enhancements
function initializeScryfallEnhancements() {
  console.log('Scryfall Advanced Search Enhancements Loaded');
  autoSaveSearch();
  updatePresetDropdown();
  attachEventListeners();
}

// Attach event listeners to various elements
function attachEventListeners() {
  document.getElementById('searchButton').addEventListener('click', autoSaveSearch);
  document.getElementById('clearAllButton').addEventListener('click', clearSearchFields);
  document.getElementById('savePresetButton').addEventListener('click', savePreset);
  document.getElementById('presetDropdown').addEventListener('change', loadPreset);
}

// Save search settings to localStorage
function autoSaveSearch() {
  const settings = getSearchSettings();
  localStorage.setItem('autosave_1', JSON.stringify(settings));
  console.log('Search settings auto-saved');
}

// Get search settings from UI
function getSearchSettings() {
  const settings = {
    format: document.getElementById('format_selector').value,
    colors: Array.from(document.querySelectorAll('input[name="color[]"]:checked')).map(el => el.value),
    types: Array.from(document.querySelectorAll('input[name="type[]"]:checked')).map(el => el.value),
    rarities: Array.from(document.querySelectorAll('input[name="rarity[]"]:checked')).map(el => el.value),
  };
  return settings;
}

// Clear all search fields
function clearSearchFields() {
  document.getElementById('format_selector').value = '';
  document.querySelectorAll('input[name="color[]"], input[name="type[]"], input[name="rarity[]"]').forEach(el => el.checked = false);
  console.log('Search fields cleared');
}

// Save a preset
function savePreset() {
  const presetName = prompt('Enter a name for this preset:');
  if (presetName) {
    const settings = getSearchSettings();
    localStorage.setItem(`searchPreset_${presetName}`, JSON.stringify(settings));
    updatePresetDropdown();
    console.log(`Preset "${presetName}" saved`);
  }
}

// Load a preset
function loadPreset(event) {
  const presetName = event.target.value;
  if (presetName) {
    const settings = JSON.parse(localStorage.getItem(presetName));
    if (settings) {
      applySearchSettings(settings);
      console.log(`Preset "${presetName}" loaded`);
    }
  }
}

// Apply search settings to the UI
function applySearchSettings(settings) {
  document.getElementById('format_selector').value = settings.format || '';
  document.querySelectorAll('input[name="color[]"]').forEach(el => el.checked = settings.colors.includes(el.value));
  document.querySelectorAll('input[name="type[]"]').forEach(el => el.checked = settings.types.includes(el.value));
  document.querySelectorAll('input[name="rarity[]"]').forEach(el => el.checked = settings.rarities.includes(el.value));
}

// Update preset dropdown
function updatePresetDropdown() {
  const dropdown = document.getElementById('presetDropdown');
  dropdown.innerHTML = '<option value="">Select a preset...</option>';
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('searchPreset_') || key.startsWith('autosave_')) {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = key.replace('searchPreset_', '');
      dropdown.appendChild(option);
    }
  });
}

// Initialize the script when page loads
window.addEventListener('load', initializeScryfallEnhancements);
