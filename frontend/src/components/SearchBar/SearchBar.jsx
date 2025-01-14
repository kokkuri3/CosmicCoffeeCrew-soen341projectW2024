import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export let location;

const SearchBar = () => {
  // const [postalCode, setPostalCode] = useState('');
  const [error, setError] = useState('');
  let postalCode;
  const navigate = useNavigate(); // Get navigate function from react-router-dom


  const determineBranch = (code) => {
    // Regular expression for Canadian postal code validation
    const postalCodeRegex = /^([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]) {0,1}(\d[ABCEGHJKLMNPRSTVWXYZ]\d)$/i;
    const validCode = postalCodeRegex.test(code);
    if (validCode) {
      const firstLetter = code.charAt(0);
      switch (firstLetter) {
        case 'G':
        case 'H':
        case 'J':
        case 'g':
        case 'h':
        case 'j':
            return 'Montreal';
        case 'K':
        case 'M':
        case 'N':
        case 'P':
        case 'k':
        case 'm':
        case 'n':
        case 'p':
            return 'Ottawa';
        case 'L':
        case 'l':
            return 'Toronto';
        case 'V':
        case 'v':
            return 'Vancouver';
        case 'B':
        case 'b':
            return 'Halifax';
        case 'T':
        case 't':
            return 'Edmonton';
        default:
            return 'Unknown City';
      }
    } else {
      return 'Invalid Postal Code';
    }
  };


  const handleChange = (e) => {
    postalCode = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //determine location of the closest branch
    location = determineBranch(postalCode);
    console.log(location)
    if(location === 'Invalid Postal Code') {
      setError("Enter a valid postal code");
    }
    else if(location !== 'Montreal' && location !== 'Ottawa' && location !== 'Vancouver' && location !== 'Toronto' && location !== 'Halifax' && location !== 'Edmonton') {
      setError("No branch is available in your region");
    }
    else {
      //navigate to catalog page
      navigate('/Catalog');
    }
  };
  
  return (
    <div className="flex flex-col absolute top-1/5 left-1/2 -translate-x-1/2 w-4/5 max-w-[1000px] bg-white/80 p-2 rounded-full shadow-md items-center justify-center mt-20 mb-20 px-10">
      <label className="text-sm font-medium text-gray-700 text-xl">Let&apos;s find the vehicles closest to you!</label>
      <div className='flex w-full items-center justify-center space-x-2'>
        <form onSubmit={handleSubmit} className="flex justify-center mt-4">
          <input
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Search
          </button>
        </form>
      </div>
      {error && <div className="block text-sm font-medium text-red-600 border border-red-500 px-4 py-2 rounded-md">{error}</div>}
    </div>
  );
};

export default SearchBar;



// import { useState } from 'react';
// import { MdSearch} from 'react-icons/md'; 
// //import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory for React Router v6
// import axios from 'axios';

// const SearchBar = () => {
//   const [location, setLocation] = useState('');
//   // const [startDate, setStartDate] = useState('');
//   // const [endDate, setEndDate] = useState('');
//   //const [vehicles, setVehicles] = useState([]); // Define a state to store vehicles
//   //const navigate = useNavigate('/results'); // Initialize navigate
//   //const navigate = useNavigate();

//   const handleLocationChange = (event) => {
//     setLocation(event.target.value);
//   };

//   // const handleStartDateChange = (event) => {
//   //   setStartDate(event.target.value);
//   // };

//   // const handleEndDateChange = (event) => {
//   //   setEndDate(event.target.value);
//   // };
//   //'/api/vehicles/?location=${location}'
//   const SearchBarHandling = async () => {
//     try {
//       const response = await axios.get(`/api/vehicles/?location=${location}`, {
//         params: {location: location}
//       });
//       if (response.ok) {
//         const json = await response.json();
//         console.log(json);  
//     } else {
//         throw new Error('Failed to fetch users');
//     }
//       console.log(response.data); // Process your data here
//     } catch (error) {
//       console.error("Failed to fetch vehicles:", error);
//     }
//   };
  
  

