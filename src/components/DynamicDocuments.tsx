"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";

type DocumentItem = {
  _id: string;
  title: string;
  description: string;
  countrySpecificNote: string;
  status: "active" | "inactive";
};

export default function DynamicDocuments() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await fetch("/api/documents");
        const data = await res.json();
        setDocuments(data.filter((doc: DocumentItem) => doc.status === "active"));
      } catch (error) {
        console.error("Failed to fetch documents");
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  if (loading) {
    return (
      <div className="py-20 bg-white flex justify-center">
        <div className="animate-pulse space-y-4 max-w-4xl w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-32 bg-gray-100 rounded-xl w-full"></div>
          <div className="h-32 bg-gray-100 rounded-xl w-full"></div>
        </div>
      </div>
    );
  }

  if (documents.length === 0) return null;

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#24342b] mb-4">
            Required Documents
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Please ensure you have the following documents ready for your application process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {documents.map((doc, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              key={doc._id}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100/50 to-transparent rounded-bl-full -z-0"></div>
              
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-[#F5B301] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-[#24342b] mb-2">{doc.title}</h3>
                    <p className="text-gray-600">{doc.description}</p>
                  </div>
                </div>
                
                {doc.countrySpecificNote && (
                  <div className="mt-4 p-4 bg-orange-50 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-orange-800 font-medium">{doc.countrySpecificNote}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
