export const getDateTime = (isoDate) => {
  const date = new Date(isoDate);

  // Format for the date
  const dateOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", dateOptions);

  // Format for the time
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  return { date: formattedDate, time: formattedTime };
};
