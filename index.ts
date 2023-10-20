import { readFile, writeFile } from "fs/promises";
import { convertJsonToKml } from "./script";

if (module === require.main) {
  (async () => {
    const jsonFile = await readFile("./data.json", "utf-8");
    const jsonData = JSON.parse(jsonFile);

    const kmlData = convertJsonToKml(jsonData[0]);
    await writeFile("./data.kml", kmlData);
    console.log("KML file written");
  })();
}
