import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./Components/RootLayout/RootLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Dashboard/Profile/Profile";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Registration from "./pages/Registration/Registration";
import Payment from "./pages/Payment/Payment";
import PrivateOutlet from "./Components/PrivateOutlet/PrivateOutlet";
import { useDispatch } from "react-redux";
import { setToken } from "./feature/rootSlice";
import { ToastContainer } from "react-toastify";
import Forum from "./pages/Forum/Forum";
import SingleForum from "./pages/Forum/SingleForum";
import MyForum from "./pages/Dashboard/MyForum/MyForum";
import MyPayment from "./pages/Dashboard/MyPayment/MyPayment";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ChangePassword from "./pages/Dashboard/ChangePassword/ChangePassword";

function App() {
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  if (token) {
    dispatch(setToken(token));
  }
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Registration />} />
        <Route path="forgotPass/:id" element={<ForgetPassword />} />
        <Route path="forum" element={<Forum />}>
          <Route path=":id" element={<SingleForum />} />
        </Route>
        <Route path="/*" element={<PrivateOutlet />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Profile />} />
            <Route path="my-forum" element={<MyForum />} />
            <Route path="my-payment" element={<MyPayment />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="payment" element={<Payment />} />
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    )
  );
  return (
    <div className="md:max-w-screen-lg mx-auto">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
