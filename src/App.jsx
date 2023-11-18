import { useState } from "react";
import "./assets/style/Main.scss";
import TodoList from "./components/TodoList";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <div className="app">
        <NavBar />
        <TodoList />
      </div>
    </>
  );
}

export default App;
