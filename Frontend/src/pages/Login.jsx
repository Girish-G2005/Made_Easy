import { useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login(){

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [remember, setRemember] = useState(false);

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        setIsLoading(true);
        try{
            const response = await axiosInstance.post("auth/login/", formData);
            const {access, refresh} = response.data;
            setMessage("Login successful!");
            
            if(remember){
                localStorage.setItem("access", access);
                localStorage.setItem("refresh", refresh);
            }
            else{
                sessionStorage.setItem("access", access);
                sessionStorage.setItem("refresh", refresh);
            }
            navigate("/dashboard");
        }
        catch(error){
            console.error("Login error: ", error.response?.data || error.message);
            setMessage("Invalid credentials!");
        }
        finally{
            setIsLoading(false);
        }
    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            <div className="relative w-full max-w-sm sm:max-w-md">
                {/**Login card */}
                <div className="bg-white/10 backdrop:blur-lg rounded-2xl shadow-2xl border border-white/20 relative p-8 overflow-hidden">
                    <div className="absolute bg-gradient-to-br from-white/5 to-transparent inset-0" />
                    {/**header */}
                    <div className="text-center z-10 mb-5 relative">
                        <div className="inline-flex text-center justify-center h-16 w-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl mb-3">
                            <svg className="w-10 h-16 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-2 shadow-2xl">Welcome Back</h1>
                        <p className="text-gray-300/80">Login with username & password</p>
                    </div>

                    {/**Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 z-10 relative">
                        {/**Username */}
                        <div className="space-y-2">
                            <label className="text-sm block text-gray-200 font-medium">Username: </label>
                            <div className="relative">
                                <input 
                                type="text"
                                name="username"
                                value={formData.username}
                                placeholder="Enter Username"
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-4 bg-white/20 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                                />

                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {/**Password */}
                        <div className="space-y-2">
                            <label className="text-sm block text-gray-200 font-medium">Password: </label>
                            <div className="relative">
                                <input 
                                type="password"
                                name="password"
                                value={formData.password}
                                placeholder="Enter Password"
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-4 bg-white/20 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                                />

                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/**Remember me */}
                        <div className="flex items-center space-x-2">
                            <input id="check" type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="size-3.5 ml-1 mt-0.5"/>
                            <label htmlFor="check" className=" font-medium text-gray-200 text-sm">Remember me</label>
                        </div>
                        
                        {/**Submit button */}
                        <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-4 rounded-xl text-white font-semibold hover:from-purple-700 hover:via-pink-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transform hover:scale-[1.02] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none shadow-lg hover:shadow-xl"
                        >
                            {isLoading
                            ? 
                            (<div className="flex items-center justify-center space-x-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Logging in...</span>
                            </div>)
                            :
                            ("Log in")}
                        </button>
                        
                    </form>

                    {/**Message */}
                    {message && (
                        <div className={`mt-6 p-4 rounded-xl border backdrop:blur-sm
                                    ${message.includes("successful")?
                                        "bg-green-400 border-green-400/50 text-green-300" :
                                        "bg-red-500/20 border-red-400/50 text-red-300"
                                    }`}>
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-2 h-2 rounded-full ${message.includes("successful")? "bg-green-400": "bg-red-400"}`}></div>
                                            <p className="font-medium">{message}</p>
                                        </div>

                        </div>
                    )}
                </div>

                {/**Footer */}
                <div className="text-center my-6">
                    <p className="text-gray-300">Don't have an account? 
                        <a href="/signup" className="text-purple-400 hover:text-purple-300 hover:underline duration-200 ml-2 font-semibold transition-colors">Create one</a>
                    </p>
                    
                </div>
            </div>
            
        </div>
    )

}

export default Login;
