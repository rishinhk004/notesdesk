import styles from "./Subjects.module.scss";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Subjects = () => {
    const { id } = useParams();
    const deleteSubjects = async (id) => {
        try {
          await axios.put(`${import.meta.env.VITE_BACKEND_API}/subject/delete/${id}`);
          alert("Subject deleted successfully");
        } catch (error) {
          console.error('Error deleting subject:', error);
          throw error;
        }
      };
    const [subs, setSubs] = useState([]);
    const [form, setForm] = useState(false);
    useEffect(() => {
        async function fetchData() {
            const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/subject/read/${id}`);
            setSubs(data.data.data);
            console.log(data.data.data);
        }
        fetchData();
    }, [deleteSubjects]);
    const toggleForm = () => {
        form === false ? setForm(true) : setForm(false);
    }
    console.log(subs);
    return (

        <div className={styles.wrapper}>
            <div className={styles.subsCont}>
                {
                    subs.map((item) => (
                        <div className={styles.card}>
                        <Link to={`/libraries/${id}/${item.id}`} className={styles.card_parent}>
                            <h3>{item.sub}</h3>
                        </Link>
                        <button onClick={() => deleteSubjects(item.id)}>Delete</button>
                        </div>
                    ))
                }
                <button className={styles.addSub} onClick={toggleForm}>+</button>
            </div>
        </div>
    );
}

export default Subjects;