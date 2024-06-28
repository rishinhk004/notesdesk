import styles from "./Sections.module.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import FileBase64 from "react-file-base64";
const Form = (props) => {
    const [page, setPage] = useState("");
    const [load, setLoad] = useState("");
    const toggleForm = (e) => {
        e.preventDefault();
        props.form === false ? props.setForm(true) : props.setForm(false);
    }
    return (
        <form className={styles.form}>
            <label><b>Note:</b> File size must be lower than 45kb</label>
            <FileBase64 type="file" multiple={false} onDone={({ base64, file }) => {
                try {
                    setPage(base64);
                }
                catch {
                    alert("Limited exceeded for file");
                }
            }} />
            <div className={styles.closeCont}>
                <button className={styles.close} onClick={toggleForm}>X</button>
            </div>
            <button className={styles.subBtn} onClick={async function (e) {
                try {
                    e.preventDefault();
                    setLoad("Loading...");
                    const action = await axios.post(`${import.meta.env.VITE_BACKEND_API}/page/add`, {
                        page: page,
                        chapterId: props.chapId
                    });
                    if (action) {
                        alert("Page successfully added.");
                        setLoad("");
                    }

                }
                catch (err) {
                    console.log(err);
                }
            }} > CREATE PAGE</button>
            <h3>{load}</h3>
        </form >
    );
}

const Sections = () => {
    const { id, subId, chapId } = useParams();
    const [secs, setSecs] = useState([]);
    const [form, setForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const deletePage = async (id) => {
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_API}/page/delete/${id}`);
            alert("Chapter deleted successfully");
        } catch (error) {
            alert('Error deleting chapter:', error.message);
        }
    };
    useEffect(() => {
        async function fetchData() {
            const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/page/read/${chapId}`);
            if (data) {
                setSecs(data.data);
                setLoading(false);
            }
        }
        fetchData();
    }, [deletePage]);

    const toggleForm = () => {
        form === false ? setForm(true) : setForm(false);
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.heading} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><h1>Pages</h1></div>
            {loading ?
                <h1>Loading.....</h1> :
                <>
                    <div className={styles.secCont}>
                        {
                            secs.map((item, idx) => (
                                <div className={styles.parent}>
                                    <button key={idx} className={styles.card}>
                                        <img src={item.page} alt={idx} className={styles.page} />
                                    </button>
                                    <h6>page {idx + 1}</h6>
                                    <button onClick={() => deletePage(item.id)}>Delete</button>
                                </div>
                            ))
                        }
                        <div className={styles.formHolder} style={{ scale: `${form === true ? '1' : '0'}`, transition: 'ease 1000ms' }}>
                            {form === true ? <Form chapId={chapId} secs={secs} setSecs={setSecs} form={form} setForm={setForm} /> : null}
                        </div>
                        <div className={styles.addCont}>
                            <button className={styles.addSec} onClick={toggleForm}>+</button>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}
export default Sections;