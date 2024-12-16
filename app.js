// Initialize the ESRI/Config Module with Global Properties.  Next, Load the Map, MapView, & Legend Modules. ***esriConfig.apiKey = "YOUR_API_KEY";
require(["esri/config", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/widgets/Legend"], function(esriConfig, Map, MapView, FeatureLayer, Legend) {

    // #Create a Map Instance
	const Map1 = new Map({
		basemap: "gray" // Map Property: Basemap Style.
	});

    // ##Create a MapView Instance (For 2D Viewing) 
	const mapView1 = new MapView({
		map: Map1, // Reference the Map Instance to this 2D MapView.
		center: [-118.805, 34.053], // 2D MapView Property: Longitude, Latitude Coordinates 
		zoom: 11, // 2D MapView Property: Zoom Level.
		container: "mapContainer1" // Reference Location to the Div ID in the index.HTML.
	});
   
    // ####Create a Symbol Renderer for the Trailheads Point Feature Layer.
    const trailheadsRenderer = {
        "type": "simple",
        "symbol": {
            "type": "picture-marker",
            "url": "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
            "width": "13px",
            "height": "13px"
        }
    }

    //####Create Pop Up for the Trailheads Point Feature Layer.
    const trailheadsPopup = {
        "title": "{TRL_NAME}",
        "content": "<b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} Feet<br><b>Latitude:</b> {LAT}<br><b>Longitude:</b> {LON}"
    }

    // ###Create a FeatureLayer Instance:  Trailheads Point Feature Layer
    const trailheadsLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
        renderer: trailheadsRenderer, // Assign the Trailheads Symbol to the Trailheads Point Feature Layer.
        popupTemplate: trailheadsPopup // Assign the Trailheads Pop Up to the Trailheads Point Feature Layer.
    });
    Map1.add (trailheadsLayer); // Tie the Trailheads Point Layer to the Map1 Map Instance.
   
    //#####Create a Legend.
    const mapLegend = new Legend({
        view: mapView1, // Tie the Legend to the 2D MapView Instance.
        container: "sidebar", // Place the Legend in the HTML Sidebar Div.
        layerInfos: [
            {
                layer: trailheadsLayer,
                title: "Hiking Trailheads"
            }
        ]
    });

});