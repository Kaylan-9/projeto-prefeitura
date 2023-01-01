import { useContext, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../pages/Loading";

const Info = lazy(async () => await import("../pages/Info"));
const Infos = lazy(async () => await import("../pages/Infos"));
const Home = lazy(async () => await import("../pages/Home"));;
const Admin = lazy(() => import("../pages/Admin"));

const Routers = () => {
  const {user} : any = useContext(AuthContext);
  return <Suspense fallback={<Loading/>}>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home/>}/>
        <Route path="*" element={<Home/>}/>
        <Route path="/infos" element={<Infos/>}/>
        <Route path="/info/:id" element={<Info/>}/>
        <Route path="/l" element={<Loading/>}/>
        {user.exists ? <Route path="/admin" element={<Admin/>}/> : null}
      </Routes>
    </BrowserRouter>
  </Suspense>;
};

export default Routers;