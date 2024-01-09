import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import { useSelector } from "react-redux";
import UserHome from "./pages/users/UserHome";
import PrivateComponent from "./privatecomponent/PrivateComponent";
import Logout from "./pages/forms/setting/Logout";
import ParticularProduct from "./pages/products/ParticularProduct";
import Cart from "./pages/cart/Cart";
import FirstPage from "./pages/home/FirstPage";
import AdminHome from "./pages/admin/AdminHome";
import AddProducts from "./pages/products/AddProducts";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import CheckoutSteps from "./buyingprocess/CheckOutSteps";
import FinalOrderedPage from "./buyingprocess/FinalOrderedPage";
import SellerDashboard from "./pages/seller/SellerDashboard";
import BuyingCartingWithoutLogin from "./components/BuyingCartingWithoutLogin";
import SuccessfullPaymentPage from "./components/SuccessfullPaymentPage";
import Wait from "./buyingprocess/Wait";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser?.role)
  return (
    <Router>
      {/* for seller */}
      {currentUser?.role === "Seller" && (
        <>
          <SellerDashboard />
        </>
      )}

      {/* for customer  */}
      {currentUser?.role === "Customer" && (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<FirstPage />} />
            <Route path="/adminhome" element={<FirstPage />} />
            <Route path="/opencart" element={<Cart />} />
            <Route path="/checkoutsteps/:Id" element={<CheckoutSteps />} />
            <Route path="/placeorderfinalpage" element={<FinalOrderedPage />} />
            <Route
            path="/particularproduct/:encodedImage/:productId"
            element={<ParticularProduct />}
          />
          <Route path="/paymentsuccess" element={<SuccessfullPaymentPage result={"Successfull"}/>} />
          <Route path="/paymentfailure" element={<SuccessfullPaymentPage result={"Failure"}/>} />
          <Route path="/waiting" element={<Wait/> } />
          <Route path="*" element={<Navigate to="/" />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </>
      )}
      
      {!currentUser?.email && (<>
        <Navbar />
        <Routes>
          <Route path="/" element={<FirstPage />} />
          {/* <Route path="/decide" element={<FirstPage />} /> */}
          <Route path="/logincustomer" element={<Login role={"Customer"} />} />
          <Route
            path="/registercustomer"
            element={<Register role={"Customer"} />}
          />
          <Route path="/loginseller" element={<Login role={"Seller"} />} />
          <Route
            path="/registerseller"
            element={<Register role={"Seller"} />}
          />
          
          <Route
            path="/particularproduct/:encodedImage/:productId"
            element={<ParticularProduct />}
          />
          {/* <Route path="/search" element={<Search />} /> */}
          <Route path="/buyingorcartingwithoutlogin" element={<BuyingCartingWithoutLogin/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
