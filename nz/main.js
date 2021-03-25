let stop = {
    nr: 1,
    name: "Geysire",
    lat: 64.3137,
    lng: -20.2995,
    user: "jbaumgartner1983",
    wikipedia: "https://en.wikipedia.org/wiki/Geysir",
}
console.log(stop);
console.log(stop.name);
console.log(stop.lat);
console.log(stop.lng);
console.log(stop.wikipedia);

const map = L.map ("map", {  //objekt erstellt, liste einfürgen []
    center: [stop.lat, stop.lng], //liste mit koordinaten, lat und long koordinaten
    zoom: 13, //1 ist die ganze Welt
    layers: [              // ist ein array
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")  //server {s} von open street map, {z} ist der zoomlayer
    ]  
});

//console.log(ROUTE)
for (let entry of ROUTE) {       //for Schleife erstellen
   // console.log(entry);

    let mrk = L.marker([entry.lat, entry.lng]).addTo(map);
    mrk.bindPopup(`
      <h4>Stop ${entry.nr}: ${entry.name} </h4>
      <p><i class= "fas fa-external-link-alt mr-3"></i><a href = "${entry.wikipedia}">Read about stop in Wikipedia</a>
      </p>
    `);

    if (entry.nr == 1) {
        mrk.openPopup();
    }

}


//64.3137, -20.2995
//console.log(document.querySelector("#map"));

