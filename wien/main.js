// OGD-Wien Beispiel

// Kartenhintergründe der basemap.at definieren
let baselayers = {
    standard: L.tileLayer.provider("BasemapAT.basemap"),
    grau: L.tileLayer.provider("BasemapAT.grau"),
    terrain: L.tileLayer.provider("BasemapAT.terrain"),
    surface: L.tileLayer.provider("BasemapAT.surface"),
    highdpi: L.tileLayer.provider("BasemapAT.highdpi"),
    ortho_overlay: L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ]),
};

// Overlays für die Themen zum Ein- und Ausschalten definieren
let overlays = {
    busLines: L.featureGroup(),
    busStops: L.markerClusterGroup(), //marker nur für Punkte
    pedAreas: L.featureGroup(), //Fußgängerzone
    sightSeeing: L.featureGroup()
};

// Karte initialisieren und auf Wiens Wikipedia Koordinate blicken
let map = L.map("map", {
    fullscreenControl: true, //Auswahl Vollbild für die Karte
    center: [48.208333, 16.373056], //Mitte von Wien
    zoom: 13,
    layers: [
        baselayers.grau
    ]
});

//Minimap
var miniMap = new L.Control.MiniMap(
    L.tileLayer.provider("BasemapAT.basemap"), {
        toggleDisplay: true,
        minimized: false
    }
).addTo(map);

// Kartenhintergründe und Overlays zur Layer-Control hinzufügen
let layerControl = L.control.layers({
    "basemap.at Standard": baselayers.standard,
    "basemap.at grau": baselayers.grau,
    "basemap.at Relief": baselayers.terrain,
    "basemap.at Oberfläche": baselayers.surface,
    "basemap.at hochauflösend": baselayers.highdpi,
    "basemap.at Orthofoto beschriftet": baselayers.ortho_overlay
}, {
    "Liniennetz Vienna Sightseeing": overlays.busLines,
    "Haltestellen Vienna Sightseeing": overlays.busStops,
    "Fußgängerzonen": overlays.pedAreas,
    "Sehenswürdigkeiten in Wien": overlays.sightSeeing
}).addTo(map);

// alle Overlays nach dem Laden anzeigen
overlays.busLines.addTo(map);
overlays.busStops.addTo(map);
overlays.pedAreas.addTo(map);
overlays.sightSeeing.addTo(map);

let drawBusLine = (geojsonData) => {
    console.log('Bus Lines: ', geojsonData);
    L.geoJson(geojsonData, {
        style: (feature) => {
            let col = COLORS.buslines[feature.properties.LINE_NAME];
            return {
                color: col

                /*  if feature.properties.LINE_NAME == "Blue Line"){
                      col = COLORS.buslines.["Blue Line"];
                  }

                  if feature.properties.LINE_NAME == "Yellow Line"){
                      col = COLORS.buslines.["Yellow Line"];

                  }*/

            }
        },
        onEachFeature: (feature, layer) => {
            layer.bindPopup(`<strong>${feature.properties.LINE_NAME}</strong>
            <hr>
            von ${feature.properties.FROM_NAME}<br>
            nach ${feature.properties.TO_NAME}`)
        }
    }).addTo(overlays.busLines);
}

let drawPedestrianAreas = (geojsonData) => {
    console.log('Zone: ', geojsonData);
    L.geoJson(geojsonData, {
        style: (feature) => {
            return {
                stroke: true,
                color: "silver",
                fillColor: "yellow",
                fillOpacity: 0.3
            }
        },
        onEachFeature: (feature, layer) => {
            layer.bindPopup(`<strong> Fußgängerzone ${feature.properties.ADRESSE}</strong>
            <hr>
            ${feature.properties.ZEITRAUM || ""} <br>
            ${feature.properties.AUSN_TEXT || ""}
            `);
        },
        attribution: '<a href="https://data.wien.gv.at">Stadt Wien</a>'
    }).addTo(overlays.pedAreas);
}


let drawBusStop = (geojsonData) => {
    L.geoJson(geojsonData, {
        onEachFeature: (feature, layer) => {
            layer.bindPopup(`<strong>${feature.properties.LINE_NAME}</strong>
            <hr>
            Station: ${feature.properties.STAT_NAME}`)
        },
        pointToLayer: (geoJsonPoint, latlng) => {
            return L.marker(latlng, {
                icon: L.icon({
                    iconUrl: 'icons/busstop.png',
                    iconSize: [38, 38]
                })
            })
        },
        attribution: '<a href= "https://data.wien.gv.at"> Stadt Wien</a>,<a href= "https://mapicons.mapsmarker.com">Map Icons Collection<a/>'
    }).addTo(overlays.busStops);
}

let drawSightSeeing = (geojsonData) => {
    L.geoJson(geojsonData, {
        onEachFeature: (feature, layer) => {
            layer.bindPopup(`<strong>${feature.properties.NAME}</strong>
            <hr>
            Sight: ${feature.properties.NAME}`)
        },
        pointToLayer: (geoJsonPoint, latlng) => {
            return L.marker(latlng, {
                icon: L.icon({
                    iconUrl: 'icons/beautifulview.png',
                    iconSize: [38, 38]
                })
            })
        },
        attribution: '<a href= "https://data.wien.gv.at"> Stadt Wien</a>,<a href= "https://mapicons.mapsmarker.com">Map Icons Collection<a/>'
    }).addTo(overlays.sightSeeing);
}

/*fetch("data/TOURISTIKHTSVSLOGD.json")
    .then(response => response.json)
    .then(stations => {
        L.geoJson(stations, {
            onEachFeature: (feature, layer) => {
                layer.bindPopup(feature.properties.STAT_NAME)

            },
            pointToLayer: (geoJsonPoint, latlng) => {
                return L.marker (latlng, {
                    icon: L.icon ({
                        iconUrl: "icons/busstop.png",
                        iconSize: [38, 38]

                    })
                })
            }
        }).addTo(map);
    })*/

for (let config of OGDWIEN) {
    //console.log("Config: ", config.data);
    fetch(config.data)
        .then(response => response.json())
        .then(geojsonData => {
            //console.log("Data: ", geojsonData);
            if (config.title == "Haltestellen Vienna Sightseeing") {
                drawBusStop(geojsonData);
            } else if (config.title == "Liniennetz Vienna Sightseeing") {
                drawBusLine(geojsonData);
            } else if (config.title == "Fußgängerzonen") {
                drawPedestrianAreas(geojsonData);
            } else if (config.title == "Sehenswürdigkeiten in Wien") {
                drawSightSeeing(geojsonData);
            }
        })
}
// leaflet hash
L.hash(map);

//reachability plugin
// Initialise the reachability plugin
L.control.reachability({
    // add settings/options here
    apiKey: '5b3ce3597851110001cf62480aba529d7b634298afab148ab2bef03a',
    drawButtonStyleClass: 'fa fa-pencil-alt',
    deleteButtonContent: '',
    deleteButtonStyleClass: 'fa fa-trash',
    distanceButtonContent: '',
    distanceButtonStyleClass: 'fa fa-road',
    timeButtonContent: '',
    timeButtonStyleClass: 'fa fa-clock',
    travelModeButton1Content: '',
    travelModeButton1StyleClass: 'fa fa-car',
    travelModeButton2Content: '',
    travelModeButton2StyleClass: 'fa fa-bicycle',
    travelModeButton3Content: '',
    travelModeButton3StyleClass: 'fa fa-male',
    travelModeButton4Content: '',
    travelModeButton4StyleClass: 'fa fa-wheelchair'
}).addTo(map);