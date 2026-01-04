import React,{useState,useEffect} from 'react';
import api from '../api/axios';
import { useParams } from 'react-router-dom';

const UserList = () => {
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);
const {projectId} = useParams()
console.log({projectId})
 
console.log('this is project id : ',projectId)
const addUserToProject = async (userId: string) => {
  try {
    const res =   await api.patch(`/projects/${projectId}/add-user`, {
      userId,
    });
console.log('user added :' ,res)
    alert("User added to project");
  } catch (err) {
    console.log("error while adding user  :",err)
  }
};


useEffect(() => {
  setLoading(true);
  api.get("/users")

    .then((res) =>{console.log(res.data)
         setUsers(res.data)})
    .finally(() => setLoading(false));
}, []);

    

  return (
 <div className="p-4">
  <h2 className="text-lg font-semibold mb-2">Add collaborator</h2>

  {users.map((user) => (
    <div
      key={user?._id}
      className="flex justify-between items-center p-2 border-b"
    >
      <div>
        {/* <p className="font-medium">{user?.name}</p> */}
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      <button
        onClick={() => addUserToProject(user?._id)}
        className="px-3 py-1 bg-blue-600 text-white rounded"
      >
        Add
      </button>
    </div>
  ))}
</div>

  )
}

export default UserList
