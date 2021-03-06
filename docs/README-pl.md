# DashboardUI

## Wymagania

Do poprawnego działania wymagane jest dołączenie do pliku HTML poniższych bibliotek. 

* [AngularJS]
* [D3]

Należy je dołączyć przed plikami tego projektu.

## Sposób użycia

Projekt służy do wyświetlania danych przy pomocy grafiki wektorowej w technologii SVG. Każdy kod źórdłowy prezentowany w przykładach powinien znajdować się wewnątrz znacznika `<svg></svg>`.

## Dostępne kontrolki

### Licznik analogowy

Aby użyć licznika analogowego należy do grupy zawierającej fragment kodu obrazu dodać klasę `analog-gauge`. Do poprawnego działania licznik potrzebuje zdefiniowanej grupy elementów, z których składa się wskazówka. Grupa powinna być oznaczona identyfikatorem `indicator`. Grupa ta powinna znajdować się w położeniu początkowym, tzn. wskazówka powinna być skierowana ku górze (kąt 0 stopni). Należy także zwrócić uwagę na kolejność wyświetlania elementów obrazu SVG, ponieważ wskazówka może zostać przysłonięta innym elementem.

Przykładow kod znajduje się poniżej.

```html
<g class="analog-gauge" data-start-angle="-120" data-max-value="220" data-value="10" data-indicator-origin-x="200" data-indicator-origin-y="200">
    ...
    <g id="indicator">
        <!-- obiekty, z których zbudowana jest strzałka licznika -->
    </g>
    ...
</g>
```

Licznik analogowy posiada kilka atrybutów, które są opisane w tabeli poniżej. Należy ich użyć w znaczniku, do którego została przypisana klasa `analog-gauge`. Przedrostek `data-` w parametrach nie jest konieczny, zapewnia on kompatybilność z niektórymi starszymy wersjami przeglądarek.

| Parametr | Opis | Wymagany |
| -------- | ---- |:--------:|
| ***data-end-angle*** | Kąt położenia wskazówki w stopniach osiągany wtedy, gdy parametr ***data-value*** ma wartość maksymalną równą ***data-max-value***. Wartość domyślna to kąt przeciwny do kąta ***data-start-angle***. | Nie |
| ***data-indicator-origin-x*** | Pozycja X środka obrotu wskazówki licznika. Wartością domyślną jest pozycja X środka dolnej krawędzi prostokąta zawierającego wskazówkę. Zalecane jest podanie punktu obrotu wskazówki | Zalecany |
| ***data-indicator-origin-y*** | Pozycja Y środka obrotu wskazówki licznika. Wartością domyślną jest pozycja Y środka dolnej krawędzi prostokąta zawierającego wskazówkę. | Zalecany |
| ***data-max-value*** | Maksymalna wartość wskazywana przez licznik. | Tak |
| ***data-min-value*** | Minimalna wartość wskazywana przez licznik. Wartość domyślna to 0. | Nie |
| ***data-start-angle*** | Kąt położenia wskazówki w stopniach osiągany wtedy, gdy parametr ***data-value*** ma wartość minimalną równą ***data-min-value***. | Tak |
| ***data-value*** | Aktualna wartość licznika. Każda jej zmiana spowoduje ponowne przeliczenie pozycji wskazówki. W przykładach zostało użyte wiązanie danych za pomoca biblioteki [AngularJS]. | Tak |
| ***data-x*** | Pozycja wskaźnika na osi X (lewy górny róg). Domyślnie X=0.| Nie |
| ***data-y*** | Pozycja wskaźnika na osi Y (lewy górny róg). Domyślnie Y=0.| Nie |


Podanie ujemnego parametru `data-start-angle` i pozostawienie pustego (lub nie podanie) `data-end-angle` spowoduje, że wskazówka wraz ze wzrostem wartości będzie poruszała się zgodnie z kierunkiem wskazówek zegara. Identyczna sytuacja będzie miała miejsce, gdy kąt `data-start-angle` będzie mniejszy od kąta `data-end-angle`. W pozostałych przypadkach wskazówka wraz ze wzrostem wartości będzie poruszała się w kierunku przeciwnym do ruchu wskazówek zegara. Wszystkie możliwe przypadki użycia można znaleźć w pliku `demos/analog-gauges-demo.html`.

### Wyświetlacz 7-mio segmentowy

Przypisanie klasy `seven-segment-display` do pustej grupy elementów obiektu SVG spowoduje przekształcenie jej w wyświetlacz 7-mio segmentowy. Jest on w stanie wyświetlać cyfry, podstawowe 26 liter z alfabetu łacińskiego oraz znak kropki. Wszystkie znaki są wyrównane do prawej strony. Tak powstały wyświetlacz można skalować przy pomocy stylu CSS (parametrem `font-size`). Przykładowy kod znajduje się poniżej i w pliku `demos/segment-displays-demo.html` dołączonym do projektu.

```html
<g class="seven-segment-display" data-digits="3" data-value="{{value}}"></g>
```

Posiada on następujące parametry:

| Parametr | Opis | Wymagany |
| -------- | ---- |:--------:|
| ***data-digits*** | Ilość znaków wyświetlanych na wyświetlaczu. Podanie większej ilości znaków w parametrze ***data-value*** spowoduje wyświetlenie ostatnich *n* liczb, gdzie *n* to wartość parametru ***data-digits***. | Tak |
| ***data-show-background*** | Wartość `true` spowoduje wyświetlanie półprzeźroczystego tła pod znakami. Domyślnie `false`. | Nie |
| ***data-value*** | Dane do wyświetlenia na wyświetlaczu. Każda zmiana wartości spowoduje zmianę informacji na wyświetlaczu. | Tak |
| ***data-x*** | Pozycja wyświetlacza na osi X (lewy górny róg). Domyślnie X=0.| Nie |
| ***data-y*** | Pozycja wyświetlacza na osi Y (lewy górny róg). Domyślnie Y=0.| Nie |

