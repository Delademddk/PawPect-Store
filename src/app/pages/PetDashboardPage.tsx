import NavBar from "@/components/NavBar";
// import { useNavigate } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";

import GoldenRetriever from "../../assets/goldenRetriever.png";

export default function PetDashboardPage() {
  const statCard = [
    { title: "Total Residents", value: "24" },
    { title: "Active Adoptions", value: "12" },
    { title: "Health Checks Due", value: "5" },
    { title: "New Inquiries", value: "8" },
  ];
  const pets = [
    {
      name: "Cooper",
      age: "2 years",
      breed: "Golden Retriever",
      status: "Available",
      image: "/images/dog1.png",
      note: "Last fed 2h ago",
    },
    {
      name: "Luna",
      age: "4 years",
      breed: "Bombay Cat",
      status: "Adopted",
      image: "/images/cat.png",
      note: "Found a home",
    },
    {
      name: "Barnaby",
      age: "1 year",
      breed: "Pug",
      status: "Available",
      image: "/images/pug.png",
      note: "Next checkup: Friday",
    },
    {
      name: "Pip",
      age: "6 months",
      breed: "Terrier Mix",
      status: "Available",
      image: "/images/dog2.png",
      note: "Highly Social",
    },
  ];
  return (
    <div>
      <NavBar />
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-[48px] font-extrabold font-PlusJarta text-[#1A1C1A] leading-tight">
              Pet Dashboard
            </h1>
            <p className="text-xs md:text-sm lg:text-base text-[#56423E]">
              Managing the sanctuary's finest companions.
            </p>
          </div>

          <button className="flex items-center justify-center sm:justify-start gap-2 bg-[#9F402D] text-sm md:text-[16px] font-bold text-white px-4 md:px-5 py-2.5 md:py-3 rounded-full hover:opacity-90">
            <div className="border-2 rounded-full border-white">
              <Plus size={16} className="md:w-[18px] md:h-[18px]" />
            </div>
            Add New Pet
          </button>
        </div>

        {/* Stat Card */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {statCard.map((stat) => (
            <div className="bg-[#F4F3F1] w-full h-24 md:h-28 lg:h-31 rounded-3xl md:rounded-[48px] flex items-center relative overflow-hidden">
              <div className="border-l-4 border-amber-300 absolute h-full flex items-center">
                <div className="px-4 md:px-6 lg:px-8">
                  <p className="text-[10px] md:text-xs text-[#56423E] uppercase font-PlusJarta font-bold mb-1 md:mb-2">
                    {stat.title}
                  </p>
                  <h2 className="text-lg md:text-2xl lg:text-3xl font-extrabold text-[#1A1C1A]">
                    {stat.value}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pet Card */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {pets.map((pet) => (
            <div className="bg-white w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-sm">
              <div className="relative">
                <img
                  src={GoldenRetriever}
                  alt="goldenRetriever"
                  className="w-full h-40 md:h-52 lg:h-64 object-cover"
                />

                <span
                  className={`absolute text-black font-PlusJarta top-2 md:top-3 right-2 md:right-3 px-2 md:px-3 py-1 text-[10px] md:text-xs uppercase rounded-full font-bold ${
                    pet.status === "Available" ? "bg-[#E2725B]" : "bg-[#00A58E]"
                  }`}
                >
                  {pet.status}
                </span>
              </div>

              <div className="p-3 md:p-4 lg:p-5">
                <h3 className="text-lg md:text-xl lg:text-2xl font-PlusJarta font-bold text-[#1A1C1A]">
                  {pet.name}
                </h3>

                <p className="text-[#56423E] text-xs md:text-sm lg:text-[16px] font-medium mt-1">
                  {pet.age} • {pet.breed}
                </p>

                <div className="flex justify-between items-center mt-3 md:mt-4">
                  <p className="text-[10px] md:text-sm text-[#56423E] line-clamp-1">
                    {pet.note}
                  </p>

                  <button className="bg-[#90EFEF] p-1.5 md:p-2 rounded-full hover:opacity-90">
                    <ArrowRight size={14} className="md:w-4 md:h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
