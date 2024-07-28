// CoursePage.js
import React, { useEffect, useState } from "react";
import CourseCard from "../Components/courseCard";
import Navbar from "../Components/Navbar";
import "./Course.css";
import Popup from 'reactjs-popup';
import axios from 'axios';
const Course = () => {
    const [selectedCourseType, setSelectedCourseType] = useState("All");
  // const [courses, setCourses] = useState([]); // State to store fetched courses
  // const [myCourses, setMyCourses] = useState([]); 
  const [selectedCourse, setSelectedCourse] = useState({}); // State to track the selected course for detailed view
  const [allcoursedata, setallcoursedata] = useState({});
  const [mycoursesdata, setmycoursesdata] = useState({});
  const [coursesToDisplay, setcoursesToDisplay] = useState({});

  const user=JSON.parse(localStorage.getItem("userData"));
  const userid=user._id;
  console.log(userid);
  useEffect(() => {
    const fetchcourses = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/courses/all`);
        setallcoursedata(response.data);
        // console.log(typeof(response.data));
        response.data.data.forEach(course => {
          console.log(course.addedBy);
        });
        const filteredCourses = response.data.data.filter(course => course.addedBy == userid);
        setmycoursesdata(filteredCourses);
      } catch (error) {
        console.error('Error fetching collabed projects:', error);
      }
    };

    fetchcourses();
  }, []);

  
  // const mycoursesdata = allcoursedata.filter(course => course.addedBy === userid);

  // useEffect(() => {
    
  //   if(allcoursedata&&allcoursedata.data)
  //   {    
  //       // console.log(allcoursedata);
        
  //   }
    
  // }, [allcoursedata]);
  // const allcourses=JSON.parse(localStorage.getItem("courseData"));
  // const allcoursedata=allcourses.data;
  // console.log(typeof(allcoursedata));
  console.log('My Courses:', mycoursesdata);

  const handleClickCourseType = (data) => {
    setSelectedCourseType(data);
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };
  // const coursesToDisplay = selectedCourseType === "All" ? allcoursedata : mycoursesdata;
  useEffect(() => {
    
    const tempfilteredCourses = selectedCourseType === "All" ? allcoursedata : mycoursesdata;
    setcoursesToDisplay(tempfilteredCourses);
  
}, [selectedCourseType, allcoursedata, mycoursesdata]);

  const renderCourses = () => {
    if (coursesToDisplay && coursesToDisplay.data && selectedCourseType === "All")
      {
        return coursesToDisplay.data.map((course) => (
            <div key={course.id} onClick={() => handleCourseClick(course)}>
                <CourseCard 
                    key={course._id} 
                    link={course.linkToCourse} 
                    rating={course.rating} 
                    courseName={course.courseName} 
                    course={course} 
                />
            </div>
        ));
    }
    else if(mycoursesdata &&  selectedCourseType === "My")
      {
        return mycoursesdata.map((course) => (
          <div key={course.id} onClick={() => handleCourseClick(course)}>
              <CourseCard 
                  key={course._id} 
                  link={course.linkToCourse} 
                  rating={course.rating} 
                  courseName={course.courseName} 
                  course={course} 
              />
          </div>
      ));
      } 
    else
    {
        return <div>loading...</div>;
    }
};
  return (
    <div>
      <Navbar />
      <div className="welcome-message">
        <div className="text-welcome">
          Would you like <br /> to take a Course ?
        </div>
      </div>
      <div className="add-course">
              <button className="add-course-btn"><a href='/addcourse'>Add Course</a></button>
          </div>
      <div className="small-navbar">
      
        <button
          onClick={() => handleClickCourseType("All")}
          className={
            selectedCourseType === "All"
              ? "small-buttons-selected"
              : "small-buttons-not-selected"
          }
        >
          All Courses
        </button>
        <button
          onClick={() => handleClickCourseType("My")}
          className={
            selectedCourseType === "My"
              ? "small-buttons-selected"
              : "small-buttons-not-selected"
          }
        >
          My Courses
        </button>
      </div>
      <div className="small-screen">
      
      <div className="carousal-space">

          <div className="category_name">{selectedCourseType === "All" ? "New Arrivals" : "Courses added by me"}</div>
          <div className="rule_r"></div>
          <div className="projects">
            {
            //   coursesToDisplay&&coursesToDisplay.data?(
            // coursesToDisplay.data.map((course) =>(
            //   <div key={course.id} onClick={()=>handleCourseClick(course)}>
            //     <CourseCard key={course._id} link={course.linkToCourse} rating={course.rating} courseName={course.courseName} course={course}/>
            //   </div>)
            // )):
            // (
              
            //   <div>loading...</div>

            // )
            renderCourses()
            
            }
          </div>
        </div>
      </div>

      <div className="center">
       
        <footer className="footer">Thank you for visiting</footer>
      </div>
    </div>
  );
};

export default Course;

// CoursePage.js
// import React, { useEffect, useState } from "react";
// import CourseCard from "../Components/courseCard";
// import Navbar from "../Components/Navbar";
// import "./Course.css";
// import Popup from 'reactjs-popup';
// const Course = () => {
  

//   const [selectedCourseType, setSelectedCourseType] = useState("All");
//   // const [courses, setCourses] = useState([]); // State to store fetched courses
//   // const [myCourses, setMyCourses] = useState([]); 
//   const [selectedCourse, setSelectedCourse] = useState(null); // State to track the selected course for detailed view


//   const user=JSON.parse(localStorage.getItem("userData"));
//   const userid=user._id;
//   const allcourses=JSON.parse(localStorage.getItem("courseData"));
//   const allcoursedata=allcourses.data;
//   console.log('All Courses:', allcoursedata);
//   const mycoursesdata = allcoursedata.filter(course => course.addedBy === userid);
//   console.log('My Courses:', mycoursesdata);

//   const handleClickCourseType = (data) => {
//     setSelectedCourseType(data);
//   };

//   const handleCourseClick = (course) => {
//     setSelectedCourse(course);
//   };
//   const coursesToDisplay = selectedCourseType === "All" ? allcoursedata : mycoursesdata;
//   console.log("selectedCourse", typeof(selectedCourse));
//   console.log("mycoursesdata", typeof(mycoursesdata));
//   console.log("allcoursedata", typeof(allcoursedata));

//   console.log("selectedCourse", (selectedCourse));
//   console.log("mycoursesdata", (mycoursesdata));
//   console.log("allcoursedata", (allcoursedata));

//   return (
//     <div>
//       <Navbar />
//       <div className="welcome-message">
//         <div className="text-welcome">
//           Would you like <br /> to take a Course ?
//         </div>
//       </div>
//       <div className="add-course">
//               <button className="add-course-btn"><a href='/addcourse'>Add Course</a></button>
            
//           </div>
//       <div className="small-navbar">
      
//         <button
//           onClick={() => handleClickCourseType("All")}
//           className={
//             selectedCourseType === "All"
//               ? "small-buttons-selected"
//               : "small-buttons-not-selected"
//           }
//         >
//           All Courses
//         </button>
//         <button
//           onClick={() => handleClickCourseType("My")}
//           className={
//             selectedCourseType === "My"
//               ? "small-buttons-selected"
//               : "small-buttons-not-selected"
//           }
//         >
//           My Courses
//         </button>
//       </div>
//       <div className="small-screen">
      
//       <div className="carousal-space">

//           <div className="category_name">{selectedCourseType === "All" ? "New Arrivals" : "Courses added by me"}</div>
//           <div className="rule_r"></div>
//           <div className="projects">
//             {coursesToDisplay.map((course) => (
//               <div key={course.id} onClick={() => handleCourseClick(course)}>
//                 <CourseCard key={course._id} link={course.linkToCourse} rating={course.rating} courseName={course.courseName} course={course}/>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
      
//       <div className="center">
       
//         <footer className="footer">Thank you for visiting</footer>
//       </div>
//     </div>
//   );
// };

// export default Course;