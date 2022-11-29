import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout";
import Main from "../../Layout/Main/Main";
import Blogs from "../../Pages/Blogs/Blogs";

import AllBuyers from "../../Pages/Dashboard/Admin/AllUsers/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/Admin/AllUsers/AllSellers/AllSellers";
import RepotedItems from "../../Pages/Dashboard/Admin/RepotedItems/RepotedItems";

import MyOrders from "../../Pages/Dashboard/Buyer/MyOrders/MyOrders";
import ReportToAdmin from "../../Pages/Dashboard/Buyer/ReportToAdmin/ReportToAdmin";
import AddProducts from "../../Pages/Dashboard/Seller/AddProducts/AddProducts";
import MyBuyers from "../../Pages/Dashboard/Seller/MyBuyers/MyBuyers";
import MyProducts from "../../Pages/Dashboard/Seller/MyProducts/MyProducts";

import Home from "../../Pages/Home/Home/Home";

import Login from "../../Pages/Login/Login";
import MyProductsPage from "../../Pages/Home/Catagories/MyProductsPage/MyProductsPage";
import Registration from "../../Pages/Registration/Registration";
import ErrorPage from "../../Share/ErrorPage/ErrorPage";
import Payment from "../../Pages/Payment/Payment";
import PrivateRouth from "../PrivateRouth/PrivateRouth";
import AdminRouth from "../AdminRouth/AdminRouth";
import SellerRouth from "../SellerRouth/SellerRouth";
import BuyerRouth from "../BuyerRouth/BuyerRouth";
// import AdminRouth from "../AdminRouth/AdminRouth";


const router = createBrowserRouter([
    {path:'/',element:<Main></Main>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {path:'/',element:<Home></Home>},
      {path:'/home',element:<Home></Home>,
      loader:()=>fetch('http://localhost:8000/advitiseproduct')
    },      
    {path:'/productpage/:id',element:<PrivateRouth><MyProductsPage></MyProductsPage></PrivateRouth>,
    loader:({params})=>fetch(`http://localhost:8000/addproducts/${params.id}`)
    },
      {path:'/blogs',element:<Blogs></Blogs>},
      {path:'/register',element:<Registration></Registration>},
      {path:'/login',element:<Login></Login>}
    ]},
    {path:'/dashboard',
    element:<PrivateRouth><DashboardLayout></DashboardLayout></PrivateRouth>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      
      {path:'/dashboard/allbuyers',element:<AdminRouth><AllBuyers></AllBuyers></AdminRouth>},
      {path:'/dashboard/allsellers',element:<AdminRouth><AllSellers></AllSellers></AdminRouth>},
      {path:'/dashboard/repoteditems',element:<AdminRouth><RepotedItems></RepotedItems></AdminRouth>},
     
     
      {path:'/dashboard/myorders',element:<BuyerRouth><MyOrders></MyOrders></BuyerRouth>},
      {path:'/dashboard/reporttoadmin',element:<BuyerRouth><ReportToAdmin></ReportToAdmin></BuyerRouth>},
      {path:'/dashboard/payments/:id',element:<BuyerRouth><Payment></Payment></BuyerRouth>,
      loader:({params})=>fetch(`http://localhost:8000/myordersbookings/${params.id}`)
   },
     
      {path:'/dashboard/addproducts',element:<SellerRouth><AddProducts></AddProducts></SellerRouth>},
      {path:'/dashboard/mybuyers',element:<SellerRouth><MyBuyers></MyBuyers></SellerRouth>},
      {path:'/dashboard/myProducts',element:<SellerRouth><MyProducts></MyProducts></SellerRouth>},
   
     
    ]}
      ])
      export default router;   