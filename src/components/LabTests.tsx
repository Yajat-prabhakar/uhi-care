// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Home, Building2 } from 'lucide-react';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../supabase';



// const labTests = {
//   all: [
//     { id: 1, name: 'Complete Blood Count (CBC)', price: 500, homeAvailable: true },
//     { id: 2, name: 'Lipid Profile', price: 800, homeAvailable: true },
//     { id: 3, name: 'Thyroid Profile', price: 1200, homeAvailable: true },
//     { id: 4, name: 'Diabetes Panel', price: 1000, homeAvailable: true },
//     { id: 5, name: 'Liver Function Test', price: 1500, homeAvailable: true },
//     { id: 6, name: 'Kidney Function Test', price: 1500, homeAvailable: true },
//     { id: 7, name: 'COVID-19 RT-PCR', price: 2000, homeAvailable: true },
//     { id: 8, name: 'Vitamin D Test', price: 1800, homeAvailable: true },
//     { id: 9, name: 'Vitamin B12 Test', price: 1200, homeAvailable: true },
//     { id: 10, name: 'ECG', price: 500, homeAvailable: false },
//     { id: 11, name: 'X-Ray Chest', price: 800, homeAvailable: false },
//     { id: 12, name: 'MRI Brain', price: 8000, homeAvailable: false },
//     { id: 13, name: 'CT Scan', price: 5000, homeAvailable: false },
//     { id: 14, name: 'Ultrasound', price: 2000, homeAvailable: false },
//     { id: 15, name: 'Bone Density Test', price: 2500, homeAvailable: false },
//   ],
// };

// const labs = [
//   { id: 1, name: 'Delhi Lab 1' },
//   { id: 2, name: 'Delhi Lab 2' },
//   { id: 3, name: 'Delhi Lab 3' },
//   { id: 4, name: 'Delhi Lab 4' },
// ];

// const timeSlots = Array.from({ length: 12 }, (_, i) => `${8 + i}:00 AM`);

// const LabTests: React.FC = () => {
//   const navigate = useNavigate();

//   const [selectedTests, setSelectedTests] = useState<number[]>([]);
//   const [testLocation, setTestLocation] = useState<'home' | 'lab'>('lab');
//   const [selectedLab, setSelectedLab] = useState<number | null>(null);
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [address, setAddress] = useState('');

//   const handleTestSelection = (testId: number) => {
//     setSelectedTests((prevSelected) =>
//       prevSelected.includes(testId)
//         ? prevSelected.filter((id) => id !== testId)
//         : [...prevSelected, testId]
//     );
//   };

//   const calculateTotal = () => {
//     return selectedTests.reduce((total, testId) => {
//       const test = labTests.all.find((t) => t.id === testId);
//       return total + (test?.price || 0);
//     }, 0);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!date || !time || !name || !age || !gender || 
//         (testLocation === 'home' && !address) || 
//         (testLocation === 'lab' && !selectedLab)) {
//       toast.error('Please fill all required fields');
//       return;
//     }

//     if (selectedTests.length === 0) {
//       toast.error('Please select at least one test');
//       return;
//     }

//     const bookingData = {
//       name,
//       age,
//       gender,
//       location: testLocation,
//       selectedLab,
//       address,
//       date,
//       time,
//       tests: selectedTests,
//     };

//   //   try {
//   //     const response = await fetch('/api/lab/bookings', {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify(bookingData),
//   //     });

//   //     if (!response.ok) throw new Error('Booking failed');

//   //     toast.success('Lab tests booked successfully!');
//   //     navigate('/dashboard');
//   //   } catch (error) {
//   //     console.error(error);
//   //     toast.error('Something went wrong while booking.');
//   //   }
//   // };
//     try {
//       const { error } = await supabase.from('lab_test_bookings').insert([
//         {
//           name,
//           age: Number(age),
//           gender,
//           location: testLocation,
//           selected_lab: testLocation === 'lab' ? selectedLab : null,
//           address: testLocation === 'home' ? address : null,
//           date,
//           time,
//           tests: selectedTests,
//           total_price: calculateTotal(),
//           created_at: new Date().toISOString(), // optional
//         }
//       ]);

//       if (error) throw error;

//       toast.success('Lab tests booked successfully!');
//       navigate('/dashboard');
//     } catch (error) {
//       console.error(error);
//       toast.error('Something went wrong while booking.');
//     }

//   const filteredTests = testLocation === 'home'
//     ? labTests.all.filter((test) => test.homeAvailable)
//     : labTests.all;

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-3xl font-semibold mb-6">Book Lab Tests</h2>

