export const scrollTo = (selector, containerSelector) => {
  const goTo = () => {
    if (!selector) {
      return true;
    }

    const element = document.querySelector(selector);
    const containerElement = document.querySelector(containerSelector);

    if (element) {
      // document.body.scrollTop = element.offsetTop;
      if (containerElement) {
        containerElement.scrollTop += element.offsetTop;
      } else {
        window.scrollTo({ top: element.offsetTop });
      }
      return true;
    }

    return false;
  };

  if (goTo()) {
    return;
  }

  const interval = setInterval(() => {
    if (goTo()) {
      clearInterval(interval);
    }
  }, 100);
};
