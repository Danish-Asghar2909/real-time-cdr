import React ,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import { io } from "socket.io-client";
import { socket } from './utils';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



export default function BasicTable() {



 const [callBack, setCallBack] = useState({});
 const [newRow , setRow] = useState([{"CallSid":"", "CallStatus":"", "From":"", "To":""}]);
 
function arraySearch(arr,val) {
  for (var i=0; i<arr.length; i++)
      if (arr[i].CallSid === val)                    
          return i;
  return false;
}

//already use this function in useEffect hook
//  const turnOnSocket = () =>{
//        let arr1 =[...newRow]
//         // io.connect("https://vibtree2.herokuapp.com").on('danish', name=>{
//         socket.on('danish2', name=>{
//             // newRow.push(name)
//             // setRow(name)
//             console.log("name",name)
//             const arr = arraySearch(arr1 , name.CallSid )
//             // console.log("arr ", arr);
//             if(arr!=false){
//               // console.log("arr 2 ", arr1[arr])
//               arr1[arr]=name

//             }else{
//               arr1.push(name)
              
//             }
//             // setCallBack(name)
//             setRow(arr1)
//             return arr1
//         })
//         // console.log("aar1 ", arr1)
//         // setRow(arr1)
// }


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    
    
    createData(callBack.CallSid, callBack.CallStatus, callBack.From, callBack.To, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  const filteredArr = newRow.reduce((acc, current) => {
    const x = acc.find(item => item.CallSid === current.CallSid);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);



// console.log("filtered array ", filteredArr);
// console.log("ner array ", newRow)


const modifyFilter = (sid , status)=>{
  filteredArr.map((x)=>{
    if(x.CallSid===sid){
      x.CallStatus = status;
    }
  })
}

const changeStatus=(sid)=>{
  newRow.map((x)=>{
    if(x.CallSid === sid){
      if(x.CallStatus==="in-progress"){
        modifyFilter(x.CallSid, "in-progress");
      }
      if(x.CallStatus==="initiated"){
        modifyFilter(x.CallSid, "initiated")
      }
      if(x.CallStatus==="ringing"){
        modifyFilter(x.CallSid, "ringing")
      }
      if(x.CallStatus==="completed"){
        modifyFilter(x.CallSid, "completed")
      }
    }
  })
}

React.useEffect(() => {
  //  turnOnSocket()
   let arr1 =[...newRow]
   // io.connect("https://vibtree2.herokuapp.com").on('danish', name=>{

   socket.emit('join_cdr', "TLDHXNQCCENIQGDIU3AD");
   socket.on("account_data", (name)=>{
    //  console.log("name ", name)
    const arr = arraySearch(arr1 , name.CallSid )
    // console.log("arr ", arr)
     if(arr!=false){
      //  console.log("arr1[arr] ", arr1)
       arr1[arr]=name
     }else{
      //  console.log("name in else ", name)
       arr1.push(name)    
     }
     setRow(arr1)
   })

  //  socket.on('danish2', name=>{
  //      // newRow.push(name)
  //      // setRow(name)
  //     //  console.log("name",name)
  //      const arr = arraySearch(arr1 , name.CallSid )
  //     //  console.log("arr ", arr);
  //      if(arr!=false){
  //       //  console.log("arr 2 ", arr1[arr])
  //        arr1[arr]=name
  //      }else{
  //        arr1.push(name)    
  //      }
  //      // setCallBack(name)
  //      setRow(arr1)
  //     //  return arr1
  //  })
  //  console.log("aar1 ", arr1)
},[filteredArr])

  const classes = useStyles();

  return (
    
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Call Sid</TableCell>
            <TableCell align="right">Call Status</TableCell>
            <TableCell align="right">From</TableCell>
            <TableCell align="right">To</TableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredArr.map((row) => (
            <TableRow key={row.CallSid}>
              <TableCell component="th" scope="row">
                {row.CallSid}
              </TableCell>
              <TableCell align="right">{row.CallStatus}</TableCell>
              <TableCell align="right">{row.From}</TableCell>
              <TableCell align="right">{row.To}</TableCell>
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
