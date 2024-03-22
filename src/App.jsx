/* eslint-disable no-unused-vars */
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./components/Home";
import Footer from "./components/ui/footer";
import Header from "./components/ui/header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



function App() {  
  const {user} = useAuth0();
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/auth" element={<Authentication />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


