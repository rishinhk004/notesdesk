import styles from "./Sections.module.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Sections = () => {
    const { id, subId, chapId } = useParams();
    const [secs, setSecs] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/chapter/read/${subId}`);
            setSecs(data.data.data.filter(function (item) {
                return item.id === chapId;
            })[0].pages);

        }
        fetchData();
    }, []);
    console.log(secs);


    return (
        <div className={styles.wrapper}>
            <div className={styles.secCont}>
                {
                    secs.map((item, idx) => (
                        <div className={styles.parent}>
                            <button key={idx} className={styles.card}>
                                <img src={item} alt={idx} className={styles.page} />
                            </button>
                            <h6>page {idx + 1}</h6>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
export default Sections;