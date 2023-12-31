import Swal from "sweetalert2";
import useAxios, { axiosBase } from "../../hooks/useAxios";
import UserDrawer from "./UserDrawer";
import useAuth from "../../hooks/useAuth";

const MyPosts = () => {
    const {user} = useAuth()
    const posts = useAxios(`/myposts/${user.email}`)

    const handleDelete = (id) => {
        axiosBase.delete(`/posts/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                console.log(res.data)
                if (res.data.deletedCount > 0) {
                    Swal.fire(
                        'Deleted!',
                        'Your Post has been deleted.',
                        'success'
                    )
                }
            })
    }

    return (
        <div>
            <div className="md:flex">
                <UserDrawer></UserDrawer>
                <div className="bg-cover bg-center w-full">
                    <div className="flex justify-center items-center">
                        <div className="text-center p-6 md:p-10 w-full">
                            <h3 className="text-3xl font-semibold mb-6 uppercase">My Posts</h3>
                            <div className="pb-10 md:pb-20 px-10 md:px-20">
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        {/* head */}
                                        <thead>
                                            <tr>
                                                {/* <th>ID</th> */}
                                                <th>Post Title</th>
                                                <th>Total Votes</th>
                                                <th>Comment</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                posts.map(x =>
                                                    <tr key={x._id}>
                                                        {/* <th>{x._id}</th> */}
                                                        <td>{x.title}</td>
                                                        <td>{x.upvote}</td>
                                                        <td>0</td>
                                                        <td>
                                                            <button onClick={() => handleDelete(x._id)} className="btn btn-xs">X</button>
                                                        </td>
                                                    </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPosts;