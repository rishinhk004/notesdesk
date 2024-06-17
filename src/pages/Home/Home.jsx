import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Login from '../../components/login/Login';



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
    
   if(!token){
    return <Login/>
   }
   else{
    return <h1>Hello, {user && user.displayName}</h1>;
   }
}
export default Home;