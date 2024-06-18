import styles from "./Chapters.module.scss";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import FileBase64 from "react-file-base64";

const Form = (props) => {
    const [val, setVal] = useState("");
    const [pageOne, setpageOne] = useState(null);
    const [pages, setPages] = useState([]);
    return (
        <form className={styles.form}>
            <input type="text" value={val} onChange={(e) => setVal(e.target.value)} />
            <FileBase64 type="file" multiple={false} onDone={({ base64 }) => {
                setpageOne(base64);
            }} />
            <button onClick={async function (e) {
                try {
                    e.preventDefault();
                    var temp = pages;
                    temp[temp.length] = pageOne;
                    setPages(temp);
                    let req = await axios.post(`${import.meta.env.VITE_BACKEND_API}/chapter/add`, {
                        user: JSON.parse(localStorage.getItem('user')).email,
                        title: val,
                        pages: pages,
                        subjectId: props.subId
                    });
                    console.log(req);
                    alert("Chapter created successfully:Reload the page to see the change.");
                }
                catch (err) {
                    console.log(err);
                }
            }}>CREATE CHAPTER {val}</button>
        </form >
    );
}

const Chapters = () => {
    const { id, subId } = useParams();
    const [form, setForm] = useState(false);
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
    const toggleForm = () => {
        form === false ? setForm(true) : setForm(false);
    }
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
                <div className={styles.formHolder}>
                    {form === true ? <Form id={id} subId={subId} /> : null}
                </div>
                <button className={styles.addSub} onClick={toggleForm}>+</button>
            </div>
        </div>
    );
}

export default Chapters;