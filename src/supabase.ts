// // // // import { createClient } from "@supabase/supabase-js";

// // // // // Replace with your Supabase project URL and public anon key
// // // // const supabaseUrl = "https://ymqxfnxyacyihvycnqfy.supabase.co";
// // // // const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltcXhmbnh5YWN5aWh2eWNucWZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3OTM2NjgsImV4cCI6MjA2MjM2OTY2OH0.tN4WJ0P0ocNkBkoqJIOe1sSBw46PCZly5T0k7tvzv30";

// // // // export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// // // // // ========== Database Functions ==========

// // // // // ✅ 1. Book Appointment
// // // // export async function bookAppointment(appointmentData: any) {
// // // //   const { data, error } = await supabase
// // // //     .from("Appointments")
// // // //     .insert([appointmentData]);
// // // //   if (error) throw error;
// // // //   return data;
// // // // }

// // // // // ✅ 2. Get Appointments
// // // // export async function fetchAppointments() {
// // // //   const { data, error } = await supabase.from("Appointments").select("*");
// // // //   if (error) throw error;
// // // //   return data;
// // // // }

// // // // // ✅ 3. Register User (Auth)
// // // // export async function registerUser(email: string, password: string) {
// // // //   const { data, error } = await supabase.auth.signUp({ email, password });
// // // //   if (error) throw error;
// // // //   return data;
// // // // }

// // // // // ✅ 4. Login User (Auth)
// // // // export async function loginUser(email: string, password: string) {
// // // //   const { data, error } = await supabase.auth.signInWithPassword({
// // // //     email,
// // // //     password,
// // // //   });
// // // //   if (error) throw error;
// // // //   return data;
// // // // }

// // // // // ✅ 5. Logout
// // // // export async function logoutUser() {
// // // //   const { error } = await supabase.auth.signOut();
// // // //   if (error) throw error;
// // // // }

// // // // // ✅ 6. Add Lab Test
// // // // export async function addLabTest(testData: any) {
// // // //   const { data, error } = await supabase.from("Lab_Test").insert([testData]);
// // // //   if (error) throw error;
// // // //   return data;
// // // // }

// // // // // ✅ 7. Fetch Lab Tests
// // // // export async function fetchLabTests() {
// // // //   const { data, error } = await supabase.from("Lab_Test").select("*");
// // // //   if (error) throw error;
// // // //   return data;
// // // // }

// // // // // ✅ 8. Register Doctor
// // // // export async function registerDoctor(doctorData: {
// // // //   full_name: string;
// // // //   email: string;
// // // //   contact_number: string;
// // // //   password: string;
// // // //   specialization: string;
// // // //   registration_number: string;
// // // //   bio: string;
// // // // }) {
// // // //   const { data, error } = await supabase.from("doctors").insert([
// // // //     {
// // // //       ...doctorData,
// // // //       availability_status: "Available",
// // // //       rating: "0",
// // // //       verified: "false"
// // // //     }
// // // //   ]);
// // // //   if (error) throw error;
// // // //   return data;
// // // // }

// // // import { createClient } from "@supabase/supabase-js";

// // // // ✅ Fetching Supabase credentials from .env
// // // const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// // // const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// // // export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// // // // ========== Database Functions ==========

// // // // ✅ 1. Book Appointment
// // // export async function bookAppointment(appointmentData: any) {
// // //   const { data, error } = await supabase
// // //     .from("Appointments")
// // //     .insert([appointmentData]);
// // //   if (error) throw error;
// // //   return data;
// // // }

// // // // ✅ 2. Get Appointments
// // // export async function fetchAppointments() {
// // //   const { data, error } = await supabase.from("Appointments").select("*");
// // //   if (error) throw error;
// // //   return data;
// // // }

// // // // ✅ 3. Register User (Auth)
// // // export async function registerUser(email: string, password: string) {
// // //   const { data, error } = await supabase.auth.signUp({ email, password });
// // //   if (error) throw error;
// // //   return data;
// // // }

// // // // ✅ 4. Login User (Auth)
// // // export async function loginUser(email: string, password: string) {
// // //   const { data, error } = await supabase.auth.signInWithPassword({
// // //     email,
// // //     password,
// // //   });
// // //   if (error) throw error;
// // //   return data;
// // // }

// // // // ✅ 5. Logout
// // // export async function logoutUser() {
// // //   const { error } = await supabase.auth.signOut();
// // //   if (error) throw error;
// // // }

