import React, { useEffect, useState } from 'react';
import styles from "./Dashboard.module.scss"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/libraries')
    }

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <img src={user.photoURL} alt="User" className={styles.dashboard__photo} />
                <div className={styles.info}>
                    <h1>Hello, {user.displayName}!</h1>
                    <p>Email: {user.email}</p>
                </div>
            </div>
            <div className={styles.content}>
                <h2>About this website</h2>
                <p>This website helps you manage your study notes effectively by organizing them into libraries, subjects, and chapters.</p>
                {/* <div className={styles.counts}>
          <div className={styles.count-item}>
            <h3>Libraries</h3>
            <p>{librariesCount}</p>
          </div>
          <div className={styles.count-item}>
            <h3>Subjects</h3>
            <p>{subjectsCount}</p>
          </div>
          <div className={styles.count-item}>
            <h3>Chapters</h3>
            <p>{chaptersCount}</p>
          </div>
  
        </div> */}
                <button onClick={handleClick} className={styles.button}>Go to Library</button>
            </div>
        </div>
    );
};

export default Dashboard;
