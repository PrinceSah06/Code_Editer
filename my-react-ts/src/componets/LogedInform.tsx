import { use, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

type formfield = {
  password: string;
  email: string;
};
type error={
    email?:string;
    password?:string;
}

const LoginForm = () => {
  const [formData, setFormData] = useState<formfield>({
    email: "",
    password: "",
  });
  const [errorObj,setErrorObj]=useState<error>({});

const navigate = useNavigate();
  const handelChange = (e: any) => {
    // console.log(e.target.id, e.target.value);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const callAPi=async()=>{

    console.log("Calling API for login");
    const res = await api.post('/login',formData)
    console.log("API response:");
    console.log(res.data);
    const {token} = res.data;
    localStorage.setItem('token',token)
    
    navigate('/');

  }

  const handelChangeSubmit = (e:any)=>{
e.preventDefault();
setErrorObj({}); //reset error object"
    const {email,password} = formData;

    if(email.trim().length===0){
        return setErrorObj(errorObj=>({...errorObj,email:'Email is required'}))
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)){
       return setErrorObj(errorObj=>({...errorObj,email:'Invalid email address'}))
    }

    if(password.trim().length===0){
       return setErrorObj(errorObj=>({...errorObj,email:'Email is required'}))
    }else if(password.length<5 ){
       return setErrorObj(errorObj=>({...errorObj,password:'Password must be at least 5 characters long'}))
    }

    callAPi()

  }

  return (
    <div className="bg-red-300 relative max-w-md m-20 p-10 rounded-lg flex flex-col justify-center ">
      <h1 className="text-xl  absolute  top-1  left-20 font-bold mb-4">
        Login page
      </h1>

      <form onSubmit={(e)=>handelChangeSubmit(e)}>
        <div className="bg-blue-400 p-4 rounded">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            onChange={(e) => handelChange(e)}
            value={formData.email}
className={`p-2 mb-3 w-full rounded border focus:ring-2 focus:outline-none
    ${
      errorObj.email
        ? "border-red-500 focus:ring-red-400"
        : "border-blue-600 focus:ring-blue-800"
    }
  `}
            type="text"
            id="email"
          />

          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            onChange={(e) => handelChange(e)}
            value={formData.password}
           className={`p-2 mb-3 w-full rounded border focus:ring-2 focus:outline-none
    ${
      errorObj.password
        ? "border-red-500 focus:ring-red-400"
        : "border-blue-600 focus:ring-blue-800"
    }
  `}
            type="password"
            id="password"
          />
        </div>
  {Object.values(errorObj).map((e,i)=> <p className="text-sm text-red-900 " key={i}>{e}</p>)}
        <button className="p-2 mt-2 border bg-gray-200  rounded-lg px-5">
          Submit
        </button>
      </form>
      <p>
        Create account .{" "}
        <span className="text-blue-900 text-lg font-bold">click here...</span>
      </p>
    </div>
  );
};

export default LoginForm;