// // // // ✅ 6. Add Lab Test
// // // export async function addLabTest(testData: any) {
// // //   const { data, error } = await supabase.from("Lab_Test").insert([testData]);
// // //   if (error) throw error;
// // //   return data;
// // // }

// // // // ✅ 7. Fetch Lab Tests
// // // export async function fetchLabTests() {
// // //   const { data, error } = await supabase.from("Lab_Test").select("*");
// // //   if (error) throw error;
// // //   return data;
// // // }

// // // // ✅ 8. Register Doctor (extended fields added)
// // // export async function registerDoctor(doctorData: {
// // //   full_name: string;
// // //   email: string;
// // //   contact_number: string;
// // //   password: string;
// // //   specialization: string;
// // //   registration_number: string;
// // //   bio: string;
// // //   qualifications: string;
// // //   other_certifications: string;
// // //   certifications_url: string;
// // //   experience_certificates_url: string;
// // //   hospital: string;
// // // }) {
// // //   const { data, error } = await supabase.from("doctors").insert([
// // //     {
// // //       ...doctorData,
// // //       availability_status: "Available",
// // //       rating: "0",
// // //       verified: "false",
// // //       created_at: new Date().toISOString(),
// // //     },
// // //   ]);
// // //   if (error) throw error;
// // //   return data;
// // // }

// // import { createClient } from "@supabase/supabase-js";

// // // ✅ Fetching Supabase credentials from .env
// // const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// // const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// // export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// // // ========== Database Functions ==========

// // // ✅ 1. Book Appointment
// // export async function bookAppointment(appointmentData: any) {
// //   const { data, error } = await supabase
// //     .from("Appointments")
// //     .insert([appointmentData]);
// //   if (error) throw error;
// //   return data;
// // }

// // // ✅ 2. Get Appointments
// // export async function fetchAppointments() {
// //   const { data, error } = await supabase.from("Appointments").select("*");
// //   if (error) throw error;
// //   return data;
// // }

// // // ✅ 3. Register User (Auth)
// // export async function registerUser(email: string, password: string) {
// //   const { data, error } = await supabase.auth.signUp({ email, password });
// //   if (error) throw error;
// //   return data;
// // }

// // // ✅ 4. Login User (Auth)
// // export async function loginUser(email: string, password: string) {
// //   const { data, error } = await supabase.auth.signInWithPassword({
// //     email,
// //     password,
// //   });
// //   if (error) throw error;
// //   return data;
// // }

// // // ✅ 5. Logout
// // export async function logoutUser() {
// //   const { error } = await supabase.auth.signOut();
// //   if (error) throw error;
// // }

// // // ✅ 6. Add Lab Test
// // export async function addLabTest(testData: any) {
// //   const { data, error } = await supabase.from("Lab_Test").insert([testData]);
// //   if (error) throw error;
// //   return data;
// // }

// // // ✅ 7. Fetch Lab Tests
// // export async function fetchLabTests() {
// //   const { data, error } = await supabase.from("Lab_Test").select("*");
// //   if (error) throw error;
// //   return data;
// // }

// // // ✅ 8. Register Doctor (with email uniqueness check)
// // export async function registerDoctor(doctorData: {
// //   full_name: string;
// //   email: string;
// //   contact_number: string;
// //   password: string;
// //   specialization: string;
// //   registration_number: string;
// //   bio: string;
// //   qualifications: string;
// //   other_certifications: string;
// //   certifications_url: string;
// //   experience_certificates_url: string;
// //   hospital: string;
// // }) {
// //   // 🔍 Step 1: Check if doctor email already exists
// //   const { data: existingDoctor, error: fetchError } = await supabase
// //     .from("doctors")
// //     .select("id")
// //     .eq("email", doctorData.email)
// //     .maybeSingle();

// //   if (fetchError) {
// //     throw new Error("Failed to check existing doctor: " + fetchError.message);
// //   }

// //   if (existingDoctor) {
// //     throw new Error("Doctor with this email already exists.");
// //   }

// //   // ✅ Step 2: Insert new doctor
// //   const { data, error } = await supabase.from("doctors").insert([
// //     {
// //       ...doctorData,
// //       availability_status: "Available",
// //       rating: "0",
// //       verified: "false",
// //       created_at: new Date().toISOString(),
// //     },
// //   ]);

// //   if (error) throw error;
// //   return data;
// // }

// import { createClient } from "@supabase/supabase-js";

// // ✅ Fetching Supabase credentials from .env
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// // ========== Database Functions ==========

