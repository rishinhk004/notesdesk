import styles from "./Libraries.module.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Libraries = (props) => {

    const [libs, setLibs] = useState(["h"]);
    useEffect(() => {
        async function fetchData() {
            let res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/library/read`);
            console.log(res.data.data);
            setLibs(res.data.data);
        }
        fetchData();
    }, []);
    console.log(import.meta.env);

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
            </div>
        </div>);
}
export default Libraries;