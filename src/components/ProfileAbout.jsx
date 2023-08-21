import styles from "../styles/ProfileParts.module.css";
const ProfileAbout = () => {
  return (
    <>
      <div className={styles.ProfileAboutDiv}>
       <div className={styles.note}> <h3> Tell the world about yourself</h3>
        <span>Here’s where you can share more about yourself: your history, work
        experience, accomplishments, interests, dreams, and more. You can even
        add images and use rich text to personalize your bio.</span>
        <button type="button">Get Started</button>

        </div>
      </div>
    </>
  );
};

export default ProfileAbout;