//   return (
//     <div className="flex flex-col absolute top-1/5 left-1/2 -translate-x-1/2 w-4/5 max-w-[1000px] bg-white/80 p-2 rounded-full shadow-md items-center justify-center mt-20 mb-20 px-10">
//       <label htmlFor="location" className="text-sm font-medium text-gray-700">Find the vehicles closest to you</label>
//       <div className="flex w-full items-center justify-center space-x-2"> {/* Adjusted spacing here */}
//         <div className="flex flex-col w-full"> {/* Added w-full for full width */}
//             <select
//             id="location"
//             value={location}
//             onChange={handleLocationChange}
//             className="bg-white border border-gray-300 rounded-full outline-none text-black h-10 text-base"
//           >
//             <option value="">Select your location</option>
//             <option value="Montreal">Montreal</option>
//             <option value="Ottawa">Ottawa</option>
//             <option value="Toronto">Toronto</option>
//             <option value="Edmonton">Edmonton</option>
//             <option value="Halifax">Halifax</option>
//             <option value="Vancouver">Vancouver</option>

//             {/* More cities can be added here */}
//           </select>
//           {/* <label htmlFor="location" className="text-sm font-medium text-gray-700">Where?</label> */}
//         </div>
//         <button className="p-3.5 bg-[#854a0f] text-white border border-gray-200 rounded-full w-15 h-15 cursor-pointer transition-colors duration-300 hover:bg-gray-200/70 hover:text-black"> {/* Adjusted padding */}
//           <MdSearch className="text-2xl" onClick={SearchBarHandling}/>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;

// import { useState } from 'react';
// import { MdSearch} from 'react-icons/md'; 

// const SearchBar = () => {
//   const [location, setLocation] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   const handleLocationChange = (event) => {
//     setLocation(event.target.value);
//   };

//   const handleStartDateChange = (event) => {
//     setStartDate(event.target.value);
//   };

//   const handleEndDateChange = (event) => {
//     setEndDate(event.target.value);
//   };
// const SearchBarHandling = () => {
//   const history = useHistory();

//   useEffect(() => {
//     const fetchVehicles = async () => {
//         try {
//             const response = await fetch('/api/vehicles/?location=${location}');
//             const json = await response.json();
//             if (response.ok) {
//                 setVehicles(json);
//             } else {
//                 throw new Error('Failed to fetch vehicles');
//             }
//         } catch (error) {
//             console.error('Error fetching vehicles:', error);
//         }
//     };

//     fetchVehicles();
// }, []); 
// }

//   return (
//     <div className="flex flex-col absolute top-1/5 left-1/2 -translate-x-1/2 w-4/5 max-w-[1000px] bg-white/80 p-2 rounded-full shadow-md items-center justify-center mt-20 mb-20 px-10">
//       <div className="flex w-full items-center justify-center space-x-2"> {/* Adjusted spacing here */}
//         <div className="flex flex-col w-full"> {/* Added w-full for full width */}
//             <select
//             id="location"
//             value={location}
//             onChange={handleLocationChange}
//             className="bg-white border border-gray-300 rounded-full outline-none text-black h-10 text-base"
//           >
//             <option value="">Select your location</option>
//             <option value="Montreal">Montreal</option>
//             <option value="Ottawa">Ottawa</option>
//             <option value="Toronto">Toronto</option>
//             <option value="Edmonton">Edmonton</option>
//             <option value="Halifax">Halifax</option>
//             <option value="Vancouver">Vancouver</option>

