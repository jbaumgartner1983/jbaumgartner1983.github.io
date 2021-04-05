let stop = {
    nr: 1,
    name: "Christchurch Botanic Garden",
    lat: -45.53,
    lng: 172.62,
    user: "jbaumgartner1983",
    wikipedia: "https://en.wikipedia.org/wiki/Christchurch_Botanic_Gardens",
}
/*console.log(stop);
console.log(stop.name);
console.log(stop.lat);
console.log(stop.lng);
console.log(stop.wikipedia);*/

const map = L.map ("map", {  //objekt erstellt, liste einfürgen []
    //center: [stop.lat, stop.lng], //liste mit koordinaten, lat und long koordinaten
    //zoom: 13, //1 ist die ganze Welt
    layers: [              // ist ein array
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")  //server {s} von open street map, {z} ist der zoomlayer
    ]  
});

let nav = document.querySelector("#navigation");
console.log("Navigation HTML Element: ",nav);

//console.log(ROUTE)

ROUTE.sort((stop1,stop2) => {
    if (stop1.nr > stop2) {
        return 1;
    } else {
          return -1;
    }
});

for (let entry of ROUTE) {       //for Schleife erstellen
   // console.log(entry);

   nav.innerHTML += `
    <option value="${entry.user}"> Stop ${entry.nr}: ${entry.name}</option>
   `;
    let mrk = L.marker([entry.lat, entry.lng]).addTo(map);
    mrk.bindPopup(`<h4>Stop ${entry.nr}: ${entry.name} </h4>
<p><a href = "${entry.wikipedia}"><i class= "fas fa-external-link-alt mr-3"></i>Read about stop in Wikipedia</a>
</p>
`);

    if (entry.nr == 1) {
        map.setView ([entry.lat, entry.lng], 1);
        mrk.openPopup();
    }
}

nav.selectedIndex = 1-1;
nav.onchange = (evt) => {
    console.log(evt.target.selectedIndex);
    let selected = evt.target.selectedIndex;
    let options = evt.target.options;

    let username = options[selected].value;
    let link = `https://${username}.github.io/nz/index.html`;
    console.log(link);
    window.location.href = link;
}

//64.3137, -20.2995
//console.log(document.querySelector("#map"));
//<option value="jbaumgartner1983">Geysire</option>
