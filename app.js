// Configuración
const API_URL = "https://emotional-transmutation.fly.dev/emotional-transmutation";
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
    errorInvalidKey: "Clave de acceso inválida. Configúrala en Ajustes.",
    errorNetwork: "Error de conexión. Verifica tu internet.",
    historyOption: "Historial",
    historyTitle: "Historial de Emociones",
    clearHistory: "Limpiar Historial",
    close: "Cerrar",
    noHistory: "No hay registros en el historial",
    from: "de",
    to: "a",
    loadingIdentifying: "Identificando emoción...",
    loadingAnalyzing: "Analizando polaridad...",
    loadingTransmuting: "Generando transmutación...",
    analyzing: "Analizando...",
    emotionsLibrary: "Biblioteca",
    libraryTitle: "Biblioteca de Emociones",
    librarySubtitle: "Basada en la Rueda de Emociones de Plutchik",
    tabPrimary: "Primarias",
    tabDyads: "Compuestas",
    spectrumTitle: "Tu posición en el espectro",
    spectrumDeepNeg: "Estás en el polo profundo negativo. El camino es largo pero cada paso cuenta. Enfócate en pequeñas acciones.",
    spectrumNeg: "Estás en territorio negativo. Las sugerencias te ayudarán a elevar tu vibración gradualmente.",
    spectrumMid: "Estás en una zona neutral. Un pequeño impulso puede llevarte hacia el polo positivo.",
    spectrumPos: "Ya estás acercándote al polo positivo. Mantén las prácticas que te trajeron aquí.",
    spectrumHighPos: "Tu vibración está alta. Estás en el camino correcto de la transmutación.",
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
    errorInvalidKey: "Invalid access key. Configure it in Settings.",
    errorNetwork: "Connection error. Check your internet.",
    historyOption: "History",
    historyTitle: "Emotion History",
    clearHistory: "Clear History",
    close: "Close",
    noHistory: "No history records",
    from: "from",
    to: "to",
    loadingIdentifying: "Identifying emotion...",
    loadingAnalyzing: "Analyzing polarity...",
    loadingTransmuting: "Generating transmutation...",
    analyzing: "Analyzing...",
    emotionsLibrary: "Library",
    libraryTitle: "Emotions Library",
    librarySubtitle: "Based on Plutchik's Wheel of Emotions",
    tabPrimary: "Primary",
    tabDyads: "Compound",
    spectrumTitle: "Your position on the spectrum",
    spectrumDeepNeg: "You are in the deep negative pole. The path is long but every step counts. Focus on small actions.",
    spectrumNeg: "You are in negative territory. The suggestions will help you raise your vibration gradually.",
    spectrumMid: "You are in a neutral zone. A small push can take you toward the positive pole.",
    spectrumPos: "You are approaching the positive pole. Keep the practices that brought you here.",
    spectrumHighPos: "Your vibration is high. You are on the right path of transmutation.",
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
const suggestionsList = document.getElementById("suggestions-list");
const moodLevel = document.getElementById("mood-level");
const historyOption = document.getElementById("history-option");
const historyModal = document.getElementById("history-modal");
const historyList = document.getElementById("history-list");
const clearHistoryButton = document.getElementById("clear-history");
const closeHistoryModal = document.getElementById("close-history-modal");
const emotionsLibraryOption = document.getElementById("emotions-library-option");
const emotionsLibraryModal = document.getElementById("emotions-library-modal");
const closeLibraryModal = document.getElementById("close-library-modal");
const spectrumMarker = document.getElementById("spectrum-marker");
const spectrumLabelLeft = document.getElementById("spectrum-label-left");
const spectrumLabelRight = document.getElementById("spectrum-label-right");
const spectrumMessage = document.getElementById("spectrum-message");
const errorBanner = document.getElementById("error-banner");
const errorMessage = document.getElementById("error-message");
const closeError = document.getElementById("close-error");
const loadingSection = document.getElementById("loading-section");
const polarityBadge = document.getElementById("polarity-badge");
const emotionCategoryTag = document.getElementById("emotion-category-tag");
const intensityLevelTag = document.getElementById("intensity-level-tag");

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
  submitButton.querySelector(".button-text").textContent = t.transmute;
  document.querySelector(".emotion-card:first-child h3").textContent =
    t.identifiedEmotion;
  document.querySelector(".emotion-card:last-child h3").textContent =
    t.transmutedEmotion;
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
  emotionsLibraryOption.textContent = t.emotionsLibrary;
  document.getElementById("library-title").textContent = t.libraryTitle;
  document.getElementById("library-subtitle").textContent = t.librarySubtitle;
  document.getElementById("tab-primary").textContent = t.tabPrimary;
  document.getElementById("tab-dyads").textContent = t.tabDyads;
  document.querySelector(".polarity-spectrum-section h3").textContent = t.spectrumTitle;
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
  suggestionsList.innerHTML = "";
  spectrumMessage.textContent = "";
  resultsSection.classList.add("hidden");
  errorBanner.classList.add("hidden");
}

