import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "./src/lib/firebase";
import { defaultProjects as projects } from "./src/components/portfolio/Projects";
import { defaultItems as experiences } from "./src/components/portfolio/Experience";
import { defaultCertificateCategories as certificateCategories } from "./src/components/portfolio/Certificates";
import { defaultGroups as skills } from "./src/components/portfolio/Skills";

const siteConfig = {
  heroTitle: "Process Optimization & R&D",
  heroSubtitle: "Based in NY • Working Worldwide",
  profileName: "Jimil Pandit",
  profileRole: "Operations & Business Strategy",
  profileDescription: "Optimizing enterprise workflows & architecting intelligent operations strategies for startups and industrial giants.",
  email: "hello@jimilpandit.com",
  linkedin: "https://linkedin.com/in/jimil-pandit"
};

// Seed function
async function seed() {
  console.log("Seeding site config...");
  await setDoc(doc(db, "config", "main"), siteConfig);

  console.log("Seeding projects...");
  let order = 1;
  for (const p of projects) {
    const docRef = doc(collection(db, "projects"));
    const pWithOrder = { ...p, order }; // Make sure to add 'order'
    await setDoc(docRef, pWithOrder);
    order++;
  }
  
  console.log("Seeding experiences...");
  order = 1;
  for (const e of experiences) {
    const docRef = doc(collection(db, "experiences"));
    const eWithOrder = { ...e, order };
    await setDoc(docRef, eWithOrder);
    order++;
  }

  console.log("Seeding certificates...");
  order = 1;
  for (const c of certificateCategories) {
    for (const item of c.items) {
       const docRef = doc(collection(db, "certificates"));
       const itemWithOrder = { ...item, category: c.id, order };
       await setDoc(docRef, itemWithOrder);
       order++;
    }
  }

  console.log("Seeding skills...");
  order = 1;
  for (const s of skills) {
    const docRef = doc(collection(db, "skills"));
    const sWithOrder = { ...s, order };
    await setDoc(docRef, sWithOrder);
    order++;
  }
  
  console.log("Done seeding everything.");
  process.exit(0);
}

seed().catch(console.error);
