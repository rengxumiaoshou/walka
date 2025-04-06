import { useEffect, useRef } from 'react';

interface LocationItem {
  time: string;
  name: string;
  query: string;
  type: string;
  info: string;
}

interface GoogleMapProps {
  locations: LocationItem[];
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    google: typeof google;
  }
}

const GoogleMap = ({ locations, style }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const scriptId = 'google-maps-script';

    const loadScript = (): Promise<void> => {
      return new Promise((resolve) => {
        if (!document.getElementById(scriptId)) {
          const script = document.createElement('script');
          script.id = scriptId;
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly`;
          script.async = true;
          script.defer = true;
          script.onload = () => resolve();
          document.head.appendChild(script);
        } else {
          resolve();
        }
      });
    };

    const geocodeLocations = async (): Promise<{ position: google.maps.LatLngLiteral; name: string }[]> => {
      const geocoder = new window.google.maps.Geocoder();

      const geocodeAddress = (item: LocationItem): Promise<{ position: google.maps.LatLngLiteral; name: string } | null> => {
        return new Promise((resolve) => {
          geocoder.geocode({ address: item.query }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              resolve({ position: results[0].geometry.location.toJSON(), name: item.name });
            } else {
              console.warn(`Geocoding failed for ${item.query} with status: ${status}`);
              resolve(null); // ⬅ 跳过无法解析的地点
            }
          });
        });
      };

      const promises = locations.map((item) => geocodeAddress(item));
      const results = await Promise.all(promises);
      return results.filter((r): r is { position: google.maps.LatLngLiteral; name: string } => r !== null);
    };

    const initMap = async () => {
      if (!mapRef.current || !window.google) return;

      const geoResults = await geocodeLocations();
      if (geoResults.length === 0) return;

      const bounds = new window.google.maps.LatLngBounds();
      geoResults.forEach((r) => bounds.extend(r.position));

      const map = new window.google.maps.Map(mapRef.current, {
        center: bounds.getCenter().toJSON(),
        zoom: 5,
      });

      map.fitBounds(bounds);

      geoResults.forEach(({ position, name }) => {
        new window.google.maps.Marker({
          map,
          position,
          title: name,
        });
      });
    };

    loadScript().then(initMap);
  }, [locations]);

  return <div ref={mapRef} style={style || { height: '400px', width: '100%' }} />;
};

export default GoogleMap;