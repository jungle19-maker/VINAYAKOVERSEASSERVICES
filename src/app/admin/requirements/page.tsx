"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Search, 
  MapPin, 
  Tags, 
  Layers, 
  HelpCircle,
  Eye,
  CheckCircle2,
  FileEdit
} from "lucide-react";

type Requirement = {
  _id: string;
  title: string;
  icon: string;
  countries: string[];
  shortDescription: string;
  roles: string[];
  eligibilityRequirements: string[];
  status: "active" | "inactive";
  orderNumber: number;
  details: string;
};

export default function AdminRequirements() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [filteredReqs, setFilteredReqs] = useState<Requirement[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<Requirement>({
    defaultValues: {
      details: "<p></p>"
    }
  });

  const fetchRequirements = async () => {
    try {
      const res = await fetch("/api/requirements");
      const data = await res.json();
      setRequirements(data);
      setFilteredReqs(data);
    } catch (error) {
      toast.error("Failed to load requirements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, []);

  // Filter requirements based on search query
  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) {
      setFilteredReqs(requirements);
      return;
    }

    const filtered = requirements.filter(
      (req) =>
        req.title.toLowerCase().includes(term) ||
        req.shortDescription.toLowerCase().includes(term) ||
        req.countries.some((c) => c.toLowerCase().includes(term))
    );
    setFilteredReqs(filtered);
  }, [searchTerm, requirements]);

  const onSubmit = async (data: Requirement) => {
    try {
      // Clean up strings to array
      if (typeof data.countries === "string") {
        data.countries = (data.countries as string)
          .split(",")
          .map((c: string) => c.trim())
          .filter(Boolean);
      }
      if (typeof data.roles === "string") {
        data.roles = (data.roles as string)
          .split(",")
          .map((c: string) => c.trim())
          .filter(Boolean);
      }
      if (typeof data.eligibilityRequirements === "string") {
        data.eligibilityRequirements = (data.eligibilityRequirements as string)
          .split("\n")
          .map((c: string) => c.trim())
          .filter(Boolean);
      }

      const url = editingId ? `/api/requirements/${editingId}` : "/api/requirements";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success(editingId ? "Requirement updated successfully" : "Requirement created successfully");
        setIsModalOpen(false);
        reset();
        setEditingId(null);
        fetchRequirements();
      } else {
        toast.error("Failed to save requirement details");
      }
    } catch (error) {
      toast.error("An operational error occurred");
    }
  };

  const handleEdit = (req: Requirement) => {
    setEditingId(req._id);
    setValue("title", req.title);
    setValue("icon", req.icon);
    setValue("countries", req.countries?.join(", ") as any);
    setValue("roles", req.roles?.join(", ") as any);
    setValue("eligibilityRequirements", req.eligibilityRequirements?.join("\n") as any);
    setValue("shortDescription", req.shortDescription);
    setValue("status", req.status);
    setValue("orderNumber", req.orderNumber);
    setValue("details", req.details);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this placement requirement permanently?")) return;
    try {
      const res = await fetch(`/api/requirements/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Requirement removed successfully");
        fetchRequirements();
      } else {
        toast.error("Failed to delete record");
      }
    } catch (error) {
      toast.error("An operational error occurred");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up font-sans">
      
      {/* ── ACTION BAR ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#24342b] tracking-tight">Placement Requirements</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Manage international job sectors, compliance requirements, and specific visa criteria.</p>
        </div>
        
        <button
          onClick={() => {
            reset();
            setEditingId(null);
            setIsModalOpen(true);
          }}
          className="bg-[#24342b] text-white px-6 py-3.5 rounded-none font-bold shadow-[0_8px_25px_rgba(36,52,43,0.25)] hover:shadow-[0_12px_30px_rgba(36,52,43,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2.5 text-sm"
        >
          <Plus size={16} /> Add Requirement Category
        </button>
      </div>

      {/* ── INTERACTIVE SEARCH / FILTER BAR ── */}
      <div className="bg-white p-4 rounded-none border border-slate-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search by title, description or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-none focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all text-xs font-semibold text-slate-700 placeholder-slate-400"
          />
        </div>
        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
          Showing {filteredReqs.length} of {requirements.length} categories
        </div>
      </div>

      {/* ── COMPILATION OF LISTINGS ── */}
      {loading ? (
        <div className="bg-white rounded-none border border-slate-100 p-16 flex justify-center shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-[#F5B301] rounded-none animate-spin"></div>
            <p className="text-slate-500 font-bold text-sm tracking-wide">Loading requirements database...</p>
          </div>
        </div>
      ) : (
        <>
          {/* DESKTOP DATA TABLE (Visible from md up) */}
          <div className="hidden md:block bg-white rounded-none border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/80 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] w-2/5">Category & Focus</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] w-1/5">Target Regions</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] w-1/12 text-center">Rank</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] w-1/6">Status</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] w-1/6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredReqs.map((req) => (
                    <tr key={req._id} className="hover:bg-[#24342b]/[0.02] transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-none bg-slate-50 border border-slate-200/50 flex items-center justify-center font-bold text-sm text-[#24342b] flex-shrink-0">
                            {req.icon ? req.icon.substring(0, 2) : "C"}
                          </div>
                          <div>
                            <div className="font-extrabold text-[#24342b] text-base leading-tight">{req.title}</div>
                            <div className="text-xs text-slate-400 mt-1 font-medium leading-relaxed">
                              {req.shortDescription.length > 70 
                                ? `${req.shortDescription.substring(0, 70)}...` 
                                : req.shortDescription}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap gap-1">
                          {req.countries.slice(0, 3).map((c, i) => (
                            <span 
                              key={i} 
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 text-slate-600 border border-slate-200/40 text-[10px] rounded-none font-bold"
                            >
                              <MapPin size={8} className="text-[#F5B301]" />
                              {c}
                            </span>
                          ))}
                          {req.countries.length > 3 && (
                            <span className="px-2 py-1 bg-[#24342b]/5 text-[#24342b] text-[10px] rounded-none font-black">
                              +{req.countries.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center text-sm font-bold text-slate-600">
                        {req.orderNumber}
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-none text-[10px] font-black uppercase tracking-wider ${
                          req.status === 'active' 
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' 
                            : 'bg-rose-50 text-rose-800 border border-rose-100'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-none ${
                            req.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                          }`}></span>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(req)} 
                            className="text-slate-600 hover:text-[#24342b] hover:bg-slate-50 p-2.5 rounded-none transition-all border border-slate-100 hover:border-slate-200 shadow-sm"
                            title="Edit Requirement"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={() => handleDelete(req._id)} 
                            className="text-rose-600 hover:text-rose-800 hover:bg-rose-50 p-2.5 rounded-none transition-all border border-transparent hover:border-rose-100 shadow-sm"
                            title="Delete Requirement"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredReqs.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center text-slate-500">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <div className="w-16 h-16 bg-slate-50 rounded-none flex items-center justify-center border border-slate-100 shadow-sm">
                            <Layers className="w-6 h-6 text-slate-300" />
                          </div>
                          <p className="text-base font-bold text-[#24342b]">No requirements found</p>
                          <p className="text-xs text-slate-400 font-medium">Try broadening your search query or add a brand new category.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* MOBILE RESPONSIVE CARDS (Visible on sm only, user request feedback) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredReqs.map((req) => (
              <div 
                key={req._id} 
                className="bg-white rounded-none p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-4 hover:border-slate-200 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-none bg-slate-50 border border-slate-200/50 flex items-center justify-center font-bold text-xs text-[#24342b]">
                      {req.icon ? req.icon.substring(0, 2) : "C"}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#24342b] text-base leading-tight">{req.title}</h4>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-1">Rank Order: {req.orderNumber}</span>
                    </div>
                  </div>
                  
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none text-[8px] font-black uppercase tracking-wider ${
                    req.status === 'active' 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' 
                      : 'bg-rose-50 text-rose-800 border border-rose-100'
                  }`}>
                    {req.status}
                  </span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {req.shortDescription}
                </p>

                {/* Country Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {req.countries.map((c, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-50 text-slate-600 border border-slate-200/40 text-[9px] rounded-none font-bold"
                    >
                      <MapPin size={7} className="text-[#F5B301]" />
                      {c}
                    </span>
                  ))}
                </div>

                {/* Action Buttons Row */}
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-50">
                  <button 
                    onClick={() => handleEdit(req)} 
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-none border border-slate-200/60 bg-slate-50 text-xs font-bold text-slate-700 hover:bg-slate-100"
                  >
                    <Edit2 size={12} />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(req._id)} 
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-none border border-transparent bg-rose-50 text-xs font-bold text-rose-700 hover:bg-rose-100/50"
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {filteredReqs.length === 0 && (
              <div className="bg-white rounded-none p-10 border border-slate-100 text-center text-slate-500 shadow-sm">
                <p className="text-sm font-bold">No results match your search.</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── HIGH-END EDIT MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-none shadow-2xl max-w-2xl w-full p-8 my-8 relative overflow-hidden border border-slate-100">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#24342b] to-[#F5B301]"></div>
            
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-black text-[#24342b] tracking-tight">{editingId ? "Edit Requirement" : "Add Requirement Category"}</h2>
                <p className="text-slate-400 text-xs mt-1 font-medium">Populate global parameters for live updates on the front page.</p>
              </div>
              
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-slate-400 hover:text-slate-700 hover:bg-slate-50 p-2.5 rounded-none transition-all border border-slate-100 hover:border-slate-200"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Category Title</label>
                  <input 
                    {...register("title", { required: true })} 
                    className="w-full p-3 bg-slate-50 border border-slate-200/80 rounded-none focus:ring-2 focus:ring-[#24342b] focus:border-transparent outline-none transition-all font-medium text-slate-800 text-sm shadow-inner" 
                    placeholder="e.g. Nursing & Healthcare" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Lucide Icon Title Name</label>
                  <input 
                    {...register("icon", { required: true })} 
                    className="w-full p-3 bg-slate-50 border border-slate-200/80 rounded-none focus:ring-2 focus:ring-[#24342b] focus:border-transparent outline-none transition-all font-medium text-slate-800 text-sm shadow-inner" 
                    placeholder="e.g. Heart or Truck" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Target Countries (comma separated)</label>
                <input 
                  {...register("countries", { required: true })} 
                  className="w-full p-3 bg-slate-50 border border-slate-200/80 rounded-none focus:ring-2 focus:ring-[#24342b] focus:border-transparent outline-none transition-all font-medium text-slate-800 text-sm shadow-inner" 
                  placeholder="e.g. UK, Germany, Canada" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Summary Tagline Description</label>
                <textarea 
                  {...register("shortDescription", { required: true })} 
                  className="w-full p-3 bg-slate-50 border border-slate-200/80 rounded-none focus:ring-2 focus:ring-[#24342b] focus:border-transparent outline-none transition-all resize-none text-slate-800 font-medium text-sm shadow-inner" 
                  rows={2}
                  placeholder="Summarize the core roles offered under this vertical..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Common Roles (comma separated)</label>
                  <input 
                    {...register("roles")} 
                    className="w-full p-3 bg-slate-50 border border-slate-200/80 rounded-none focus:ring-2 focus:ring-[#24342b] focus:border-transparent outline-none transition-all font-medium text-slate-800 text-sm shadow-inner" 
                    placeholder="e.g. Staff Nurse, Caregiver" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Eligibility List (one requirement per line)</label>
                  <textarea 
                    {...register("eligibilityRequirements")} 
                    className="w-full p-3 bg-slate-50 border border-slate-200/80 rounded-none focus:ring-2 focus:ring-[#24342b] focus:border-transparent outline-none transition-all resize-none font-medium text-slate-800 text-sm shadow-inner" 
                    rows={3} 
                    placeholder="e.g. B.Sc Nursing&#10;1+ Years experience"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Detailed Web Content</label>
                <textarea 
                  {...register("details")} 
                  className="w-full p-3 bg-slate-50 border border-slate-200/80 rounded-none focus:ring-2 focus:ring-[#24342b] focus:border-transparent outline-none transition-all resize-none font-mono text-xs text-slate-800 shadow-inner" 
                  rows={4}
                  placeholder="<p>Full job specifications, timelines, or procedures...</p>"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Order Priority Rank Number</label>
                  <input 
                    type="number" 
                    {...register("orderNumber")} 
                    className="w-full p-3 bg-slate-50 border border-slate-200/80 rounded-none focus:ring-2 focus:ring-[#24342b] focus:border-transparent outline-none transition-all font-medium text-slate-800 text-sm shadow-inner" 
                    defaultValue={0} 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Active Frontend Status</label>
                  <select 
                    {...register("status")} 
                    className="w-full p-3 bg-slate-50 border border-slate-200/80 rounded-none focus:ring-2 focus:ring-[#24342b] focus:border-transparent outline-none transition-all font-bold text-slate-700 text-sm"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="inactive">Inactive (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex justify-end gap-3 border-t border-slate-100 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-6 py-3 rounded-none font-bold text-slate-500 hover:bg-slate-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-[#24342b] text-white rounded-none font-bold hover:bg-[#1a251f] shadow-md transition-all text-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
