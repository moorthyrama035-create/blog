import Allpost from "./pages/Allpost";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SinglePost from "./pages/SinglePost";
import Createpost from "./pages/Createpost";
import EditPost from "./pages/EditPost";
import Category from "./pages/Category";
import Register from "./service/Register";
import ProtectRoute from "./components/ProtectRoute";
import Login from "./service/Login";
import Account from "./pages/Account";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route element={<ProtectRoute />}>
          <Route path="/home" element={<Allpost></Allpost>}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/createpost" element={<Createpost></Createpost>}></Route>
          <Route path="/home/:id" element={<SinglePost></SinglePost>}></Route>
          <Route path="/editpost/:id" element={<EditPost></EditPost>}></Route>
          <Route
            path="/category/:categoryid/:catname"
            element={<Category></Category>}
          ></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
