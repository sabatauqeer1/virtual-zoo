import { Route, Routes,Navigate } from "react-router-dom";
import VirtualZoo from "./Components/assets/virtualzoo.js"
const App = () => {
  return (
    <>
      <Routes>
           <Route path="/" element={<Navigate to="/api/virtualzoo/1749815004689" />} />
        <Route path="api/virtualzoo/:animalId" element={<VirtualZoo />} />
      
      </Routes>
    </>
  );
}

export default App;

