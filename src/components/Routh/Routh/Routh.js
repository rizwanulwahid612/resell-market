import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout";
import Main from "../../Layout/Main/Main";
import Blogs from "../../Pages/Blogs/Blogs";
import Admin from "../../Pages/Dashboard/Admin/Admin/Admin";
import AllBuyers from "../../Pages/Dashboard/Admin/AllUsers/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/Admin/AllUsers/AllSellers/AllSellers";
import RepotedItems from "../../Pages/Dashboard/Admin/RepotedItems/RepotedItems";
import Buyer from "../../Pages/Dashboard/Buyer/Buyer/Buyer";
import MyOrders from "../../Pages/Dashboard/Buyer/MyOrders/MyOrders";
import ReportToAdmin from "../../Pages/Dashboard/Buyer/ReportToAdmin/ReportToAdmin";
import AddProducts from "../../Pages/Dashboard/Seller/AddProducts/AddProducts";
import MyBuyers from "../../Pages/Dashboard/Seller/MyBuyers/MyBuyers";
import MyProducts from "../../Pages/Dashboard/Seller/MyProducts/MyProducts";
import Seller from "../../Pages/Dashboard/Seller/Seller/Seller";
import Home from "../../Pages/Home/Home/Home";

import Login from "../../Pages/Login/Login";
import MyProductsPage from "../../Pages/Home/Catagories/MyProductsPage/MyProductsPage";
import Registration from "../../Pages/Registration/Registration";
import ErrorPage from "../../Share/ErrorPage/ErrorPage";
// import PrivateRouth from "../PrivateRouth/PrivateRouth";

const router = createBrowserRouter([
    {path:'/',element:<Main></Main>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {path:'/',element:<Home></Home>},
      {path:'/home',element:<Home></Home>},
      {path:'/productpage/:id',element:<MyProductsPage></MyProductsPage>,
    loader:({params})=>fetch(`http://localhost:8000/addproducts/${params.id}`)
    },
    

      {path:'/blogs',element:<Blogs></Blogs>},
      {path:'/register',element:<Registration></Registration>},
      {path:'/login',element:<Login></Login>}
    ]},
    {path:'/dashboard',
    element:<DashboardLayout></DashboardLayout>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {path:'/dashboard/admin',element:<Admin></Admin>},
      {path:'/dashboard/allbuyers',element:<AllBuyers></AllBuyers>},
      {path:'/dashboard/allsellers',element:<AllSellers></AllSellers>},
      {path:'/dashboard/repoteditems',element:<RepotedItems></RepotedItems>},
     
      {path:'/dashboard/buyer',element:<Buyer></Buyer>},
      {path:'/dashboard/myorders',element:<MyOrders></MyOrders>},
      {path:'/dashboard/reporttoadmin',element:<ReportToAdmin></ReportToAdmin>},

      {path:'/dashboard/seller',element:<Seller></Seller>},
      {path:'/dashboard/addproducts',element:<AddProducts></AddProducts>},
      {path:'/dashboard/mybuyers',element:<MyBuyers></MyBuyers>},
      {path:'/dashboard/myProducts',element:<MyProducts></MyProducts>},
      


     
    ]}
      ])
      export default router;   