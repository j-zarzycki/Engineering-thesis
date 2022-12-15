const useLocalStorage = (localStorageItem: string) => {
  const value = localStorage.getItem(localStorageItem);
  const setValue = (localStorageSetValue: string) =>
    localStorage.setItem(localStorageItem, localStorageSetValue);

  return { value, setValue };
};

export default useLocalStorage;
