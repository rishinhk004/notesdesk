import styles from "./Subjects.module.scss";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Subjects = () => {
    const { id } = useParams();
    const [subs, setSubs] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/subject/read/${id}`);
            setSubs(data.data.data);
            console.log(data.data.data);
        }
        fetchData();
    }, []);
    console.log(subs);
    return (

        <div className={styles.wrapper}>
            <div className={styles.subsCont}>
                {
                    subs.map((item) => (
                        <Link to={`/libraries/${id}/${item.id}`} className={styles.card}>
                            <h3>{item.sub}</h3>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}

export default Subjects;