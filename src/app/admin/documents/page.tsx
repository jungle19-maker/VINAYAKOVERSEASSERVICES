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
  FileText, 
  AlertCircle, 
  Eye, 
  Layers 
} from "lucide-react";

type DocumentItem = {
  _id: string;
  title: string;
  description: string;
  priorityNumber: number;
  countrySpecificNote: string;
  status: "active" | "inactive";
};

export default function AdminDocuments() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<DocumentItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<DocumentItem>();

  const fetchDocuments = async () => {
    try {
      const res = await fetch("/api/documents");
      const data = await res.json();
      setDocuments(data);
      setFilteredDocs(data);
    } catch (error) {
      toast.error("Failed to load documents list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Filter documents in real time
  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) {
      setFilteredDocs(documents);
      return;
    }

    const filtered = documents.filter(
      (doc) =>
        doc.title.toLowerCase().includes(term) ||
        doc.description.toLowerCase().includes(term) ||
        (doc.countrySpecificNote && doc.countrySpecificNote.toLowerCase().includes(term))
    );
    setFilteredDocs(filtered);
  }, [searchTerm, documents]);

  const onSubmit = async (data: DocumentItem) => {
    try {
      const url = editingId ? `/api/documents/${editingId}` : "/api/documents";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success(editingId ? "Document updated successfully" : "Document created successfully");
        setIsModalOpen(false);
        reset();
        setEditingId(null);
        fetchDocuments();
      } else {
        toast.error("Failed to save document specifications");
      }
    } catch (error) {
      toast.error("An operational error occurred");
    }
  };

  const handleEdit = (doc: DocumentItem) => {
    setEditingId(doc._id);
    setValue("title", doc.title);
    setValue("description", doc.description);
    setValue("priorityNumber", doc.priorityNumber);
    setValue("countrySpecificNote", doc.countrySpecificNote);
    setValue("status", doc.status);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this mandatory document requirements check permanently?")) return;
    try {
      const res = await fetch(`/api/documents/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Document requirement removed");
        fetchDocuments();
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
          <h1 className="text-3xl font-extrabold text-[#24342b] tracking-tight">Compliance Documents</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Configure mandatory papers, identification rules, and country-specific attestation notes.</p>
        </div>
        
        <button
          onClick={() => {
            reset();
            setEditingId(null);
            setIsModalOpen(true);
          }}
          className="bg-[#24342b] text-white px-6 py-3.5 rounded-none font-bold shadow-[0_8px_25px_rgba(36,52,43,0.25)] hover:shadow-[0_12px_30px_rgba(36,52,43,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2.5 text-sm"
        >
          <Plus size={16} /> Add Compliance Document
        </button>
      </div>

      {/* ── SEARCH & FILTER BAR ── */}
      <div className="bg-white p-4 rounded-none border border-slate-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search by title, description or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-none focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all text-xs font-semibold text-slate-700 placeholder-slate-400"
          />
        </div>
        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
          Showing {filteredDocs.length} of {documents.length} documents
        </div>
      </div>

      {/* ── DOCUMENTS LIST CONTENT ── */}
      {loading ? (
        <div className="bg-white rounded-none border border-slate-100 p-16 flex justify-center shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-[#F5B301] rounded-none animate-spin"></div>
            <p className="text-slate-500 font-bold text-sm tracking-wide">Loading compliance checklists...</p>
          </div>
        </div>
      ) : (
        <>
          {/* DESKTOP DATA TABLE */}
          <div className="hidden md:block bg-white rounded-none border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/80 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] w-1/2">Required Document Name & Summary</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] w-1/12 text-center">Priority</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] w-1/6">Status</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] w-1/6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredDocs.map((doc) => (
                    <tr key={doc._id} className="hover:bg-[#24342b]/[0.02] transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-none bg-slate-50 border border-slate-200/50 flex items-center justify-center font-bold text-sm text-[#24342b] flex-shrink-0">
                            <FileText size={16} className="text-[#F5B301]" />
                          </div>
                          <div>
                            <div className="font-extrabold text-[#24342b] text-base leading-tight">{doc.title}</div>
                            <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed">{doc.description}</p>
                            {doc.countrySpecificNote && (
                              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-100 text-[10px] rounded-none font-bold">
                                <AlertCircle size={9} />
                                Note: {doc.countrySpecificNote}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center text-sm font-bold text-slate-600">
                        {doc.priorityNumber}
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-none text-[10px] font-black uppercase tracking-wider ${
                          doc.status === 'active' 
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' 
                            : 'bg-rose-50 text-rose-800 border border-rose-100'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-none ${
                            doc.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                          }`}></span>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(doc)} 
                            className="text-slate-600 hover:text-[#24342b] hover:bg-slate-50 p-2.5 rounded-none transition-all border border-slate-100 hover:border-slate-200 shadow-sm"
                            title="Edit Document"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={() => handleDelete(doc._id)} 
                            className="text-rose-600 hover:text-rose-800 hover:bg-rose-50 p-2.5 rounded-none transition-all border border-transparent hover:border-rose-100 shadow-sm"
                            title="Delete Document"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredDocs.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-16 text-center text-slate-500">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <div className="w-16 h-16 bg-slate-50 rounded-none flex items-center justify-center border border-slate-100 shadow-sm">
                            <Layers className="w-6 h-6 text-slate-300" />
                          </div>
                          <p className="text-base font-bold text-[#24342b]">No compliance records found</p>
                          <p className="text-xs text-slate-400 font-medium">Try broadening your search query or add a brand new record.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* MOBILE RESPONSIVE CARDS */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredDocs.map((doc) => (
              <div 
                key={doc._id} 
                className="bg-white rounded-none p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-4 hover:border-slate-200 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-none bg-slate-50 border border-slate-200/50 flex items-center justify-center font-bold text-xs text-[#24342b]">
                      <FileText size={16} className="text-[#F5B301]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#24342b] text-base leading-tight">{doc.title}</h4>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-1">Priority: {doc.priorityNumber}</span>
                    </div>
                  </div>
                  
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none text-[8px] font-black uppercase tracking-wider ${
                    doc.status === 'active' 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' 
                      : 'bg-rose-50 text-rose-800 border border-rose-100'
                  }`}>
                    {doc.status}
                  </span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {doc.description}
                </p>

                {doc.countrySpecificNote && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-100 text-[10px] rounded-none font-bold w-full">
                    <AlertCircle size={9} />
                    Note: {doc.countrySpecificNote}
                  </div>
                )}

                {/* Mobile Button Actions */}
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-50">
                  <button 
                    onClick={() => handleEdit(doc)} 
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-none border border-slate-200/60 bg-slate-50 text-xs font-bold text-slate-700 hover:bg-slate-100"
                  >
                    <Edit2 size={12} />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(doc._id)} 
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-none border border-transparent bg-rose-50 text-xs font-bold text-rose-700 hover:bg-rose-100/50"
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {filteredDocs.length === 0 && (
              <div className="bg-white rounded-none p-10 border border-slate-100 text-center text-slate-500 shadow-sm">
                <p className="text-sm font-bold">No results match your search query.</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── EDIT MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-none shadow-2xl max-w-lg w-full p-8 relative overflow-hidden border border-slate-100">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#24342b] to-[#F5B301]"></div>
            
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-black text-[#24342b] tracking-tight">{editingId ? "Edit Document" : "Add Compliance Document"}</h2>
                <p className="text-slate-400 text-xs mt-1 font-medium">Add parameters to register mandatory applicant checklists.</p>
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
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Document Name Title</label>
                <input 
                  {...register("title", { required: true })} 
                  className="w-full p-3 bg-slate-50 border border-slate-200/80 rounded-none focus:ring-2 focus:ring-[#24342b] focus:border-transparent outline-none transition-all font-medium text-slate-800 text-sm shadow-inner" 
                  placeholder="e.g. Valid Passport (Minimum 2 years validity)" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Detailed Checklist Description</label>
                <textarea 
                  {...register("description", { required: true })} 
                  className="w-full p-3 bg-slate-50 border border-slate-200/80 rounded-none focus:ring-2 focus:ring-[#24342b] focus:border-transparent outline-none transition-all resize-none text-slate-800 font-medium text-sm shadow-inner" 
                  rows={3} 
                  placeholder="e.g. Original passport + 3 clear colour copies including ECR/ECNR information page..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Country Specific Note (Optional)</label>
                <input 
                  {...register("countrySpecificNote")} 
                  className="w-full p-3 bg-slate-50 border border-slate-200/80 rounded-none focus:ring-2 focus:ring-[#24342b] focus:border-transparent outline-none transition-all font-medium text-slate-800 text-sm shadow-inner" 
                  placeholder="e.g. For UAE visa, degree requires MEA and embassy attestation." 
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Priority Sort Number</label>
                  <input 
                    type="number" 
                    {...register("priorityNumber")} 
                    className="w-full p-3 bg-slate-50 border border-slate-200/80 rounded-none focus:ring-2 focus:ring-[#24342b] focus:border-transparent outline-none transition-all font-medium text-slate-800 text-sm shadow-inner" 
                    defaultValue={0} 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Frontend Visibility Status</label>
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
                  Save Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
