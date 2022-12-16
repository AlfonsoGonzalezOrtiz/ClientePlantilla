import { Marker} from "react-leaflet";
import { iconDefault } from "./markerLeafLet";

export const ParadaMarkers = ({ requestData }) => {
  
  return (
    <>
    {requestData.map((parada, idx) => {
      var latlngObject1 = {
        lat: 0,
        lng: 0
      };
        if (parada.lat !== undefined && parada.lon) {
          latlngObject1 = {
            lat: parada.lat,
            lng: parada.lon
          };
        }
        const latlngObject = latlngObject1;

        return (
          <Marker
            position={latlngObject}
            key={idx}
            icon={iconDefault}
          >
          </Marker>
        );
      })}
    </>
  );
};