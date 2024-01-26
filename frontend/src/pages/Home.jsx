import { useEffect, useState } from "react";
import { backendURL } from "../api/api";

const Home = () => {
    
    const [checkList, setCheckList] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [fileUpload, setFileUpload] = useState();

    useEffect(() => {
        fetch(backendURL + '/api/data')
        .then(res => res.json())
        .then(data => setCheckList(data))
        .catch(err => console.log(err));
    }, []);

    const handleInput = (event) => {
        setNewTask(event.target.value);
        console.log(newTask);
    }; 

    // const handleAddTask = () => {
    //     fetch(backendURL + '/api/data/post', {
    //         method: "POST",
    //         body: JSON.stringify({ "task": newTask}),
    //         headers: { "Content-Type": "application/json" }
    //     })
    //     .then(res => res.json())
    //     .then(data => setCheckList(data))
    // };

    const handleDelete = (id) => {
        fetch(backendURL + `/api/data/delete/${id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => setCheckList(data))
    }

    const handleToggleDone = (id) => {
        fetch(backendURL + `/api/data/toggleDone/${id}`, {
            method: "PATCH"
        })
        .then(res => res.json())
        .then(data => setCheckList(data))
    }

    useEffect(() => {
        console.log(fileUpload);
    }, [fileUpload])

    const handleFileUpload = () => {
        const formdata = new FormData();
        formdata.append("task", newTask);
        formdata.append("image", fileUpload);
        fetch(backendURL + "/api/data/upload", {
            method: "POST",
            body: formdata
        })
        .then(res => res.json())
        .then(data => setCheckList(data))
    }

    return  <main>
        <h1>CheckListo Home</h1>
        <form>
            <input onChange={handleInput} type="text" placeholder="new task here" />
        </form>
        
        {checkList?.map((todo) => (
            <>
                <li onClick={() => handleToggleDone(todo.id)} style={todo.done ? {backgroundColor: "green"} : {backgroundColor: "tomato"}} key={todo.id}>
                    {todo.task}
                </li>
                <button onClick={() => handleDelete(todo.id)}>delete</button>
            </>
        ))}

        <form>
            <input type="file" name="image" id="" onChange={(event) => setFileUpload(event.target.files[0])}/>
        </form>
        <button onClick={handleFileUpload}>Upload</button>
    </main> 
}
 
export default Home;