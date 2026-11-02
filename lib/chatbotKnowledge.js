import { site } from "./site.js";

export const BHH_COMPREHENSIVE_KNOWLEDGE = {
  company: {
    name: "Blessed Hearts Homecare",
    shortName: "Blessed Hearts",
    tagline: "Care from the Heart",
    phone: "(223) 260-9042",
    phoneHref: "tel:+12232609042",
    fax: "(223) 210-3600",
    email: "blessedheartshca1@gmail.com",
    address: "1224 S Queen St, Suite 206, York, PA 17403",
    experience: "15+ years of combined director experience in clinical and in-home care.",
    licensing: "Licensed by the Pennsylvania Department of Health, fully insured, and bonded.",
    minimumHours: "4 hours minimum per visit, with flexible daily and weekly scheduling.",
    responseTime: "We respond within one business day and typically match caregivers within 24 to 48 hours.",
    mission: "To support seniors, veterans, and individuals with disabilities across South Central PA with dignified, compassionate in-home care that empowers them to age safely and independently in the comfort of their own homes.",
    coreValues: [
      "Dignity & Respect: Honoring each individual's life story and autonomy.",
      "Reliability & Consistency: Dependable scheduling with dedicated primary caregivers and guaranteed backup coverage.",
      "Compassion & Empathy: Caregivers who treat clients like family.",
      "Transparency: Open communication with families and case managers.",
    ],
  },

  services: [
    {
      name: "Personal Care",
      summary: "Respectful, hands-on assistance with activities of daily living (ADLs).",
      details: [
        "Bathing, showering, and bed baths with total dignity",
        "Dressing, clothing selection, and grooming assistance",
        "Toileting and incontinence care",
        "Safe transfer assistance (bed, chair, wheelchair, commode)",
        "Mobility support, walking assistance, and fall prevention",
      ],
    },
    {
      name: "Companion Care",
      summary: "Social, emotional, and cognitive support to combat senior isolation.",
      details: [
        "Meaningful conversation, storytelling, and active listening",
        "Card games, board games, puzzles, crafts, and reading",
        "Accompanying on neighborhood walks and light gardening",
        "Support with hobbies and staying mentally stimulated",
      ],
    },
    {
      name: "Light Housekeeping",
      summary: "Keeping the home clean, sanitized, and free of fall hazards.",
      details: [
        "Washing, folding, and putting away laundry and bed linens",
        "Washing dishes, wiping kitchen counters, and cleaning appliances",
        "Sanitizing bathrooms, sinks, and commodes",
        "Vacuuming, sweeping, and mopping floors",
        "Taking out trash and clearing walkways of trip hazards",
      ],
    },
    {
      name: "Meal Preparation & Nutrition",
      summary: "Fresh, nutritious home-cooked meals tailored to dietary restrictions.",
      details: [
        "Planning meals around diabetic, low-sodium, cardiac, or soft diets",
        "Cooking fresh meals and preparing healthy snacks",
        "Grocery shopping and pantry organization",
        "Hydration reminders and tracking water intake",
      ],
    },
    {
      name: "Alzheimer's & Dementia Care",
      summary: "Specialized memory support by caregivers trained in cognitive disorders.",
      details: [
        "Structured daily routines to reduce confusion and anxiety",
        "Gentle redirection and calming de-escalation for sundowning",
        "Wandering prevention and home safety supervision",
        "Memory-friendly activities and nostalgic music/photo engagement",
        "Family caregiver respite and emotional support",
      ],
    },
    {
      name: "Respite Care",
      summary: "Temporary relief for family caregivers to rest, travel, or work.",
      details: [
        "Flexible scheduling: Hourly, daily, weekend, or overnight",
        "Complete continuity of care while family recharges",
        "Reduces family burnout and stress",
      ],
    },
    {
      name: "Transportation & Errand Support",
      summary: "Safe accompaniment to medical and community appointments.",
      details: [
        "Rides to doctors, specialists, clinics, and physical therapy",
        "Prescription pickups at pharmacies",
        "Grocery shopping and banking errands",
        "Visits to friends, church, hair salons, and family gatherings",
      ],
    },
    {
      name: "24-Hour & Live-In Care",
      summary: "Around-the-clock monitoring and continuous peace of mind.",
      details: [
        "Day and night shifts ensuring a caregiver is always present",
        "Overnight assistance for late-night bathroom trips and safety",
        "Ideal for advanced dementia, post-rehab, or severe mobility needs",
      ],
    },
    {
      name: "Post-Hospital / Post-Surgery Transition Care",
      summary: "Safe transition from hospital or rehab back to home.",
      details: [
        "Follow doctor's discharge instructions and medication reminders",
        "Support safe movement to prevent falls and readmissions",
        "Meal prep and light chores while patient regains strength",
      ],
    },
  ],

  counties: [
    {
      name: "York County",
      cities: "York, Hanover, Red Lion, Dallastown, Spring Grove, Shrewsbury, Manchester, Stewartstown",
    },
    {
      name: "Lancaster County",
      cities: "Lancaster City, Lititz, Ephrata, Manheim, Columbia, Mount Joy, Elizabethtown, Millersville",
    },
    {
      name: "Dauphin County",
      cities: "Harrisburg, Hershey, Hummelstown, Middletown, Steelton, Millersburg, Dauphin, Halifax",
    },
    {
      name: "Cumberland County",
      cities: "Carlisle, Mechanicsburg, Camp Hill, Shiremanstown, Enola, Lemoyne, New Cumberland",
    },
    {
      name: "Berks County",
      cities: "Reading, Wyomissing, Kutztown, Boyertown, Hamburg, Birdsboro, Fleetwood, West Reading",
    },
    {
      name: "Adams County",
      cities: "Gettysburg, Littlestown, East Berlin, New Oxford, McSherrystown, Carroll Valley, Abbottstown",
    },
    {
      name: "Lebanon County",
      cities: "Lebanon City, Palmyra, Annville, Myerstown, Cornwall, Cleona, Jonestown",
    },
    {
      name: "Perry County",
      cities: "New Bloomfield, Duncannon, Marysville, Newport, Liverpool, Landisburg, Blain",
    },
    {
      name: "Lehigh County",
      cities: "Allentown, Bethlehem, Emmaus, Macungie, Whitehall, Coopersburg, Catasauqua",
    },
    {
      name: "Northampton County",
      cities: "Easton, Bethlehem, Nazareth, Palmer, Wilson, Hellertown, Bangor, Bath",
    },
  ],

  paymentAndWaivers: {
    medicaidWaiver: "Pennsylvania Community HealthChoices (CHC) covers in-home care for eligible seniors and individuals with physical disabilities who qualify for nursing-facility level of care. We work closely with Service Coordinators from Keystone First, UPMC, and PA Health & Wellness.",
    privatePay: "Affordable, transparent hourly rates tailored to the required care level and hours. No long-term lock-in contracts.",
    ltcInsurance: "We accept and help verify coverage for Long-Term Care Insurance policies.",
    vaBenefits: "Veterans and surviving spouses may qualify for VA Aid & Attendance to cover in-home care costs.",
    medicareNotice: "Traditional Medicare does not pay for non-medical home care (bathing, companion, chores). It only covers short-term skilled medical nursing prescribed by a doctor.",
    taxDeductible: "Home care medical/personal care expenses may be tax-deductible if prescribed as medically necessary by a physician.",
  },

  caregiverStandards: {
    screening: "100% PA State Police criminal background checks, FBI fingerprinting, PA Child Abuse History clearances, and multi-point reference reviews.",
    training: "Extensive orientation on infection control, safe transfer protocols, Alzheimer's & dementia communication, and client dignity.",
    matching: "Caregivers are matched by location, personality, language, and specific care skills. Families meet the caregiver before services begin.",
    backupGuarantee: "If your primary caregiver is sick or unavailable, our supervisory team arranges qualified backup coverage immediately.",
  },

  languageAssistance: {
    lepPolicy: "Free language interpretation and translation services are provided to all individuals with Limited English Proficiency (LEP) in compliance with PA MA Bulletins 99-17-11 & 99-25-01, Section 1557 ACA, and Title VI of the Civil Rights Act.",
    supportedCount: "19+ non-English languages including Spanish, Chinese Mandarin, Nepali, Russian, Arabic, Haitian Creole, Vietnamese, Ukrainian, Cantonese, Portuguese, Bengali, French, Cambodian (Khmer), Korean, Gujarati, Hindi, Urdu, Burmese, and Albanian.",
    auxiliaryAids: "Free Telecommunications Relay Service via TTY: 711, qualified sign language interpreters, and accessible format care plans.",
    bilingualCaregivers: "We actively recruit and match clients with bilingual caregivers who share their primary language and cultural background.",
  },

  agencyTransfer: {
    info: "Families and clients can transfer to Blessed Hearts Homecare at any time without interruption to their care. We handle the paperwork, coordinate with your CHC Service Coordinator, and can even hire your current favorite caregiver so they stay with you with better support.",
  },
};

