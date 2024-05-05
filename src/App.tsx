import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import React from 'react';
import Broker from './components/broker/index';


var ws = new WebSocket('ws://localhost:8080/websocket');

        ws.onopen = function(event) {
            ws.send('Hello Server!');  // Envia uma mensagem inicial ao servidor, se necessário
        };

        ws.onmessage = function(event) {
            var message = event.data;
            var messagesDiv = document.getElementById('messages');
            if(messagesDiv){
              messagesDiv.innerHTML += '<p>Mensagem recebida: ' + message + '</p>';
            }
        };

        ws.onerror = function(error) {
            console.error('WebSocket error: ' + error);
        };

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Broker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
