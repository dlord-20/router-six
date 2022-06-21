import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter as Router, 
  Routes, 
  Route,  
  Navigate, 
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation
} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='myapps' element={<Navigate replace to="/learn" />} />
      <Route path='learn' element={<Learn />}> 
        <Route path='course' element={<Courses />} >
          <Route path=':courseid' element={<CourseId />}/>
        </Route>
        <Route path='bundle' element={<Bundles />} />
      </Route>
      <Route path='dashboard' element={<Dashboard />}/>
    </Routes>
  </Router>,
  document.getElementById("root")
);

function Home() {
  return (
    <div>
      <h1>Home route</h1>
    </div>
  )
}

function Learn() {
  return (
    <div>
      <h1>Learn</h1>
      <h4>All courses are listed here</h4>
      <Link className="btn btn-success" to='/learn/course'>
        Courses
      </Link>
      <Link className="btn btn-primary" to='/learn/bundle'>
        Bundle
      </Link>
      <Outlet />
    </div>
  )
}

function Courses() {
  const courseList = ["React", "Angular", "Vue", "Nodejs"];
  const randomCourseName = courseList[Math.floor(Math.random() * courseList.length)];
  return (
    <div>
      <h1>Courses List</h1>
      <h4>Courses card</h4>
      <p>More test</p>
      <NavLink 
      style={({isActive}) => {
        return {
          backgroundColor: isActive ? "pink" : "yellow"
        }
      }}
      className='btn btn-secondary' 
      to={`/learn/course/${randomCourseName}`}>
        {randomCourseName}
      </NavLink>
      <NavLink className='btn btn-light' to={`/learn/course/test`}>
        tests
      </NavLink>


      <Outlet />
    </div>
  )
}

function Bundles() {
  return (
    <div>
      <h1>Bundles List</h1>
      <h4>Bundles card</h4>
    </div>
  )
}

function CourseId() {
  const { courseid } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>URL Params is : {courseid}</h1>
      <button 
      className='btn btn-warning'
      onClick={() => {
        navigate("/dashboard", {state: courseid});
      }}
      >
        Price
      </button>
      <Link to="/dashboard" state={"Nodejs"}>
        Test link
      </Link>
    </div>
  )
}

function Dashboard() {
  const location = useLocation();
  return (
    <div>
      <h1>Info that I brought got here is {location.state}</h1>
    </div>
  )
}

reportWebVitals();
