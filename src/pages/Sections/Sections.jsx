import styles from "./Sections.module.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import FileBase64 from "react-file-base64";
const Form = (props) => {
    const [pageOne, setpageOne] = useState(null);
    const [pages, setPages] = useState([]);
    return (
        <form className={styles.form}>
            <FileBase64 type="file" multiple={false} onDone={({ base64 }) => {
                setpageOne(base64);
            }} />
            <button onClick={async function (e) {
                try {
                    e.preventDefault();
                    setPages(props.pages);
                    var temp = pages;
                    temp[temp.length] = pageOne;
                    setPages(temp);
                    let req = await axios.put(`${import.meta.env.VITE_BACKEND_API}/chapter/update/${props.chapId}`, {
                        pages: pages
                    });
                    console.log(req);
                    alert("Chapter created successfully:Reload the page to see the change.");
                }
                catch (err) {
                    console.log(err);
                }
            }}>CREATE PAGE</button>
        </form >
    );
}

const Sections = () => {
    const { id, subId, chapId } = useParams();
    const [secs, setSecs] = useState([]);
    const [form, setForm] = useState(false);
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

    const toggleForm = () => {
        form === false ? setForm(true) : setForm(false);
    }
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
                <div className={styles.formHolder}>
                    {form === true ? <Form chapId={chapId} pages={secs} /> : null}
                </div>
                <button className={styles.addSub} onClick={toggleForm}>+</button>
            </div>
        </div>
    );
}
export default Sections;