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
console.log('calling api for register')
    const res = await api.post('/register',formData)
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
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        SignUp to your account
      </h1>

      <form onSubmit={handelChangeSubmit} className="space-y-4">

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={formData.email}
            onChange={handelChange}
            className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 transition
              ${
                errorObj.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }
            `}
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={handelChange}
            className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 transition
              ${
                errorObj.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }
            `}
          />
        </div>

        {/* Errors */}
        {Object.values(errorObj).map((err, i) => (
          <p key={i} className="text-sm text-red-600">
            {err}
          </p>
        ))}

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium
            hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Don’t have an account?{" "}
        <span className="text-blue-600 font-medium cursor-pointer hover:underline">
          Sign up
        </span>
      </p>
    </div>
  </div>
);

  
};

export default LoginForm;
