import React from "react";

//Implementation of offline first using local storage
const useLocalStorage = (storageKey: string, fallbackState: any) => {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage?.getItem(storageKey) as string) ?? fallbackState
  );

  React.useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};
export default useLocalStorage;
