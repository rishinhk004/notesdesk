import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";


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
    
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    if (!token) {
        return null; 
    }

    return <h1>Hello, {user && user.displayName}</h1>;
}
export default Home;