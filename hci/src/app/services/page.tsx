'use client'
import Image from "next/image";

export default function Services() {
  return (
    <div className="content">
      <main className="flex flex-col items-center p-10 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-8 text-center">
          Our Security Services
        </h1>
        <p className="mb-12 text-lg text-center text-gray-700 dark:text-gray-300">
          As a leading cybersecurity company, we offer a comprehensive suite of
          services to protect your business from evolving threats. Explore our
          core offerings below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-16">
          {/* Security Assessment */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg shadow-md p-6 flex flex-col items-center">
            <Image
              src="/images/security-placeholder.png"
              alt="Security Assessment"
              width={120}
              height={120}
              className="mb-4 rounded"
            />
            <h2 className="text-2xl font-bold mb-2">Security Assessment</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2 text-center">
              Comprehensive evaluation of your organization&apos;s security posture,
              including policies, procedures, and technical controls. We identify
              gaps and provide actionable recommendations to strengthen your
              defenses.
            </p>
          </div>
          {/* Vulnerability Assessment */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg shadow-md p-6 flex flex-col items-center">
            <Image
              src="/images/vulnerability-placeholder.png"
              alt="Vulnerability Assessment"
              width={120}
              height={120}
              className="mb-4 rounded"
            />
            <h2 className="text-2xl font-bold mb-2">Vulnerability Assessment</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2 text-center">
              Systematic scanning and analysis of your IT infrastructure to uncover
              vulnerabilities before attackers do. Our team delivers prioritized
              remediation guidance to minimize risk.
            </p>
          </div>
          {/* Managed Security Services */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg shadow-md p-6 flex flex-col items-center">
            <Image
              src="/images/managed-placeholder.png"
              alt="Managed Security Services"
              width={120}
              height={120}
              className="mb-4 rounded"
            />
            <h2 className="text-2xl font-bold mb-2">Managed Security Services</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2 text-center">
              24/7 monitoring, detection, and response by our security experts. We
              manage your security operations, so you can focus on your business
              with peace of mind.
            </p>
          </div>
          {/* Custom Security Solutions */}
          <div className="bg-white dark:bg-[#1e1e1e] rounded-lg shadow-md p-6 flex flex-col items-center">
            <Image
              src="/images/custom-placeholder.png"
              alt="Custom Security Solutions"
              width={120}
              height={120}
              className="mb-4 rounded"
            />
            <h2 className="text-2xl font-bold mb-2">Custom Security Solutions</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2 text-center">
              Tailored security services to address your unique business needs,
              including incident response, compliance consulting, and employee
              training.
            </p>
          </div>
        </div>

        {/* Contact Us Prompt */}
        <div className="w-full bg-[#10B981] bg-opacity-90 rounded-lg p-8 shadow-lg flex flex-col items-center">
          <h3 className="text-2xl font-bold text-white mb-4">Contact Us</h3>
          <p className="text-white mb-6 text-center">
            Need help or want to discuss your security challenges? Fill out the
            form below and our team will get in touch!
          </p>
          <form
            className="w-full max-w-md flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
              required
            />
            <textarea
              placeholder="Describe your issue or what you need help with..."
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
              rows={4}
              required
            />
            <button
              type="submit"
              className="bg-white text-[#10B981] font-bold py-2 px-6 rounded hover:bg-gray-100 transition-colors"
              disabled
              title="This is a mockup. Submission is not implemented."
            >
              Send (Mockup)
            </button>
          </form>
          <p className="text-white text-xs mt-4 opacity-80">
            *This is a mockup. Your message will not be sent.
          </p>
        </div>
      </main>
    </div>
  );
}

