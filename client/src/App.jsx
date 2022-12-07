
// import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateCollectionMP from "./pages/Metaverse/CreateCollectionMP";
import CreateNFT from "./pages/Metaverse/CreateNFT";
import Marketplace from "./pages/Metaverse/Marketplace";
import Metaverse from "./pages/Metaverse/Metaverse";
import MyNFTList from "./pages/Metaverse/MyNFTList";
import MetaverseHome from "./pages/MetaverseHome";
import SelectedHome from "./pages/SelectedHome";
import CreateCollection from "./pages/Tokenise/CreateCollection";
import CreateToken from "./pages/Tokenise/CreateToken";
import MyTokenList from "./pages/Tokenise/MyTokenList";
import TokeniseHome from "./pages/TokeniseHome";


function App() {


  return (
    <div>
      {/* <SelectedHome/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SelectedHome />}/>

          <Route path="/tokeniseHome" element={<TokeniseHome />}/>
            <Route path="/createCollection" element={<CreateCollection/>}/>
              <Route path="/createToken" element={<CreateToken/>}/>
              <Route path="/myTokenList" element={<MyTokenList/>}/>

          <Route path="/metaverseHome" element={<MetaverseHome />}/>
            <Route path="/Marketplace" element={<Marketplace/>}/>
              <Route path="/createCollectionMP" element={<CreateCollectionMP/>}/>
              <Route path="/createNFT" element={<CreateNFT/>}/>
              <Route path="/myNFTList" element={<MyNFTList/>}/>
            <Route path="/metaverse" element={<Metaverse/>}/>

          <Route path="*" element={<SelectedHome/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