// // ✅ 1. Book Appointment
// export async function bookAppointment(appointmentData: any) {
//   const { data, error } = await supabase
//     .from("Appointments")
//     .insert([appointmentData]);
//   if (error) throw error;
//   return data;
// }

// // ✅ 2. Get Appointments
// export async function fetchAppointments() {
//   const { data, error } = await supabase.from("Appointments").select("*");
//   if (error) throw error;
//   return data;
// }

// // ✅ 3. Register User (Auth)
// export async function registerUser(email: string, password: string) {
//   const { data, error } = await supabase.auth.signUp({ email, password });
//   if (error) throw error;
//   return data;
// }

// // ✅ 4. Login User (Auth)
// export async function loginUser(email: string, password: string) {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });
//   if (error) throw error;
//   return data;
// }

// // ✅ 5. Logout
// export async function logoutUser() {
//   const { error } = await supabase.auth.signOut();
//   if (error) throw error;
// }

// // ✅ 6. Add Lab Test
// export async function addLabTest(testData: any) {
//   const { data, error } = await supabase.from("Lab_Test").insert([testData]);
//   if (error) throw error;
//   return data;
// }

// // ✅ 7. Fetch Lab Tests
// export async function fetchLabTests() {
//   const { data, error } = await supabase.from("Lab_Test").select("*");
//   if (error) throw error;
//   return data;
// }

// // ✅ 8. Register Doctor (with email uniqueness check)
// export async function registerDoctor(doctorData: {
//   full_name: string;
//   email: string;
//   contact_number: string;
//   password: string;
//   specialization: string;
//   registration_number: string;
//   bio: string;
//   qualifications: string;
//   other_certifications: string;
//   certifications_url: string;
//   experience_certificates_url: string;
//   hospital: string;
// }) {
//   // 🔍 Step 1: Check if doctor email already exists
//   const { data: existingDoctor, error: fetchError } = await supabase
//     .from("doctors")
//     .select("id")
//     .eq("email", doctorData.email)
//     .maybeSingle();

//   if (fetchError) {
//     throw new Error("Failed to check existing doctor: " + fetchError.message);
//   }

//   if (existingDoctor) {
//     throw new Error("Doctor with this email already exists.");
//   }

//   // ✅ Step 2: Insert new doctor (vc field handled by DB trigger/sequence)
//   const { data, error } = await supabase.from("doctors").insert([
//     {
//       ...doctorData,
//       availability_status: "Available",
//       rating: "0",
//       verified: "false",
//       created_at: new Date().toISOString(),
//     },
//   ]);

//   if (error) throw error;
//   return data;
// }


import { createClient } from "@supabase/supabase-js";

// ✅ Fetching Supabase credentials from .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ========== Database Functions ==========

// ✅ 1. Book Appointment
export async function bookAppointment(appointmentData) {
  const { data, error } = await supabase.from("Appointments").insert([appointmentData]);
  if (error) throw error;
  return data;
}

// ✅ 2. Get Appointments
export async function fetchAppointments() {
  const { data, error } = await supabase.from("Appointments").select("*");
  if (error) throw error;
  return data;
}

// ✅ 3. Register User (Auth)
export async function registerUser(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

// ✅ 4. Login User (Auth)
export async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

// ✅ 5. Logout
export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// ✅ 6. Add Lab Test
export async function addLabTest(testData) {
  const { data, error } = await supabase.from("Lab_Test").insert([testData]);
  if (error) throw error;
  return data;
}

// ✅ 7. Fetch Lab Tests
export async function fetchLabTests() {
  const { data, error } = await supabase.from("Lab_Test").select("*");
  if (error) throw error;
  return data;
}

// ✅ 8. Register Doctor (with email uniqueness check)
export async function registerDoctor(doctorData) {
  const { data: existingDoctor, error: fetchError } = await supabase
    .from("doctors")
    .select("id")
    .eq("email", doctorData.email)
    .maybeSingle();

  if (fetchError) throw new Error("Failed to check existing doctor: " + fetchError.message);
  if (existingDoctor) throw new Error("Doctor with this email already exists.");

  const { data, error } = await supabase.from("doctors").insert([
    {
      ...doctorData,
      availability_status: "Available",
      rating: "0",
      verified: "false",
      created_at: new Date().toISOString()
    }
  ]);

  if (error) throw error;
  return data;
}

// ✅ 9. Fetch Verified Doctors
export async function fetchDoctors() {
  const { data, error } = await supabase
    .from("doctors")
    .select("full_name")
    .eq("verified", true);

  if (error) throw error;
  return data;
}