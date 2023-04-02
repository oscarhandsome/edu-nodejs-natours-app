/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoib3NjYXJoYW5kc29tZSIsImEiOiJjbGZwMm50MzAxMjVyM3JwNnNxMm80Y3RhIn0.nTIKBXje9wn4IakxvQJFmw';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/oscarhandsome/clfp318pu003p01mh6ycwmcrn',
    scrollZoom: false,
    //   center: [-118.113491, 34.111745],
    zoom: 10
    //   interactive: true
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    let elMarker = document.createElement('div');
    elMarker.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: elMarker,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Dat ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
