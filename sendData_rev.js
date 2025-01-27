// Ustawienia API ThingSpeak
const apiKey = "2AC5IBAN2478STVR"; // Wstaw swój klucz API z ThingSpeak
const apiKeyR  = "DEVD9V4WDUHA203E"; //read key
const fieldName = "field2"; // Nazwa pola, do którego wysyłasz dane
const fieldDifference = "field5"; // Nazwa pola do wysyłania różnicy
const serverURL = `https://api.thingspeak.com`;

// Ścieżka do pliku przechowującego liczbę kliknięć
const FILE_NAME = "click_counter.txt";
const fm = FileManager.iCloud();
const filePath = fm.joinPath(fm.documentsDirectory(), FILE_NAME);

// Funkcja odczytująca liczbę kliknięć
function getClickCount() {
  if (fm.fileExists(filePath)) {
    const content = fm.readString(filePath);
    return parseInt(content) || 0;
  }
  return 0;
}

// Funkcja pobierająca aktualną wartość z ThingSpeak
async function fetchDataFromThingSpeak(field) {
  const url = `${serverURL}/channels/YOUR_CHANNEL_ID/fields/${field}.json?api_key=${apiKeyR}&results=1`;
  const request = new Request(url);

  try {
    const response = await request.loadJSON(); // Pobieranie danych w formacie JSON
    if (response && response.feeds && response.feeds.length > 0) {
      return parseInt(response.feeds[0][`field${field}`]) || 0;
    }
    return 0;
  } catch (error) {
    console.error(`Error fetching data from ThingSpeak: ${error}`);
    return 0;
  }
}

// Funkcja wysyłająca dane do ThingSpeak
async function sendDataToThingSpeak(data) {
  const url = `${serverURL}/update?api_key=${apiKey}&${data}`;
  const request = new Request(url);

  try {
    const response = await request.loadString(); // Wysyłanie zapytania GET
    console.log(`ThingSpeak Response: ${response}`);
    return response;
  } catch (error) {
    console.error(`Error sending data to ThingSpeak: ${error}`);
  }
}

// Główna logika
(async () => {
  const currentClickCount = getClickCount(); // Odczyt liczby kliknięć
  console.log(`Current Click Count: ${currentClickCount}`);

  const cloudValue = await fetchDataFromThingSpeak(2); // Pobranie danych z chmury (field2)
  console.log(`Cloud Value (field2): ${cloudValue}`);

  const difference = currentClickCount - cloudValue; // Obliczenie różnicy
  console.log(`Difference: ${difference}`);

  // Wysyłanie danych
  const dataToSend = `field2=${currentClickCount}&field5=${difference}`;
  await sendDataToThingSpeak(dataToSend);
})();

// Zakończenie skryptu
Script.complete();
