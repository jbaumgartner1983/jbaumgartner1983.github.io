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
        "BasemapAT.orthofoto": L.tileLayer.provider ("BasemapAT.basemap")
    }).addTo(map);


 