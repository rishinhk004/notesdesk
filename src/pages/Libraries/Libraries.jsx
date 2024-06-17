import styles from "./Libraries.module.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



const Form = () => {
    const [val, setVal] = useState("");
    return (
        <form className={styles.form}>
            <input type="text" value={val} onChange={(e) => setVal(e.target.value)} />
            <button onClick={async function (e) {
                e.preventDefault();
                try {
                    let req = await axios.post(`${import.meta.env.VITE_BACKEND_API}/library/add`, {
                        user: JSON.parse(localStorage.getItem('user')).email,
                        lib: val
                    });
                    console.log(req);
                    alert("Library created successfully:Reload the page to see the change.");
                }
                catch (err) {
                    console.log(err);
                }
            }}>CREATE LIBRARY {val}</button>
        </form >
    );
}
const Libraries = () => {

    const [form, setForm] = useState(false);
    const [libs, setLibs] = useState([]);
    useEffect(() => {
        async function fetchData() {
            let res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/library/read`);
            setLibs(res.data.data.filter(function (item) {
                return item.user === JSON.parse(localStorage.getItem('user')).email
            }));

        }
        fetchData();
    }, []);

    const toggleForm = () => {
        form === false ? setForm(true) : setForm(false);
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.libCont}>
                {libs.map((item => (
                    <Link to={`/libraries/${item.id}`} className={styles.card}>
                        <h6 className={styles.user}>{item.user}</h6>
                        <hr></hr>
                        <h3 className={styles.library}>{item.lib}</h3>
                    </Link>
                )))}
                <button className={styles.addLib} onClick={toggleForm}>+</button>
            </div>
            <div className={styles.formHolder}>
                {form === true ? <Form /> : null}
            </div>
        </div >);
}
export default Libraries;