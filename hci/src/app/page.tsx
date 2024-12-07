export default function Home() {
  return (
    <div className="content">
      <main className="flex flex-col items-center">
        {/* Hero Section */}
        <section
          className="flex flex-col items-center text-left min-h-screen text-white bg-black bg-opacity-20 bg-center
          max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          <div className="mt-8 gap-4">
          <h1 className="text-6xl font-extrabold tracking-tight">
            Enterprise Security <span className="text-[#10B981]">Solutions</span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl">
            Protect your digital assets with advanced cybersecurity expertise and continuous monitoring.
          </p>
            <div className="mt-8 gap-4">
              <button className="px-6 py-3 bg-[#10B981] text-white font-medium rounded-lg">
                Showcase
              </button>
              <button className="px-6 py-3 bg-[#1e1e1e] border border-[#10B981] text-[#10B981] font-medium rounded-lg">
                About Us
              </button>   
            </div>
          </div>  
          <div className="mt-8 gap-4">
          <img
              src="./images/hacker.png"
              alt="Security Testing Icon"
              className="mx-auto mb-4 w-96 h-96"
            />   
          </div>
        </section>


        {/* Services Section */}
        <section className="bg-white bg-opacity-90 text-[#1e1e1e] text-left w-full py-20 border-b-2 border-[#1e1e1e] min-h-screen">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-white rounded-lg border-t-8 border-[#10B981]">
            <div className="p-4 border-r-2 border-[#1e1e1e]">
              <img
                src="./images/shield.png"
                alt="Security Testing Icon"
                className="mx-auto mb-4 w-16 h-16"
              />
              <h2 className="text-2xl font-bold mb-4">SECURITY TESTING</h2>
              <p>
                Identify and mitigate potential threats through rigorous penetration testing and security audits.
              </p>
            </div>
            <div className="p-4 border-r-2 border-[#1e1e1e]">
              <img
                src="./images/search.png"
                alt="Vulnerability Assessments Icon"
                className="mx-auto mb-4 w-16 h-16"
              />
              <h2 className="text-2xl font-bold mb-4">VULNERABILITY ASSESSMENTS</h2>
              <p>
                Evaluate your systems for weaknesses to ensure a robust security posture.
              </p>
            </div>
            <div className="p-4">
              <img
                src="./images/chip.png"
                alt="Managed Security Services Icon"
                className="mx-auto mb-4 w-16 h-16"
              />
              <h2 className="text-2xl font-bold mb-4">MANAGED SECURITY SERVICES</h2>
              <p>
                Proactively monitor and protect your infrastructure with 24/7 expert
                support.
              </p>
            </div>
          </div>
        </section>


        {/* Certifications Section */}
        <section className="bg-white bg-opacity-90 text-[#1e1e1e] text-left w-full py-20 border-b-2 border-[#1e1e1e] min-h-screen">
          <h2 className="text-center text-4xl font-bold mb-12">
            Featured Certifications
          </h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <img
                src="/images/cos+.png"
                alt="cyOps Security+ Certification"
                className="mx-auto mb-4 w-24 h-20"
              />
              <h3 className="text-xl font-semibold mb-2">cyOps Security+</h3>
              <p>
                A foundational certification covering essential cybersecurity skills
                and concepts.
              </p>
              <button className="mt-4 px-4 py-2 bg-[#10B981] text-white font-medium rounded">
                Explore Security+
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <img
                src="/images/cad.png"
                alt="cyOps Advanced Defender Certification"
                className="mx-auto mb-4 w-24 h-20"
              />
              <h3 className="text-xl font-semibold mb-2">cyOps Advanced Defender</h3>
              <p>
                Focuses on advanced threat detection, incident response, and defensive
                techniques.
              </p>
              <button className="mt-4 px-4 py-2 bg-[#10B981] text-white font-medium rounded">
                Explore Defender
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <img
                src="/images/caa.png"
                alt="cyOps Advanced Architect Certification"
                className="mx-auto mb-4 w-24 h-20"
              />
              <h3 className="text-xl font-semibold mb-2">cyOps Advanced Architect</h3>
              <p>
                Designed for experts specializing in designing and implementing secure
                systems and networks.
              </p>
              <button className="mt-4 px-4 py-2 bg-[#10B981] text-white font-medium rounded">
                Explore Architect
              </button>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-white bg-opacity-90 text-[#1e1e1e] text-left w-full py-20 border-b-2 border-[#1e1e1e] min-h-screen">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <img
                src="/images/blog.png"
                alt="Security Testing Icon"
                className="mx-auto mb-4 w-64 h-64"
              />
              <h2 className="text-2xl font-bold mb-4">Explore our Blog</h2>
              <p>
              Stay updated with the latest trends, insights, and best practices 
               cybersecurity on our blog.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <img
                src="/images/aboutus.png"
                alt="Vulnerability Assessments Icon"
                className="mx-auto mb-4 w-64 h-64"
              />
              <h2 className="text-2xl font-bold mb-4">Learn more about cyOps</h2>
              <p>
              Learn more about our mission, expertise, and the values driving our 
              commitment to securing your future.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
