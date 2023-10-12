import { QueryClientProvider, QueryClient } from "react-query";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { app } from "./firebase/config";
import Navbar from "./Components/Navbar";
import Episodes from "./Components/Episodes";
import Characters from "./Components/Characters";
import Locations from "./Components/Locations";
import GapBar from "./Components/GapBar";
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LeQRZcoAAAAALtoxySsmiRmWXB5BT2aVpvWvM_w"),
  isTokenAutoRefreshEnabled: true,
});
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
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;
