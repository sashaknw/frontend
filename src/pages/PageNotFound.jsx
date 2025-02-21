const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4">
      <div className="text-center flex flex-col items-center"> 
        <div className="flex justify-center w-full">
          <img
            src="/loading.gif"
            alt="Trance Mania Logo"
            className="w-80 h-auto ml-2"
          />
        </div>
        <h1 className="text-6xl font-bold text-[#5ace8f] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

      </div>
    </div>
  );
};

export default NotFound;