// Loading state management
let loadingInterval = null;

function showLoading() {
  const t = getCurrentTranslation();
  loadingSection.classList.remove("hidden");

  // Update loading step texts
  document.querySelector("#step-1 .step-text").textContent = t.loadingIdentifying;
  document.querySelector("#step-2 .step-text").textContent = t.loadingAnalyzing;
  document.querySelector("#step-3 .step-text").textContent = t.loadingTransmuting;

  // Reset all steps
  document.querySelectorAll(".loading-step").forEach((step) => {
    step.classList.remove("active", "done");
    const icon = step.querySelector(".step-icon");
    icon.innerHTML = '<span class="step-dot"></span>';
  });
  document.getElementById("step-1").classList.add("active");
  document.querySelector("#step-1 .step-icon").innerHTML = '<span class="spinner-small"></span>';

  // Simulate progress steps
  let currentStep = 1;
  loadingInterval = setInterval(() => {
    if (currentStep < 3) {
      const prevStep = document.getElementById(`step-${currentStep}`);
      prevStep.classList.remove("active");
      prevStep.classList.add("done");
      prevStep.querySelector(".step-icon").innerHTML = '<span class="step-check"></span>';

      currentStep++;
      const nextStep = document.getElementById(`step-${currentStep}`);
      nextStep.classList.add("active");
      nextStep.querySelector(".step-icon").innerHTML = '<span class="spinner-small"></span>';
    }
  }, 4000);
}

function hideLoading() {
  if (loadingInterval) {
    clearInterval(loadingInterval);
    loadingInterval = null;
  }
  // Mark all steps as done
  document.querySelectorAll(".loading-step").forEach((step) => {
    step.classList.remove("active");
    step.classList.add("done");
    step.querySelector(".step-icon").innerHTML = '<span class="step-check"></span>';
  });
  setTimeout(() => {
    loadingSection.classList.add("hidden");
  }, 500);
}

function setButtonLoading(loading) {
  const t = getCurrentTranslation();
  const buttonText = submitButton.querySelector(".button-text");
  const buttonLoading = submitButton.querySelector(".button-loading");
  const loadingText = submitButton.querySelector(".loading-text");

  if (loading) {
    buttonText.classList.add("hidden");
    buttonLoading.classList.remove("hidden");
    loadingText.textContent = t.analyzing;
    submitButton.disabled = true;
  } else {
    buttonText.classList.remove("hidden");
    buttonLoading.classList.add("hidden");
    submitButton.disabled = false;
  }
}

