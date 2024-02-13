import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Create = ({ getData }) => {
    const initialData = {

        name: "",
        age: "",
        email: ""
    }
    const [newData, setNewData] = useState(initialData)
    const navigate = useNavigate();
    const changeHandler = (personalInfo) => {
        const { name, value } = personalInfo.target
        setNewData({ ...newData, [name]: value })
    }
    const postData = async (postDatas) => {
        try {
            const response = await axios.post("http://localhost:3000/contact", postDatas);

            getData()
            navigate('/');
        } catch (error) {
            console.error("Error posting data:", error);
        }
    };

    const formHandler = (e) => {
        e.preventDefault()
        const newUpdate = {
            "id": Date.now(),
            "name": newData.name,
            "age": newData.age,
            "email": newData.email,
        }


        postData(newUpdate)



    }
    return (
        <div className="w-full h-dvh py-10">
            <div className="w-[350px] h-fit mx-auto bg-stone-200 py-7  text-center rounded-md shadow-xl"  >
                <h1 className="text-xl font-semibold py-2">Create new user </h1>
                <form >
                    <div><input
                        type="text"
                        name="name"
                        placeholder="name"
                        className="w-[320px] h-10 mb-3 rounded-md  "
                        value={newData.name}
                        onChange={changeHandler} /></div>
                    <div><input type="number"
                        name="age"
                        placeholder="age"
                        className="w-[320px] h-10 mb-3 rounded-md "
                        value={newData.age}
                        onChange={changeHandler} /></div>
                    <div> <input type="email"
                        placeholder="email"
                        name="email"
                        className="w-[320px] h-10  rounded-md "
                        value={newData.email}
                        onChange={changeHandler} /></div>
                    <button onClick={(e) => {
                        formHandler(e)

                    }
                    }
                        disabled={!newData.name.trim() || !newData.age.trim() || !newData.email.trim()}
                        className=" bg-slate-950 text-sm py-[12px] px-10 rounded-xl  mt-3  mr-2 text-stone-300">
                        Create</button>
                    <button className=" bg-red-600 text-sm py-[12px] px-10 rounded-xl  mt-3  text-stone-300" onClick={(e)=>navigate('/')}>Cancle</button>
                </form>
            </div>
        </div>
    )
}

export default Create