//       <div className="mb-6">
//         <div className="flex space-x-4 mb-4">
//           <button
//             type="button"
//             onClick={() => setTestLocation('lab')}
//             className={`flex items-center px-4 py-2 rounded-md ${
//               testLocation === 'lab' ? 'bg-blue-500 text-white' : 'bg-gray-100'
//             }`}
//           >
//             <Building2 className="mr-2" />
//             Lab Visit
//           </button>
//           <button
//             type="button"
//             onClick={() => setTestLocation('home')}
//             className={`flex items-center px-4 py-2 rounded-md ${
//               testLocation === 'home' ? 'bg-blue-500 text-white' : 'bg-gray-100'
//             }`}
//           >
//             <Home className="mr-2" />
//             Home Collection
//           </button>
//         </div>

//         {testLocation === 'lab' && (
//           <div>
//             <label className="block mb-2">Select Lab Location</label>
//             <select
//               value={selectedLab || ''}
//               onChange={(e) => setSelectedLab(Number(e.target.value))}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             >
//               <option value="">Choose a Lab</option>
//               {labs.map((lab) => (
//                 <option key={lab.id} value={lab.id}>
//                   {lab.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block mb-2">Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-2">Age</label>
//             <input
//               type="number"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-2">Gender</label>
//             <select
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//         </div>

//         {testLocation === 'home' && (
//           <div>
//             <label className="block mb-2">Address for Home Collection</label>
//             <input
//               type="text"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-2">Select Date</label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               min={new Date().toISOString().split('T')[0]}
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-2">Select Time</label>
//             <select
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             >
//               <option value="">Choose a Time Slot</option>
//               {timeSlots.map((slot, index) => (
//                 <option key={index} value={slot}>
//                   {slot}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-xl font-semibold mb-4">Available Tests</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {filteredTests.map((test) => (
//               <motion.div
//                 key={test.id}
//                 onClick={() => handleTestSelection(test.id)}
//                 className={`cursor-pointer p-4 border rounded-lg ${
//                   selectedTests.includes(test.id)
//                     ? 'border-blue-500 bg-blue-100'
//                     : 'border-gray-300'
//                 }`}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <h4 className="font-medium">{test.name}</h4>
//                 <p className="text-gray-600">Price: ₹{test.price}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         <div className="text-xl font-semibold mt-6">
//           Total Price: ₹{calculateTotal()}
//         </div>

//         <button
//           type="submit"
//           className="w-full py-3 mt-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//         >
//           Book Tests
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LabTests;

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Home, Building2 } from 'lucide-react';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../supabase'; // ✅ Ensure this file exports the Supabase client

// const labTests = {
//   all: [
//     { id: 1, name: 'Complete Blood Count (CBC)', price: 500, homeAvailable: true },
//     { id: 2, name: 'Lipid Profile', price: 800, homeAvailable: true },
//     { id: 3, name: 'Thyroid Profile', price: 1200, homeAvailable: true },
//     { id: 4, name: 'Diabetes Panel', price: 1000, homeAvailable: true },
//     { id: 5, name: 'Liver Function Test', price: 1500, homeAvailable: true },
//     { id: 6, name: 'Kidney Function Test', price: 1500, homeAvailable: true },
//     { id: 7, name: 'COVID-19 RT-PCR', price: 2000, homeAvailable: true },
//     { id: 8, name: 'Vitamin D Test', price: 1800, homeAvailable: true },
//     { id: 9, name: 'Vitamin B12 Test', price: 1200, homeAvailable: true },
//     { id: 10, name: 'ECG', price: 500, homeAvailable: false },
//     { id: 11, name: 'X-Ray Chest', price: 800, homeAvailable: false },
//     { id: 12, name: 'MRI Brain', price: 8000, homeAvailable: false },
//     { id: 13, name: 'CT Scan', price: 5000, homeAvailable: false },
//     { id: 14, name: 'Ultrasound', price: 2000, homeAvailable: false },
//     { id: 15, name: 'Bone Density Test', price: 2500, homeAvailable: false },
//   ],
// };

// const labs = [
//   { id: 1, name: 'Delhi Lab 1' },
//   { id: 2, name: 'Delhi Lab 2' },
//   { id: 3, name: 'Delhi Lab 3' },
//   { id: 4, name: 'Delhi Lab 4' },
// ];

// const timeSlots = Array.from({ length: 12 }, (_, i) => `${8 + i}:00 AM`);

// const LabTests: React.FC = () => {
//   const navigate = useNavigate();
//   const [selectedTests, setSelectedTests] = useState<number[]>([]);
//   const [testLocation, setTestLocation] = useState<'home' | 'lab'>('lab');
//   const [selectedLab, setSelectedLab] = useState<number | null>(null);
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [address, setAddress] = useState('');

