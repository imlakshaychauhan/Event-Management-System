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

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    return formattedDate;
  }

  function formatAddressToURL(address) {
    // Replace spaces with '+' and encode URI components
    const formattedAddress = encodeURIComponent(address.trim().replace(/\s+/g, '+'));
    
    // Replace spaces with '%20' for the key
    const apiKey = '85092f91633444e9a63604fb8fa781a9';

    // Construct the API URL
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${formattedAddress}&key=${apiKey}`;
    
    return apiUrl;
}

export {decodeToken, formatDateRange, formatDate, formatAddressToURL};