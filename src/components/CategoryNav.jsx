import { useState, useEffect } from "react";
import styles from "../styles/CategoryNav.module.css";
import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { WidthFull } from "@mui/icons-material";
const CategoryNav = () => {
  const [styleFix, setStylefix] = useState(false);
  const [scrollYheight, setscrollYheight] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setStylefix(true);
      }
      if (window.scrollY < 50) {
        setStylefix(false);
      }
    });
  }, []);
  const stickeyStyle = {
    position: "fixed",
    top: 0,
    zIndex:1,
   width:'100%',
  };
  const secNavItems = [
    { type : 1 , name : " Data Structures", subcategory: "" },
    { type :2 , name : " Algorithms " , subcategory : "" },
    {  type :3, name : " JavaScript " , subcategory : "" },
    { type :4, name : " Technology" , subcategory : "" },
    { type :5, name : "Design" , subcategory : "" },
    { type :7, name : "Web Development",subcategory : "" },
    { type :8, name : "ReactJs" , subcategory : "" },
    { type :9, name : " Programming" , subcategory : "" },
    { type :10, name : "Data Science" , subcategory : "" },
    { type : 11, name : "Python " , subcategory : "" },
    { type : 12, name : "C++" , subcategory : "" },
    { type :13 , name : "C" , subcategory : "" },
    { type : 14, name : "NodeJs " , subcategory : "" },
    { type :15 , name : "Interview Preparation " , subcategory : "" },
    { type :16 , name : "Machine Learning" , subcategory : "" },
    { type : 17, name : "Java" , subcategory : "" },
]
  return (
    <>
      <div
        style={styleFix ? stickeyStyle : {}}
        className={styles.categoryOuterMainDiv}
      >
      <ArrowBackIosNewIcon 
      className={styles.categorynavlinksIcon} 
      onClick={()=>{
          const navScroll =  document.getElementById('navDiv')
          navScroll.scrollBy(-400, 0);
          }}/>
        <div id='navDiv' className={styles.categoryMainDiv}>
          

          {secNavItems.map((data,index) => {
            if(startIndex <= index ){
                return (
              
                <Link key={index} className={styles.navLinks} href="/">
                  {data.name}
                </Link>
              
            );
            }
            
          })}

          
        </div>
        <ArrowForwardIosIcon 
      className={styles.categorynavlinksIcon} 
        
        onClick={()=>{
             const navScroll =  document.getElementById('navDiv')
          navScroll.scrollBy(400, 0);
          }}/>
      </div>
    </>
  );
};

export default CategoryNav;
