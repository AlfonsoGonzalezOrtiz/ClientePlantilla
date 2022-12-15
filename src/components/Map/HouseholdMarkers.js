import { Marker} from "react-leaflet";
import { iconDefault } from "./markerLeafLet";

export const HouseholdMarkers = ({ requestData }) => {
  
  return (
    <>
    {requestData.map((household, idx) => {
      var latlngObject1 = {
        lat: 0,
        lng: 0
      };
        if (household.lat !== undefined && household.lon) {
          latlngObject1 = {
            lat: household.lat,
            lng: household.lon
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