import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
const Edit = ({ getData }) => {
    const oldInitialData = {
        id: "",
        name: "",
        email: "",
        age: ""
    }
    const [oldData, setOldData] = useState(oldInitialData)
    /*     const [newData, setNewData] = useState(oldInitialData)
     */
    const navigate = useNavigate();
    const getOldData = async () => {
        const response = await axios.get(`http://localhost:3000/contact/${id}`)
        const existData = (response.data);
        setOldData(existData)

    }

    const { id } = useParams();
    console.log(id)
    useEffect(() => {
        getOldData()


    }, [id])
    const patchUpdateData = async (contact) => {
        const { data } = await axios.patch(`http://localhost:3000/contact/${id}`, contact);
        console.log(data)
        getData()
    }
    const formHandler = (e) => {
        e.preventDefault()
        console.log(oldData.name)
        patchUpdateData(oldData)

        navigate("/")


    }
    const changeHandler = (e) => {
        const { name, value } = e.target
        setOldData({ ...oldData, [name]: value })
    }


    return (
        <div>
            <div className="w-full h-dvh py-10">
                <div className="w-[350px] h-fit mx-auto bg-stone-200 py-7  text-center rounded-md shadow-xl"  >
                    <h1 className="text-xl font-semibold py-2">Edit Form  </h1>
                    <form onSubmit={formHandler}>
                        <div><input
                            type="text"
                            name="name"
                            placeholder={oldData.name}
                            className="w-[320px] h-10 mb-3 rounded-md  "
                            defaultValue={oldData.name}
                            onChange={changeHandler} /></div>
                        <div><input type="number"
                            name="age"
                            placeholder={oldData.age}
                            min={0}
                            className="w-[320px] h-10 mb-3 rounded-md "
                            defaultValue={oldData.age}
                            onChange={changeHandler}
                        /></div>
                        <div> <input type="email"
                            placeholder={oldData.email}
                            name="email"
                            className="w-[320px] h-10  rounded-md "
                            defaultValue={oldData.email}
                            onChange={changeHandler}
                        /></div>
                        <button

                            className=" bg-slate-950 text-sm py-[12px] px-10 rounded-xl  mt-3  mr-2 text-stone-300 bg-green-600">
                            Update </button>
                        <button className=" bg-red-600 text-sm py-[12px] px-10 rounded-xl  mt-3  text-stone-300" onClick={(e) => navigate('/')}>Cancle</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Edit