//   const handleTestSelection = (testId: number) => {
//     setSelectedTests((prev) =>
//       prev.includes(testId)
//         ? prev.filter((id) => id !== testId)
//         : [...prev, testId]
//     );
//   };

//   const calculateTotal = () => {
//     return selectedTests.reduce((total, testId) => {
//       const test = labTests.all.find((t) => t.id === testId);
//       return total + (test?.price || 0);
//     }, 0);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!date || !time || !name || !age || !gender ||
//         (testLocation === 'home' && !address) ||
//         (testLocation === 'lab' && !selectedLab)) {
//       toast.error('Please fill all required fields');
//       return;
//     }

//     if (selectedTests.length === 0) {
//       toast.error('Please select at least one test');
//       return;
//     }

//     const bookingData = {
//       name,
//       age: parseInt(age),
//       gender,
//       location: testLocation,
//       // selected_lab: testLocation === 'lab' ? selectedLab : null,
//       // address: testLocation === 'home' ? address : null,
//       date,
//       time,
//       tests: selectedTests,
//       total_price: calculateTotal(),
//       created_at: new Date().toISOString(),
//     };

//     try {
//       const { error } = await supabase.from('Lab_Test').insert([bookingData]);

//       if (error) {
//         console.error("❌ Supabase Insert Error:", error.message, error.details);
//         toast.error(`Supabase Error: ${error.message}`);
//         return;
//       }

//       toast.success('Lab tests booked successfully!');
//       navigate('/dashboard');
//     } catch (err: any) {
//       console.error("❌ Unexpected Error:", err);
//       toast.error('Something went wrong while booking.');
//     }
//   };

//   const filteredTests = testLocation === 'home'
//     ? labTests.all.filter((test) => test.homeAvailable)
//     : labTests.all;

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-3xl font-semibold mb-6">Book Lab Tests</h2>

//       <div className="mb-6">
//         <div className="flex space-x-4 mb-4">
//           <button
//             type="button"
//             onClick={() => setTestLocation('lab')}
//             className={`flex items-center px-4 py-2 rounded-md ${testLocation === 'lab' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
//           >
//             <Building2 className="mr-2" />
//             Lab Visit
//           </button>
//           <button
//             type="button"
//             onClick={() => setTestLocation('home')}
//             className={`flex items-center px-4 py-2 rounded-md ${testLocation === 'home' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
//           >
//             <Home className="mr-2" />
//             Home Collection
//           </button>
//         </div>

