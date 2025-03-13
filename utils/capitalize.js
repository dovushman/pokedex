const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  const capitalizeWords = (string) => {
    return string.split(' ').map(capitalizeFirstLetter).join(' ');
  };
  
  export { capitalizeFirstLetter, capitalizeWords };