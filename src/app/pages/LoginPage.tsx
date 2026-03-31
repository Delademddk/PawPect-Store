import PawIcon from "../../assets/pawIcon.svg";
import ProfileIcon from "../../assets/profileIcon.svg";
import LoginForm from "@/components/LoginForm";

type Props = {
  onLogin: () => void;
};

export default function LoginPage({ onLogin }: Props) {
  return (
    <div className="w-full bg-[#FAF9F6] min-h-screen relative overflow-hidden">
      <div className="absolute top-6 left-4 md:top-10 md:left-10 w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-[radial-gradient(circle,rgba(144,239,239,0.7)_0%,rgba(144,239,239,0.4)_40%,rgba(144,239,239,0.15)_70%,transparent_100%)] blur-3xl opacity-70"></div>
      <div className="absolute bottom-4 right-4 md:bottom-2 md:right-10 w-56 h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.6)_0%,rgba(236,72,153,0.3)_40%,rgba(236,72,153,0.1)_70%,transparent_100%)] blur-3xl opacity-70"></div>

      <div className="grid place-items-center min-h-screen px-4">
        <div className="w-full max-w-275 min-h-[85vh] flex flex-col md:flex-row z-10 rounded-4xl overflow-hidden">
          {/* Left side */}
          <div className="w-full hidden md:block md:w-1/2 bg-linear-to-b from-[#9F402D] to-[#E2725B] p-5 md:p-6 lg:p-8 ">
            <div className="flex items-center gap-1.5 mb-8 md:mb-10 lg:mb-14">
              <img
                className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7"
                src={PawIcon}
                alt="Paw icon"
              />
              <h2 className="text-white text-xl md:text-2xl lg:text-[30px] font-extrabold font-PlusJarta">
                Pawfect Pals
              </h2>
            </div>

            <p className="text-white font-PlusJakarta text-2xl md:text-3xl lg:text-5xl font-bold leading-tight">
              Every tail tells a story.
            </p>
            <p className="text-[#FFDAD3] font-PlusJakarta text-2xl md:text-3xl lg:text-5xl font-bold leading-tight">
              Let's write the next chapter.
            </p>

            <div className="w-full rounded-3xl p-3 md:p-4 lg:p-5 bg-[#FFFFFFCC] space-y-1 mt-6 md:mt-8 lg:mt-11">
              <p className="text-[10px] md:text-xs text-[#5A0D02] italic font-LiberationSerif">
                "The sanctuary isn't just a place, it's the care we provide
                every single day. Managing our friends has never felt more
                natural."
              </p>

              <div className="flex items-center gap-2">
                <div className="p-1 md:p-1.5 bg-[#90EFEF] rounded-full">
                  <img
                    className="h-2 w-2 md:h-2.5 md:w-2.5"
                    src={ProfileIcon}
                    alt="Profile Icon"
                  />
                </div>

                <div>
                  <p className="text-[9px] md:text-[10px] text-[#5A0D02] font-bold font-PlusJarta">
                    Sarah Jenkins
                  </p>
                  <p className="text-[6px] md:text-[7px] text-[#5A0D02] font-LiberationSerif">
                    Sanctuary Director
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="w-full md:w-1/2 bg-white p-5 md:p-6 lg:p-12">
            <h2 className="font-PlusJarta text-xl md:text-2xl lg:text-3xl font-bold">
              Welcome Back
            </h2>

            <p className="mb-6 md:mb-8 lg:mb-10 font-LiberationSerif text-xs md:text-sm lg:text-[16px] text-[#56423E]">
              Enter your credentials to access the sanctuary dashboard.
            </p>

            <LoginForm onLogin={onLogin} />

            <div className="w-full mt-8 md:mt-10 lg:mt-12 flex justify-center border-t">
              <div className="flex pt-5 md:pt-6 lg:pt-8 justify-center gap-1 text-center">
                <p className="text-xs md:text-sm font-LiberationSerif text-[#56423E]">
                  New to the team?
                </p>
                <button className="cursor-pointer text-xs md:text-sm font-LiberationSerif font-bold text-[#006A6A]">
                  Contact Administrator
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
