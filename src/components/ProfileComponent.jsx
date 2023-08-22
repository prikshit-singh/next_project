import styles from "../styles/Profile.module.css";
import ProfileHome from "./ProfileHome";
import ProfileLists from "./ProfileLists";
import ProfileAbout from "./ProfileAbout";
import EditProfile from "./EditProfile";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

const ProfileComponent = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showLists, setShowLists] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const router = useRouter()
  let name = "anju";
  return (
    <>
      <div className={styles.profileMainDiv}>
        <div className={styles.profileMinDiv}>
          <div className={styles.divOne}>
            <h1>Anju Malik</h1>
            <div className={styles.linkBox}>
              <p
                className={styles.profileLinks}
                onClick={() => {
                  setShowHome(true);
                  setShowAbout(false);
                  setShowLists(false);
                }}
              >
                Home
              </p>
              <p
                className={styles.profileLinks}
                onClick={() => {
                  setShowHome(false);
                  setShowAbout(false);
                  setShowLists(true);
                }}
              >
                Saved
              </p>
              <p
                className={styles.profileLinks}
                onClick={() => {
                  setShowHome(false);
                  setShowAbout(true);
                  setShowLists(false);
                }}
              >
                About
              </p>
            </div>
            <div className={styles.profileComponentsDiv}>
              {showHome ? <ProfileHome /> : null}
              {showAbout ? <ProfileAbout /> : null}
              {showLists ? <ProfileLists /> : null}
            </div>
          </div>
          <div className={styles.divTwo}>
            <div className={styles.name}>{name[0].toUpperCase()}</div>
            <div>
              <h3 className={styles.author}> Anju malik</h3>
              <div>
              
                <p
                  className={styles.edit}
                  onClick={() => {
                    setShowEdit(true);
                    router.push("/edit")
                  }}
                >
                  Edit profile
                </p>
                {showEdit ? <EditProfile /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;
