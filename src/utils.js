import socketIOClient from "socket.io-client";

export const socket = socketIOClient("https://vibtree2.herokuapp.com",{});
// export const socket = socketIOClient("http://localhost:9000/",{});