Czcionka użyta w wyświetlaczu to [DSEG]. Na stronie twórcy znajduje się lista znaków, które mogą zostać użyte na wyświetlaczu.

### Wyświetlacz 14-to segmentowy

Zasada działania jest identyczna jak opisanego wyżej wyświetlacza 7-mio segmentowego. Wersja 14-to segmentowa jest w stanie wyświetlić większą ilość znaków. Klasa odpowiedzialna za wyświetlacz 14-to segmentowy to `fourteen-segment-display`.

Czcionka użyta w wyświetlaczu to [DSEG]. Na stronie twórcy znajduje się lista znaków, które mogą zostać użyte na wyświetlaczu.

### Wyświetlacz alfanumeryczny

| Parametr | Opis | Wymagany |
| -------- | ---- |:--------:|
| ***data-columns*** | Liczba znaków w linii widocznych na wyświetlaczu. Domyślna wartość to 16.| Nie |
| ***data-lines*** | Dane do wyświetlenia na wyświetlaczu w postaci tablicy łańcuchów znaków | Tak |
| ***data-rows*** | Liczba linii tekstu widocznych na wyświetlaczu. Domyślna wartość to 2. | Nie |
| ***data-scale*** | Skalowanie wyświetlacza. Domyślna wartość to 1.0. | Nie |
| ***data-show-background*** | Wartość `true` spowoduje wyświetlanie półprzeźroczystego tła pod znakami. Domyślnie `false`. | Nie |
| ***data-x*** | Pozycja wyświetlacza na osi X (lewy górny róg). Domyślnie X=0.| Nie |
| ***data-y*** | Pozycja wyświetlacza na osi Y (lewy górny róg). Domyślnie Y=0.| Nie |

### Dioda led

| Parametr | Opis | Wymagany |
| -------- | ---- |:--------:|
| ***data-mode*** | Stan diody, może przyjąć następujące wartości: <ul><li>`off` - dioda wyłączona</li><li>`on` - dioda włączona</li><li>`blinking` - dioda migająca</li></ul>| Tak |
| ***data-blinking-interval*** | Szybkość zmiany stanu w trybie blinking wyrażona w milisekundach. Standardowa wartość to 500. | Nie |
| ***data-blinking-delay*** | Opóźnienie zmiany stanu w trybie blinking wyrażona w milisekundach. Standardowa wartość to 0 (dioda wygasza się bez animacji) | Nie |
| ***data-turn-off-level*** | Poziom maksymalnego wygaszenia diody. Standardowa wartość to 0.0. Większa wartość spowoduje, że dioda w trybie `off` oraz `blinking` będzie bardziej widoczna. | Nie |
| ***data-turn-on-level*** | Poziom maksymalnego zapalenia diody. Standardowa wartość to 1.0. Mniejsza wartość spowoduje, że dioda w trybie `on` oraz `blinking` będzie mniej widoczna. | Nie |
| ***data-x*** | Pozycja diody na osi X (lewy górny róg). Domyślnie X=0.| Nie |
| ***data-y*** | Pozycja diody na osi Y (lewy górny róg). Domyślnie Y=0.| Nie |

### Wskaźnik typu "progress bar"

| Parametr | Opis | Wymagany |
| -------- | ---- |:--------:|
| ***data-max-position*** | Pozycja wskaźnika przy maksymalnej wartości. Domyślnie równa wartości długości elementu o identyfikatorze `bar` znajdującego się wewnątrz grupy o klasie `bar-meter`. | Nie |
| ***data-max-value*** | Maksymalna wartość wskaźnika. | Tak |
| ***data-min-position*** | Pozycja wskaźnika przy minimalnej wartości. Domyślna wartość to 0. | Nie |
| ***data-min-value*** | Minimalna wartość wskaźnika. Domyślna wartość to 0. | Nie |
| ***data-value*** | Aktualna wartość wskaźnika. Każda zmiana wartości spowoduje ponowne przeliczenie pozycji wskaźnika. W przykładach zostało użyte wiązanie danych za pomoca biblioteki [AngularJS]. | Tak |
| ***data-vertical*** | Wartość `true` powoduje, że wskaźnik pokazuje zmiany wartości w orientacji pionowej. Domyślna wartość to `false`. | Nie |
| ***data-x*** | Pozycja wskaźnika na osi X (lewy górny róg). Domyślnie X=0.| Nie |
| ***data-y*** | Pozycja wskaźnika na osi Y (lewy górny róg). Domyślnie Y=0.| Nie |

### Wskaźnik diodowy

| Parametr | Opis | Wymagany |
| -------- | ---- |:--------:|
| ***data-max-value*** | Maksymalna wartość wskaźnika.| Tak |
| ***data-min-value*** | Minimalna wartość wskaźnika. Domyślna wartość to 0. | Nie |
| ***data-value*** | Aktualna wartość wskaźnika. Każda zmiana wartości spowoduje ponowne przeliczenie pozycji wskaźnika. W przykładach zostało użyte wiązanie danych za pomoca biblioteki [AngularJS]. | Tak |
| ***data-x*** | Pozycja wskaźnika na osi X (lewy górny róg). Domyślnie X=0.| Nie |
| ***data-y*** | Pozycja wskaźnika na osi Y (lewy górny róg). Domyślnie Y=0.| Nie |

[//]: #
[AngularJS]: <http://angularjs.org>
[D3]: <http://d3js.org>
[DSEG]: <http://www.keshikan.net/fonts-e.html>