"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type CtaSetting = {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
  status: "active" | "inactive";
};

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset } = useForm<CtaSetting>();

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/cta");
      const data = await res.json();
      if (Object.keys(data).length > 0) {
        reset(data);
      }
    } catch (error) {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [reset]);

  const onSubmit = async (data: CtaSetting) => {
    setSaving(true);
    try {
      const res = await fetch("/api/cta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Settings saved successfully");
      } else {
        toast.error("Failed to save settings");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-[#24342b]">Global Settings</h1>
        <p className="text-gray-500 mt-2">Manage CTA section and site-wide configurations</p>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-3xl flex justify-center">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-[#F5B301] rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Loading settings...</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-3xl">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <div className="w-5 h-5 text-purple-600 bg-current mask-settings mask-center bg-center bg-no-repeat mask-size-contain" style={{ maskImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z\'/%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'3\'/%3E%3C/svg%3E")' }}></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">CTA Section Content</h2>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Heading</label>
              <input {...register("heading", { required: true })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all text-lg font-medium text-gray-800" placeholder="Ready to start your journey?" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea {...register("description", { required: true })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all resize-none text-gray-600" rows={4} placeholder="Get in touch with us today..."></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Button Text</label>
                <input {...register("buttonText", { required: true })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all" placeholder="Contact Us" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Button Link</label>
                <input {...register("buttonLink", { required: true })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all" placeholder="/contact" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Background Color (Tailwind class)</label>
                <input {...register("backgroundColor")} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all font-mono text-sm" placeholder="e.g. bg-[#24342b] or bg-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                <select {...register("status")} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all font-medium text-gray-700">
                  <option value="active">Active (Visible on frontend)</option>
                  <option value="inactive">Inactive (Hidden)</option>
                </select>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100 mt-8">
              <button 
                type="submit" 
                disabled={saving}
                className="bg-[#24342b] text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-[#1a251f] shadow-[0_4px_14px_0_rgba(36,52,43,0.39)] hover:shadow-[0_6px_20px_rgba(36,52,43,0.23)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Saving Changes...
                  </>
                ) : (
                  "Save Global Settings"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
