import React from 'react'
import useApi from './components/hooks/useApi'
import "./App.css";
import TableComponent from './components/table/TableComponent';

const App = () => {

  const { data, loading, error } = useApi('https://jsonplaceholder.typicode.com/users');

  if (loading) {
    return (
      <div className="loader-container">
      <div className="loader"></div> 
      <div className="loader2"></div> 
      </div> 
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      <h1>Data from API</h1>
      <div>
        <button onClick={refreshPage}>Click to reload!</button>
      </div>
      <div>
      <h1>JSON Data Table</h1>
      <div className='tableContainer'>
      <TableComponent data={data} />
      </div>
    </div>
    </div>
  );
}

export default App