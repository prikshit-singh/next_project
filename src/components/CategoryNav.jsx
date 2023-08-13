import { useState, useEffect } from "react";
import styles from "../styles/CategoryNav.module.css";
import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
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
    // marginTop: '-50px'
  };
  const secNavItems = [
    "trendingNow0",
    "trendingNow1",
    "trendingNow2",
    "trendingNow3",
    "trendingNow4",
    "trendingNow5",
    "trendingNow6",
    "trendingNow7",
    "trendingNow8",
    "trendingNow9",
    "trendingNow10",
    "trendingNow11",
    "trendingNow12",
    "trendingNow13",
    "trendingNow14",
    "trendingNow15",
    "trendingNow16",
  ];

  return (
    <>
      <div
        style={styleFix ? stickeyStyle : {}}
        className={styles.categoryOuterMainDiv}
      >
      <ArrowBackIosNewIcon onClick={()=>{
          const navScroll =  document.getElementById('navDiv')
          navScroll.scrollBy(-400, 0);
          }}/>
        <div id='navDiv' className={styles.categoryMainDiv}>
          

          {secNavItems.map((data,index) => {
            if(startIndex <= index ){
                return (
              
                <Link key={index} className={styles.navLinks} href="/">
                  Trending Now
                </Link>
              
            );
            }
            
          })}

          
        </div>
        <ArrowForwardIosIcon onClick={()=>{
             const navScroll =  document.getElementById('navDiv')
          navScroll.scrollBy(400, 0);
          }}/>
      </div>
    </>
  );
};

export default CategoryNav;
