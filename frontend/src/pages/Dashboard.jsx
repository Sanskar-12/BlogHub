import { useEffect, useState } from "react"
import {useLocation} from "react-router-dom"
import DashSidebar from "../components/DashSidebar"
import DashProfile from "../components/DashProfile"
import DashPosts from "../components/DashPosts"
import DashUsers from "../components/DashUsers"
import DashComments from "../components/DashComments"
import DashComp from "../components/DashComp"


const Dashboard = () => {

  const location=useLocation()
  const [tab,setTab]=useState(null)
  useEffect(()=>{
    const searchParams=new URLSearchParams(location.search)
    const value=searchParams.get("tab")
    setTab(value)
  },[location.search])

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Dashboard Sidebar */}
        <DashSidebar/>
      </div>
      {/* profile */}
      {tab==="profile" && <DashProfile/>}
      {/* posts */}
      {tab==="posts" && <DashPosts/>}
      {/* users */}
      {tab==="users" && <DashUsers/>}
      {/* comments */}
      {tab==="comments" && <DashComments/>}
      {/* comp */}
      {tab==="dash" && <DashComp/>}
    </div>
  )
}

export default Dashboard