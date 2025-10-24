import { useEffect } from "react";

function VSIntroScreen({ onNext }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext(); 
    }, 3000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden">
      <img
        src="/VSscreen.png"
        alt="EcoHero vs Monster"
        className="w-auto h-full object-contain image-pixel"
      />
      <div className="absolute inset-0 bg-black/20 animate-fadeIn"></div>
    </div>
  );
}

export default VSIntroScreen;
