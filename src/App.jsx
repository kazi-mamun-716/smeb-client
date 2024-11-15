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
import MyForum from "./pages/Dashboard/MyForum/MyForum";
import MyPayment from "./pages/Dashboard/MyPayment/MyPayment";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ChangePassword from "./pages/Dashboard/ChangePassword/ChangePassword";
import SIngleUser from "./pages/SingleUser/SIngleUser";
import Members from "./pages/Dashboard/Members/Members";
import ExecutiveCommittee from "./pages/GeneralPages/ExecutiveCommittee/ExecutiveCommittee";
import Blog from "./pages/GeneralPages/Blog/Blog";
import Notice from "./pages/GeneralPages/Notice/Notice";
import Contact from "./pages/GeneralPages/Contact/Contact";
import About from "./pages/GeneralPages/About/About";
import Jobs from "./pages/GeneralPages/Jobs/Jobs";
import MyBlog from "./pages/Dashboard/MyBlog/MyBlog";
import History from "./pages/GeneralPages/History/History";
import Employers from "./pages/GeneralPages/Employers/Employers";
import Gallery from "./pages/GeneralPages/Gallery/Gallery";
import Publication from "./Components/Publication/Publication";
import Discussion from "./pages/GeneralPages/Discussion/Discussion";
import CreateDiscussion from "./pages/GeneralPages/Discussion/Create/CreateDiscussion";
import SingleDiscussion from "./pages/GeneralPages/Discussion/SingleDiscussion/SingleDiscussion";
import EditDiscussion from "./pages/GeneralPages/Discussion/Edit/EditDiscussion";
import Events from "./pages/Events/Events";
import SingleEvent from "./pages/Events/SingleEvent";

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
        <Route path="ec" element={<ExecutiveCommittee />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="publication" element={<Publication />} />
        <Route path="notice" element={<Notice />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="history" element={<History />} />
        <Route path="employers" element={<Employers />} />
        <Route path="forgotPass/:id" element={<ForgetPassword />} />
        <Route path="profile/:id" element={<SIngleUser />} />
        <Route path="discussion" element={<Discussion />} />
        <Route path="discussion/:id" element={<SingleDiscussion />} />
        <Route path="events" element={<Events/>}/>
        <Route path="events/:id" element={<SingleEvent/>}/>
        <Route path="/*" element={<PrivateOutlet />}>
          <Route path="discussion/create" element={<CreateDiscussion />} />
          <Route path="discussion/:id/edit" element={<EditDiscussion />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Profile />} />
            <Route path="my-discussion" element={<MyForum />} />
            <Route path="my-blog" element={<MyBlog />} />
            <Route path="my-payment" element={<MyPayment />} />
            <Route path="members" element={<Members />} />
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
