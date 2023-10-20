type GeoJson = {
  type: string;
  coordinates: [[[number, number]]];
};

type JsonObject = {
  lat: string;
  lon: string;
  name: string;
  display_name: string;
  geojson: GeoJson;
};

function convertJsonToKml(jsonData: JsonObject): string {
  // Start the KML file
  let kmlData = '<?xml version="1.0" encoding="UTF-8"?>\n';
  kmlData += '<kml xmlns="http://www.opengis.net/kml/2.2">\n';
  kmlData += "<Document>\n";
  kmlData += `<name>${jsonData.name} Document</name>\n`;

  //   // Create a Placemark for the location
  //   kmlData += "<Placemark>\n";
  //   kmlData += `<name>${jsonData.name}</name>\n`;
  //   kmlData += `<description>${jsonData.display_name}</description>\n`;
  //   kmlData += "<Point>\n";
  //   kmlData += `<coordinates>${jsonData.lon},${jsonData.lat}</coordinates>\n`;
  //   kmlData += "</Point>\n";
  //   kmlData += "</Placemark>\n";

  // Create a Polygon for the geojson coordinates
  kmlData += "<Placemark>\n";
  kmlData += `<name>${jsonData.name}</name>\n`;
  kmlData += `<description>${jsonData.display_name}</description>\n`;
  kmlData += "<Polygon>\n";
  kmlData += "<outerBoundaryIs>\n";
  kmlData += "<LinearRing>\n";
  kmlData += "<coordinates>\n";

  jsonData.geojson.coordinates[0].forEach((coord) => {
    kmlData += `${coord[0]},${coord[1]} \n`;
  });
  kmlData += "</coordinates>\n";
  kmlData += "</LinearRing>\n";
  kmlData += "</outerBoundaryIs>\n";
  kmlData += "</Polygon>\n";
  kmlData += "</Placemark>\n";

  // End the KML file
  kmlData += "</Document>\n";
  kmlData += "</kml>\n";

  return kmlData;
}

export { convertJsonToKml };
