import { QueryClientProvider, QueryClient } from "react-query";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Episodes from "./Components/Episodes";
import Characters from "./Components/Characters";
import Locations from "./Components/Locations";
import GapBar from "./Components/GapBar";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <GapBar />
      <Routes>
        <Route path="/" element={<Characters />}></Route>
        <Route path="/characters" element={<Characters />}></Route>
        <Route path="/episodes" element={<Episodes />}></Route>
        <Route path="/locations" element={<Locations />}></Route>
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
