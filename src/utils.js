import socketIOClient from "socket.io-client";

export const socket = socketIOClient("https://vibtree2.herokuapp.com",{});