// Configuración
const API_URL = "https://news-summary.fly.dev/emotional-transmutation";
const DEFAULT_KEY = "1234567890";
const DEFAULT_LANG = "en";

// Traducciones
const translations = {
  es: {
    title: "Transmutación Emocional",
    configureButton: "Configurar",
    accessKeyOption: "Clave de Acceso",
    languageOption: "Idioma",
    negative: "Negativo",
    positive: "Positivo",
    placeholder: "Describe cómo te sientes en este momento...",
    transmute: "Transmutar Emoción",
    identifiedEmotion: "Emoción Identificada",
    transmutedEmotion: "Emoción Transmutada",
    emotionalIntensity: "Intensidad Emocional",
    suggestions: "Sugerencias para la Transmutación",
    configureKey: "Configurar Clave de Acceso",
    keyPlaceholder: "Ingresa tu clave de acceso",
    save: "Guardar",
    cancel: "Cancelar",
    selectLanguage: "Seleccionar Idioma",
    spanish: "Español",
    english: "English",
    errorEmptyDescription: "Por favor, describe cómo te sientes",
    errorEmptyKey: "Por favor, ingresa una clave válida",
    errorServer: "Error en la respuesta del servidor",
    historyOption: "Historial",
    historyTitle: "Historial de Emociones",
    clearHistory: "Limpiar Historial",
    close: "Cerrar",
    noHistory: "No hay registros en el historial",
    from: "de",
    to: "a",
  },
  en: {
    title: "Emotional Transmutation",
    configureButton: "Settings",
    accessKeyOption: "Access Key",
    languageOption: "Language",
    negative: "Negative",
    positive: "Positive",
    placeholder: "Describe how you feel right now...",
    transmute: "Transmute Emotion",
    identifiedEmotion: "Identified Emotion",
    transmutedEmotion: "Transmuted Emotion",
    emotionalIntensity: "Emotional Intensity",
    suggestions: "Transmutation Suggestions",
    configureKey: "Configure Access Key",
    keyPlaceholder: "Enter your access key",
    save: "Save",
    cancel: "Cancel",
    selectLanguage: "Select Language",
    spanish: "Español",
    english: "English",
    errorEmptyDescription: "Please describe how you feel",
    errorEmptyKey: "Please enter a valid key",
    errorServer: "Server response error",
    historyOption: "History",
    historyTitle: "Emotion History",
    clearHistory: "Clear History",
    close: "Close",
    noHistory: "No history records",
    from: "from",
    to: "to",
  },
};

// Elementos del DOM
const settingsButton = document.getElementById("settings-button");
const settingsMenu = document.getElementById("settings-menu");
const accessKeyOption = document.getElementById("access-key-option");
const languageOption = document.getElementById("language-option");
const keyModal = document.getElementById("key-modal");
const languageModal = document.getElementById("language-modal");
const accessKeyInput = document.getElementById("access-key");
const saveKeyButton = document.getElementById("save-key");
const closeKeyModal = document.getElementById("close-key-modal");
const langEs = document.getElementById("lang-es");
const langEn = document.getElementById("lang-en");
const saveLanguage = document.getElementById("save-language");
const closeLanguageModal = document.getElementById("close-language-modal");
const emotionDescription = document.getElementById("emotion-description");
const submitButton = document.getElementById("submit-emotion");
const resultsSection = document.getElementById("results");
const currentEmotion = document.getElementById("current-emotion");
const transmutedEmotion = document.getElementById("transmuted-emotion");
const emotionIntensity = document.getElementById("emotion-intensity");
const suggestionsList = document.getElementById("suggestions-list");
const moodLevel = document.getElementById("mood-level");
const historyOption = document.getElementById("history-option");
const historyModal = document.getElementById("history-modal");
const historyList = document.getElementById("history-list");
const clearHistoryButton = document.getElementById("clear-history");
const closeHistoryModal = document.getElementById("close-history-modal");

