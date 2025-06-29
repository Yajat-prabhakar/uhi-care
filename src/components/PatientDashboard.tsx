// import React, { useState, useEffect } from 'react';
// import { Calendar, Activity, MapPin, User } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
// import { toast } from 'react-toastify';
// import { supabase } from '../supabase';

// const PatientDashboard = () => {
//   const { addToCart } = useCart();

//   const [appointments, setAppointments] = useState<any[]>([]);
//   const [prescriptionAvailable, setPrescriptionAvailable] = useState(false);
//   const [prescriptionDownloaded, setPrescriptionDownloaded] = useState(false);
//   const [labTestsFetched, setLabTestsFetched] = useState(false);
//   const [userProfile, setUserProfile] = useState<any>(null);

//   useEffect(() => {
//     const alreadyFetched = localStorage.getItem('patientDashboardFetched');

//     const fetchUserData = async () => {
//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();

//       if (userError || !user) {
//         console.error('Error fetching user:', userError);
//         toast.error('Unable to get user info');
//         return;
//       }

//       setUserProfile({
//         name: user.user_metadata?.full_name || 'Patient',
//         email: user.email,
//       });
//     };

//     fetchUserData();

//     if (!alreadyFetched) {
//       setTimeout(() => {
//         setPrescriptionAvailable(true);
//         setLabTestsFetched(true);
//         fetchAppointments();
//         toast.info("Prescription and Lab tests fetched.");
//         localStorage.setItem('patientDashboardFetched', 'true');
//       }, 1000);
//     } else {
//       setPrescriptionAvailable(true);
//       setLabTestsFetched(true);
//       fetchAppointments();
//     }
//   }, []);

//   const fetchAppointments = async () => {
//     try {
//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();

//       if (userError || !user) {
//         console.error('Error fetching user:', userError);
//         toast.error('Unable to get user info');
//         return;
//       }

//       const { data, error } = await supabase
//         .from('Appointments')
//         .select('*')
//         .eq('email', user.email)
//         .order('date', { ascending: true });

//       if (error) {
//         console.error(error);
//         toast.error('Failed to fetch appointments');
//       } else {
//         setAppointments(data);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to fetch appointments');
//     }
//   };

//   const handleCancelAppointment = async (appointmentId: number) => {
//     try {
//       const { error } = await supabase
//         .from('Appointments')
//         .delete()
//         .eq('id', appointmentId);

//       if (error) {
//         console.error(error);
//         toast.error('Failed to cancel appointment');
//       } else {
//         setAppointments(prev => prev.filter(appt => appt.id !== appointmentId));
//         toast.success('Appointment cancelled successfully');
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error('Error cancelling appointment');
//     }
//   };

//   const downloadPrescription = async () => {
//     try {
//       const response = await fetch('/prescription.pdf');
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);

//       const link = document.createElement('a');
//       link.href = url;
//       link.download = 'prescription.pdf';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);

//       setPrescriptionDownloaded(true);
//       toast.success('Prescription downloaded!');
//     } catch (err) {
//       console.error('Failed to download prescription:', err);
//       toast.error('Failed to download prescription.');
//     }
//   };

//   const orderMedicines = () => {
//     const prescriptionMeds = [
//       { id: 1, name: 'Angispan TR 2.5mg', price: 50, type: 'medicine', requiresPrescription: false },
//       { id: 2, name: 'Nicodil 5', price: 120, type: 'medicine', requiresPrescription: false },
//       { id: 3, name: 'Dytor Plus 10', price: 85, type: 'medicine', requiresPrescription: false },
//       { id: 4, name: 'Lipvas 40', price: 45, type: 'medicine', requiresPrescription: false }
//     ];
//     prescriptionMeds.forEach(med => addToCart(med));
//     toast.success('Prescription medicines added to cart!');
//   };

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 p-6">
//       <h2 className="text-3xl font-bold">Patient Dashboard</h2>

//       {/* Profile Card */}
//       <motion.div whileHover={{ scale: 1.01 }} className="bg-white p-6 rounded-lg shadow-md flex gap-6 items-center">
//         <User className="w-16 h-16 text-yellow-500" />
//         <div>
//           <h3 className="text-xl font-bold">{userProfile?.name || 'Patient'}</h3>
//           <p>Email: {userProfile?.email}</p>
//         </div>
//       </motion.div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Appointments */}
//         <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-lg shadow-md">
//           <Calendar className="w-8 h-8 text-blue-500 mb-2" />
//           <h3 className="text-xl font-semibold mb-2">Upcoming Appointments</h3>
//           {appointments.length === 0 ? (
//             <p className="text-gray-500">No upcoming appointments</p>
//           ) : (
//             appointments.map(appt => (
//               <div key={appt.id} className="mb-4 border-b pb-2">
//                 <p className="font-semibold">{appt.doctor_name} - {appt.specialty}</p>
//                 <p className="text-sm text-gray-600">{appt.date} at {appt.time}</p>
//                 <div className="flex flex-col gap-1 mt-1">
//                   {appt.preferred_mode === 'video' ? (
//                     <Link 
//                       to={'https://uhivc.netlify.app/'}
//                       className="text-green-600 hover:underline text-sm w-fit"
//                     >
//                       Join Video Call
//                     </Link>
//                   ) : appt.preferred_mode === 'in-person' ? (
//                     <a
//                       href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(appt.location || 'hospital')}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 hover:underline text-sm w-fit"
//                     >
//                       View on Map
//                     </a>
//                   ) : null}
//                   <button
//                     onClick={() => handleCancelAppointment(appt.id)}
//                     className="text-red-500 hover:underline text-sm w-fit"
//                   >
//                     Cancel Appointment
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </motion.div>