//             {/* More cities can be added here */}
//           </select>
//           <label htmlFor="location" className="text-sm font-medium text-gray-700">Where?</label>
//         </div>
//         <div className="flex flex-col w-full"> {/* Adjusted for full width */}
//         <input
//             id="start-date"
//             type="date"
//             value={startDate}
//             onChange={handleStartDateChange}
//             min={new Date().toISOString().split('T')[0]}
//             className="bg-white border border-gray-300 rounded-md outline-none text-black h-10 text-base"
//           />
//           <label htmlFor="start-date" className="text-sm font-medium text-gray-700 mt-2">Start Date</label>
//         </div>
//         <div className="flex flex-col w-full"> {/* Adjusted for full width */}
//         <input
//             id="end-date"
//             type="date"
//             value={endDate}
//             onChange={handleEndDateChange}
//             min={startDate || new Date().toISOString().split('T')[0]}
//             className="bg-white border border-gray-300 rounded-md outline-none text-black h-10 text-base"
//           />
//           <label htmlFor="end-date" className="text-sm font-medium text-gray-700 mt-2">End Date</label>
//         </div>
//         <button className="p-3.5 bg-[#854a0f] text-white border border-gray-200 rounded-full w-15 h-15 cursor-pointer transition-colors duration-300 hover:bg-gray-200/70 hover:text-black"> {/* Adjusted padding */}
//           <MdSearch className="text-2xl" onClick={SearchBarHandling}/>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;



// import { useState } from 'react';
// import { MdSearch} from 'react-icons/md'; 
// //import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory for React Router v6
// import axios from 'axios';

// const SearchBar = () => {
//   const [location, setLocation] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   //const [vehicles, setVehicles] = useState([]); // Define a state to store vehicles
//   //const navigate = useNavigate('/results'); // Initialize navigate
//   //const navigate = useNavigate();

//   const handleLocationChange = (event) => {
//     setLocation(event.target.value);
//   };

//   const handleStartDateChange = (event) => {
//     setStartDate(event.target.value);
//   };

//   const handleEndDateChange = (event) => {
//     setEndDate(event.target.value);
//   };
//   //'/api/vehicles/?location=${location}'
//   const SearchBarHandling = async () => {
//     try {
//       const response = await axios.get(`/api/vehicles/?location=${location}`, {
//         params: {
//           location: location,
//           startDate: startDate,
//           endDate: endDate
//         }
//       });
//       console.log(response.data); // Process your data here
//     } catch (error) {
//       console.error("Failed to fetch vehicles:", error);
//     }
//   };
  
  

//   return (
//     <div className="flex flex-col absolute top-1/5 left-1/2 -translate-x-1/2 w-4/5 max-w-[1000px] bg-white/80 p-2 rounded-full shadow-md items-center justify-center mt-20 mb-20 px-10">
//       <div className="flex w-full items-center justify-center space-x-2"> {/* Adjusted spacing here */}
//         <div className="flex flex-col w-full"> {/* Added w-full for full width */}
//             <select
//             id="location"
//             value={location}
//             onChange={handleLocationChange}
//             className="bg-white border border-gray-300 rounded-full outline-none text-black h-10 text-base"
//           >
//             <option value="">Select your location</option>
//             <option value="Montreal">Montreal</option>
//             <option value="Ottawa">Ottawa</option>
//             <option value="Toronto">Toronto</option>
//             <option value="Edmonton">Edmonton</option>
//             <option value="Halifax">Halifax</option>
//             <option value="Vancouver">Vancouver</option>

//             {/* More cities can be added here */}
//           </select>
//           <label htmlFor="location" className="text-sm font-medium text-gray-700">Where?</label>
//         </div>
//         <div className="flex flex-col w-full"> {/* Adjusted for full width */}
//         <input
//             id="start-date"
//             type="date"
//             value={startDate}
//             onChange={handleStartDateChange}
//             min={new Date().toISOString().split('T')[0]}
//             className="bg-white border border-gray-300 rounded-md outline-none text-black h-10 text-base"
//           />
//           <label htmlFor="start-date" className="text-sm font-medium text-gray-700 mt-2">Start Date</label>
//         </div>
//         <div className="flex flex-col w-full"> {/* Adjusted for full width */}
//         <input
//             id="end-date"
//             type="date"
//             value={endDate}
//             onChange={handleEndDateChange}
//             min={startDate || new Date().toISOString().split('T')[0]}
//             className="bg-white border border-gray-300 rounded-md outline-none text-black h-10 text-base"
//           />
//           <label htmlFor="end-date" className="text-sm font-medium text-gray-700 mt-2">End Date</label>
//         </div>
//         <button className="p-3.5 bg-[#854a0f] text-white border border-gray-200 rounded-full w-15 h-15 cursor-pointer transition-colors duration-300 hover:bg-gray-200/70 hover:text-black"> {/* Adjusted padding */}
//           <MdSearch className="text-2xl" onClick={SearchBarHandling}/>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;

