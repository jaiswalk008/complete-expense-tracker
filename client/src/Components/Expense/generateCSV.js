import Papa from 'papaparse';

const generateCSV = (expenses) => {
  const csvData = Papa.unparse(expenses, {
    header: true,
    skipEmptyLines: true,
  });

  // Create a Blob from the CSV data
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

  // Create a link element to download the CSV file
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  const username = localStorage.getItem('user-name');
  link.download = username+'-expenses.csv';
  document.body.appendChild(link);

  // Trigger a click event to download the file
  link.click();

  // Remove the link element from the DOM
  document.body.removeChild(link);
};
export default generateCSV;
