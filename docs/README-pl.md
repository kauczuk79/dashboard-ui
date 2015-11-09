# DashboardUI

## Wymagania
* [AngularJS]
* [D3]

## Dostępne kontrolki

### Licznik analogowy

Znacznik licznika analogowego ``<analog-gauge>`` powinien zawierać wewnątrz obraz wektorowy w formacie SVG. Do poprawnego działania licznik potrzebuje zdefiniowanej grupy elementów, z których składa się wskazówka. Grupa powinna być oznaczona identyfikatorem ``indicator``. Grupa ta powinna znajdować się w położeniu początkowym, tzn. wskazówka powinna być skierowana ku górze (kąt 0 stopni). Przykład kodu znajduje się poniżej.

```html
<analog-gauge start-angle="-120" max-value="220" value="10" indicator-origin-x="200" indicator-origin-y="200">
    <svg width="100" height="100">
        ...
        <g id="indicator">
            <!-- obiekty, z których zbudowana jest strzałka licznika -->
        </g>
        ...
    </svg>
</analog-gauge>
```

Znacznik ``<analog-gauge>`` posiada kilka parametrów, które są opisane w tabeli poniżej.

| Parametr | Opis |
|:-|:-|
|***start-angle***|Kąt położenia wskazówki w stopniach osiągany wtedy, gdy parametr ***value*** ma wartość minimalną równą ***min-value***. Parametr wymagany.|
|***end-angle***|Kąt położenia wskazówki w stopniach osiągany wtedy, gdy parametr ***value*** ma wartość maksymalną równą ***max-value***. Wartość domyślna to kąt przeciwny do kąta ***start-angle***. Parametr opcjonalny|
|***max-value***|Maksymalna wartość wskazywana przez licznik. Parametr wymagany.|
|***min-value***|Minimalna wartość wskazywana przez licznik. Parametr opcjonalny.|
|***value***|Aktualna wartość licznika. Parametr wymagany.|
|***indicator-origin-x***|Pozycja X środka obrotu wskazówki licznika. Wartością domyślną jest pozycja X środka prostokąta zawierającego wskazówkę. Parametr opcjonalny (zalecane jest jego podanie).|
|***indicator-origin-y***|Pozycja Y środka obrotu wskazówki licznika. Wartością domyślną jest pozycja Y środka prostokąta zawierającego wskazówkę. Parametr opcjonalny (zalecane jest jego podanie).|

[//]: #
[AngularJS]: <http://angularjs.org>
[D3]: <http://d3js.org>