import styles from "./Chapters.module.scss";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Chapters = () => {
    const { id, subId } = useParams();
    const [chaps, setChaps] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/chapter/read/${subId}`);
            setChaps(data.data.data);
        }
        fetchData();
    }, []);
    console.log(chaps);
    return (
        <div className={styles.wrapper}>
            <div className={styles.chapCont}>
                {
                    chaps.map((item) => (
                        <Link to={`/libraries/${id}/${subId}/${item.id}`}>
                            <h3>{item.title}</h3>
                            <h4>{item.pages.length}</h4>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}

export default Chapters;