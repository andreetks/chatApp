import "./App.css";
import { io } from "socket.io-client";

const App = () => {
  const socket = io("ws://localhost:8000");

  socket.on("connect", () => {
    console.log(socket.id);
  });

  socket.on("disconnect", () => {
    console.log(socket.id);
  });

  const handleMyMessages = (e) => {
    e.preventDefault();
    console.log(e.target.form[0].value);
    const valueSend = e.target.form[0].value;

    const pDoc = document.createElement("p");
    pDoc.classList.add("messageOther");
    pDoc.textContent = valueSend;
    const chat = document.querySelector(".chat");
    chat.appendChild(pDoc);

    document.querySelector(".inputChat").value = "";

    socket.emit("message", { data: valueSend });
  };

  socket.on("message", ( data ) => {
    console.log(data)

    if (data.sid !== socket.id) {
      console.log("message recevied");

      const pDoc = document.createElement("p");
      pDoc.classList.add("message");
      pDoc.textContent = data.data.data;
      const chat = document.querySelector(".chat");
      chat.appendChild(pDoc);
    }
  });

  return (
    <div className="App">
      <div className="container">
        <h1>Chat</h1>
        <div className="chat">
          <p className="message">mensaje 1</p>
          <p className="messageOther">mensaje 2</p>
        </div>
        <form className="formChat">
          <input className="inputChat" type="text" />
          <button type="submit" onClick={handleMyMessages}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
