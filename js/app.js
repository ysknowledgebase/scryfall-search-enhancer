
/***********************
 * A. HELPER FUNCTIONS
 ***********************/
function getSearchSettings() {
    const settings = {};

    settings.format = document.getElementById('format_selector').value;
    settings.colors = Array.from(document.querySelectorAll('input[name="color[]"]:checked')).map(el => el.value);
    settings.rarities = Array.from(document.querySelectorAll('input[name="rarity[]"]:checked')).map(el => el.value);
    settings.oracle = document.getElementById('oracle').value;

    return settings;
}

function setSearchSettings(settings) {
    document.getElementById('format_selector').value = settings.format || '';
    document.querySelectorAll('input[name="color[]"]').forEach(chk => {
        chk.checked = settings.colors.includes(chk.value);
    });
    document.querySelectorAll('input[name="rarity[]"]').forEach(chk => {
        chk.checked = settings.rarities.includes(chk.value);
    });
    document.getElementById('oracle').value = settings.oracle || '';
}

function clearAll() {
    document.getElementById('format_selector').value = '';
    document.querySelectorAll('input[type="checkbox"]').forEach(chk => chk.checked = false);
    document.getElementById('oracle').value = '';
    alert('All fields cleared.');
}

/***********************
 * B. SEARCH FUNCTION
 ***********************/
function performSearch() {
    const settings = getSearchSettings();
    let query = [];

    if (settings.format) query.push(`format=${settings.format}`);
    if (settings.colors.length) query.push(`color=${settings.colors.join('')}`);
    if (settings.rarities.length) query.push(`rarity=${settings.rarities.join(',')}`);
    if (settings.oracle) query.push(`oracle=${encodeURIComponent(settings.oracle)}`);

    const scryfallUrl = `https://scryfall.com/search?${query.join('&')}`;
    window.open(scryfallUrl, '_blank');
}

/***********************
 * C. PRESET MANAGEMENT
 ***********************/
function savePreset() {
    const presetName = prompt('Enter a name for this preset:');
    if (!presetName) return;

    const settings = getSearchSettings();
    localStorage.setItem(`searchPreset_${presetName}`, JSON.stringify(settings));
    updatePresetDropdown();
    alert(`Preset "${presetName}" saved.`);
}

function loadPreset() {
    const presetName = document.getElementById('preset_dropdown').value;
    if (!presetName) return;

    const storedSettings = localStorage.getItem(presetName);
    if (storedSettings) {
        const settings = JSON.parse(storedSettings);
        setSearchSettings(settings);
        alert(`Preset "${presetName.replace('searchPreset_', '')}" loaded.`);
    }
}

function updatePresetDropdown() {
    const dropdown = document.getElementById('preset_dropdown');
    dropdown.innerHTML = '<option value="">Select Preset...</option>';
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('searchPreset_')) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = key.replace('searchPreset_', '');
            dropdown.appendChild(option);
        }
    }
}

/***********************
 * D. EXPORT/IMPORT PRESETS
 ***********************/
function exportPresets() {
    const exportData = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('searchPreset_')) {
            exportData[key] = JSON.parse(localStorage.getItem(key));
        }
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'scryfall_presets.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importPresets() {
    document.getElementById('import_file').click();
}

function importPresetsFromFile() {
    const file = document.getElementById('import_file').files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const importedData = JSON.parse(e.target.result);
            Object.keys(importedData).forEach(key => {
                localStorage.setItem(key, JSON.stringify(importedData[key]));
            });
            updatePresetDropdown();
            alert('Presets imported successfully.');
        } catch (error) {
            alert('Error importing presets.');
        }
    };
    reader.readAsText(file);
}

document.addEventListener('DOMContentLoaded', updatePresetDropdown);
