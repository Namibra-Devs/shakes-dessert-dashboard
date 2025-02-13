// import Logo from "@/assets/images/logo.png";

const LoadingPage = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      {/* <img src={Logo} alt="logo-image" className="w-[20%]" /> */}
      <div className="flex space-x-1">
        <div className="w-2 bg-primary_pink rounded animate-bounce-bar [animation-delay:0s]"></div>
        <div className="w-2 bg-primary_pink rounded animate-bounce-bar [animation-delay:0.2s]"></div>
        <div className="w-2 bg-primary_pink rounded animate-bounce-bar [animation-delay:0.4s]"></div>
      </div>

      <p className="mt-2 text-gray-600 text-sm">Loading Components ...</p>
    </div>
  );
};
export default LoadingPage;
