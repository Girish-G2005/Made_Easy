import { useState, useEffect } from 'react';
import { Book, UtensilsCrossed, User, LogOut, ThumbsUp, ThumbsDown, ArrowLeftIcon, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Document from '../components/Document';
import axiosInstance from "../api/axios";
import {jwt_decode} from "jwt-decode";
import { useLocation } from 'react-router-dom';
import "../styles/dashboard.css";

function Dashboard(){
  const location = useLocation();
  const [activeNav, setActiveNav] = useState(location.state?.activeNav || 'studybox');
  const navigate = useNavigate();
  const [semester, setSemester] = useState([]);
  const [ error, setError] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [userID, setUserID] = useState(null);

  //logout
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  //fetching study box api data
  useEffect(() => {
      const fetchStudyboxData = async () => {
          try{
              const response = await axiosInstance.get("studybox/");
              setSemester(response.data);
              setError(null);
          }
          catch(err){
              console.error(err);
              setError("Failed to fetch the data!");
          }
      }

      fetchStudyboxData();
  }, []);

  //fetching foodbox api data
  useEffect(() => {
    const fetchFoodData = async () => {
      try{
        const response = await axiosInstance.get("foodbox/");
        setHotels(response.data);
        setError(null);
      }
      catch(err){
        console.error(err);
        setError("Failed to fetch the data!")
      }
    }

    fetchFoodData();
  }, []);

  //Decode JWT and set user_id
  useEffect(() => {
    const token = localStorage.getItem("access");
    if(token && token !== "undefined"){
      try {
        const decode = jwt_decode(token);
        const user = parseInt(decode.user_id, 10);
        setUserID(user);
      } catch (err) {
        console.error("Failed to decode token:", err);
        localStorage.clear();  // optional: clear invalid token
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  //fetching reactions
  useEffect(() => {
    const fetchReactions = async () => {
    try{
      if(selectedHotel){
      const response = await axiosInstance.get("reaction/");
      setReactions(response.data);
    }
    }catch(err){
      console.error(err);
      setError("Can't fetch reactions data!");
    }}
    fetchReactions();
  }, [selectedHotel]);

  //count the likes/dislikes
  const getReactionCount = (itemId, isLike) => {
      const count = reactions.filter((r) => r.item === itemId && r.is_like === isLike).length;
      return count;
  };

  //check if user already reacted?
  const hasReacted = (itemId) => {
      const isReacted = reactions.find((r) => r.item === itemId && r.user === userID);
      
      return isReacted;
  }

  //user's reaction update
  const handleReaction = async (itemId, isLike) => {
    if(!userID) return;

    try{
      const response = await axiosInstance.post("reaction/", {item: itemId, is_like: isLike, user: userID});
      setReactions(prev => [...prev, response.data]);
    }catch(err){
      console.error(err.response.data);
      setError("You Couldn't like/dislike at this point of time!");
    }
  }

  
  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Top Bar */}
      <div className=" bg-white shadow-sm border-b border-gray-200 h-10 sm:h-16 flex items-center justify-between px-6">
        <div className="flex items-center text-gray-600">
          <User className="mr-2" size={20} />
          <span className="text-xs sm:text-sm md:text-base font-light sm:font-medium">Hi, User!</span>
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-12">
          <h1 className="text-sm sm:text-xl font-bold text-gray-800 tracking-wide">
            Made Easy
          </h1>
        </div>
        
        <div className="w-8"></div> {/* Spacer for balance */}
      </div>

      <div className="flex w-auto flex-col md:flex-row md:h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="bg-white shadow-sm border-gray-300 flex md:flex-col w-full md:w-68 md:h-[calc(100vh-4rem)]">
          <div className="p-2 sm:p-4 flex-1 relative">
            <nav className="flex md:flex-col gap-2 md:space-y-2">
              <button
                onClick={() => setActiveNav('studybox')}
                className={`flex-1 md:w-full flex items-center justify-center md:justify-start px-2 sm:px-4 py-1.5 sm:py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                  activeNav === 'studybox'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                <Book className="mr-3" size={20} />
                <span className="text-xs sm:text-sm md:text-base font-normal sm:font-medium">Study Box</span>
              </button>
              
              <button
                onClick={() => setActiveNav('foodbox')}
                className={`flex-1 md:w-full flex items-center justify-center md:justify-start px-2 sm:px-4 py-1.5 sm:py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                  activeNav === 'foodbox'
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                <UtensilsCrossed className="mr-3" size={20} />
                <span className="text-xs sm:text-sm md:text-base font-normal sm:font-medium">Food Box</span>
              </button>

              {/* Logout Button */}
                <div className="hidden md:block p-4 translate-y-100">
                    <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 text-red-600 hover:bg-red-100 cursor-pointer"
                    >
                    <LogOut className="mr-3" size={20} />
                    <span className="font-medium">Logout</span>
                    </button>
                </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="scroll-container custom-scroll p-4 flex-1">
          {/* Your components will go here */}

          {/** Studybox */}
          {activeNav === "studybox" && (
            <>
              {/* Error Message (Centered on screen) */}
              {error && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                  <div className="max-w-xl flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl shadow-md text-center pointer-events-auto">
                    <AlertCircle className="text-red-500 w-6 h-6" />
                    <p className="text-red-600 font-medium">{error}</p>
                  </div>
                </div>
              )}

              {/* Semester List */}
              {!error && (
                <div className="p-4">
                  {semester.map((sem) => (
                    <div key={sem.id} className="mb-6">
                      <h2 className="font-semibold text-2xl sm:text-3xl ml-2 text-gray-700/90 mb-6">
                        {sem.name}
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 shrink-0">
                        {sem.documents.map((doc) => (
                          <Document key={doc.id} doc={doc} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          
          
          {/** Foodbox */}
          {activeNav === "foodbox" && (
            <>
              {/* Error Message (Centered on screen) */}
              {error && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                  <div className="max-w-xl flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl shadow-md text-center pointer-events-auto">
                    <AlertCircle className="text-red-500 w-6 h-6" />
                    <p className="text-red-600 font-medium">{error}</p>
                  </div>
                </div>
              )}

              {/* Hotel List (when no hotel selected) */}
              {!error && !selectedHotel && (
                <div className="p-4">
                  <h2 className="font-semibold text-lg md:text-2xl sm:text-3xl text-gray-700/90 mb-6">
                    These are the hotels at your location
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-15">
                    {hotels.map((hotel) => (
                      <div
                        key={hotel.id}
                        className="w-50 ml-1 sm:w-55 md:w-60 lg:w-90 shadow-lg rounded-md group hover:shadow-2xl cursor-pointer transition-shadow overflow-hidden border border-black/30"
                        onClick={() => setSelectedHotel(hotel)}
                      >
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="h-40 sm:h-48 w-full object-cover"
                        />
                        <div className="p-2 bg-black/25">
                          <h2 className="p-2 text-sm md:text-md font-bold text-black/80 truncate">
                            {hotel.name}
                          </h2>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected Hotel Items */}
              {!error && selectedHotel && (
                <div className="p-4">
                  <div>
                    <button
                      onClick={() => setSelectedHotel(null)}
                      className="px-2 md:px-4 py-2 md:py-2 bg-orange-500 shadow-lg cursor-pointer rounded-lg flex text-center align-middle hover:bg-orange-600 transition-all duration-200"
                    >
                      <ArrowLeftIcon className="text-white translate-y-1" size={20} />
                      <span className="font-semibold text-white text-xl ml-2">Back</span>
                    </button>
                  </div>
                  <div>
                    {selectedHotel?.items?.map((item) => (
                      <div
                        key={item.id}
                        className="mt-2 border border-black/20 flex gap-25 md:gap-50 justify-between w-md md:w-2xl px-1 md:px-2 py-2 md:py-4 rounded-md bg-white/90 shadow-xl"
                      >
                        <span className="text-black font-semibold text-lg md:text-2xl">
                          {item.name}
                        </span>
                        <div className="flex gap-1.5 md:gap-4">
                          {/* Like Button */}
                          <button
                            disabled={hasReacted(item.id)}
                            onClick={() => handleReaction(item.id, true)}
                            className={`flex gap-1 text-center px-1.5 md:px-3 py-1 md:py-1.5 rounded-4xl ${
                              hasReacted(item.id)?.is_like === true
                                ? "bg-green-500"
                                : "bg-gray-400/75"
                            } cursor-pointer hover:${
                              hasReacted(item.id)?.is_like === true
                                ? "bg-green-500"
                                : "bg-gray-400"
                            } duration-200`}
                          >
                            <ThumbsUp className="translate-y-0.5" size={15} />
                            <span className="font-semibold text-sm text-white">
                              {getReactionCount(item.id, true)}
                            </span>
                          </button>
                          {/* Dislike Button */}
                          <button
                            disabled={hasReacted(item.id)}
                            onClick={() => handleReaction(item.id, false)}
                            className={`flex gap-1 text-center px-1.5 md:px-3 py-1 md:py-1.5 rounded-4xl ${
                              hasReacted(item.id)?.is_like === false
                                ? "bg-red-500"
                                : "bg-gray-400/75"
                            } cursor-pointer hover:${
                              hasReacted(item.id)?.is_like === false
                                ? "bg-red-500"
                                : "bg-gray-400"
                            } duration-200`}
                          >
                            <ThumbsDown className="translate-y-1" size={15} />
                            <span className="font-semibold text-sm text-white">
                              {getReactionCount(item.id, false)}
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
