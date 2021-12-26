import React, { useEffect, useState } from "react";
import axios from "axios";


const BasicForm = () => {


    const [data, setData] = useState({
        title: "",
        author: "",
        content: ""
    });
 const [records,setRecords]=useState([])

    const formInput = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value);
        setData({ ...data, [name]: value});
    }
    const formSubmit = (e) => {
        e.preventDefault();

        const newRecords= {...data}
        setRecords([...records,newRecords])

        axios.get("http://localhost:3001/posts")
            .then((res) => {
                console.log(res.data);
            })


        axios.post("http://localhost:3001/posts",
            {
                title: data.title,
                author: data.author,
                content: data.content
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.log(err))

        setData({ title: "", author: "", content: "" })

    }




    return (
        <>

            <form action="" onSubmit={formSubmit} className="form">
                <div className="form-bg">
                    <div className="form-text">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" autoComplete="off" value={data.title} onChange={formInput}></input>
                    </div>
                    <div className="form-text">
                        <label htmlFor="author">Author</label>
                        <input type="text" name="author" id="author" autoComplete="off" value={data.author} onChange={formInput}></input>
                    </div>
                    <div className="form-text">
                        <label htmlFor="title">Content</label>
                        <input type="text" name="content" id="content" autoComplete="off" value={data.content} onChange={formInput}></input>
                    </div>
                    <button type="submit" className="form-text btn">Submit</button>
                </div>

                <div>
                    {
                        records.map((curElem) => {
                            return (
                                <div className="para-box">
                                    <p className="para-style">{curElem.title}</p>
                                    <p className="para-style">{curElem.author}</p>
                                    <p className="para-style">{curElem.content}</p>

                                </div>

                            )
                        })

                    }
                </div>

            </form>



        </>

    )

}

export default BasicForm