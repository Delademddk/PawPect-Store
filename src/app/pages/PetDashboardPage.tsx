import NavBar from "@/components/NavBar";
import { ArrowRight, Plus, TriangleAlert } from "lucide-react";
import GoldenRetriever from "../../assets/goldenRetriever.png";
import AddPetModal from "@/components/AddPetModal";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import StatCard from "@/components/StatCard";
import { toast } from "sonner";
import {
  createPet,
  deletePet,
  getPets,
  type Pet,
} from "@/api/pets";

const PETS_QUERY_KEY = ["pets"];

export type { CreatePetInput, Pet } from "@/api/pets";

export function useCreatePet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PETS_QUERY_KEY });
      toast.success("Pet added successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add pet");
    },
  });
}

function useDeletePet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePet,
    onSuccess: (_, deletedPetId) => {
      queryClient.setQueryData<Pet[]>(PETS_QUERY_KEY, (currentPets = []) =>
        currentPets.filter((pet) => pet.id !== deletedPetId),
      );
      queryClient.invalidateQueries({ queryKey: PETS_QUERY_KEY });
      toast.success("Pet deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete pet");
    },
  });
}

const statsItem = [
  { title: "Total Residents", value: "jh" },
  { title: "Names that start with S", value: "" },
  { title: "People in Gwenborough", value: "" },
  { title: "People with a Company", value: "" },
];

export default function PetDashboardPage() {
  const [open, setOpen] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const { mutate: deletePetMutate, isPending: isDeletingPet } = useDeletePet();

  const {
    data: pets = [],
    isError,
    isLoading,
    error,
  } = useQuery<Pet[], Error>({ queryKey: PETS_QUERY_KEY, queryFn: getPets });

  const handleOpenDeleteDialog = (pet: Pet) => {
    setSelectedPet(pet);
    setOpenDialog(true);
  };

  const handleDeletePet = () => {
    if (!selectedPet) {
      return;
    }

    deletePetMutate(selectedPet.id, {
      onSuccess: () => {
        setOpenDialog(false);
        setSelectedPet(null);
      },
    });
  };
  if (isError) {
    return <div>Error... {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading....</div>;
  }

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

          <button
            onClick={() => setOpen(true)}
            className="flex items-center justify-center sm:justify-start gap-2 bg-[#9F402D] text-sm md:text-[16px] font-bold text-white px-4 md:px-5 py-2.5 md:py-3 rounded-full hover:opacity-90"
          >
            <div className="border-2 rounded-full border-white">
              <Plus size={16} className="md:w-4.5 md:h-4.5" />
            </div>
            Add New Pet
          </button>
        </div>

        <AddPetModal isOpen={open} onClose={() => setOpen(false)} />

        <StatCard stats={statsItem} />

        {/* Pet Card */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {pets.map((pet: Pet) => (
            <div className="bg-white w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-sm">
              <div className="relative">
                <img
                  src={GoldenRetriever}
                  alt="goldenRetriever"
                  className="w-full h-40 md:h-52 lg:h-64 object-cover"
                />

                <span
                  className={`absolute text-black font-PlusJarta top-2 md:top-3 right-2 md:right-3 px-2 md:px-3 py-1 text-[10px] md:text-xs uppercase rounded-full font-bold ${
                    pet.id % 2 === 0 ? "bg-[#E2725B]" : "bg-[#00A58E]"
                  }`}
                >
                  {pet.id % 2 === 0 ? "Even" : "Odd"}
                </span>
              </div>

              <div className="p-3 md:p-4 lg:p-5">
                <h3 className="text-lg md:text-xl lg:text-2xl font-PlusJarta font-bold text-[#1A1C1A]">
                  {pet.name}
                </h3>

                <p className="text-[#56423E] text-xs md:text-sm lg:text-[16px] font-medium mt-1">
                  {pet.id} • {pet.address?.city}
                </p>

                <div className="flex justify-between items-center mt-3 md:mt-4">
                  <p className="text-[10px] md:text-sm text-[#56423E] line-clamp-1">
                    {pet.name}
                  </p>

                  <button
                    onClick={() => handleOpenDeleteDialog(pet)}
                    className="bg-[#90EFEF] p-1.5 md:p-2 rounded-full hover:opacity-90"
                  >
                    <ArrowRight size={14} className="md:w-4 md:h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Dialog
        open={openDialog}
        onOpenChange={(nextOpen) => {
          setOpenDialog(nextOpen);
          if (!nextOpen) {
            setSelectedPet(null);
          }
        }}
      >
        <DialogContent
          className="lg:max-w-lg p-9 rounded-[50px] "
          showCloseButton={false}
        >
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-[radial-gradient(circle,#FFDAD6_0%,#FFDAD6_30%,transparent_100%)] flex justify-center items-center  w-20 h-20">
              <TriangleAlert className="w-7.5 h-7.5 text-[#BA1A1A] " />
            </div>
            <h2 className="text-[24px] mb-3 font-bold ">
              Remove from Sanctuary?
            </h2>
            <p className="text-[16px] mb-7 ">
              Are you sure you want to delete{" "}
              <span className="font-bold">{selectedPet?.name ?? "this pet"}</span>
              ? This action will permanently remove their records from the
              sanctuary database and cannot be undone
            </p>
            <div className="flex flex-col w-full gap-3">
              <button
                onClick={handleDeletePet}
                disabled={!selectedPet || isDeletingPet}
                className="bg-[#BA1A1A] rounded-full h-15 text-white hover:brightness-80 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isDeletingPet
                  ? "Deleting..."
                  : `Delete ${selectedPet?.name ?? "Pet"}`}
              </button>
              <button
                onClick={() => {
                  setOpenDialog(false);
                  setSelectedPet(null);
                }}
                className="bg-[#E3E2E0] rounded-full h-14 hover:bg-[#FFDAD6]"
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
