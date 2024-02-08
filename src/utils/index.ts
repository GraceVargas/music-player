const formatDate = (inputDate: string) => {
  const parts = inputDate.split("-");
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  } else {
    return inputDate;
  }
};

const truncateString = (inputString: string, maxLength = 25) => {
  if (inputString.length > maxLength) {
    return inputString.substring(0, maxLength - 3) + "...";
  } else {
    return inputString;
  }
};

export { formatDate, truncateString };
