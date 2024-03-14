const decodeToken = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedToken = JSON.parse(atob(base64));
      return decodedToken;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const formatDateRange = (startDateStr, endDateStr) => {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
  
    // Format start date
    const startMonth = startDate.toLocaleString('default', { month: 'long' });
    const startDay = startDate.getDate();
    const startYear = startDate.getFullYear();
  
    // Format end date
    const endMonth = endDate.toLocaleString('default', { month: 'long' });
    const endDay = endDate.getDate();
    const endYear = endDate.getFullYear();
  
    // Format date range string
    const formattedStartDate = `${startDay} ${startMonth} ${startYear}`;
    const formattedEndDate = `${endDay} ${endMonth} ${endYear}`;
  
    return `${formattedStartDate} - ${formattedEndDate}`;
  };

export {decodeToken, formatDateRange};