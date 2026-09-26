import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, serverTimestamp, getDocs, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeS7M2tPptsH4YKBT90cvw-MdxCcp14b4",
  authDomain: "blessed-hearts.firebaseapp.com",
  projectId: "blessed-hearts",
  storageBucket: "blessed-hearts.firebasestorage.app",
  messagingSenderId: "608426710589",
  appId: "1:608426710589:web:00be31b41dadac9ce1bc54",
  measurementId: "G-XNJ2LVPWLG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const seedPosts = [
  {
    slug: "medicaid-waiver-programs-pa",
    title: "Understanding Medicaid Waiver Programs for Home Care in PA",
    date: "2026-06-25",
    image: "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60",
    category: "Medicaid Waiver",
    author: "Blessed Hearts Care Team",
    readTime: "5 min read",
    excerpt: "Pennsylvania's Medicaid waiver programs can cover in-home care costs for eligible seniors and adults with disabilities. Here's how the process works and how Blessed Hearts can help.",
    content: [
      "Many Pennsylvania families are surprised to learn that Medicaid waiver programs can pay for in-home caregiving services, not just nursing home care. These programs, sometimes called Home and Community-Based Services (HCBS) waivers, are designed to help people remain safely and independently in their own homes for as long as possible.",
      "Eligibility generally depends on income, assets, and a documented need for a nursing-facility level of care. A caseworker will typically complete an assessment to determine the number of care hours approved each week.",
      "Once approved, families can often choose their home care provider. Blessed Hearts Homecare works with families throughout York, Adams, Lancaster, Cumberland, and Dauphin counties to navigate paperwork, coordinate with case managers, and get compassionate care started quickly.",
      "If you're unsure whether your loved one qualifies, our team is happy to talk through the options with you at no cost. Reach out through our contact page or give us a call."
    ]
  },
  {
    slug: "signs-loved-one-needs-home-care",
    title: "7 Signs Your Loved One May Need In-Home Care",
    date: "2026-06-10",
    image: "https://images.unsplash.com/photo-1765896387387-0538bc9f997e?w=600&auto=format&fit=crop&q=60",
    category: "Caregiver Tips",
    author: "Blessed Hearts Care Team",
    readTime: "4 min read",
    excerpt: "From missed medications to a less-tidy home, small changes can signal it's time to consider extra support. Here's what to watch for.",
    content: [
      "It's not always one dramatic event that signals a loved one needs help at home — it's often a series of small changes. Noticing them early can make all the difference in keeping someone safe and comfortable.",
      "Watch for missed or doubled-up medications, unexplained bruises or falls, weight loss, a noticeably less tidy home, unpaid bills piling up, withdrawal from hobbies or friends, and difficulty with everyday tasks like bathing or cooking.",
      "If a few of these sound familiar, it may be time for a conversation about additional support. A trained caregiver can step in with as little or as much help as needed, from a few hours a week to full-time companionship and personal care.",
      "Blessed Hearts Homecare offers a free in-home consultation to help families understand what level of care makes sense."
    ]
  },
  {
    slug: "caregiver-burnout-family-caregivers",
    title: "Caregiver Burnout: Why Respite Care Matters",
    date: "2026-05-22",
    image: "https://plus.unsplash.com/premium_photo-1664475811964-75af7d90ee4b?w=600&auto=format&fit=crop&q=60",
    category: "Caregiver Tips",
    author: "Blessed Hearts Care Team",
    readTime: "4 min read",
    excerpt: "Caring for a family member is rewarding — and exhausting. Respite care gives caregivers permission to rest without guilt.",
    content: [
      "Family caregivers often put their own needs last, and over time that catches up with them physically and emotionally. Caregiver burnout is real, and it can affect the quality of care a loved one receives.",
      "Respite care offers short-term relief: a trained Blessed Hearts caregiver steps in for a few hours, a full day, or even longer, so you can rest, run errands, or simply breathe.",
      "Taking a break isn't a failure — it's what keeps you able to keep showing up for the person you love. If you've been running on empty, it may be time to ask for help."
    ]
  },
  {
    slug: "creating-safe-home-for-seniors",
    title: "Creating a Safe Home Environment for Seniors",
    date: "2026-05-08",
    image: "https://images.unsplash.com/photo-1758691736780-b38fa116b9b3?w=600&auto=format&fit=crop&q=60",
    category: "Caregiver Tips",
    author: "Blessed Hearts Care Team",
    readTime: "6 min read",
    excerpt: "Simple home modifications can significantly reduce fall risk and help seniors maintain independence in the home they love.",
    content: [
      "Falls are one of the leading causes of injury among older adults, but most home hazards can be addressed with simple, inexpensive fixes.",
      "Start by removing throw rugs or taping them down securely. Ensure hallways and stairwells are brightly lit, and consider adding motion-sensor nightlights along paths to the bathroom.",
      "In the bathroom, install secure grab bars near the toilet and shower, use non-slip mats, and consider a shower chair if standing is difficult. Keep frequently used kitchen items within easy reach so climbing or stooping isn't necessary.",
      "A home safety assessment by a home care professional can identify hidden hazards and give your family peace of mind."
    ]
  },
  {
    slug: "difference-between-home-care-and-home-health",
    title: "Home Care vs. Home Health: What's the Difference?",
    date: "2026-04-18",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=60",
    category: "Caregiver Tips",
    author: "Blessed Hearts Care Team",
    readTime: "5 min read",
    excerpt: "The terms sound similar, but they mean very different things. Here's a clear breakdown of each type of care and which your family may need.",
    content: [
      "People often use 'home care' and 'home health' interchangeably, but they serve different needs and are covered differently by insurance.",
      "Home Health is skilled clinical care ordered by a doctor — like wound care, physical therapy, or medication administration after a hospital discharge. It's usually short-term and covered by Medicare or private health insurance.",
      "Home Care (what Blessed Hearts provides) is non-medical, personal support with everyday activities: bathing, dressing, meal preparation, medication reminders, light housekeeping, and companionship. It helps people live safely at home on an ongoing basis.",
      "Many families use both: home health for medical recovery and home care for everyday support. We're happy to coordinate with your home health agency to ensure seamless care."
    ]
  },
  {
    slug: "talking-to-aging-parents-about-care",
    title: "How to Talk to Aging Parents About Needing Care",
    date: "2026-04-02",
    image: "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=600&auto=format&fit=crop&q=60",
    category: "Caregiver Tips",
    author: "Blessed Hearts Care Team",
    readTime: "5 min read",
    excerpt: "Starting the conversation about home care can feel uncomfortable. Here are practical tips for approaching your parents with empathy and respect.",
    content: [
      "Bringing up the topic of home care is rarely easy. Parents may worry about losing their independence, having a stranger in their home, or burdening their children financially.",
      "Start early, before a crisis forces the issue. Frame the conversation around independence: extra help at home actually makes it possible to stay home longer, not the other way around.",
      "Ask questions rather than giving instructions: 'How are you managing with meals lately?' or 'Would it help if someone took care of the laundry so you could spend more time on things you enjoy?'",
      "Involve them in every decision, including choosing the care provider. At Blessed Hearts, we offer a relaxed, no-pressure consultation so families can get to know us before making any commitments."
    ]
  },
  {
    slug: "navigating-dementia-care-at-home",
    title: "Navigating Dementia Care at Home: Advice for Families",
    date: "2026-03-15",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=60",
    category: "Caregiver Tips",
    author: "Blessed Hearts Care Team",
    readTime: "6 min read",
    excerpt: "Caring for someone with Alzheimer's or dementia requires patience, routine, and specialized strategies. Here's what helps families manage at home.",
    content: [
      "A dementia diagnosis brings unique challenges for the whole family. Changes in memory, mood, and behavior require a flexible, compassionate approach that adapts as the condition progresses.",
      "Keep daily routines consistent: wake-up times, meals, and activities. Familiar structure reduces anxiety and confusion. Keep the environment calm, minimize loud noises, and communicate with short, clear sentences and gentle reassurance.",
      "Safety is paramount. Watch for wandering, ensure appliances are safe, and simplify living spaces to reduce frustration. It's equally important for family caregivers to build a support network — trying to manage dementia alone leads quickly to exhaustion.",
      "Blessed Hearts caregivers receive specialized training in dementia and Alzheimer's support, bringing calm, experienced assistance into your home."
    ]
  }
];

async function seedBlogs() {
  console.log("=========================================================");
  console.log("SEEDING BLOG POSTS INTO 'BHH-Blogs' COLLECTION...");
  console.log("=========================================================");

  try {
    for (const post of seedPosts) {
      const docRef = doc(db, "BHH-Blogs", post.slug);
      await setDoc(docRef, {
        brand: "BHH",
        collection: "BHH-Blogs",
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        author: post.author,
        readTime: post.readTime,
        image: post.image,
        status: "published",
        date: post.date,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      console.log(`✓ Seeded blog: [${post.slug}] "${post.title}"`);
    }

    const snap = await getDocs(collection(db, "BHH-Blogs"));
    console.log(`\nAll done! Total documents in 'BHH-Blogs': ${snap.size}`);
  } catch (error) {
    console.error("Error seeding blogs:", error.message || error);
  }
}

seedBlogs().then(() => process.exit(0));
