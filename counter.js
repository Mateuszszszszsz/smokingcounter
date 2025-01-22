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

// Funkcja zapisująca liczbę kliknięć
function saveClickCount(count) {
  fm.writeString(filePath, String(count));
}

// Pobranie bieżącej liczby kliknięć
let clickCount = getClickCount();

// Sprawdzenie, czy skrypt zostałii uruchomiony w wyniku kliknięcia
if (args.queryParameters.clicked === "true") {
  clickCount += 1;
  saveClickCount(clickCount);
}



// Wyświetlenie liczby kliknięć
// let countText = widget.addText(`${clickCount}`);
// countText.textColor = Color.white();
// countText.font = Font.boldSystemFont(30);
// countText.centerAlignText();
// widget.addSpacer(8);

// Podzielenie czasu 4-krotnie

const quarter1 = Math.floor(clickCount*116);
const weeks = Math.floor(quarter1/3600/24/7);
const days =Math.floor((quarter1/3600/24)%7);
const hours = Math.floor((quarter1/3600)%24)
const minutes =Math.floor((quarter1/60)%60)
//  Stworzenie widÅ¼etu
let widget = new ListWidget();
widget.backgroundColor = new Color("#1c1c1e");

// Ustawienie tytuÅ‚u widÅ¼etu
let title = widget.addText("Od: 22.01.2025");
title.textColor = Color.white();
title.font = Font.boldSystemFont(16);
title.centerAlignText();
widget.addSpacer(8);
weeks
// WyÅ›wietlenie wynikÃ³w
let elapsedText = widget.addText(`Moglibymy mieć wiecej czasu razem o:`);
elapsedText.textColor = Color.white();
elapsedText.font = Font.systemFont(11);
elapsedText.centerAlignText();
widget.addSpacer(4);


//d
let elapseddate = widget.addText(`${weeks}t ${days}d ${hours}h ${minutes}m`);
elapseddate.textColor = Color.white();
elapseddate.font = Font.boldSystemFont(18);
elapseddate.centerAlignText();
widget.addSpacer(4);


// Dodanie instrukcji do widżetu
let instruction = widget.addText("Kliknij, aby skrocic czas");
instruction.textColor = new Color("#9e9e9e");
instruction.font = Font.systemFont(12);
instruction.centerAlignText();

// Ustawienie akcji na kliknięcie
widget.url = URLScheme.forRunningScript() + "?clicked=true";

// Prezentacja widżetu
if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}

// Zakończenie skryptu
// Safari.open("shortcuts://x-callback-url/// home");
Script.complete();