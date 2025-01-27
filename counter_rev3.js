// Ustawienia API ThingSpeak
const apiKey = "2AC5IBAN2478STVR"; // Wstaw swój klucz API z ThingSpeak
const fieldName = "field2"; // Nazwa pola, do którego wysyłasz dane
const serverURL = `https://api.thingspeak.com/update`;

// Ścieżka do pliku przechowującego liczbę kliknięć
const FILE_NAME = "click_counter.txt";
const fm = FileManager.iCloud();
const filePath = fm.joinPath(fm.documentsDirectory(), FILE_NAME);

// Tablica napisów
const messages = [
  "napis1", "napis2", "napis3", "napis4", "napis5", "napis6", "napis7", "napis8", "napis9", "napis10",
  "napis11", "napis12", "napis13", "napis14", "napis15", "napis16", "napis17", "napis18", "napis19", "napis20",
  "napis21", "napis22", "napis23", "napis24", "napis25", "napis26", "napis27", "napis28", "napis29", "napis30"
];

// Funkcja odczytująca liczbę kliknięć
function getClickCount() {
  if (fm.fileExists(filePath)) {
    const content = fm.readString(filePath);
    return parseInt(content) || 0;
  }
  return 0;
}

// Przykładowa zmienna do wysłania
const dataToSend = getClickCount(); // Wartość, którą chcesz wysłać (np. przechowywana w pliku)

// Funkcja wysyłająca dane do ThingSpeak
async function sendDataToThingSpeak(value) {
  const url = `${serverURL}?api_key=${apiKey}&${fieldName}=${value}`;
  const request = new Request(url);

  try {
    const response = await request.loadString(); // Wysyłanie zapytania GET
    console.log(`ThingSpeak Response: ${response}`);
    return response;
  } catch (error) {
    console.error(`Error sending data to ThingSpeak: ${error}`);
  }
}

// Funkcja losująca napis z tablicy
function getRandomMessage() {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

// Tworzenie widżetu
async function createWidget() {
  const widget = new ListWidget();
  const randomMessage = getRandomMessage();

  widget.addText(randomMessage);
  widget.addSpacer();

  const footer = widget.addText("Losowy napis");
  footer.font = Font.footnote();
  footer.textOpacity = 0.7;

  return widget;
}

// Wywołanie funkcji wysyłającej dane i tworzącej widżet
await sendDataToThingSpeak(dataToSend);
const widget = await createWidget();
Script.setWidget(widget);
widget.presentMedium();

// Zakończenie skryptu
Script.complete();
