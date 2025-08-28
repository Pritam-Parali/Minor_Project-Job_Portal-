import React from "react";
import { NavLink } from "react-router-dom";

const Navbar =()=>{
    return(
        <>
            {/* <div className="bg-red-500">
                <nav>
                    <ul>
                        <li><NavLink to={'/Home'} className={'nav'}>Home</NavLink></li>
                    </ul>
                </nav>
            </div> */}
            <div class="bg-red-500 py-4 px-2 flex items-center justify-between">

  
  <div>
    <ul className="flex items-center gap-10 text-white px-5">
      <li><NavLink to={'/Home'}>Home</NavLink></li>
      <li>About</li>
      <li>Contact</li>
    </ul>
  </div>

  <div className="flex items-center gap-10">
    <button className="bg-white px-3 py-1.5 rounded-md">Signup</button>
    <button className="bg-white px-3 py-1.5 rounded-md">Signin</button>
  </div>

</div>
        </>
    )
}
export default Navbar;