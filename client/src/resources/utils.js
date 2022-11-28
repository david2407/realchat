// dd/mm/yyyy, hh:mm:ss
function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  export  {formatDateFromTimestamp}