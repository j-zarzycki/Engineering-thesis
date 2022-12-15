const useLayout = () => {
  const disableTabBar = () => {
    const tabs = document.querySelector("ion-tab-bar");
    tabs!.style.display = "none";
  };

  const enableTabBar = () => {
    const tabs = document.querySelector("ion-tab-bar");
    tabs!.style.display = "flex";
  };

  return { enableTabBar, disableTabBar };
};

export default useLayout;
