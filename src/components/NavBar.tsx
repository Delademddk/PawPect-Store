import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
export default function NavBar() {
  return (
    <div className="flex ">
      <h2>Pawfect Pals</h2>
      <div>
        <InputGroup className="max-w-xs">
          <InputGroupInput placeholder="Find a  pal..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
