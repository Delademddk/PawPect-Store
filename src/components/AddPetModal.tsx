import { X, Camera } from "lucide-react";
import { useEffect, useState } from "react";
import { InputGroup, InputGroupInput } from "./ui/input-group";
import { Label } from "@/components/ui/label";
import type { CreatePetInput } from "../app/pages/PetDashboardPage";
import { useCreatePet } from "../app/pages/PetDashboardPage";
import { toast } from "sonner";


type AddPetModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddPetModal({ isOpen, onClose }: AddPetModalProps) {
  const { mutate, isPending, error } = useCreatePet();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [adopted, setAdopted] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleSubmit = () => {
    const payload: CreatePetInput = {
      name: name,
      email: email,
      username: username,
    };

    mutate(payload, {
      onSuccess: () => {
        setIsAdded(true);
        onClose();
        setName("");
        setEmail("");
        setUsername("");
        setAdopted(false);
      },
    });
  };

  useEffect(() => {
    if (isAdded) {
      toast.success("Pet added successfully");
      setIsAdded(false);
    }
  }, [isAdded]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[#FFFFFF] w-xl rounded-3xl p-6 ">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-PlusJarta font-extrabold ">
              Add New Pet
            </h2>
            <p className="text-[#56423E] text-[16px]">
              Welcome a new member to the sanctuary
            </p>
          </div>
          <div>
            <button
              onClick={onClose}
              className=" p-1 text-[#56423E] hover:text-[#ce4023]"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-[#E9E8E5] rounded-full border-2 border-dashed border-[#DDC0BA] flex items-center justify-center text-center text-xs text-gray-500 cursor-pointer">
            <div className="flex flex-col items-center">
              <Camera size={20} />
              <p className="text-[10px]">Upload Photo</p>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-8">
            <div className="flex mb-6 gap-6">
              <div>
                <Label
                  className="ml-1 mb-2 text-sm font-bold"
                  htmlFor="petName"
                >
                  Pet Name
                </Label>

                <InputGroup className=" px-4 md:px-5 bg-[#E3E2E0] h-12 md:h-14 rounded-full">
                  <InputGroupInput
                    id="petName"
                    type="text"
                    placeholder="e.g. Buddy"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </InputGroup>
              </div>
              <div>
                <Label
                  className="ml-1 mb-2 text-sm font-bold"
                  htmlFor="email"
                >
                  Email
                </Label>

                <InputGroup className="px-4 md:px-5 bg-[#E3E2E0] h-12 md:h-14 rounded-full">
                  <InputGroupInput
                    id="email"
                    type="email"
                    placeholder="e.g. buddy@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </InputGroup>
              </div>
            </div>
            <div>
              <Label className="ml-1 mb-2 text-sm font-bold" htmlFor="username">
                Username
              </Label>

              <InputGroup className="w-full px-4 md:px-5 bg-[#E3E2E0] h-12 md:h-14 rounded-full">
                <InputGroupInput
                  id="username"
                  type="text"
                  placeholder="e.g. buddy123"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </InputGroup>
            </div>
          </div>

          <div className="flex items-center justify-between p-6 bg-[#F4F3F1] rounded-[32px] h-20">
            <div>
              <p className="font-bold text-[#2E2E2E]">Adopted</p>
              <p className="text-xs text-gray-500">
                Has this pet found a forever home?
              </p>
            </div>

            <button
              onClick={() => setAdopted(!adopted)}
              className={`w-10 h-5 rounded-full relative transition ${
                adopted ? "bg-green-400" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${
                  adopted ? "left-5" : "left-0.5"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="flex gap-4 h-14 mb-2 mt-8">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 rounded-full py-3 text-gray-700 font-bold"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-1 bg-[#A64632] text-white rounded-full py-3 font-bold"
          >
            Save Pet
          </button>
          {error && <p>Something went wrong</p>}
        </div>
      </div>
    </div>
  );
}
