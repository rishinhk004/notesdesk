import styles from "./Subjects.module.scss";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Form = (props) => {
    const [val, setVal] = useState("");
    return (
        <form className={styles.form}>
            <input type="text" value={val} onChange={(e) => setVal(e.target.value)} />
            <button onClick={async function (e) {
                try {
                    e.preventDefault();
                    let req = await axios.post(`${import.meta.env.VITE_BACKEND_API}/subject/add`, {
                        user: JSON.parse(localStorage.getItem('user')).email,
                        sub: val,
                        libraryId: props.id
                    });
                    console.log(req);
                    alert("Subject created successfully");
                }
                catch (err) {
                    console.log(err);
                }
            }}>CREATE SUBJECT {val}</button>
        </form >
    );
}

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
                            <button className={styles.button} onClick={() => deleteSubjects(item.id)}>Delete</button>
                        </div>
                    ))
                }
                <div className={styles.formHolder}>
                    {form === true ? <Form id={id} /> : null}
                </div>
            </div>
            <button className={styles.addSub} onClick={toggleForm}>+</button>
        </div>
    );
}

export default Subjects;