import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import config from './firebase-applet-config.json' with { type: "json" };

const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

const heroConfig = {
  heroTitleLine1: "Electronics,",
  heroTitleLine2: "Management &",
  heroTitleLine3: "Consulting.",
  heroDescription: "Electronics & Communication Engineer with a strong foundation in strategy, operations, and analytical problem-solving. Adept at integrating technical expertise with business acumen to optimize processes, manage projects, and drive sustainable growth. Committed to delivering impactful solutions at the intersection of engineering and management.",
  linkedin: "https://www.linkedin.com/in/harsh-thaker-a9b664230?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  email: "harshthaker84@gmail.com",
  profileName: "Harsh Thaker",
};

async function seed() {
  try {
    await setDoc(doc(db, "config", "main"), heroConfig);
    console.log("Config seeded!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
