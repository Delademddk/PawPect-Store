import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  MailIcon,
  EyeOffIcon,
  Eye,
  LockIcon,
  ArrowRightIcon,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  onLogin: () => void;
};

export default function LoginForm({ onLogin }: Props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      localStorage.setItem("isLoggedIn", "true");
      window.dispatchEvent(new Event("authchange"));
      onLogin();
      navigate("/");
    }
  };

  return (
    <div>
      <div className="mb-5 md:mb-6">
        <Label
          className="text-xs md:text-sm mb-2 ml-1 font-PlusJarta text-[#56423E] font-semibold"
          htmlFor="email"
        >
          Email Address
        </Label>

        <InputGroup
          className={`${errors.email ? "border-2 border-[#BA1A1A]" : "border-none"} w-full px-4 md:px-5 bg-[#E3E2E0] h-12 md:h-14 rounded-full`}
        >
          <InputGroupInput
            id="email"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputGroupAddon>
            <MailIcon />
          </InputGroupAddon>
        </InputGroup>

        {errors.email && (
          <p className="text-[#BA1A1A] text-xs md:text-sm mt-1">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <div className="mb-5 md:mb-6">
          <div className="flex items-center justify-between">
            <Label
              className="text-xs md:text-sm mb-2 ml-1 font-PlusJarta text-[#56423E] font-semibold"
              htmlFor="password"
            >
              Password
            </Label>

            <button className="text-xs md:text-sm cursor-pointer font-bold font-LiberationSerif text-[#006A6A]">
              Forgot password?
            </button>
          </div>

          <InputGroup
            className={`${errors.email ? "border-2 border-[#BA1A1A]" : "border-none"} w-full px-4 md:px-5 bg-[#E3E2E0] h-12 md:h-14 rounded-full`}
          >
            <InputGroupAddon align="inline-start">
              <LockIcon />
            </InputGroupAddon>

            <InputGroupInput
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <InputGroupAddon
              align="inline-end"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon className="cursor-pointer"/> : <Eye className="cursor-pointer"/>}
            </InputGroupAddon>
          </InputGroup>

          {errors.password && (
            <p className="text-[#BA1A1A] text-xs md:text-sm mt-1">
              {errors.password}
            </p>
          )}
        </div>
      </div>

      <div className="text-xs md:text-sm flex gap-2 mb-5 md:mb-6 font-LiberationSerif text-[#56423E]">
        <input type="radio" id="loggedIn" />
        <label htmlFor="loggedIn">Keep me logged in for 30 days</label>
      </div>

      <button
        onClick={handleLogin}
        className="bg-linear-to-r from-[#9F402D] to-[#E2725B] w-full h-12 md:h-14 rounded-full flex cursor-pointer hover:brightness-120 items-center justify-center text-white text-sm md:text-base gap-2"
      >
        Log In
        <ArrowRightIcon />
      </button>
    </div>
  );
}
