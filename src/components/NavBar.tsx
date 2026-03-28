import { Search } from "lucide-react";
import { Bell } from 'lucide-react';
import { Settings } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import UserAvatar from "./UserAvatar";

export default function NavBar() {
  return (
    <div className="flex h-18 p-8 bg-[#F4F3F1] justify-between items-center">
      <h2 className="font-extrabold text-[#9F402D] text-2xl">Pawfect Pals</h2>
      <div className="flex items-center gap-4">
        <InputGroup className="w-34 h-9 rounded-full px-2 bg-[#E3E2E0]">
          <InputGroupInput placeholder="Find a  pal..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <Bell className="text-[#56423E]"/>
        <Settings className="text-[#56423E]"/>
        <UserAvatar />
      </div>
    </div>
  );
}
