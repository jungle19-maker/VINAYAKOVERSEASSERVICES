"use client";

import Link from "next/link";
import { ListOrdered, FileText, Settings, ArrowRight } from "lucide-react";

export default function AdminDashboard() {
  const cards = [
    {
      title: "Requirements",
      desc: "Manage job requirements and categories",
      href: "/admin/requirements",
      icon: ListOrdered,
      color: "bg-blue-50 text-blue-600",
      hoverRing: "hover:ring-blue-500",
    },
    {
      title: "Documents",
      desc: "Manage eligibility document lists",
      href: "/admin/documents",
      icon: FileText,
      color: "bg-green-50 text-green-600",
      hoverRing: "hover:ring-green-500",
    },
    {
      title: "Settings",
      desc: "Manage CTA section and global settings",
      href: "/admin/settings",
      icon: Settings,
      color: "bg-purple-50 text-purple-600",
      hoverRing: "hover:ring-purple-500",
    },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#24342b]">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2 text-lg">Welcome back. Manage your VOS website content from here.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Link 
              key={index}
              href={card.href}
              className={`group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 ring-1 ring-transparent ${card.hoverRing} hover:-translate-y-1 relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -z-0 opacity-50 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${card.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h3>
                <p className="text-gray-500 mb-6">{card.desc}</p>
                
                <div className="flex items-center text-[#24342b] font-semibold group-hover:text-[#F5B301] transition-colors">
                  Manage {card.title} 
                  <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
