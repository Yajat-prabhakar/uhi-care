import React from "react";

const tools = [
  {
    name: "ZenNap",
    description: "Your personal Sleep Health Coach to optimize rest and wellness.",
    image: "https://i.postimg.cc/0Qvx5g3S/Chat-GPT-Image-Jun-27-2025-03-30-21-PM.png",
    link: "https://uhi-zennap.netlify.app/"
  },
  {
    name: "PredictoRx",
    description: "Analyze health data and get preventive plans—because prevention is better than cure.",
    image: "https://i.postimg.cc/BbRTrCYm/Chat-GPT-Image-Jun-27-2025-03-26-06-PM.png",
    link: "https://uhi-predictorx.netlify.app/"
  },
  {
    name: "MediMind",
    description: "Never forget a dose—get medicine reminders via WhatsApp and notifications.",
    image: "https://i.postimg.cc/VNmrThR7/Chat-GPT-Image-Jun-27-2025-03-33-01-PM.png",
    link: "https://uhi-reminder.netlify.app/"
  },
  {
    name: "VibeVault",
    description: "Track your mood and emotions with smart AI-powered vibe analysis.",
    image: "https://i.postimg.cc/287hPV2d/Chat-GPT-Image-Jun-27-2025-03-00-22-PM.png",
    link: "https://uhi-tracker.netlify.app/"
  },
  {
    name: "Habitual",
    description: "Log and track unhealthy habits with an AI coach. Get insights and guidance.",
    image: "https://i.postimg.cc/wT2wY6VN/Chat-GPT-Image-Jun-27-2025-03-05-25-PM.png",
    link: "https://uhi-habitual.netlify.app/"
  },
  {
    name: "Recovery Planner",
    description: "Recover faster—get actionable tasks based on your diagnosis.",
    image: "https://i.postimg.cc/0NDY7Bx8/Chat-GPT-Image-Jun-27-2025-03-14-10-PM.png",
    link: "/tools/recovery-planner"
  },
  {
    name: "UHI Health Tracker",
    description: "Track sleep, stress & activity with a daily Health Score and coaching tips.",
    image: "https://i.postimg.cc/t4GbkBVr/Chat-GPT-Image-Jun-27-2025-03-17-10-PM.png",
    link: "/tools/uhi-tracker"
  },
  {
    name: "Equilibrium",
    description: "Monitor burnout levels daily. An empathetic AI helps you find balance.",
    image: "https://i.postimg.cc/63CdxwXv/Chat-GPT-Image-Jun-27-2025-03-22-31-PM.png",
    link: "https://uhi-equilibrium.netlify.app/"
  }
];

const MedNest = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">🧠 MedNest - Your Health Toolkit</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col items-center">
            <img src={tool.image} alt={tool.name} className="h-32 w-32 object-contain mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{tool.name}</h2>
            <p className="text-sm text-gray-600 text-center">{tool.description}</p>
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Launch
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedNest;