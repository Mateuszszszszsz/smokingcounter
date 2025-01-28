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
  "Jestem z Ciebie dumny ", "Kocham Cię Słonko", "Wiem że dasz radę!", "Wierzę w Ciebie!", "Wierzę w Twój sukces", "Czekam na Twoje białe oczka", "Dzięki Tobie życie jest lepsze", 
  "Sprawiasz że mi się chce!", "It's beautiful sunset isn;t it?", "Czekam na Twój powrót z utęsknieniem!",
  "Jestem zawsze gdybyś tego potrzebowała <3", "Budujesz mnie bardziej niż Ci się to wydaje!", "Dzięki Tobie wierzę w miłość", "Tak trzymaj, wiem że dasz radę!", "Dla Ciebie się nie poddam <3", 
  "Twoja siła mnie inspiruje", "Każde Twoje małe zwycięztwo sprawia że jestem dumny", "Twój sukces jest dla mnie największym darem", "Zwycięzstwo jest blisko, czuję to <3", "Dziękuję, żenasze wspólne chwile są dla Ciebie tak cenne",
  "Dziękuję, że dla Ciebie nasze wspólne chwile są tak cenne", "Jesteś dla mnie najważniejsza", "Twoja determinacja mnie zachwyca", "Jesteś moim Słodziakiem"
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

  let message = widget.addText(randomMessage);
  widget.addSpacer();
  message.centerAlignText()
  message.font = Font.boldSystemFont(20);

  const footer = widget.addText("Czekam na piątek i moją najsilniejszą!");
  footer.font = Font.footnote();
  footer.textOpacity = 0.7;
  footer.centerAlignText();

  return widget;
}

// Wywołanie funkcji wysyłającej dane i tworzącej widżet
await sendDataToThingSpeak(dataToSend);
const widget = await createWidget();
Script.setWidget(widget);
widget.presentMedium();

// Zakończenie skryptu
Script.complete();
