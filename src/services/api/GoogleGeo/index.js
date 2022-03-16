import Get from '../Get';

const APIKeyGMapsGeo = 'AIzaSyD44KdybySAo8WbPm51JwgQmBBVIBidWPw';
export const getCityName = coords => {
  return Get(
    'gmaps-geo',
    `json?latlng=${coords.lat},${coords.long}&sensor=true&key=${APIKeyGMapsGeo}`,
  );
};