/**
 * Enhanced NLP Response Engine covering all website details
 */
export function getChatbotResponse(userMessage, chatHistory = []) {
  const q = userMessage.toLowerCase().trim();

  // 1. GREETINGS
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|howdy|greetings|hola)\b/i.test(q) && q.length < 25) {
    return {
      text: "Hey! Thanks for reaching out to Blessed Hearts Homecare. 😊 How can I assist you or your family today? You can ask about our in-home care services, 10 PA counties served, Medicaid waivers & pricing, or request a free consultation!",
      quickReplies: ["What services do you provide?", "Areas you serve", "Cost & Medicaid Waivers", "Request Free Consultation"],
    };
  }

  // 2. SERVICES QUERY (e.g. "what are the services you guys are providing ?")
  if (
    q.includes("service") ||
    q.includes("what do you provide") ||
    q.includes("what can you do") ||
    q.includes("what you guys are providing") ||
    q.includes("what you offer") ||
    q.includes("help with") ||
    q.includes("types of care") ||
    q.includes("what care")
  ) {
    return {
      text: `Hey! Thanks for your question. Here is the list of comprehensive in-home care services that we provide across Pennsylvania:\n\n• **Personal Care** – Dignified, hands-on assistance with bathing, dressing, grooming, toileting, hygiene, and safe mobility.\n• **Companion Care** – Engaging conversation, shared activities, card games, walks, and emotional companionship.\n• **Light Housekeeping** – Laundry, dishes, bed linens, vacuuming, and keeping living spaces clean & fall-free.\n• **Meal Preparation** – Fresh, nutritious home-cooked meals tailored to dietary preferences, plus grocery shopping.\n• **Alzheimer's & Dementia Care** – Gentle memory routines, safe redirection, and cognitive engagement.\n• **Respite Care** – Short-term relief for family caregivers to rest, travel, or work.\n• **Transportation Support** – Safe accompaniment to medical visits, pharmacies, church, and community errands.\n• **24-Hour & Live-In Care** – Continuous day and night supervision for maximum safety and peace of mind.\n• **Post-Surgery Transition Care** – Support recovering at home following hospital or rehab discharge.\n\nAll services require a 4-hour minimum per visit with flexible daily scheduling. Would you like to request a free in-home consultation or have our team call you?`,
      quickReplies: ["Request Free Consultation", "Areas you serve", "Cost & Medicaid Waivers", "Speak with Care Coordinator"],
      canCollectLead: true,
    };
  }

  // 3. ABOUT US / MISSION / COMPANY HISTORY / WHO ARE YOU
  if (
    q.includes("about") ||
    q.includes("who are you") ||
    q.includes("who is") ||
    q.includes("mission") ||
    q.includes("history") ||
    q.includes("story") ||
    q.includes("values") ||
    q.includes("directors") ||
    q.includes("company")
  ) {
    return {
      text: `**About Blessed Hearts Homecare**:\n\n• **Our Story**: Blessed Hearts was founded by experienced healthcare directors with **15+ years of clinical and home care leadership** in South Central PA. We saw a critical need for home care that delivers professional clinical standards without ever losing human warmth.\n• **Our Mission**: To empower seniors, veterans, and individuals with physical disabilities across 10 PA counties to live safely and independently in the comfort of their own homes.\n• **Philosophy**: *"Care from the Heart"* — treating every client with the dignity, compassion, and patience we would expect for our own loved ones.\n• **Credentials**: Fully licensed by the Pennsylvania Department of Health, insured, and bonded.\n\nWould you like to speak with one of our Care Coordinators?`,
      quickReplies: ["Request Free Consultation", "What services do you provide?", "Call (223) 260-9042"],
      canCollectLead: true,
    };
  }

  // 4. TRANSFERRING FROM ANOTHER AGENCY
  if (
    q.includes("transfer") ||
    q.includes("switch") ||
    q.includes("current agency") ||
    q.includes("change agency") ||
    q.includes("not happy with") ||
    q.includes("replace agency")
  ) {
    return {
      text: `**Yes, transferring to Blessed Hearts Homecare is easy and seamless!**\n\n• **Zero Gap in Care**: We coordinate with your Service Coordinator (Keystone First, UPMC, or PA Health & Wellness) so your care continues uninterrupted.\n• **Keep Your Preferred Caregiver**: If you have a dedicated caregiver you love, we can often onboard and hire them at Blessed Hearts with competitive compensation and better support!\n• **We Handle the Paperwork**: Our coordination team manages the administrative transition from start to finish.\n\nWould you like our agency transition team to call you?`,
      triggerLeadForm: true,
      serviceDefault: "Transfer from Current Agency",
      quickReplies: ["Request Free Consultation", "Call (223) 260-9042"],
    };
  }

  // 5. SERVICE AREAS / COUNTIES & CITIES (Specific Town Matching)
  if (
    q.includes("area") ||
    q.includes("where") ||
    q.includes("location") ||
    q.includes("county") ||
    q.includes("counties") ||
    q.includes("serve") ||
    q.includes("york") ||
    q.includes("lancaster") ||
    q.includes("harrisburg") ||
    q.includes("reading") ||
    q.includes("allentown") ||
    q.includes("gettysburg") ||
    q.includes("carlisle") ||
    q.includes("mechanicsburg") ||
    q.includes("hershey") ||
    q.includes("bethlehem") ||
    q.includes("easton") ||
    q.includes("lititz") ||
    q.includes("ephrata") ||
    q.includes("hanover") ||
    q.includes("red lion")
  ) {
    return {
      text: `We proudly serve **10 counties across South Central & Eastern Pennsylvania**:\n\n📍 **York County**: York, Hanover, Red Lion, Dallastown, Spring Grove, Shrewsbury, Manchester\n📍 **Lancaster County**: Lancaster City, Lititz, Ephrata, Manheim, Columbia, Mount Joy, Elizabethtown\n📍 **Dauphin County**: Harrisburg, Hershey, Hummelstown, Middletown, Steelton\n📍 **Cumberland County**: Carlisle, Mechanicsburg, Camp Hill, Enola, Lemoyne, New Cumberland\n📍 **Berks County**: Reading, Wyomissing, Kutztown, Boyertown, Hamburg\n📍 **Adams County**: Gettysburg, Littlestown, East Berlin, New Oxford, McSherrystown\n📍 **Lebanon County**: Lebanon City, Palmyra, Annville, Myerstown, Cornwall\n📍 **Perry County**: New Bloomfield, Duncannon, Marysville, Newport\n📍 **Lehigh County**: Allentown, Bethlehem, Emmaus, Macungie, Whitehall\n📍 **Northampton County**: Easton, Bethlehem, Nazareth, Palmer, Hellertown\n\nCaregivers are stationed locally in each county. Would you like a free consultation in your area?`,
      quickReplies: ["Request Free Consultation", "What services do you provide?", "Cost & Medicaid Waivers"],
      canCollectLead: true,
    };
  }

  // 6. COST, MEDICAID WAIVER (CHC), MEDICARE, VA & INSURANCE
  if (
    q.includes("cost") ||
    q.includes("price") ||
    q.includes("rate") ||
    q.includes("how much") ||
    q.includes("pay") ||
    q.includes("medicaid") ||
    q.includes("medicare") ||
    q.includes("insurance") ||
    q.includes("waiver") ||
    q.includes("chc") ||
    q.includes("community healthchoices") ||
    q.includes("va") ||
    q.includes("veteran") ||
    q.includes("tax")
  ) {
    return {
      text: `**Pricing, Insurance & Payment Options**:\n\n• **PA Medicaid Waiver (Community HealthChoices / CHC)**: In many cases, **care is 100% covered** by Pennsylvania Medicaid! We coordinate directly with Managed Care Organizations (Keystone First CHC, UPMC Community HealthChoices, and PA Health & Wellness).\n• **Veterans Benefits**: Eligible veterans and surviving spouses may receive in-home care through the **VA Aid & Attendance** program.\n• **Long-Term Care Insurance**: We assist with claims and billing for most major policy providers.\n• **Private Pay**: Transparent, competitive hourly rates based on needed hours and level of care (4-hour visit minimum). Zero hidden fees or long-term lock-in contracts.\n• **Medicare**: Traditional Medicare does NOT pay for non-medical personal/companion care. It only covers skilled clinical nursing.\n• **Tax Deductibility**: In-home medical and personal care expenses may qualify as deductible medical expenses.\n\nWould you like a free consultation to review your coverage?`,
      quickReplies: ["Request Free Consultation", "Check Service Areas", "Call (223) 260-9042"],
      canCollectLead: true,
    };
  }

  // 7. CAREGIVER JOBS & CAREERS
  if (
    q.includes("job") ||
    q.includes("career") ||
    q.includes("hire") ||
    q.includes("work for") ||
    q.includes("employment") ||
    q.includes("applying") ||
    q.includes("cna") ||
    q.includes("hha") ||
    q.includes("direct care worker") ||
    q.includes("caregiver position")
  ) {
    return {
      text: `**Join the Blessed Hearts Homecare Family!** 💖\n\nWe are actively hiring compassionate Caregivers, CNAs, and Home Health Aides across all 10 PA counties!\n\n**What We Offer**:\n• Highly competitive hourly pay\n• Flexible shifts: Part-time, full-time, weekends, and overnight\n• Supportive, nurse-led care management\n• Paid orientation and training\n\nYou can call our office directly at **(223) 260-9042** or leave your contact details below, and our HR recruiting coordinator will reach out to you today!`,
      triggerLeadForm: true,
      serviceDefault: "Caregiver Employment",
      quickReplies: ["Call (223) 260-9042"],
    };
  }

  // 8. LANGUAGE ASSISTANCE, LEP & MULTILINGUAL CAREGIVERS (PA MA Bulletin 99-17-11 & 99-25-01)
  if (
    q.includes("language") ||
    q.includes("spanish") ||
    q.includes("espanol") ||
    q.includes("nepali") ||
    q.includes("russian") ||
    q.includes("arabic") ||
    q.includes("chinese") ||
    q.includes("mandarin") ||
    q.includes("cantonese") ||
    q.includes("haitian") ||
    q.includes("creole") ||
    q.includes("vietnamese") ||
    q.includes("ukrainian") ||
    q.includes("portuguese") ||
    q.includes("bengali") ||
    q.includes("french") ||
    q.includes("cambodian") ||
    q.includes("khmer") ||
    q.includes("korean") ||
    q.includes("gujarati") ||
    q.includes("hindi") ||
    q.includes("urdu") ||
    q.includes("burmese") ||
    q.includes("albanian") ||
    q.includes("interpreter") ||
    q.includes("translation") ||
    q.includes("translator") ||
    q.includes("bilingual") ||
    q.includes("multilingual") ||
    q.includes("lep") ||
    q.includes("english proficiency")
  ) {
    return {
      text: `**Language Assistance & Multilingual Care at Blessed Hearts** 🌐\n\nYes! In compliance with Pennsylvania Medical Assistance (PA MA Bulletins 99-17-11 & 99-25-01), Section 1557 ACA, and Title VI, we provide **100% free language assistance and interpretation services** for individuals with Limited English Proficiency (LEP).\n\n• **Supported Languages (19+)**: Spanish, Chinese Mandarin, Nepali, Russian, Arabic, Haitian Creole, Vietnamese, Ukrainian, Chinese Cantonese, Portuguese, Bengali, French, Cambodian (Khmer), Korean, Gujarati, Hindi, Urdu, Burmese, and Albanian.\n• **Bilingual Caregivers**: We actively match clients with bilingual caregivers who speak their primary language.\n• **Hearing/Speech Relay**: Telecommunications Relay Service is available via **TTY: 711**.\n• **Website Translation**: You can also switch this entire website to any of these languages using the Language Switcher in the top menu or on our Language Assistance page!\n\nWould you like to speak with a bilingual care coordinator or request free interpreter support?`,
      quickReplies: ["Request Free Consultation", "Call (223) 260-9042", "View Language Assistance Page"],
      canCollectLead: true,
    };
  }

  // 9. CAREGIVER SCREENING, BACKGROUND CHECKS & SAFETY
  if (
    q.includes("caregiver") ||
    q.includes("background check") ||
    q.includes("licensed") ||
    q.includes("training") ||
    q.includes("safe") ||
    q.includes("certified") ||
    q.includes("bonded") ||
    q.includes("screen") ||
    q.includes("trust") ||
    q.includes("same caregiver")
  ) {
    return {
      text: `**Caregiver Standards & Safety Protocols**:\n\n✓ **100% Screened**: Every caregiver undergoes mandatory Pennsylvania State Police criminal history checks, FBI fingerprinting, and PA Child Abuse History clearances before entering any client home.\n✓ **Licensed & Bonded**: Blessed Hearts Homecare is licensed under the Pennsylvania Department of Health, fully insured, and bonded.\n✓ **Specialized Training**: Comprehensive orientation on infection prevention, Alzheimer's & dementia communication, safe transfer mechanics, and emergency preparedness.\n✓ **Dedicated Primary Caregivers**: We match you with a consistent primary caregiver so a trusting relationship develops, and we maintain certified backup coverage so care is never missed.\n✓ **Meet Your Caregiver**: Families are introduced to their matched caregiver prior to care starting.`,
      quickReplies: ["What services do you provide?", "Request Free Consultation", "Contact Us"],
    };
  }

  // 9. HOURS, MINIMUM VISITS, 24/7 & LIVE-IN CARE
  if (
    q.includes("hour") ||
    q.includes("minimum") ||
    q.includes("overnight") ||
    q.includes("24 hour") ||
    q.includes("24/7") ||
    q.includes("live in") ||
    q.includes("weekend") ||
    q.includes("schedule") ||
    q.includes("how quickly")
  ) {
    return {
      text: `**Hours & Scheduling Flexibility**:\n\n• **Minimum Visit**: 4 hours per visit, ensuring meaningful, attentive support rather than rushed drop-ins.\n• **Flexible Schedules**: Morning, afternoon, evening, weekend, or overnight shifts.\n• **24/7 & Live-In Care**: Around-the-clock monitoring and continuous overnight peace of mind.\n• **Fast Placement**: Care can typically begin within **24 to 48 hours** following your free in-home consultation.\n• **Adjustable Care Plans**: Schedules can be increased, decreased, or modified as your loved one's needs evolve.`,
      quickReplies: ["Request Free Consultation", "What services do you provide?", "Call (223) 260-9042"],
    };
  }

  // 10. DEMENTIA & ALZHEIMER'S CARE
  if (q.includes("dementia") || q.includes("alzheimer") || q.includes("memory") || q.includes("sundown") || q.includes("wander")) {
    return {
      text: `**Specialized Alzheimer's & Dementia Support**:\n\n• **Certified Training**: Our caregivers are trained in dementia-specific communication, gentle redirection, and de-escalation techniques.\n• **Routine Stabilization**: Predictable daily routines help reduce anxiety, agitation, and sundowning.\n• **Safety & Wandering**: Attentive monitoring to prevent elopement and household accidents.\n• **Memory Engagement**: Puzzles, familiar music, nostalgia discussions, and mental exercises.\n• **Family Respite**: Giving family caregivers crucial rest knowing their loved one is in safe, compassionate hands.`,
      triggerLeadForm: true,
      serviceDefault: "Alzheimer's & Dementia Care",
      quickReplies: ["Request Free Consultation", "Cost & Payment", "Areas We Serve"],
    };
  }

  // 11. CONTACT INFO, OFFICE & PHONE
  if (
    q.includes("phone") ||
    q.includes("email") ||
    q.includes("number") ||
    q.includes("address") ||
    q.includes("office") ||
    q.includes("fax")
  ) {
    return {
      text: `**Blessed Hearts Homecare Contact Details**:\n\n📞 **Phone**: [(223) 260-9042](tel:+12232609042)\n📠 **Fax**: (223) 210-3600\n✉️ **Email**: [blessedheartshca1@gmail.com](mailto:blessedheartshca1@gmail.com)\n🏢 **Main Office**: 1224 S Queen St, Suite 206, York, PA 17403\n🌐 **Website**: [www.blessedheartshca.com](https://www.blessedheartshca.com)\n🕒 **Office Hours**: Mon - Fri: 8:30 AM - 5:00 PM (24/7 on-call coordinator support for client emergencies)\n\nWould you like our Care Coordinator to contact you directly?`,
      triggerLeadForm: true,
      quickReplies: ["Request Free Consultation", "What services do you provide?"],
    };
  }

  // 12. GENERAL / INQUIRY / START CARE
  if (
    q.includes("start") ||
    q.includes("consultation") ||
    q.includes("assessment") ||
    q.includes("appointment") ||
    q.includes("need care") ||
    q.includes("hire") ||
    q.includes("call me") ||
    q.includes("reach out") ||
    q.includes("sign up") ||
    q.includes("talk to") ||
    q.includes("human") ||
    q.includes("help")
  ) {
    return {
      text: `We would be honored to care for your family! Getting started is simple and 100% free:\n\n1. **Free In-Home Assessment**: A Care Coordinator visits your home to meet your loved one and understand their routines and preferences.\n2. **Customized Care Plan**: We tailor a flexible schedule (from 4 hours/visit up to 24/7 care).\n3. **Caregiver Matching**: We introduce your matched caregiver within 24–48 hours.\n\nPlease share your contact details below so our Care Coordinator can call you:`,
      triggerLeadForm: true,
      quickReplies: ["Call (223) 260-9042"],
    };
  }

  // 13. FALLBACK -> WARM COMPREHENSIVE ANSWER & LEAD CAPTURE
  return {
    text: `Thank you for asking! Blessed Hearts Homecare is a licensed in-home care agency serving 10 PA counties (York, Lancaster, Harrisburg, Reading, Allentown, and surrounding areas). We provide personal care, companion care, dementia care, respite, light housekeeping, and transportation.\n\nTo give you the most accurate answer for your loved one's specific needs, I can connect you directly with a certified Care Coordinator! Please leave your contact details below:`,
    triggerLeadForm: true,
    quickReplies: ["Request Free Consultation", "What services do you provide?", "Areas you serve", "Call (223) 260-9042"],
  };
}
