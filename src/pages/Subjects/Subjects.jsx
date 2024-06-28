import styles from "./Subjects.module.scss";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Form = (props) => {
    const [val, setVal] = useState("");
    const [load, setLoad] = useState("");
    const toggleForm = (e) => {
        e.preventDefault();
        props.form === false ? props.setForm(true) : props.setForm(false);
    }
    return (
        <form className={styles.form}>
            <div className={styles.closeCont}>
                <button className={styles.close} onClick={toggleForm}>X</button>
            </div>
            <input type="text" value={val} placeholder="Enter subject name" className={styles.textbox} onChange={(e) => setVal(e.target.value)} />
            <button className={styles.subBtn} onClick={async function (e) {
                try {
                    setLoad("Loading..");
                    e.preventDefault();
                    let req = await axios.post(`${import.meta.env.VITE_BACKEND_API}/subject/add`, {
                        user: JSON.parse(localStorage.getItem('user')).email,
                        sub: val,
                        libraryId: props.id
                    });
                    if (req) {
                        setLoad("");
                        alert("Subject created successfully.");
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }}>CREATE SUBJECT {val}</button>
            <h3>{load}</h3>
        </form >
    );
}

const Subjects = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
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
            if (data) {
                setLoading(false);
                setSubs(data.data);
            }
        }
        fetchData();
    }, [deleteSubjects]);
    const toggleForm = () => {
        form === false ? setForm(true) : setForm(false);
    }

    return (

        <div className={styles.wrapper}>
            <div className={styles.heading} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><h1>Subjects</h1></div>
            {
                loading ?
                    <h1>Loading....</h1> :
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
                        <div className={styles.formHolder} style={{ scale: `${form === true ? '1' : '0'}`, transition: 'ease 1000ms' }}>
                            {form === true ? <Form id={id} form={form} setForm={setForm} /> : null}
                        </div>
                        <div className={styles.addCont}>
                            <button className={styles.addSub} onClick={toggleForm}>+</button>
                        </div>
                    </div>
            }
        </div>
    );
}

export default Subjects;