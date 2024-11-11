import { useEffect, useState } from "react";

type GeolocationState =
  | {
      position: undefined;
      error: undefined;
      isPending: true;
    }
  | {
      position: GeolocationPosition;
      error: undefined | GeolocationPositionError;
      isPending: false;
    }
  | {
      position: undefined | GeolocationPosition;
      error: GeolocationPositionError;
      isPending: false;
    };

export default function useGeolocation(
  options?: PositionOptions,
): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    position: undefined,
    error: undefined,
    isPending: true,
  });

  useEffect(() => {
    const handleSuccess = (position: GeolocationPosition) => {
      setState((state) => ({
        ...state,
        position,
        isPending: false,
      }));
    };

    const handleError = (error: GeolocationPositionError) => {
      setState((state) => ({
        ...state,
        error,
        isPending: false,
      }));
    };

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options,
    );

    const watchID = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      options,
    );

    return () => {
      navigator.geolocation.clearWatch(watchID);
    };
  }, [options]);

  return state;
}
