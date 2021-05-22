import React from "react";
import Search from "./components/Search";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ListItems from "./components/ListItems";
import "./styles.css";

export default function App() {
  return (
    <div className="wrapper">
      <Header title="Polywizz App" />
      <Search />
      <hr />
      <ListItems />
      <Footer />
    </div>
  );
}
