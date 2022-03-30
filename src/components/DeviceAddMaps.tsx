import { Box, createStyles } from "@mantine/core";
import { useState } from "react";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

type DeviceAddMapsProps = {};

const useStyles = createStyles({
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  mapWrapper: {
    width: "100%",
    height: "100%",
    maxWidth: 400,
    maxHeight: 400,
    minWidth: 200,
    minHeight: 300,
  },
});

export default function DeviceAddMaps({}: DeviceAddMapsProps) {
  const { classes } = useStyles();
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  });

  const MAPBOX_KEY = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  return (
    <Box className={classes.contentWrapper}>
      <Box className={classes.mapWrapper}>
        <Map
          mapboxAccessToken={MAPBOX_KEY}
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          style={{ width: "100%", height: 400, borderRadius: 4 }}
        >
          <GeolocateControl />
          <Marker
            longitude={viewState.longitude}
            latitude={viewState.latitude}
            anchor="center"
            color="red"
          />
        </Map>
      </Box>
    </Box>
  );
}
