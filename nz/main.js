const map = L.map ("map", {  //objekt erstellt, liste einfürgen []
    center: [64.3137, -20.2995], //liste mit koordinaten, lat und long koordinaten
    zoom: 13 //1 ist die ganze Welt
    layers: [              // ist ein array
        L.titleLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")  //server {s} von open street map, {z} ist der zoomlayer
    ]  
});

let mrk = L.marker([64.3137, -20.2995]).addTo(map);
mrk.bindPopup("Geysire").openPopup();

//64.3137, -20.2995
console.log(document.querySelector("#map"));

