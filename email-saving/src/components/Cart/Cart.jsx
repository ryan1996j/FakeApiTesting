import { useContext } from "react"
import { InfoContext } from "../../App"
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import axios from "axios";

const Cart = ({ getData }) => {
    const data = useContext(InfoContext);
    const navigate = useNavigate();
    const deletPost = async (id) => {
        const response = await axios.delete(`http://localhost:3000/contact/${id}`)
        console.log(response.data)
        getData()

    }
    const deletHandler = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete?");
        isConfirmed && deletPost(id)


    }
    const editHandler = (id) => {
        navigate(`/Edit/${id}`)

    }
    return (
        <div className="w-100 h-full bg-neutral-200">


            <div className=" w-[650px] mx-auto py-7">
                <Link to={"/Create"} className="w-16 bg-slate-900 text-white py-2 px-6   text-center">Add New</Link>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-5 bg-slate-100  border-b border-gray-400" >
                    <thead className="text-xs  text-gray-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="border-b border-gray-400">
                            <th scope="col" className="px-6 py-3 border-b border-gray-400">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 border-b border-gray-400">
                                Age
                            </th>
                            <th scope="col" className="px-6 py-3 border-b border-gray-400 text-center  ">
                                Email
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map((person) => (


                            <tr
                                className=" dark:bg-gray-800 border-b border-gray-400 h-10 " key={person.id}

                            >
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-b border-gray-400">
                                    {person.name}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-400">
                                    {person.age}
                                </td>
                                <td className=" relative px-6 py-4 border-b   flex justify-around">
                                    {person.email}
                                    <div className="flex  absolute right-2">
                                        <AiOutlineDelete className="text-xl text-red-600 cursor-pointer" onClick={() => deletHandler(person.id)} />
                                        <FiEdit className="text-xl text-green-600 ml-2 cursor-pointer" onClick={() => editHandler(person.id)} />
                                    </div>
                                </td>
                            </tr>


                        ))}
                    </tbody>

                </table>
            </div>




        </div>
    )
}

export default Cart
