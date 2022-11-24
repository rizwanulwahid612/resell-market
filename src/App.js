
import './App.css';
import {RouterProvider} from "react-router-dom";
import {Toaster} from 'react-hot-toast'
import router from './components/Routh/Routh/Routh';

function App() {
  return (
    <div className="mx-auto w-4/5">
    <RouterProvider router={router}></RouterProvider>
    <Toaster></Toaster>
     </div>
  );
}

export default App;
