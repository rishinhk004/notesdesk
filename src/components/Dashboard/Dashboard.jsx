import { useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/libraries");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  const [librariesCount, setLibrariesCount] = useState(0);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const libraries = await fetchLibraries();

          setLibrariesCount(libraries.length);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);
   
    const fetchLibraries = async () => {
        try {
          let res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/library/read`);
          return res.data.data.filter(function (item) {
            return item.user === JSON.parse(localStorage.getItem("user")).email;
          });
        } catch (error) {
          console.error('Error fetching libraries:', error);
          throw error;
        }
      };

  if (!user) {
    return <div>Loading...</div>;
  }
    return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <img
          src={user.photoURL}
          alt="User"
          className={styles.photo}
        />
        <div className={styles.info}>
          <h1>Welcome {user.displayName}!!</h1>
          <p>Email: {user.email}</p>
        </div>
      </div>
      <div className={styles.content}>
        <h2>About this website</h2>
        <p>
          This website helps you manage your study notes effectively by
          organizing them into libraries, subjects, and chapters.
        </p>
        <div className={styles.counts}>
          <div className={styles.count_item}>
            <h3>Libraries</h3>
            <p>{librariesCount}</p>
          </div>
        </div>
        <button onClick={handleClick} className={styles.button}>
          Go to Library
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
