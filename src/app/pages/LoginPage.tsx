import PawIcon from "../../assets/pawIcon.svg";
import ProfileIcon from "../../assets/profileIcon.svg";
import LoginForm from "@/components/LoginForm";

type Props = {
  onLogin: () => void;
};

export default function LoginPage({ onLogin }: Props) {
  return (
    <div className="w-full bg-[#FAF9F6] h-screen">
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(144,239,239,0.7)_0%,rgba(144,239,239,0.4)_40%,rgba(144,239,239,0.15)_70%,transparent_100%)] blur-3xl opacity-70"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.6)_0%,rgba(236,72,153,0.3)_40%,rgba(236,72,153,0.1)_70%,transparent_100%)] blur-3xl opacity-70"></div>
      <div className="grid place-items-center min-h-screen">
        <div className="w-[80%] h-[70%]  m-auto flex z-1 rounded-4xl overflow-hidden">
          {/* Left side */}
          <div className="w-[50%] h-full bg-linear-to-b from-[#9F402D] to-[#E2725B] p-8">
            <div className="flex items-center gap-1.5 mb-5">
              <img className="h-7 w-7" src={PawIcon} alt="Paw icon" />
              <h2 className="text-white text-[30px] font-extrabold font-PlusJarta">
                Pawfect Pals
              </h2>
            </div>
            <p className="text-white font-PlusJakarta!  text-5xl font-bold">
              Every tail tells a story.
            </p>
            <p className=" text-[#FFDAD3] font-PlusJakarta text-5xl font-bold">
              Let's write the next chapter.
            </p>
            <div className="w-full rounded-3xl p-5 bg-[#FFFFFFCC] space-y-1 mt-3.5">
              <p className="text-xs text-[#5A0D02] italic font-LiberationSerif">
                "The sanctuary isn't just a place, it's the care we provide
                every single day. Managing our friends has never felt more
                natural."{" "}
              </p>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#90EFEF] rounded-full">
                  <img
                    className="h-2.5 w-2.5 "
                    src={ProfileIcon}
                    alt="Profile Icon"
                  />
                </div>
                <div>
                  <p className="text-[10px] text-[#5A0D02] font-bold font-PlusJarta">
                    Sarah Jenkins
                  </p>
                  <p className="text-[7px] text-[#5A0D02] font-LiberationSerif ">
                    Sanctuary Director
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* right side */}
          <div className="w-[50%] h-full bg-white p-8">
            <h2>Welcome Back</h2>
            <p>Enter your credentials to access the sanctuary dashboard.</p>
            <LoginForm onLogin={onLogin} />
            <div className="h-0.5 w-full bg-black"></div>
            <div className="flex ">
              <p>New to the team? </p>
              <button>Contact Administrator</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
