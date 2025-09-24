import { useEffect } from "react";
import foodImg from "../assets/food.jpg";
import notesImg from "../assets/notes.jpg";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function Home() {

    const navigate = useNavigate();
    // Animate items on page load
    useEffect(() => {
        const items = document.querySelectorAll(".study-item");
        items.forEach((item, _) => {
            item.style.transition = "all 0.8s ease-out";
            item.style.opacity = 0;
            item.style.transform = "translateY(30px)";
            setTimeout(() => {
                item.style.opacity = 1;
                item.style.transform = "translateY(0)";
            }, 200);
        });
    }, []);

    const handleStudyDashboard = () => {

        const token = localStorage.getItem("access");

            if (token) {
                try {
                const decoded = jwt_decode(token);
                const currentTime = Date.now() / 1000; //jwt expiry check in seconds
                if (decoded.exp && decoded.exp > currentTime) {
                    navigate("/dashboard"); // token valid
                } else {
                    // token expired
                    localStorage.removeItem("access");
                    localStorage.removeItem("refresh");
                    navigate("/login");
                }
                } catch (err) {
                // invalid token
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                navigate("/login");
                }
            } else {
                navigate("/login"); // no token
            }
    };

    const handleFoodDashboard = () => {
        const token = localStorage.getItem("access");

            if (token) {
                try {
                const decoded = jwt_decode(token);
                const currentTime = Date.now() / 1000; //jwt expiry check in seconds
                if (decoded.exp && decoded.exp > currentTime) {
                    navigate("/dashboard", { state: { activeNav: "foodbox" } }); // token valid
                } else {
                    // token expired
                    localStorage.removeItem("access");
                    localStorage.removeItem("refresh");
                    navigate("/login");
                }
                } catch (err) {
                // invalid token
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                navigate("/login");
                }
            } else {
                navigate("/login"); // no token
            }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex flex-col items-center justify-center p-6 relative overflow-hidden">


            <div className="relative z-10 w-full max-w-4xl text-center">
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4  drop-shadow-lg">
                    Made Easy
                </h1>
                <p className="text-gray-300 text-md sm:text-lg mb-8 drop-shadow-md">
                    Study smarter, eat better — Everything in one place
                </p>

        
                <div className="flex justify-center gap-10 mb-10 flex-wrap">
                
                    <div onClick={handleStudyDashboard} className="group cursor-pointer study-item bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-50 sm:w-64 h-50 sm:h-64 flex flex-col items-center justify-center hover:scale-105 transform transition-all duration-300 shadow-2xl">
                        <img src={notesImg} alt="Food" className="w-[100px] sm:w-[150px] h-[100px] sm:h-[150px] mb-4 rounded-lg"/>
                        <span className="text-white font-semibold text-xl text-center">Notes</span>
                    </div>

                
                    <div onClick={handleFoodDashboard} className="group cursor-pointer study-item bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-50 sm:w-64 h-50 sm:h-64 flex flex-col items-center justify-center hover:scale-105 transform transition-all duration-300 shadow-2xl">
                        <img src={foodImg} alt="Notes" className="w-[100px] sm:w-[150px] h-[100px] sm:h-[150px] mb-4 rounded-lg"/>
                        <span className="text-white font-semibold text-xl text-center">Hotels</span>
                    </div>
                </div>

                <div className="w-full text-center justify-center">
                    <button onClick={() => navigate("/signup")} className="w-45 sm:w-60 text-lg sm:text-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-semibold p-4 rounded-2xl shadow-2xl hover:scale-[1.05] hover:bg-gradient-to-r hover:from-purple-700 hover:via-pink-700 hover:to-red-700 hover:shadow-4xl transition-all duration-300 cursor-pointer">
                        Get Started →
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Home;
