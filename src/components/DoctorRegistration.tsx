// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { supabase } from '../supabase';

// function DoctorRegistration() {
//   const navigate = useNavigate();

//   const [basicInfo, setBasicInfo] = useState({
//     full_name: '',
//     email: '',
//     contact_number: '',
//     password: '',
//     specialization: '',
//     registration_number: '',
//     bio: '',
//     certifications_url: '', // New field for certifications URL
//     experience_certificates_url: '', // New field for experience certificate URL
//     qualifications: '', // New field for qualifications
//     other_certifications: '', // New field for other certifications
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setBasicInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const doctorData = {
//       ...basicInfo,
//       availability_status: 'Available',
//       rating: '0',
//       verified: 'false',
//       created_at: new Date().toISOString(),
//     };

//     const { error } = await supabase.from('doctors').insert([doctorData]);

//     if (error) {
//       toast.error('Registration failed. Please try again.');
//       console.error(error);
//     } else {
//       toast.success('Registration submitted! Awaiting admin verification.');
//       navigate('/signin');
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6">Doctor Registration</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {[ 
//           { label: 'Full Name', name: 'full_name', type: 'text' },
//           { label: 'Email', name: 'email', type: 'email' },
//           { label: 'Phone', name: 'contact_number', type: 'tel' },
//           { label: 'Password', name: 'password', type: 'password' },
//           { label: 'Specialization', name: 'specialization', type: 'text' },
//           { label: 'Medical Registration Number', name: 'registration_number', type: 'text' },
//           { label: 'Qualifications', name: 'qualifications', type: 'text' }, // New field for qualifications
//           { label: 'Other Certifications', name: 'other_certifications', type: 'text' }, // New field for other certifications
//           { label: 'Certifications URL', name: 'certifications_url', type: 'text' }, // New field for certifications URL
//           { label: 'Experience Certificates URL', name: 'experience_certificates_url', type: 'text' }, // New field for experience certificates URL
//         ].map((field) => (
//           <div key={field.name}>
//             <label className="block mb-1">{field.label} *</label>
//             <input
//               type={field.type}
//               name={field.name}
//               value={(basicInfo as any)[field.name]}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>
//         ))}

//         <div>
//           <label className="block mb-1">Professional Bio *</label>
//           <textarea
//             name="bio"
//             value={basicInfo.bio}
//             onChange={handleChange}
//             rows={4}
//             required
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
//         >
//           Submit Registration
//         </button>
//       </form>
//     </div>
//   );
// }

// export default DoctorRegistration;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { supabase } from '../supabase';

function DoctorRegistration() {
  const navigate = useNavigate();

  const [basicInfo, setBasicInfo] = useState({
    full_name: '',
    email: '',
    contact_number: '',
    password: '',
    specialization: '',
    registration_number: '',
    qualifications: '',
    other_certifications: '',
    bio: '',
    hospital: '', // ✅ New
    certifications_url: '',
    experience_certificates_url: ''
  });

  // 📦 Handle normal input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBasicInfo((prev) => ({ ...prev, [name]: value }));
  };

  // 📂 Handle PDF uploads
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'certifications_url' | 'experience_certificates_url'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const filePath = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from('certificates') // ✅ Bucket name
      .upload(filePath, file);

    if (error) {
      toast.error('Failed to upload file.');
      console.error(error);
    } else {
      const publicUrl = supabase.storage
        .from('certificates')
        .getPublicUrl(filePath).data.publicUrl;

      setBasicInfo((prev) => ({ ...prev, [field]: publicUrl }));
      toast.success('File uploaded successfully!');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const doctorData = {
      ...basicInfo,
      availability_status: 'Available',
      rating: '0',
      verified: 'false',
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('doctors').insert([doctorData]);

    if (error) {
      toast.error('Registration failed. Please try again.');
      console.error(error);
    } else {
      toast.success('Registration submitted! Awaiting admin verification.');
      navigate('/signin');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Doctor Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Full Name', name: 'full_name', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Phone', name: 'contact_number', type: 'tel' },
          { label: 'Password', name: 'password', type: 'password' },
          { label: 'Specialization', name: 'specialization', type: 'text' },
          { label: 'Medical Registration Number', name: 'registration_number', type: 'text' },
          { label: 'Qualifications', name: 'qualifications', type: 'text' },
          { label: 'Other Certifications', name: 'other_certifications', type: 'text' },
          { label: 'Hospital/Clinic Name', name: 'hospital', type: 'text' } // ✅ New
        ].map((field) => (
          <div key={field.name}>
            <label className="block mb-1">{field.label} *</label>
            <input
              type={field.type}
              name={field.name}
              value={(basicInfo as any)[field.name]}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        ))}

        {/* PDF Upload Fields */}
        <div>
          <label className="block mb-1">Certifications PDF *</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileUpload(e, 'certifications_url')}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1">Experience Certificates PDF *</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileUpload(e, 'experience_certificates_url')}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1">Professional Bio *</label>
          <textarea
            name="bio"
            value={basicInfo.bio}
            onChange={handleChange}
            rows={4}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
        >
          Submit Registration
        </button>
      </form>
    </div>
  );
}

export default DoctorRegistration;
