import Link from "next/link";

export default function Home() {
  return (
    <div className="content">
      <main className="flex flex-col items-center">
        {/* Hero Section */}
        <section
          className="items-center text-left min-h-screen text-white bg-black bg-opacity-20 bg-center
          max-w-6xl mx-auto mb-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 p-6"
        >
          <div className="items-center mt-16 gap-8 p-4 w-auto h-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight break-words text-center sm:text-left">
              Enterprise Security <span className="text-[#10B981]">Solutions</span>
            </h1>
            <p className="mt-6 sm:text-xl text-gray-300 max-w-2xl mb-4 text-center sm:text-left">
              Protect your digital assets with advanced cybersecurity expertise and continuous monitoring.
            </p>
            <div className="mx-4 sm:mx-auto grid grid-cols-1 sm:grid-cols-2">
              <Link
                href="/services"
                className="w-48 px-6 py-3 my-4 bg-[#10B981] text-white font-medium rounded-lg text-center"
              >
                Showcase
              </Link>
              <Link
                href="/about"
                className="w-48 px-6 py-3 my-4 bg-[#1e1e1e] border-2 border-[#10B981] text-[#10B981] font-medium rounded-lg text-center"
              >
                About Us
              </Link>
            </div>
          </div>
          <div className="mt-8 gap-4 p-4">
            <img
              src="./images/hacker.png"
              alt="Security Testing Icon"
              className="mx-auto mb-4 max-w-128 max-h-128"
            />
          </div>
        </section>


        {/* Services Section */}
        <section className="bg-white bg-opacity-90 text-[#1e1e1e] dark:bg-[#1e1e1e] dark:bg-opacity-90 dark:text-white text-center sm:text-left w-full py-20 border-b-2 border-[#1e1e1e] dark:border-white p-6 items-center">
          <div className="max-w-4xl max-h-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-white dark:bg-[#1e1e1e] rounded-lg border-t-8 border-[#10B981] p-4">
            <div className="p-4 border-b sm:border-b-0 sm:border-r border-[#1e1e1e] dark:border-white">
              <img
                src="./images/shield.png"
                alt="Security Testing Icon"
                className="mx-auto w-16 h-16 sm:w-24 sm:h-24"
              />
              <div className="h-24 sm:w-32 py-4">
                <h2 className="text-2xl font-bold">SECURITY TESTING</h2>
              </div>
              <p className="sm:text-xl">
                Identify and mitigate potential threats through rigorous penetration testing and security audits.
              </p>
            </div>
            <div className="p-4 border-b sm:border-b-0 sm:border-r border-[#1e1e1e] dark:border-white">
              <img
                src="./images/search.png"
                alt="Vulnerability Assessments Icon"
                className="mx-auto w-16 h-16 sm:w-24 sm:h-24"
              />
              <div className="h-24 sm:w-32 py-4">
                <h2 className="text-2xl font-bold">VULNERABILITY ASSESSMENTS</h2>
              </div>
              <p className="sm:text-xl">
                Evaluate your systems for weaknesses to ensure a robust security posture.
              </p>
            </div>
            <div className="p-4">
              <img
                src="./images/chip.png"
                alt="Managed Security Services Icon"
                className="mx-auto w-16 h-16 sm:w-24 sm:h-24"
              />
              <div className="h-auto w-auto py-4">
                <h2 className="text-2xl font-bold">MANAGED SECURITY SERVICES</h2>
              </div>
              <p className="sm:text-xl">
                Proactively monitor and protect your infrastructure with 24/7 expert
                support.
              </p>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="bg-white bg-opacity-90 text-[#1e1e1e] dark:bg-[#1e1e1e] dark:bg-opacity-90 dark:text-white text-left w-full py-20 border-b-2 border-[#1e1e1e] dark:border-white min-h-screen p-6 items-center">
          <h2 className="text-3xl sm:text-5xl font-bold mb-12 text-center">
            Featured Certifications
          </h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                imgSrc: "/images/cos+.png",
                altText: "cyOps Security+ Certification",
                title: "cyOps Security+",
                description:
                  "A foundational certification covering essential cybersecurity skills and concepts.",
                buttonText: "Explore Security+",
                link: "/certifications",
              },
              {
                imgSrc: "/images/cad.png",
                altText: "cyOps Advanced Defender Certification",
                title: "cyOps Advanced Defender",
                description:
                  "Focuses on advanced threat detection, incident response, and defensive techniques.",
                buttonText: "Explore Defender",
                link: "/certifications",
              },
              {
                imgSrc: "/images/caa.png",
                altText: "cyOps Advanced Architect Certification",
                title: "cyOps Advanced Architect",
                description:
                  "Designed for experts specializing in designing and implementing secure systems and networks.",
                buttonText: "Explore Architect",
                link: "/certifications",
              },
            ].map((cert, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#1e1e1e] p-6 rounded-lg shadow-lg border-t-8 border-[#10B981] flex flex-col items-center sm:items-baseline"
              >
                <div className="h-24 py-4">
                  <h3 className="text-2xl sm:text-3xl font-semibold mb-8 text-center sm:text-left">{cert.title}</h3>
                </div>
                
                <img
                  src={cert.imgSrc}
                  alt={cert.altText}
                  className="mx-auto mb-4 w-30 h-24"
                />
                <div className="sm:h-48 py-4">
                  <p className="sm:text-xl py-4 text-center sm:text-left">{cert.description}</p>
                </div>
                <Link
                  href={cert.link}
                  className="w-48 mb-6 py-2 bg-[#10B981] text-white font-medium rounded text-center"
                >
                  {cert.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-white bg-opacity-90 text-[#1e1e1e] dark:bg-[#1e1e1e] dark:bg-opacity-90 dark:text-white text-left w-full py-20 border-b-2 border-[#1e1e1e] dark:border-white min-h-screen">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                imgSrc: "/images/blog.png",
                altText: "Security Testing Icon",
                title: "Explore our Blog",
                description:
                  "Stay updated with the latest trends, insights, and best practices in cybersecurity on our blog.",
                buttonText: "Blog Page",
                link: "/blog",
              },
              {
                imgSrc: "/images/aboutus.png",
                altText: "Vulnerability Assessments Icon",
                title: "Learn more about cyOps",
                description:
                  "Learn more about our mission, expertise, and the values driving our commitment to securing your future.",
                buttonText: "About Us",
                link: "/about",
              },
            ].map((story, index) => (
              <div key={index} className="mx-6 flex flex-col">
                <img
                  src={story.imgSrc}
                  alt={story.altText}
                  className="mx-auto mb-6 w-128 h-128"
                />
                <h2 className="text-xl sm:text-3xl font-bold mb-4">{story.title}</h2>
                <p className="mb-6 sm:text-xl flex-grow">{story.description}</p>
                <Link
                  href={story.link}
                  className="w-48 mb-6 py-2 bg-[#10B981] text-white font-medium rounded text-center"
                >
                  {story.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