// Inicializar configuraciones
if (!localStorage.getItem("accessKey")) {
  localStorage.setItem("accessKey", DEFAULT_KEY);
}
if (!localStorage.getItem("language")) {
  localStorage.setItem("language", DEFAULT_LANG);
}

// Manejadores del menú de configuración
settingsButton.addEventListener("click", () => {
  settingsMenu.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  if (!settingsButton.contains(e.target) && !settingsMenu.contains(e.target)) {
    settingsMenu.classList.add("hidden");
  }
});

// Manejadores del modal de clave
accessKeyOption.addEventListener("click", () => {
  accessKeyInput.value = localStorage.getItem("accessKey") || "";
  keyModal.classList.remove("hidden");
  settingsMenu.classList.add("hidden");
});

closeKeyModal.addEventListener("click", () => {
  keyModal.classList.add("hidden");
});

saveKeyButton.addEventListener("click", () => {
  const newKey = accessKeyInput.value.trim();
  if (newKey) {
    localStorage.setItem("accessKey", newKey);
    keyModal.classList.add("hidden");
  } else {
    alert(getCurrentTranslation().errorEmptyKey);
  }
});

// Manejadores del modal de idioma
languageOption.addEventListener("click", () => {
  const currentLang = localStorage.getItem("language") || DEFAULT_LANG;
  langEs.classList.toggle("selected", currentLang === "es");
  langEn.classList.toggle("selected", currentLang === "en");
  languageModal.classList.remove("hidden");
  settingsMenu.classList.add("hidden");
});

closeLanguageModal.addEventListener("click", () => {
  languageModal.classList.add("hidden");
});

langEs.addEventListener("click", () => {
  langEs.classList.add("selected");
  langEn.classList.remove("selected");
});

langEn.addEventListener("click", () => {
  langEn.classList.add("selected");
  langEs.classList.remove("selected");
});

saveLanguage.addEventListener("click", () => {
  const newLang = langEs.classList.contains("selected") ? "es" : "en";
  localStorage.setItem("language", newLang);
  updateUILanguage();
  languageModal.classList.add("hidden");
});

// Cerrar modales al hacer clic fuera
[keyModal, languageModal].forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});

// Obtener traducciones actuales
function getCurrentTranslation() {
  const currentLang = localStorage.getItem("language") || DEFAULT_LANG;
  return translations[currentLang];
}

// Actualizar idioma en la interfaz
function updateUILanguage() {
  const t = getCurrentTranslation();
  document.title = t.title;
  document.querySelector("h1").textContent = t.title;
  settingsButton.textContent = t.configureButton;
  accessKeyOption.textContent = t.accessKeyOption;
  languageOption.textContent = t.languageOption;
  document.querySelector(".mood-labels span:first-child").textContent =
    t.negative;
  document.querySelector(".mood-labels span:last-child").textContent =
    t.positive;
  emotionDescription.placeholder = t.placeholder;
  submitButton.textContent = t.transmute;
  document.querySelector(".emotion-card:first-child h3").textContent =
    t.identifiedEmotion;
  document.querySelector(".emotion-card:last-child h3").textContent =
    t.transmutedEmotion;
  document.querySelector(".intensity-section h3").textContent =
    t.emotionalIntensity;
  document.querySelector(".suggestions-section h3").textContent = t.suggestions;
  document.querySelector("#key-modal h2").textContent = t.configureKey;
  accessKeyInput.placeholder = t.keyPlaceholder;
  document.querySelector("#language-modal h2").textContent = t.selectLanguage;
  Array.from(
    document.querySelectorAll(".modal-buttons button:first-child")
  ).forEach((btn) => (btn.textContent = t.save));
  Array.from(
    document.querySelectorAll(".modal-buttons button:last-child")
  ).forEach((btn) => (btn.textContent = t.cancel));
  historyOption.textContent = t.historyOption;
  document.querySelector("#history-modal h2").textContent = t.historyTitle;
  clearHistoryButton.textContent = t.clearHistory;
  closeHistoryModal.textContent = t.close;
  if (historyModal.classList.contains("hidden")) {
    displayHistory();
  }
}

