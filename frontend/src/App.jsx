import { SignInButton,SignedOut,SignedIn,SignOutButton,UserButton ,useUser} from '@clerk/clerk-react'
import{Navigate,Route,Routes} from "react-router"
import HomePage from "./pages/HomePage";
import DashBoardPage from "./pages/DashBoardPage";
import ProblemsPage from "./pages/ProblemsPage";
import ProblemPage from "./pages/problemPage";
import { Toaster } from 'react-hot-toast';



function App() {
  
  const {isSignedIn,isLoaded}=useUser();

  //this will get rid of flickering effect
  if(!isLoaded) return null;
  return (
    <>
    <Routes>
       <Route path="/" element={!isSignedIn ? <HomePage />:<Navigate to ={"/dashboard"}/>}/>
       <Route path="/dashboard" element={ <DashBoardPage />}/>
       

       <Route path="/problems" element={ <ProblemsPage /> }/>   
       <Route path="/problem/:id" element={!isSignedIn ? <ProblemPage />:<Navigate to ={"/"}/>}/>  
    </Routes>

    <Toaster toastOptions={{duration:3000}}/>
    </>
    
  )
}

export default App;

//tw,daisyui.react-router,react-hot-toast
// todo:react-query aka tanstack query,axios
