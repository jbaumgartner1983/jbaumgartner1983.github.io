const map = L.map ("map", {  //objekt erstellt, liste einfürgen []
    center: [64.3137, -20.2995], //liste mit koordinaten, lat und long koordinaten
    zoom: 13 //1 ist die ganze Welt
    layers: [              // ist ein array
        L.titleLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")  //server {s} von open street map, {z} ist der zoomlayer
    ]  
});
//64.3137, -20.2995
console.log(document.querySelector("#map"));

