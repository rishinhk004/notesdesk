import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../../auth/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const handleLogin = async () => {
        const auth = getAuth(app);
        const googleProvider = new GoogleAuthProvider();
        try{
            const result = signInWithPopup(auth,googleProvider);
            const token = (await result).user.accessToken // Get the user's ID token
            const user  = (await result).user;
            localStorage.setItem('token',token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate("/dashboard");
            }catch(error){
                console.log(error);
        }
    }
  return (
    <>
    <button onClick={handleLogin}>Login with Google</button>
    </>
)
}
export default Login;