// Mostrar los resultados
function displayResults(data) {
  const parsedData = JSON.parse(data);
  currentEmotion.textContent = parsedData.emotion;
  transmutedEmotion.textContent = parsedData.oppositeEmotion;
  updateMoodBar(parsedData.intensity);

  // Display new fields if available
  if (parsedData.polarityAxis) {
    polarityBadge.textContent = parsedData.polarityAxis;
    polarityBadge.classList.remove("hidden");
  }

  if (parsedData.emotionCategory) {
    emotionCategoryTag.textContent = parsedData.emotionCategory;
  }

  if (parsedData.intensityLevel) {
    intensityLevelTag.textContent = parsedData.intensityLevel;
    intensityLevelTag.className = "intensity-level-tag " + parsedData.intensityLevel;
  }

  // Polarity spectrum
  const t = getCurrentTranslation();
  const pct = (parsedData.intensity / 10) * 100;
  spectrumMarker.style.left = `${pct}%`;

  // Split polarityAxis into left/right labels
  if (parsedData.polarityAxis) {
    const parts = parsedData.polarityAxis.split("↔").map((s) => s.trim());
    spectrumLabelLeft.textContent = parts[0] || parsedData.emotion;
    spectrumLabelRight.textContent = parts[1] || parsedData.oppositeEmotion;
  } else {
    spectrumLabelLeft.textContent = parsedData.emotion;
    spectrumLabelRight.textContent = parsedData.oppositeEmotion;
  }

  // Contextual message based on position
  if (parsedData.intensity <= 2) {
    spectrumMessage.textContent = t.spectrumDeepNeg;
  } else if (parsedData.intensity <= 4) {
    spectrumMessage.textContent = t.spectrumNeg;
  } else if (parsedData.intensity <= 6) {
    spectrumMessage.textContent = t.spectrumMid;
  } else if (parsedData.intensity <= 8) {
    spectrumMessage.textContent = t.spectrumPos;
  } else {
    spectrumMessage.textContent = t.spectrumHighPos;
  }

  suggestionsList.innerHTML = "";
  parsedData.suggestions.forEach((suggestion) => {
    const li = document.createElement("li");
    li.textContent = suggestion;
    suggestionsList.appendChild(li);
  });

  resultsSection.classList.remove("hidden");
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  saveToLocalStorage(emotionDescription.value, data);
}

// Manejar errores
function showError(message) {
  errorMessage.textContent = message;
  errorBanner.classList.remove("hidden");
}

closeError.addEventListener("click", () => {
  errorBanner.classList.add("hidden");
});

// Enviar la descripción emocional
submitButton.addEventListener("click", async () => {
  const description = emotionDescription.value.trim();
  const t = getCurrentTranslation();

  if (!description) {
    showError(t.errorEmptyDescription);
    return;
  }

  clearResults();
  setButtonLoading(true);
  showLoading();

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

    if (response.status === 404) {
      throw new Error(t.errorInvalidKey);
    }

    if (!response.ok) {
      throw new Error(t.errorServer);
    }

    const data = await response.json();
    hideLoading();
    displayResults(data);
  } catch (error) {
    hideLoading();
    if (error.name === "TypeError" && error.message === "Failed to fetch") {
      showError(t.errorNetwork);
    } else {
      showError(error.message);
    }
  } finally {
    setButtonLoading(false);
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

// Emotions library modal
emotionsLibraryOption.addEventListener("click", () => {
  emotionsLibraryModal.classList.remove("hidden");
  settingsMenu.classList.add("hidden");
});

closeLibraryModal.addEventListener("click", () => {
  emotionsLibraryModal.classList.add("hidden");
});

emotionsLibraryModal.addEventListener("click", (e) => {
  if (e.target === emotionsLibraryModal) {
    emotionsLibraryModal.classList.add("hidden");
  }
});

// Library tab switching
document.querySelectorAll(".library-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".library-tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".library-panel").forEach((p) => p.classList.add("hidden"));
    tab.classList.add("active");
    document.getElementById(`panel-${tab.dataset.tab}`).classList.remove("hidden");
  });
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
