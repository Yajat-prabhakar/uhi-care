import { createClient } from "@supabase/supabase-js";

// Replace with your Supabase project URL and public anon key
const supabaseUrl = "https://ymqxfnxyacyihvycnqfy.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltcXhmbnh5YWN5aWh2eWNucWZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3OTM2NjgsImV4cCI6MjA2MjM2OTY2OH0.tN4WJ0P0ocNkBkoqJIOe1sSBw46PCZly5T0k7tvzv30";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ========== Database Functions ==========

// ✅ 1. Book Appointment
export async function bookAppointment(appointmentData: any) {
  const { data, error } = await supabase
    .from("appointments")
    .insert([appointmentData]);
  if (error) throw error;
  return data;
}

// ✅ 2. Get Appointments
export async function fetchAppointments() {
  const { data, error } = await supabase.from("appointments").select("*");
  if (error) throw error;
  return data;
}

// ✅ 3. Register User (Auth)
export async function registerUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

// ✅ 4. Login User (Auth)
export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

// ✅ 5. Logout
export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// ✅ 6. Add Lab Test
export async function addLabTest(testData: any) {
  const { data, error } = await supabase.from("lab_tests").insert([testData]);
  if (error) throw error;
  return data;
}

// ✅ 7. Fetch Lab Tests
export async function fetchLabTests() {
  const { data, error } = await supabase.from("lab_tests").select("*");
  if (error) throw error;
  return data;
}

// ✅ 8. Register Doctor
export async function registerDoctor(doctorData: {
  full_name: string;
  email: string;
  contact_number: string;
  password: string;
  specialization: string;
  registration_number: string;
  bio: string;
}) {
  const { data, error } = await supabase.from("doctors").insert([
    {
      ...doctorData,
      availability_status: "Available",
      rating: "0",
      verified: "false"
    }
  ]);
  if (error) throw error;
  return data;
}