//         {/* Prescription */}
//         <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-lg shadow-md">
//           <Activity className="w-8 h-8 text-blue-500 mb-2" />
//           <h3 className="text-xl font-semibold mb-2">Prescription</h3>
//           {!prescriptionAvailable ? (
//             <p className="text-gray-500">Doctor hasn't sent prescription yet</p>
//           ) : (
//             <div className="space-y-2">
//               <p className="text-sm text-gray-600">Date Issued: 2025-06-05</p>
//               <p className="text-sm text-gray-600">Time: 12:00 PM</p>
//               {!prescriptionDownloaded && (
//                 <button onClick={downloadPrescription} className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//                   Download Prescription
//                 </button>
//               )}
//               <button onClick={orderMedicines} className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
//                 Order Medicines
//               </button>
//             </div>
//           )}
//         </motion.div>

//         {/* Lab Tests */}
//         <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-lg shadow-md">
//           <MapPin className="w-8 h-8 text-blue-500 mb-2" />
//           <h3 className="text-xl font-semibold mb-2">Upcoming Lab Tests</h3>
//           {!labTestsFetched ? (
//             <p className="text-gray-500">No lab tests booked</p>
//           ) : (
//             <>
//               <p className="text-gray-700">2 tests scheduled at <strong>HOD</strong></p>
//               <p className="text-sm text-gray-600">Date: 2025-06-16</p>
//               <p className="text-sm text-gray-600">Time: 12:00 PM</p>
//               <a
//                 href="https://www.google.com/maps/dir//HOD+Blood+Test+Centre,+Shop+No-1,+Ground+Floor,+C-1%2F49,+Sector+5,+Rohini,+New+Delhi,+Delhi+110085"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 View on Google Maps
//               </a>
//             </>
//           )}
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default PatientDashboard;