//         {testLocation === 'lab' && (
//           <div>
//             <label className="block mb-2">Select Lab Location</label>
//             <select
//               value={selectedLab || ''}
//               onChange={(e) => setSelectedLab(Number(e.target.value))}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               required
//             >
//               <option value="">Choose a Lab</option>
//               {labs.map((lab) => (
//                 <option key={lab.id} value={lab.id}>
//                   {lab.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Name" required />
//           <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Age" required />
//           <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" required>
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         {testLocation === 'home' && (
//           <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Address for Home Collection" required />
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" min={new Date().toISOString().split('T')[0]} required />
//           <select value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" required>
//             <option value="">Choose a Time Slot</option>
//             {timeSlots.map((slot, index) => (
//               <option key={index} value={slot}>{slot}</option>
//             ))}
//           </select>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-xl font-semibold mb-4">Available Tests</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {filteredTests.map((test) => (
//               <motion.div
//                 key={test.id}
//                 onClick={() => handleTestSelection(test.id)}
//                 className={`cursor-pointer p-4 border rounded-lg ${selectedTests.includes(test.id) ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <h4 className="font-medium">{test.name}</h4>
//                 <p className="text-gray-600">Price: ₹{test.price}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         <div className="text-xl font-semibold mt-6">
//           Total Price: ₹{calculateTotal()}
//         </div>

//         <button type="submit" className="w-full py-3 mt-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
//           Book Tests
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LabTests;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Building2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const labTests = {
  all: [
    { id: 1, name: 'Complete Blood Count (CBC)', price: 500, homeAvailable: true },
    { id: 2, name: 'Lipid Profile', price: 800, homeAvailable: true },
    { id: 3, name: 'Thyroid Profile', price: 1200, homeAvailable: true },
    { id: 4, name: 'Diabetes Panel', price: 1000, homeAvailable: true },
    { id: 5, name: 'Liver Function Test', price: 1500, homeAvailable: true },
    { id: 6, name: 'Kidney Function Test', price: 1500, homeAvailable: true },
    { id: 7, name: 'COVID-19 RT-PCR', price: 2000, homeAvailable: true },
    { id: 8, name: 'Vitamin D Test', price: 1800, homeAvailable: true },
    { id: 9, name: 'Vitamin B12 Test', price: 1200, homeAvailable: true },
    { id: 10, name: 'ECG', price: 500, homeAvailable: false },
    { id: 11, name: 'X-Ray Chest', price: 800, homeAvailable: false },
    { id: 12, name: 'MRI Brain', price: 8000, homeAvailable: false },
    { id: 13, name: 'CT Scan', price: 5000, homeAvailable: false },
    { id: 14, name: 'Ultrasound', price: 2000, homeAvailable: false },
    { id: 15, name: 'Bone Density Test', price: 2500, homeAvailable: false },
  ],
};

const labs = [
  { id: 1, name: 'Delhi Lab 1' },
  { id: 2, name: 'Delhi Lab 2' },
  { id: 3, name: 'Delhi Lab 3' },
  { id: 4, name: 'Delhi Lab 4' },
];

const timeSlots = Array.from({ length: 12 }, (_, i) => `${8 + i}:00 AM`);

const LabTests: React.FC = () => {
  const navigate = useNavigate();

  const [selectedTests, setSelectedTests] = useState<number[]>([]);
  const [testLocation, setTestLocation] = useState<'home' | 'lab'>('lab');
  const [selectedLab, setSelectedLab] = useState<number | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');

  const handleTestSelection = (testId: number) => {
    setSelectedTests((prevSelected) =>
      prevSelected.includes(testId)
        ? prevSelected.filter((id) => id !== testId)
        : [...prevSelected, testId]
    );
  };

  const calculateTotal = () => {
    return selectedTests.reduce((total, testId) => {
      const test = labTests.all.find((t) => t.id === testId);
      return total + (test?.price || 0);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !time || !name || !age || !gender ||
        (testLocation === 'home' && !address) ||
        (testLocation === 'lab' && !selectedLab)) {
      return toast.error('Please fill all required fields');
    }

    if (selectedTests.length === 0) {
      return toast.error('Please select at least one test');
    }

    const bookingData = {
      name,
      age: parseInt(age, 10),
      gender,
      location: testLocation,
      date,
      time,
      tests: selectedTests, // ✅ this is now a valid JS array (e.g., [1, 6, 9])
      total_price: calculateTotal(),
      created_at: new Date().toISOString(),
    };

    try {
      const { error } = await supabase
        .from('Lab_Test') // Make sure this matches the exact table name
        .insert([bookingData]);

      if (error) {
        console.error('🔴 Supabase Error:', error);
        toast.error(`Supabase Error: ${error.message}`);
        return;
      }

      toast.success('Lab tests booked successfully!');
      navigate('/dashboard');
    } catch (err: any) {
      console.error('🔴 Unexpected Error:', err);
      toast.error(`Unexpected error: ${err.message || err}`);
    }
  };



  const filteredTests = testLocation === 'home'
    ? labTests.all.filter((test) => test.homeAvailable)
    : labTests.all;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6">Book Lab Tests</h2>

      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            onClick={() => setTestLocation('lab')}
            className={`flex items-center px-4 py-2 rounded-md ${testLocation === 'lab' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          >
            <Building2 className="mr-2" />
            Lab Visit
          </button>
          <button
            type="button"
            onClick={() => setTestLocation('home')}
            className={`flex items-center px-4 py-2 rounded-md ${testLocation === 'home' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          >
            <Home className="mr-2" />
            Home Collection
          </button>
        </div>

        {testLocation === 'lab' && (
          <div>
            <label className="block mb-2">Select Lab Location</label>
            <select
              value={selectedLab || ''}
              onChange={(e) => setSelectedLab(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Choose a Lab</option>
              {labs.map((lab) => (
                <option key={lab.id} value={lab.id}>
                  {lab.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {testLocation === 'home' && (
          <div>
            <label className="block mb-2">Address for Home Collection</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Select Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div>
            <label className="block mb-2">Select Time</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Choose a Time Slot</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Available Tests</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredTests.map((test) => (
              <motion.div
                key={test.id}
                onClick={() => handleTestSelection(test.id)}
                className={`cursor-pointer p-4 border rounded-lg ${
                  selectedTests.includes(test.id)
                    ? 'border-blue-500 bg-blue-100'
                    : 'border-gray-300'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <h4 className="font-medium">{test.name}</h4>
                <p className="text-gray-600">Price: ₹{test.price}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-xl font-semibold mt-6">
          Total Price: ₹{calculateTotal()}
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Book Tests
        </button>
      </form>
    </div>
  );
};

export default LabTests;
