'use client'
import Image from "next/image";
import { useState } from "react";

export default function About() {
  return (
    <div className="bg-white dark:bg-[#18181b] bg-opacity-90 min-h-screen px-4">
      {/* Remove py-12 from outer div, add pt-16 to main to offset navbar height */}
      <main className="max-w-4xl mx-auto flex flex-col items-center py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-center text-[#232323] dark:text-white">
          About cyOps
        </h1>
        <p className="mb-8 text-lg text-center text-gray-700 dark:text-gray-300 max-w-2xl">
          cyOps is a modern cybersecurity company focused on delivering innovative
          and reliable security solutions for organizations of all sizes. Our
          mission is to empower businesses to operate securely and confidently
          in a rapidly evolving digital landscape.
        </p>
        {/* Leadership team row */}
        <div className="w-full flex flex-row flex-wrap justify-center gap-8 mb-12">
          {/* CEO */}
          <div className="flex flex-col items-center w-48">
            <Image
              src="/images/ceo.jpg"
              alt="CEO"
              width={160}
              height={160}
              className="rounded-full shadow-lg object-cover mb-2"
            />
            <h2 className="text-lg font-bold text-[#10B981] mb-1">Ivan Novak</h2>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Chief Executive Officer</span>
          </div>
          {/* CFO */}
          <div className="flex flex-col items-center w-48">
            <Image
              src="/images/cfo.jpg"
              alt="CFO"
              width={160}
              height={160}
              className="rounded-full shadow-lg object-cover mb-2"
            />
            <h2 className="text-lg font-bold text-[#10B981] mb-1">Marko Horvat</h2>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Chief Financial Officer</span>
          </div>
          {/* CTO */}
          <div className="flex flex-col items-center w-48">
            <Image
              src="/images/p2.jpg"
              alt="CTO"
              width={160}
              height={160}
              className="rounded-full shadow-lg object-cover mb-2"
            />
            <h2 className="text-lg font-bold text-[#10B981] mb-1">Ana Kovačević</h2>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Chief Technology Officer</span>
          </div>
        </div>
        {/* Our Team block */}
        <div className="w-full flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex-shrink-0 flex items-center justify-center w-full md:w-1/2 mb-6 md:mb-0 h-full">
            <Image
              src="/images/team.png"
              alt="Our Team"
              width={380}
              height={380}
              className="rounded-xl shadow-lg object-cover h-full w-auto"
              style={{ maxHeight: "420px", minHeight: "320px" }}
            />
          </div>
          <div className="flex-1 flex flex-col justify-center md:pl-8">
            <h2 className="text-2xl font-bold text-[#10B981] mb-4">Our Team</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              We are a group of passionate cybersecurity professionals, engineers, and consultants. Our diverse backgrounds and expertise allow us to tackle complex security challenges with creativity and precision. At cyOps, we believe in teamwork, innovation, and continuous learning to deliver the best solutions for our clients.
            </p>
          </div>
        </div>
        {/* Contact block */}
        <div className="w-full bg-black bg-opacity-90 rounded-2xl p-8 shadow-lg flex flex-col items-center mt-8">
          <h3 className="text-2xl font-bold text-white mb-2">Contact Us</h3>
          <p className="text-white mb-6 text-center max-w-xl">
            Want to learn more or join our team? Reach out and let&apos;s connect!
          </p>
          <AboutContactForm />
        </div>
      </main>
    </div>
  );
}

function AboutContactForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  setSubmitted(true);
  setEmail("");
  setName("");
  setSurname("");
  setCvFile(null);
  setFileInputKey(prev => prev + 1); // Force file input to reset
  setTimeout(() => setSubmitted(false), 3000); // Hide popup after 3s
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCvFile(e.target.files?.[0] || null);
  }

  return (
    <>
      <form
        className="w-full max-w-md flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Your email address"
          className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-white text-black"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={submitted}
        />
        <input
          type="text"
          placeholder="Name"
          className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-white text-black"
          required
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={submitted}
        />
        <input
          type="text"
          placeholder="Surname"
          className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-white text-black"
          required
          value={surname}
          onChange={e => setSurname(e.target.value)}
          disabled={submitted}
        />
        <div>
          <label className="block mb-1 text-white font-semibold">Upload your CV (mockup only)</label>
          <input
            key={fileInputKey}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            className="block w-full text-black bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
            onChange={handleFileChange}
            disabled={submitted}
          />
          {cvFile && (
            <span className="text-xs text-gray-300 mt-1 block">Selected: {cvFile.name}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#10B981] text-white font-bold py-2 px-6 rounded hover:bg-[#059669] transition-colors"
          disabled={submitted}
          title="This is a mockup. Submission is not implemented."
        >
          Send
        </button>
      </form>
      {submitted && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-black bg-opacity-90 text-white px-8 py-6 rounded-xl shadow-lg text-center font-semibold pointer-events-auto">
            Thank you for your interest! We will contact you as soon as possible.<br />
            <span className="text-xs opacity-70">*This is a mockup. Your message was not sent.</span>
          </div>
        </div>
      )}
    </>
  );
}