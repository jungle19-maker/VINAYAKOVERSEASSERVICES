/**
 * VOS — MongoDB Atlas Seed Script
 * Run with: node scripts/seed-atlas.mjs
 */

import { MongoClient } from "mongodb";

const MONGODB_URI =
  "mongodb+srv://junglecartoon19_db_user:KrTHjmMYXPiiu02b@cluster0.mongodb.net/vos?retryWrites=true&w=majority";

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
    details: "<p></p>",
    status: "active",
    orderNumber: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
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
    details: "<p></p>",
    status: "active",
    orderNumber: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
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
    details: "<p></p>",
    status: "active",
    orderNumber: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
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
    details: "<p></p>",
    status: "active",
    orderNumber: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
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
    details: "<p></p>",
    status: "active",
    orderNumber: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
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
    details: "<p></p>",
    status: "active",
    orderNumber: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const generalDocuments = [
  { title: "Valid Indian Passport (min. 2 years validity)", description: "Original + 2 photocopies", status: "active", countrySpecificNote: "", createdAt: new Date(), updatedAt: new Date() },
  { title: "Educational Certificates", description: "10th, 12th, Degree, Diploma — attested", status: "active", countrySpecificNote: "", createdAt: new Date(), updatedAt: new Date() },
  { title: "Work Experience Letter", description: "From previous employer(s)", status: "active", countrySpecificNote: "", createdAt: new Date(), updatedAt: new Date() },
  { title: "Skill / Trade Certificate", description: "ITI, NSDC, Skill India, or equivalent", status: "active", countrySpecificNote: "", createdAt: new Date(), updatedAt: new Date() },
  { title: "Medical Fitness Certificate", description: "From GAMCA / approved panel doctor", status: "active", countrySpecificNote: "", createdAt: new Date(), updatedAt: new Date() },
  { title: "Police Clearance Certificate (PCC)", description: "From local police / Passport Seva Kendra", status: "active", countrySpecificNote: "", createdAt: new Date(), updatedAt: new Date() },
  { title: "Passport-size Photographs", description: "6–8 recent photos (white background)", status: "active", countrySpecificNote: "", createdAt: new Date(), updatedAt: new Date() },
  { title: "Aadhaar Card / PAN Card", description: "Government ID proof", status: "active", countrySpecificNote: "", createdAt: new Date(), updatedAt: new Date() },
  { title: "Bank Statement (last 3 months)", description: "For Canada, Germany, and PR visa categories", status: "active", countrySpecificNote: "", createdAt: new Date(), updatedAt: new Date() },
  { title: "Emigration Clearance (ECR)", description: "For ECR passport holders going to notified countries", status: "active", countrySpecificNote: "", createdAt: new Date(), updatedAt: new Date() },
];

const ctaSetting = {
  heading: "Ready to Apply? We're Here to Help.",
  description: "Serving candidates from Una, Hamirpur, Kangra, and across Himachal Pradesh & Punjab border.",
  buttonText: "Register Now",
  buttonLink: "/contact-info",
  backgroundColor: "bg-[#24342b]",
  status: "active",
  createdAt: new Date(),
  updatedAt: new Date(),
};

async function seed() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log("⏳ Connecting to MongoDB Atlas...");
    await client.connect();
    console.log("✅ Connected successfully!\n");

    const db = client.db("vos");

    // ── 1. Seed Requirements ──
    console.log("📦 Seeding requirements...");
    const reqCollection = db.collection("requirements");
    for (const cat of jobCategories) {
      const exists = await reqCollection.findOne({ title: cat.title });
      if (!exists) {
        await reqCollection.insertOne(cat);
        console.log(`  ✅ Inserted: ${cat.title}`);
      } else {
        await reqCollection.updateOne(
          { title: cat.title },
          { $set: { roles: cat.roles, eligibilityRequirements: cat.eligibilityRequirements, icon: cat.icon, updatedAt: new Date() } }
        );
        console.log(`  🔄 Updated: ${cat.title}`);
      }
    }

    // ── 2. Seed Documents ──
    console.log("\n📄 Seeding documents...");
    const docCollection = db.collection("documents");
    for (const doc of generalDocuments) {
      const exists = await docCollection.findOne({ title: doc.title });
      if (!exists) {
        await docCollection.insertOne(doc);
        console.log(`  ✅ Inserted: ${doc.title}`);
      } else {
        console.log(`  ⏭️  Skipped (already exists): ${doc.title}`);
      }
    }

    // ── 3. Seed CTA Setting ──
    console.log("\n🎯 Seeding CTA settings...");
    const ctaCollection = db.collection("ctasettings");
    const ctaExists = await ctaCollection.findOne({});
    if (!ctaExists) {
      await ctaCollection.insertOne(ctaSetting);
      console.log("  ✅ CTA setting inserted.");
    } else {
      console.log("  ⏭️  CTA setting already exists. Skipping.");
    }

    console.log("\n🎉 Database seeded successfully on MongoDB Atlas!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  } finally {
    await client.close();
    console.log("🔌 Connection closed.");
  }
}

seed();