import React, { useState, useEffect } from 'react';
import { Calendar, Activity, MapPin, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { supabase } from '../supabase';

const PatientDashboard = () => {
  const { addToCart } = useCart();

  const [appointments, setAppointments] = useState<any[]>([]);
  const [prescriptionAvailable, setPrescriptionAvailable] = useState(false);
  const [prescriptionDownloaded, setPrescriptionDownloaded] = useState(false);
  const [labTestsFetched, setLabTestsFetched] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const alreadyFetched = localStorage.getItem('patientDashboardFetched');

    const fetchUserData = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('Error fetching user:', userError);
        toast.error('Unable to get user info');
        return;
      }

      setUserProfile({
        name: user.user_metadata?.full_name || 'Patient',
        email: user.email,
      });
    };

    fetchUserData();

    if (!alreadyFetched) {
      setTimeout(() => {
        setPrescriptionAvailable(true);
        setLabTestsFetched(true);
        fetchAppointments();
        toast.info('Prescription and Lab tests fetched.');
        localStorage.setItem('patientDashboardFetched', 'true');
      }, 1000);
    } else {
      setPrescriptionAvailable(true);
      setLabTestsFetched(true);
      fetchAppointments();
    }
  }, []);

  const fetchAppointments = async () => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('Error fetching user:', userError);
        toast.error('Unable to get user info');
        return;
      }

      const { data: appointmentsData, error } = await supabase
        .from('Appointments')
        .select('*')
        .eq('email', user.email)
        .order('date', { ascending: true });

      if (error) {
        console.error(error);
        toast.error('Failed to fetch appointments');
        return;
      }

      // For each appointment, fetch the VC ID from the doctors table
      const enrichedAppointments = await Promise.all(
        appointmentsData.map(async (appt: any) => {
          const { data: doctorData, error: doctorError } = await supabase
            .from('doctors')
            .select('vc')
            .eq('full_name', appt.doctor_name)
            .single();

          if (doctorError) {
            console.warn(`Could not fetch VC ID for doctor ${appt.doctor_name}`);
            return appt;
          }

          return { ...appt, doctorVC: doctorData?.vc };
        })
      );

      setAppointments(enrichedAppointments);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch appointments');
    }
  };

  const handleCancelAppointment = async (appointmentId: number) => {
    try {
      const { error } = await supabase
        .from('Appointments')
        .delete()
        .eq('id', appointmentId);

      if (error) {
        console.error(error);
        toast.error('Failed to cancel appointment');
      } else {
        setAppointments(prev => prev.filter(appt => appt.id !== appointmentId));
        toast.success('Appointment cancelled successfully');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error cancelling appointment');
    }
  };

  const downloadPrescription = async () => {
    try {
      const response = await fetch('/prescription.pdf');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'prescription.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setPrescriptionDownloaded(true);
      toast.success('Prescription downloaded!');
    } catch (err) {
      console.error('Failed to download prescription:', err);
      toast.error('Failed to download prescription.');
    }
  };

  const orderMedicines = () => {
    const prescriptionMeds = [
      { id: 1, name: 'Angispan TR 2.5mg', price: 50, type: 'medicine', requiresPrescription: false },
      { id: 2, name: 'Nicodil 5', price: 120, type: 'medicine', requiresPrescription: false },
      { id: 3, name: 'Dytor Plus 10', price: 85, type: 'medicine', requiresPrescription: false },
      { id: 4, name: 'Lipvas 40', price: 45, type: 'medicine', requiresPrescription: false }
    ];
    prescriptionMeds.forEach(med => addToCart(med));
    toast.success('Prescription medicines added to cart!');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 p-6">
      <h2 className="text-3xl font-bold">Patient Dashboard</h2>

      {/* Profile Card */}
      <motion.div whileHover={{ scale: 1.01 }} className="bg-white p-6 rounded-lg shadow-md flex gap-6 items-center">
        <User className="w-16 h-16 text-yellow-500" />
        <div>
          <h3 className="text-xl font-bold">{userProfile?.name || 'Patient'}</h3>
          <p>Email: {userProfile?.email}</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Appointments */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-lg shadow-md">
          <Calendar className="w-8 h-8 text-blue-500 mb-2" />
          <h3 className="text-xl font-semibold mb-2">Upcoming Appointments</h3>
          {appointments.length === 0 ? (
            <p className="text-gray-500">No upcoming appointments</p>
          ) : (
            appointments.map(appt => (
              <div key={appt.id} className="mb-4 border-b pb-2">
                <p className="font-semibold">
                  {appt.doctor_name} - {appt.specialty}
                </p>
                {appt.doctorVC && (
                  <p className="text-sm text-gray-600">VC ID: {appt.doctorVC}</p>
                )}
                <p className="text-sm text-gray-600">
                  {appt.date} at {appt.time}
                </p>
                <div className="flex flex-col gap-1 mt-1">
                  {appt.preferred_mode === 'video' ? (
                    <Link
                      to="https://uhivc.netlify.app/"
                      className="text-green-600 hover:underline text-sm w-fit"
                    >
                      Join Video Call
                    </Link>
                  ) : appt.preferred_mode === 'in-person' ? (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        appt.location || 'hospital'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm w-fit"
                    >
                      View on Map
                    </a>
                  ) : null}
                  <button
                    onClick={() => handleCancelAppointment(appt.id)}
                    className="text-red-500 hover:underline text-sm w-fit"
                  >
                    Cancel Appointment
                  </button>
                </div>
              </div>
            ))
          )}
        </motion.div>

        {/* Prescription */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-lg shadow-md">
          <Activity className="w-8 h-8 text-blue-500 mb-2" />
          <h3 className="text-xl font-semibold mb-2">Prescription</h3>
          {!prescriptionAvailable ? (
            <p className="text-gray-500">Doctor hasn't sent prescription yet</p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Date Issued: 2025-06-05</p>
              <p className="text-sm text-gray-600">Time: 12:00 PM</p>
              {!prescriptionDownloaded && (
                <button
                  onClick={downloadPrescription}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Download Prescription
                </button>
              )}
              <button
                onClick={orderMedicines}
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Order Medicines
              </button>
            </div>
          )}
        </motion.div>

        {/* Lab Tests */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-lg shadow-md">
          <MapPin className="w-8 h-8 text-blue-500 mb-2" />
          <h3 className="text-xl font-semibold mb-2">Upcoming Lab Tests</h3>
          {!labTestsFetched ? (
            <p className="text-gray-500">No lab tests booked</p>
          ) : (
            <>
              <p className="text-gray-700">2 tests scheduled at <strong>HOD</strong></p>
              <p className="text-sm text-gray-600">Date: 2025-06-16</p>
              <p className="text-sm text-gray-600">Time: 12:00 PM</p>
              <a
                href="https://www.google.com/maps/dir//HOD+Blood+Test+Centre,+Shop+No-1,+Ground+Floor,+C-1%2F49,+Sector+5,+Rohini,+New+Delhi,+Delhi+110085"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View on Google Maps
              </a>
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PatientDashboard;