// // import { useState } from 'react';
// // import { MdSearch} from 'react-icons/md'; 

// // const SearchBar = () => {
// //   const [location, setLocation] = useState('');
// //   const [startDate, setStartDate] = useState('');
// //   const [endDate, setEndDate] = useState('');

// //   const handleLocationChange = (event) => {
// //     setLocation(event.target.value);
// //   };

// //   const handleStartDateChange = (event) => {
// //     setStartDate(event.target.value);
// //   };

// //   const handleEndDateChange = (event) => {
// //     setEndDate(event.target.value);
// //   };
// // const SearchBarHandling = () => {
// //   const history = useHistory();

// //   useEffect(() => {
// //     const fetchVehicles = async () => {
// //         try {
// //             const response = await fetch('/api/vehicles/?location=${location}');
// //             const json = await response.json();
// //             if (response.ok) {
// //                 setVehicles(json);
// //             } else {
// //                 throw new Error('Failed to fetch vehicles');
// //             }
// //         } catch (error) {
// //             console.error('Error fetching vehicles:', error);
// //         }
// //     };

// //     fetchVehicles();
// // }, []); 
// // }

// //   return (
// //     <div className="flex flex-col absolute top-1/5 left-1/2 -translate-x-1/2 w-4/5 max-w-[1000px] bg-white/80 p-2 rounded-full shadow-md items-center justify-center mt-20 mb-20 px-10">
// //       <div className="flex w-full items-center justify-center space-x-2"> {/* Adjusted spacing here */}
// //         <div className="flex flex-col w-full"> {/* Added w-full for full width */}
// //             <select
// //             id="location"
// //             value={location}
// //             onChange={handleLocationChange}
// //             className="bg-white border border-gray-300 rounded-full outline-none text-black h-10 text-base"
// //           >
// //             <option value="">Select your location</option>
// //             <option value="Montreal">Montreal</option>
// //             <option value="Ottawa">Ottawa</option>
// //             <option value="Toronto">Toronto</option>
// //             <option value="Edmonton">Edmonton</option>
// //             <option value="Halifax">Halifax</option>
// //             <option value="Vancouver">Vancouver</option>

// //             {/* More cities can be added here */}
// //           </select>
// //           <label htmlFor="location" className="text-sm font-medium text-gray-700">Where?</label>
// //         </div>
// //         <div className="flex flex-col w-full"> {/* Adjusted for full width */}
// //         <input
// //             id="start-date"
// //             type="date"
// //             value={startDate}
// //             onChange={handleStartDateChange}
// //             min={new Date().toISOString().split('T')[0]}
// //             className="bg-white border border-gray-300 rounded-md outline-none text-black h-10 text-base"
// //           />
// //           <label htmlFor="start-date" className="text-sm font-medium text-gray-700 mt-2">Start Date</label>
// //         </div>
// //         <div className="flex flex-col w-full"> {/* Adjusted for full width */}
// //         <input
// //             id="end-date"
// //             type="date"
// //             value={endDate}
// //             onChange={handleEndDateChange}
// //             min={startDate || new Date().toISOString().split('T')[0]}
// //             className="bg-white border border-gray-300 rounded-md outline-none text-black h-10 text-base"
// //           />
// //           <label htmlFor="end-date" className="text-sm font-medium text-gray-700 mt-2">End Date</label>
// //         </div>
// //         <button className="p-3.5 bg-[#854a0f] text-white border border-gray-200 rounded-full w-15 h-15 cursor-pointer transition-colors duration-300 hover:bg-gray-200/70 hover:text-black"> {/* Adjusted padding */}
// //           <MdSearch className="text-2xl" onClick={SearchBarHandling}/>
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SearchBar;
