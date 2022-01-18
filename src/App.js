import React, { useState } from 'react'
import Search from './components/search';
import TableData from './components/tableData';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="App">
      <Search setSearchTerm={setSearchTerm}/>
      <TableData searchTerm={searchTerm}/>
    </div>
  );
}

export default App;
