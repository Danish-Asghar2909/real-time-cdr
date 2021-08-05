import logo from './logo.svg';
import './App.css';
import BasicTable from './Table';
import { Button, Input } from '@material-ui/core';
import React from 'react';
import axios from "axios";
import CsvDownload from 'react-json-to-csv';

function App() {
  const [startTime , setStart] = React.useState("");
  const [endTime , setEnd ]= React.useState("");
  const [responseData , setResponse ] =React.useState([]);
  const [available , setAvailable] = React.useState(0);
  const handleClick = (e)=>{
    e.preventDefault();
    console.log("start ", startTime);
    console.log("end ", endTime);
    const data = {StartTime : startTime , EndTime : endTime}
     axios.post('https://vibtree2.herokuapp.com/cdr', data)
     .then(response =>{ 
       setResponse(response.data.calls);
       setAvailable(1)
      //  alert("Data is Fetched now Click on Download to download it")
      })
     
     .catch(err=> {console.log("err ",err)})
  }

 const returnNull =()=>{
   return null
 }


 

  return (
    <div className="App">
      <h3>Date you Entered should be in "yyyy-mm-dd" format</h3>
      <Input value={startTime} onChange={e=> setStart(e.target.value)} placeholder="Start Date" />
      <Input value={endTime} onChange={e=> setEnd(e.target.value)} placeholder="End Date"/>
      <Button variant="contained" onClick={handleClick} >Fetch Data</Button>
      {/* {available ===1 ? <CsvDownload data={responseData}  /> : <Button variant="contained" onClick={handleClick} >Fetch Data</Button>} */}
      {/* <CsvDownload data={responseData}  /> */}
      {available ===1 ? <CsvDownload data={responseData}  /> : returnNull()}
      <BasicTable/>
    </div>
  );
}

export default App;
