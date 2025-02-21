const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen w-full py-12">
      <div className="container mx-auto px-4">
        <h1 className="mb-4 text-right mr-24 font-sans font-bold text-5xl text-[#1a1a1a]">
          about us
        </h1>

        <div className="grid md:grid-cols-2 gap-8 border-4 border-[#1a1a1a] rounded-lg overflow-hidden min-h-[800px]">
          {/* Left side - Establishment Image and Location */}
          <div className="flex flex-col">
            <div className="h-[440px] mt-24 ml-14">
              <img
                src="/carousel/4.png"
                alt="TranceMania Establishment"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Location Section */}
            <div className="mt-1 text-center">
              <div className="flex flex-col items-center">
                <br />

                <div className="text-lg text-black leading-loose">
                  C/Estupenda nº3 <br />
                  35004 Las Palmas de Gran Canaria <br />
                  928 01 02 03 <br />
                  trancemania@email.com
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Text Content */}
          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-4xl font-sans font-bold text-gray-900 mb-6 mt-0">
              Our Story: More Than Just a Record Store
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Founded in the heart of west London in 1976, TranceMania emerged
              during the explosive punk era. What started as a small passion
              project has grown into a sanctuary for music lovers, vinyl
              collectors, and sonic explorers.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              We're not just selling records; we're preserving musical history.
              Each vinyl in our collection tells a story, represents a moment in
              time, and connects generations of music enthusiasts.
            </p>
            <p className="text-lg text-gray-700">
              Our commitment goes beyond commerce. We're a community, a meeting
              place for artists, collectors, and music lovers who believe in the
              magic of analog sound.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