// Actualizar la barra de estado de ánimo
function updateMoodBar(intensity) {
  const percentage = (intensity / 10) * 100;
  moodLevel.style.width = `${percentage}%`;
}

// Limpiar los resultados anteriores
function clearResults() {
  currentEmotion.textContent = "";
  transmutedEmotion.textContent = "";
  emotionIntensity.textContent = "";
  suggestionsList.innerHTML = "";
  resultsSection.classList.add("hidden");
}

// Mostrar los resultados
function displayResults(data) {
  console.log("data here: ", data);
  const parsedData = JSON.parse(data);
  currentEmotion.textContent = parsedData.emotion;
  transmutedEmotion.textContent = parsedData.oppositeEmotion;
  emotionIntensity.textContent = `${parsedData.intensity}/10`;
  updateMoodBar(parsedData.intensity);

  suggestionsList.innerHTML = "";
  console.log(parsedData.suggestions);
  parsedData.suggestions.forEach((suggestion) => {
    const li = document.createElement("li");
    li.textContent = suggestion;
    suggestionsList.appendChild(li);
  });

  resultsSection.classList.remove("hidden");
  saveToLocalStorage(emotionDescription.value, data);
}

// Manejar errores
function handleError(error) {
  alert(`Error: ${error.message}`);
}

// Enviar la descripción emocional
submitButton.addEventListener("click", async () => {
  const description = emotionDescription.value.trim();
  if (!description) {
    alert(getCurrentTranslation().errorEmptyDescription);
    return;
  }

  clearResults();
  submitButton.disabled = true;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: localStorage.getItem("accessKey"),
        emotionDescription: description,
        language: localStorage.getItem("language"),
      }),
    });

    if (!response.ok) {
      throw new Error(getCurrentTranslation().errorServer);
    }

    const data = await response.json();
    console.log(data);
    displayResults(data);
  } catch (error) {
    handleError(error);
  } finally {
    submitButton.disabled = false;
  }
});

// Guardar en el almacenamiento local
function saveToLocalStorage(description, results) {
  const history = JSON.parse(localStorage.getItem("emotionHistory") || "[]");
  history.push({
    timestamp: new Date().toISOString(),
    description,
    results,
  });
  localStorage.setItem("emotionHistory", JSON.stringify(history));
}

// Inicializar el idioma al cargar
updateUILanguage();

// Manejadores del modal de historial
historyOption.addEventListener("click", () => {
  displayHistory();
  historyModal.classList.remove("hidden");
  settingsMenu.classList.add("hidden");
});

closeHistoryModal.addEventListener("click", () => {
  historyModal.classList.add("hidden");
});

clearHistoryButton.addEventListener("click", () => {
  if (confirm(getCurrentTranslation().clearHistoryConfirm)) {
    localStorage.removeItem("emotionHistory");
    displayHistory();
  }
});

// Función para formatear la fecha
function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(
    localStorage.getItem("language") === "es" ? "es-ES" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(date);
}

// Función para mostrar el historial
function displayHistory() {
  const history = JSON.parse(localStorage.getItem("emotionHistory") || "[]");
  const t = getCurrentTranslation();

  if (history.length === 0) {
    historyList.innerHTML = `<p class="history-empty">${t.noHistory}</p>`;
    return;
  }

  historyList.innerHTML = history
    .reverse()
    .map((entry) => {
      const data =
        typeof entry.results === "string"
          ? JSON.parse(entry.results)
          : entry.results;
      return `
      <div class="history-item">
        <div class="history-date">${formatDate(entry.timestamp)}</div>
        <div class="history-description">"${entry.description}"</div>
        <div class="history-emotions">
          <span>${data.emotion}</span>
          <span>→</span>
          <span>${data.oppositeEmotion}</span>
          <span class="history-intensity">(${data.intensity}/10)</span>
        </div>
        <div class="history-suggestions">
          <ul>
            ${data.suggestions
              .map((suggestion) => `<li>${suggestion}</li>`)
              .join("")}
          </ul>
        </div>
      </div>
    `;
    })
    .join("");
}
