import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Login from '../../components/login/Login';
import styles from "./Home.module.scss"



const Home = () => {
    const token = localStorage.getItem('token');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleDashboardClick = () =>{
        navigate("/dashboard")
    }

    if (!token) {
        return <Login />
    }
    else {
        return (
            <div className={styles.home}>
                <div className={styles.parent}>
                    <h1>Hello, {user?.displayName}!</h1>
                    <p>Welcome to the Notes Management System. Here you can manage all your academic notes efficiently.</p>
                    <button onClick={handleDashboardClick}>Go to Dashboard</button>
                </div>
            </div>)
    }
}
export default Home;