import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../../auth/firebase";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss"

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
    <div className={styles.parent}>
    <div className={styles.container}>
      <h2>Welcome to the Notes Management System...</h2>
      <p>You are nor signed in. Please Signin!!</p>
      <button onClick={handleLogin} className={styles.sign_button}>
        Sign in with Google
      </button>
    </div>
  </div>
)
}
export default Login;