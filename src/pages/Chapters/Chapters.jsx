import styles from "./Chapters.module.scss";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Chapters = () => {
    const { id, subId } = useParams();
    const deleteChapter = async (id) => {
        try {
          await axios.put(`${import.meta.env.VITE_BACKEND_API}/chapter/delete/${id}`);
          alert("Chapter deleted successfully");
        } catch (error) {
          console.error('Error deleting chapter:', error);
          throw error;
        }
      };
    const [chaps, setChaps] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/chapter/read/${subId}`);
            setChaps(data.data.data);
        }
        fetchData();
    }, [deleteChapter]);
    console.log(chaps);
    return (
        <div className={styles.wrapper}>
            <div className={styles.chapCont}>
                {
                    chaps.map((item) => (
                        <div key={item.id} className={styles.card}>
                        <Link to={`/libraries/${id}/${subId}/${item.id}`}>
                            <h3>{item.title}</h3>
                            <h4>{item.pages.length}</h4>
                        </Link>
                        <button onClick={() => deleteChapter(item.id)}>Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Chapters;