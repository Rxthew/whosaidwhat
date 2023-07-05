import { Outlet } from 'react-router-dom'
import Header from './Header'


const Blog = function Blog() {
  

  //under header should be a react router component. 
  // :  Landing page "Main.tsx" goes inside here, under Header.
  // : /signup 
  // : /login
  // : /edit profile
  // error page and mayb sidebars and stuff.
  //There's also a 'fallback' (hint would be great to avoid state) thing and forms. 
  return (
    <>
      <Header username="User"/>
      <Outlet />
    </>
  )
}


export default Blog
