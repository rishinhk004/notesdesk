import styles from "./Libraries.module.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



const Form = (props) => {
    const [val, setVal] = useState("");
    const [load, setLoad] = useState("");
    const toggleForm = () => {
        props.form === false ? props.setForm(true) : props.setForm(false);
    }
    return (
        <form className={styles.form}>
            <div className={styles.addCont}>
                <button className={styles.addLib} onClick={toggleForm}>X</button>
            </div>
            <input type="text" value={val} placeholder="Enter your library" className={styles.textbox} onChange={(e) => setVal(e.target.value)} />
            <button className={styles.subBtn} onClick={async function (e) {
                e.preventDefault();
                try {
                    setLoad("Loading...");
                    let req = await axios.post(`${import.meta.env.VITE_BACKEND_API}/library/add`, {
                        user: JSON.parse(localStorage.getItem('user')).email,
                        lib: val
                    });
                    if (req) {
                        setLoad("");
                        alert("Library created successfully.");
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }}>CREATE LIBRARY {val}</button>
            <h3>{load}</h3>
        </form >
    );
}
const Libraries = () => {

    const deleteLibrary = async (id) => {
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_API}/library/delete/${id}`);
            alert("Library deleted successfully");
        } catch (error) {
            console.error('Error deleting library:', error);
            throw error;
        }
    };
    const [form, setForm] = useState(false);
    const [libs, setLibs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [empty, setEmpty] = useState(false);
    useEffect(() => {
        async function fetchData() {
            let res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/library/read`);
            if (res) {
                setLoading(false);
                setLibs(res.data.data.filter(function (item) {
                    return item.user === JSON.parse(localStorage.getItem('user')).email
                }));
            }


        }
        fetchData();
    }, [deleteLibrary]);

    const toggleForm = () => {
        form === false ? setForm(true) : setForm(false);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.heading} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><h1>Libraries</h1></div>
            {loading ?
                <h1>Loading....</h1> :
                <div className={styles.libCont}>
                    {libs.map((item => (
                        <div className={styles.card}>
                            <Link to={`/libraries/${item.id}`} className={styles.card_link}>
                                <h6 className={styles.user}>{item.user}</h6>
                                <hr></hr>
                                <h3 className={styles.library}>{item.lib}</h3>
                            </Link>
                            <button onClick={() => deleteLibrary(item.id)}>Delete</button>
                        </div>
                    )))}
                    <div className={styles.addCont}>
                        <button className={styles.addLib} onClick={toggleForm}>+</button>
                    </div>
                    {
                        empty ?
                            <h1>No Libraries found</h1> : null
                    }
                </div>
            }
            <div className={styles.formHolder} style={{ scale: `${form === true ? '1' : '0'}`, transition: 'ease 1000ms' }}>
                {form === true ? <Form form={form} setForm={setForm} /> : null}
            </div>
        </div >);
}
export default Libraries;