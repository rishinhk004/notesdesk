import styles from "./Chapters.module.scss";
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
            <input type="text" placeholder="Enter chapter name" className={styles.textbox} value={val} onChange={(e) => setVal(e.target.value)} />
            {/* <FileBase64 type="file" multiple={false} onDone={({ base64 }) => {
                setpageOne(base64);
            }} /> */}
            <button className={styles.subBtn} onClick={async function (e) {
                try {
                    e.preventDefault();
                    setLoad("Loading...");
                    let req = await axios.post(`${import.meta.env.VITE_BACKEND_API}/chapter/add`, {
                        user: JSON.parse(localStorage.getItem('user')).email,
                        title: val,
                        subjectId: props.subId
                    });
                    if (req) {
                        setLoad("");
                        alert("Chapter created successfully:Reload the page to see the change.");
                    }
                }
                catch (err) {
                    alert(err.message);
                }
            }}>CREATE CHAPTER {val}</button>
            <h3>{load}</h3>
        </form >
    );
}

const Chapters = () => {
    const { id, subId } = useParams();
    const [Loading, setLoading] = useState(true);
    const [form, setForm] = useState(false);
    const deleteChapter = async (id) => {
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_API}/chapter/delete/${id}`);
            alert("Chapter deleted successfully");
        } catch (error) {
            alert('Error deleting chapter:', error.message);
        }
    };
    const [chaps, setChaps] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/chapter/read/${subId}`);
            if (data) {
                setChaps(data.data);
                setLoading(false);
            }
        }
        fetchData();
    }, [deleteChapter]);
    console.log(chaps);
    const toggleForm = () => {
        form === false ? setForm(true) : setForm(false);
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.heading} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><h1>Chapters</h1></div>
            {Loading ?
                <h1>Loading...</h1> :
                <div className={styles.chapCont}>
                    {
                        chaps.map((item) => (
                            <div key={item.id} className={styles.card}>
                                <Link to={`/libraries/${id}/${subId}/${item.id}`}>
                                    <h3>{item.title}</h3>
                                </Link>
                                <button onClick={() => deleteChapter(item.id)}>Delete</button>
                            </div>
                        ))
                    }
                    <div className={styles.formHolder} style={{ scale: `${form === true ? '1' : '0'}`, transition: 'ease 1000ms' }}>
                        {form === true ? <Form id={id} subId={subId} form={form} setForm={setForm} /> : null}
                    </div>
                    <div className={styles.addCont}>
                        <button className={styles.addChap} onClick={toggleForm}>+</button>
                    </div>
                </div>
            }
        </div>
    );
}

export default Chapters;