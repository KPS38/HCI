'use client'
import Image from "next/image";

export default function Services() {
  return (
    <div className="bg-white dark:bg-[#18181b] bg-opacity-90 min-h-screen py-12 px-4">
      <main className="max-w-5xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-center text-[#232323] dark:text-white">
          Our Security Services
        </h1>
        <p className="mb-12 text-lg text-center text-gray-700 dark:text-gray-300 max-w-2xl">
          As a leading cybersecurity company, we offer a comprehensive suite of
          services to protect your business from evolving threats. Explore our
          core offerings below.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-16">
          {/* Security Assessment */}
          <div className="bg-white dark:bg-[#232323] rounded-xl shadow-lg border border-gray-100 dark:border-[#232323] p-6 flex flex-col items-center transition hover:shadow-2xl hover:-translate-y-1 duration-200">
            <Image
              src="/images/shield.png"
              alt="Security Testing Icon"
              width={96}
              height={96}
              className="mx-auto mb-4 max-w-128 max-h-128"
            />
            <h2 className="text-xl font-bold mb-2 text-[#10B981]">
              Security Assessment
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2 text-center">
              Comprehensive evaluation of your organization&apos;s security posture,
              including policies, procedures, and technical controls. We identify
              gaps and provide actionable recommendations to strengthen your
              defenses.
            </p>
          </div>
          {/* Vulnerability Assessment */}
          <div className="bg-white dark:bg-[#232323] rounded-xl shadow-lg border border-gray-100 dark:border-[#232323] p-6 flex flex-col items-center transition hover:shadow-2xl hover:-translate-y-1 duration-200">
            <Image
              src="/images/search.png"
              alt="Security Testing Icon"
              width={96}
              height={96}
              className="mx-auto mb-4 max-w-128 max-h-128"
            />
            <h2 className="text-xl font-bold mb-2 text-[#10B981]">
              Vulnerability Assessment
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2 text-center">
              Systematic scanning and analysis of your IT infrastructure to uncover
              vulnerabilities before attackers do. Our team delivers prioritized
              remediation guidance to minimize risk.
            </p>
          </div>
          {/* Managed Security Services */}
          <div className="bg-white dark:bg-[#232323] rounded-xl shadow-lg border border-gray-100 dark:border-[#232323] p-6 flex flex-col items-center transition hover:shadow-2xl hover:-translate-y-1 duration-200">
            <Image
              src="/images/chip.png"
              alt="Security Testing Icon"
              width={96}
              height={96}
              className="mx-auto mb-4 max-w-128 max-h-128"
            />
            <h2 className="text-xl font-bold mb-2 text-[#10B981]">
              Managed Security Services
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2 text-center">
              24/7 monitoring, detection, and response by our security experts. We
              manage your security operations, so you can focus on your business
              with peace of mind.
            </p>
          </div>
          {/* Custom Security Solutions */}
          <div className="bg-white dark:bg-[#232323] rounded-xl shadow-lg border border-gray-100 dark:border-[#232323] p-6 flex flex-col items-center transition hover:shadow-2xl hover:-translate-y-1 duration-200">
            <Image
              src="/images/shield.png"
              alt="Security Testing Icon"
              width={96}
              height={96}
              className="mx-auto mb-4 max-w-128 max-h-128"
            />
            <h2 className="text-xl font-bold mb-2 text-[#10B981]">
              Custom Security Solutions
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2 text-center">
              Tailored security services to address your unique business needs,
              including incident response, compliance consulting, and employee
              training.
            </p>
          </div>
        </div>
        {/* Contact Us Prompt */}
        <div className="w-full bg-[#10B981] bg-opacity-90 rounded-2xl p-8 shadow-lg flex flex-col items-center mt-8">
          <h3 className="text-2xl font-bold text-white mb-2">Contact Us</h3>
          <p className="text-white mb-6 text-center max-w-xl">
            Want to learn more or discuss your security needs? Reach out and let&apos;s
            connect!
          </p>
          <form
            className="w-full max-w-md flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-white text-black"
              required
            />
            <textarea
              placeholder="Your message..."
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-white text-black"
              rows={4}
              required
            />
            <button
              type="submit"
              className="bg-white text-[#10B981] font-bold py-2 px-6 rounded hover:bg-gray-100 transition-colors"
              disabled
              title="This is a mockup. Submission is not implemented."
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}