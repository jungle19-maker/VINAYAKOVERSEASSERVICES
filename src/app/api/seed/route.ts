import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Requirement from "@/models/Requirement";
import DocumentModel from "@/models/Document";
import CtaSetting from "@/models/CtaSetting";

const jobCategories = [
  {
    icon: "Heart",
    title: "Nursing & Healthcare",
    countries: ["UK", "Germany", "Gulf Countries", "Canada"],
    roles: ["Staff Nurse", "Caregiver", "Medical Lab Technician", "Paramedic"],
    eligibilityRequirements: [
      "B.Sc Nursing / GNM / ANM qualification",
      "Valid nursing council registration (INC/State)",
      "Minimum 1–2 years clinical experience",
      "IELTS / OET score (for UK, Canada, Germany)",
      "Valid Indian passport (min. 2 years validity)",
      "Medical fitness certificate",
    ],
    shortDescription: "Nursing jobs in UK from Una HP",
    status: "active",
    orderNumber: 1,
  },
  {
    icon: "Truck",
    title: "Driver & Transport",
    countries: ["Dubai", "Saudi Arabia", "Qatar", "Oman"],
    roles: ["Heavy Vehicle Driver", "Light Vehicle Driver", "Forklift Operator", "Delivery Driver"],
    eligibilityRequirements: [
      "Valid Indian driving licence (LMV / HMV)",
      "Minimum 3 years driving experience",
      "Clean driving record",
      "International driving permit (preferred)",
      "Valid passport with 2+ years validity",
      "Basic English communication skills",
    ],
    shortDescription: "Driver jobs abroad Una HP",
    status: "active",
    orderNumber: 2,
  },
  {
    icon: "Hammer",
    title: "Construction & Skilled Trades",
    countries: ["Dubai", "Saudi Arabia", "Qatar", "Kuwait", "Oman"],
    roles: ["Mason / Carpenter", "Electrician", "Plumber", "Welder", "Steel Fixer", "Site Supervisor"],
    eligibilityRequirements: [
      "ITI / Diploma in relevant trade (preferred)",
      "Minimum 2 years site experience",
      "Skill India / NSDC certificate (advantageous)",
      "Physical fitness & medical clearance",
      "Valid passport",
      "No criminal record",
    ],
    shortDescription: "Construction work visa Una",
    status: "active",
    orderNumber: 3,
  },
  {
    icon: "Globe",
    title: "Canada PR & Express Entry",
    countries: ["Canada"],
    roles: ["Skilled Worker PR", "Provincial Nominee Program", "Family Sponsorship", "Study-to-PR Pathway"],
    eligibilityRequirements: [
      "Minimum 67 points on CRS (Comprehensive Ranking System)",
      "IELTS CLB 7+ (Express Entry FSW)",
      "1+ year skilled work experience (NOC category)",
      "Educational Credential Assessment (ECA)",
      "Proof of settlement funds",
      "Police clearance & medical exam",
    ],
    shortDescription: "Canada PR consultancy Una HP",
    status: "active",
    orderNumber: 4,
  },
  {
    icon: "Briefcase",
    title: "Germany Skilled Worker Visa",
    countries: ["Germany"],
    roles: ["Nurse / Caregiver", "Mechanical Engineer", "IT Professional", "Chef / Cook", "Welder"],
    eligibilityRequirements: [
      "Recognized qualification equivalent to German standards",
      "German language proficiency A2–B2 (Goethe certificate)",
      "Job offer from German employer (Skilled Immigration Act)",
      "Credential recognition by German authority",
      "Valid passport & visa application",
      "APS certificate (for Indian graduates)",
    ],
    shortDescription: "Germany nursing jobs Una",
    status: "active",
    orderNumber: 5,
  },
  {
    icon: "MapPin",
    title: "Dubai & Gulf Jobs",
    countries: ["Dubai", "Abu Dhabi", "Sharjah", "Riyadh", "Doha"],
    roles: ["Hospitality Staff", "Security Guard", "Sales Executive", "IT Support", "Admin Staff"],
    eligibilityRequirements: [
      "Relevant educational qualification (10th–Degree)",
      "Prior experience preferred (1–3 years)",
      "Valid passport with 2+ years validity",
      "Medical fitness certificate",
      "Good conduct certificate / police clearance",
      "Emigration clearance (ECR / ECNR as applicable)",
    ],
    shortDescription: "Dubai job agencies near me Una",
    status: "active",
    orderNumber: 6,
  },
];

const generalDocuments = [
  { title: "Valid Indian Passport (min. 2 years validity)", description: "Original + 2 photocopies" },
  { title: "Educational Certificates", description: "10th, 12th, Degree, Diploma — attested" },
  { title: "Work Experience Letter", description: "From previous employer(s)" },
  { title: "Skill / Trade Certificate", description: "ITI, NSDC, Skill India, or equivalent" },
  { title: "Medical Fitness Certificate", description: "From GAMCA / approved panel doctor" },
  { title: "Police Clearance Certificate (PCC)", description: "From local police / Passport Seva Kendra" },
  { title: "Passport-size Photographs", description: "6–8 recent photos (white background)" },
  { title: "Aadhaar Card / PAN Card", description: "Government ID proof" },
  { title: "Bank Statement (last 3 months)", description: "For Canada, Germany, and PR visa categories" },
  { title: "Emigration Clearance (ECR)", description: "For ECR passport holders going to notified countries" },
];

export async function GET() {
  try {
    await connectToDatabase();

    // 1. Seed Requirements
    for (const cat of jobCategories) {
      const exists = await Requirement.findOne({ title: cat.title });
      if (!exists) {
        await Requirement.create({ ...cat, details: "<p></p>" });
      } else {
        await Requirement.updateOne(
          { title: cat.title },
          { $set: { roles: cat.roles, eligibilityRequirements: cat.eligibilityRequirements, icon: cat.icon, details: "<p></p>" } }
        );
      }
    }

    // 2. Seed Documents
    if (DocumentModel) {
      for (const doc of generalDocuments) {
        const exists = await DocumentModel.findOne({ title: doc.title });
        if (!exists) {
          await DocumentModel.create({ ...doc, status: "active", countrySpecificNote: "" });
        }
      }
    }

    // 3. Seed CTA
    if (CtaSetting) {
      const ctaExists = await CtaSetting.findOne({});
      if (!ctaExists) {
        await CtaSetting.create({
          heading: "Ready to Apply? We're Here to Help.",
          description: "Serving candidates from Una, Hamirpur, Kangra, and across Himachal Pradesh & Punjab border.",
          buttonText: "Register Now",
          buttonLink: "/contact-info",
          backgroundColor: "bg-[#24342b]",
          status: "active"
        });
      }
    }

    return NextResponse.json({ message: "Database seeded successfully! You can check your MongoDB Atlas now." }, { status: 200 });
  } catch (error: any) {
    console.error("Seeding error:", error);
    return NextResponse.json({ message: "Failed to seed database", error: error.message }, { status: 500 });
  }
}
