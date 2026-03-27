import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Field } from "@/components/ui/field";
import { MailIcon, EyeOffIcon, LockIcon, ArrowRightIcon } from "lucide-react";
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
      <div>
        <Label htmlFor="email">Email Address</Label>
        <InputGroup className="max-w-sm">
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
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>
      <div>
        <Field className="max-w-sm">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>

            <button className="text-sm text-primary hover:underline">
              Forgot password?
            </button>
          </div>
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <LockIcon />
            </InputGroupAddon>

            <InputGroupInput
              id="password"
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputGroupAddon align="inline-end">
              <EyeOffIcon />
            </InputGroupAddon>
          </InputGroup>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </Field>
      </div>
      <div>
        <input type="radio" id="loggedIn" />
        <label htmlFor="loggedIn">Keep me logged in for 30 days</label>
      </div>
      <button onClick={handleLogin} className="bg-amber-400 flex">
        Log In
        <ArrowRightIcon />
      </button>
    </div>
  );
}
