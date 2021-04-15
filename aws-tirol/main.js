let basemapGray = L.tileLayer.provider (" BasemapAT.basemap"),

let map = L.map ("map", {
    center: [47, 11],
    zoom: 9,
    layers: [
        basemapGray
    ]
    });


    let layerControl = L.control.layers({
        "BasemapAT.basemap": basemapGray,
        "BasemapAT.orthofoto": L.tileLayer.provider ("BasemapAT.basemap"),
        "BasemapAT.surface": L.tileLayer.provider ("BasemapAT.surface"),
        "BasemapAT.overlay": L.tileLayer.provider ("BasemapAT.overlay"),
        "BasemapAT.overlay+ortho": L.layerGroup( [
            L.tileLayer.provider("BasemapAT.orthofoto"),
            L.tileLayer.provider("BasemapAT.overlay")

        ])
    }).addTo(map);

    let awsUrl = "https://wiski.tirol.gv.at/lawine/produkte/ogd.geojson";
    fetch(awsUrl)


    