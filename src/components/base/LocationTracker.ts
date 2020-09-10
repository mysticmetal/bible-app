import { useLocation } from 'react-router-dom';

const LS_PATH_KEY = 'current:path';

const storeCurrentLocation = (location: { pathname: string }) => {
  localStorage.setItem(LS_PATH_KEY, location.pathname);
};

function LocationTracker(): null {
  const location = useLocation();

  storeCurrentLocation(location);

  return null;
}

export default LocationTracker;

export { LS_PATH_KEY };
