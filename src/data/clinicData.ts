import { Clinician, DentalService, HealthFund, ReviewItem, TriageItem } from '../types/dental';

export const CLINIC_INFO = {
  name: 'Creating Great Smiles',
  subname: 'Specialist Orthodontics & Family Dental Care',
  tagline: 'Bathurst’s Premier Orthodontic & Dental Practice Since 1956',
  established: 1956,
  address: '111 Bentinck Street, Bathurst NSW 2795',
  phone: '02 6331 2788',
  phoneDisplay: '(02) 6331 2788',
  phoneHref: 'tel:0263312788',
  email: 'info@creatinggreatsmiles.com.au',
  openingHours: [
    { day: 'Monday', hours: '7:30 AM – 5:30 PM', open: true },
    { day: 'Tuesday', hours: '7:30 AM – 5:30 PM', open: true },
    { day: 'Wednesday', hours: '7:30 AM – 5:30 PM', open: true },
    { day: 'Thursday', hours: '7:30 AM – 5:30 PM', open: true },
    { day: 'Friday', hours: '7:30 AM – 5:30 PM', open: true },
    { day: 'Saturday', hours: 'Closed (Emergency On-Call)', open: false },
    { day: 'Sunday', hours: 'Closed (Emergency On-Call)', open: false },
  ],
  parking: 'Free on-street patient parking available directly on Bentinck Street and adjacent Keppel Street council parking.',
  googleMapsUrl: 'https://maps.google.com/?q=111+Bentinck+Street,+Bathurst+NSW+2795',
  googleRating: 4.9,
  reviewCount: 128,
  emergencyPhone: '02 6331 2788',
  traditionStatement: 'Operating continuously in Bathurst since 1956, Creating Great Smiles is the only full-time orthodontic practice in the Central West region.',
};

export const CLINICIANS: Clinician[] = [
  {
    id: 'emma-bowman',
    name: 'Dr. Emma Bowman',
    title: 'Specialist Orthodontist & Practice Principal',
    role: 'Specialist Orthodontist',
    degrees: 'BDS (Hons) Qld, DClinDent (Ortho) Adel',
    experienceYears: 14,
    image: 'https://images.unsplash.com/photo-1594824813579-22a865bb4ef6?auto=format&fit=crop&w=700&q=80',
    bio: 'Dr. Emma Bowman was born and raised in Bathurst, NSW. She completed her Bachelor of Dental Science with Honours at the University of Queensland and earned her specialist Doctor of Clinical Dentistry in Orthodontics from the University of Adelaide. Returning home to lead Creating Great Smiles, Dr. Emma is passionate about delivering world-class orthodontic transformations to families throughout the Central West.',
    specialInterests: ['Invisalign® Clear Aligners', 'Early Interceptive Orthodontics', 'Surgical Orthodontics', 'Complex Bite Correction'],
    education: 'University of Queensland (BDS Hons) & University of Adelaide (DClinDent)',
    bathurstConnection: 'Born and raised in Bathurst, passionately serving local Central West families.'
  },
  {
    id: 'mark-cordato',
    name: 'Dr. Mark Cordato',
    title: 'Senior Specialist Orthodontist',
    role: 'Specialist Orthodontist',
    degrees: 'BDS, MDSc, FRACDS, MRACDS',
    experienceYears: 38,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=700&q=80',
    bio: 'Dr. Mark Cordato owned and developed the practice for over three decades, establishing the trusted "Creating Great Smiles" name. A pioneer of modern regional orthodontics, Dr. Cordato holds specialist fellowship degrees and has treated thousands of smiles across multiple generations of Bathurst and Central West residents.',
    specialInterests: ['Comprehensive Metal & Ceramic Braces', 'Facial Aesthetics', 'Dentofacial Orthopedics', 'Adult Orthodontics'],
    education: 'University of Sydney Dental School & Royal Australasian College of Dental Surgeons',
    bathurstConnection: 'Over 30 years dedicated to Bathurst dental healthcare and community mentorship.'
  },
  {
    id: 'gabii-starr',
    name: 'Dr. Gabii Starr',
    title: 'General Dentist',
    role: 'General Dentist',
    degrees: 'BSc (Psych), BDS (1st Class Hons) UQ',
    experienceYears: 4,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80',
    bio: 'Dr. Gabii Starr graduated as Valedictorian in 2023 with First Class Honours in Dental Science from the University of Queensland, alongside a Bachelor of Science in Psychology. A proud Bathurst local, Gabii combines exceptional clinical precision with psychological empathy, making every appointment calming and stress-free.',
    specialInterests: ['Preventative & Restorative Dentistry', 'Dental Anxiety Management', 'Cosmetic Teeth Whitening', 'Gentle Root Canal Therapy'],
    education: 'University of Queensland (Valedictorian, 1st Class Honours)',
    bathurstConnection: 'Bathurst born and educated, devoted to caring for her hometown.'
  },
  {
    id: 'emily-linn',
    name: 'Dr. Emily Linn',
    title: 'General Dentist',
    role: 'General Dentist',
    degrees: 'BDS Charles Sturt University',
    experienceYears: 5,
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=700&q=80',
    bio: 'Dr. Emily Linn completed her dental surgery training at Charles Sturt University in Orange. Raised in regional Wagga Wagga, Dr. Emily has a genuine passion for rural and regional health promotion, with special clinical interests in preventative care, restorative dental wellness, and orthodontic case support.',
    specialInterests: ['Family Dentistry', 'Oral Health Education', 'Orthodontic Support & Retention', 'Minimally Invasive Restorations'],
    education: 'Charles Sturt University School of Dentistry and Health Sciences (Orange, NSW)',
    bathurstConnection: 'Passionate regional practitioner dedicated to Central West NSW healthcare.'
  },
  {
    id: 'angelina-bodycote',
    name: 'Angelina Bodycote',
    title: 'Oral Health Therapist',
    role: 'Oral Health Therapist',
    degrees: 'B. Oral Health Therapy (Distinction)',
    experienceYears: 3,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80',
    bio: 'Angelina grew up in the Hunter Valley and graduated with Distinction in Oral Health Therapy. Now happily settled in Bathurst, Angelina brings past experience in entertainment and theater to create a remarkably vibrant, engaging, and fearless dental environment for children, teens, and anxious adult patients.',
    specialInterests: ['Paediatric Dentistry & Child Oral Care', 'Gentle Scale & Ultrasonic Clean', 'Gum Disease Prevention', 'Oral Hygiene Coaching'],
    education: 'Bachelor of Oral Health Therapy with Distinction',
    bathurstConnection: 'Bathurst resident bringing fun, compassionate oral therapy to local schools & families.'
  }
];

export const SERVICES: DentalService[] = [
  {
    id: 'invisalign-aligners',
    name: 'Invisalign® Clear Aligners',
    category: 'orthodontics',
    categoryLabel: 'Specialist Orthodontics',
    tagline: 'Virtually invisible teeth straightening with removable custom 3D aligners',
    description: 'Custom-milled medical-grade SmartTrack aligners engineered using our high-definition 3D intraoral scanner. Eat freely, brush normally, and straighten crowded or spaced teeth with zero metal brackets.',
    durationMinutes: 45,
    guidePrice: 220,
    itemCode: 'Item 011 / 881',
    popular: true,
    rebateNote: 'HICAPS eligible under Major Dental / Orthodontics health fund cover',
    features: ['3D digital outcome simulation', 'Zero metal brackets or wires', 'Discreet, transparent aligners', 'Interest-free payment plans']
  },
  {
    id: 'metal-ceramic-braces',
    name: 'Metal & Clear Ceramic Braces',
    category: 'orthodontics',
    categoryLabel: 'Specialist Orthodontics',
    tagline: 'Gold-standard precision alignment for children, teens, and adults',
    description: 'Low-profile modern stainless steel brackets or translucent tooth-matched ceramic brackets. Provides comprehensive 3D control to fix severe misalignments, deep overbites, and crossbites with unmatched durability.',
    durationMinutes: 60,
    guidePrice: 240,
    itemCode: 'Item 011 / 882',
    popular: true,
    rebateNote: 'Claimable on Australian health funds with Orthodontics extras',
    features: ['High-tensile nickel-titanium archwires', 'Aesthetic ceramic or fun color ties', 'Maximum clinical control for complex bites', 'Full ongoing retainer warranty']
  },
  {
    id: 'early-orthodontic-eval',
    name: 'Early Interceptive Orthodontics (Ages 7–11)',
    category: 'kids',
    categoryLabel: 'Kids & Growth Care',
    tagline: 'Guide jaw growth and create space for permanent teeth without extraction',
    description: 'The Australian Society of Orthodontists recommends an evaluation at age 7. We assess airway, tongue habits, narrow palates, and crossbites to prevent severe complications before permanent teeth erupt.',
    durationMinutes: 30,
    guidePrice: 185,
    itemCode: 'Item 011 / 823',
    popular: false,
    rebateNote: 'HICAPS claimable; CDBS Medicare eligible for eligible children',
    features: ['Gentle palate expanders', 'Habit-breaking guidance', 'Reduces future need for extractions', 'Fun, supportive kid-friendly clinic']
  },
  {
    id: 'checkup-clean',
    name: 'Comprehensive Exam & Hygiene Clean',
    category: 'general',
    categoryLabel: 'General & Preventative',
    tagline: 'Complete oral health examination, ultrasonic calculus clean, and remineralising polish',
    description: 'Detailed assessment of teeth, gums, tongue, and soft tissues. Includes gentle ultrasonic tartar removal, airflow stain removal, remineralizing fluoride therapy, and low-dose digital diagnostic imaging.',
    durationMinutes: 45,
    guidePrice: 245,
    itemCode: 'Item 011, 114, 121, 022',
    popular: true,
    rebateNote: 'Often 100% no-gap or high rebate with Bupa, Medibank, HCF & NIB',
    features: ['Painless ultrasonic scaling', 'Full oral cancer screening', 'High-res intraoral photography', 'Fluoride enamel strengthening']
  },
  {
    id: 'emergency-relief',
    name: 'Emergency Dental & Orthodontic Relief',
    category: 'emergency',
    categoryLabel: 'Emergency Dental',
    tagline: 'Same-day urgent relief for poking wires, broken brackets, or severe toothache',
    description: 'Immediate diagnostic triage, emergency pain management, clipping broken archwires, recementing detached brackets, or soothing acute pulpitis and dental trauma.',
    durationMinutes: 30,
    guidePrice: 160,
    itemCode: 'Item 013 / 886',
    popular: true,
    rebateNote: 'Claimable through private health insurance emergency codes',
    features: ['Same-day emergency reservation', 'Fast pain alleviation', 'Orthodontic hardware stabilization', 'Digital OPG imaging if required']
  },
  {
    id: 'retainers-replacement',
    name: 'Orthodontic Retainers & Relapse Correction',
    category: 'orthodontics',
    categoryLabel: 'Specialist Orthodontics',
    tagline: 'Maintain your perfect smile for life with fixed lingual or clear Essix retainers',
    description: 'Keep your teeth aligned after orthodontic treatment. We provide bonded fixed lingual wires, crystal-clear Essix retainers, and replacement retainers if your current appliance is worn, cracked, or lost.',
    durationMinutes: 30,
    guidePrice: 290,
    itemCode: 'Item 811 / 812',
    popular: false,
    rebateNote: 'Rebate available under general orthodontic maintenance',
    features: ['Precision 3D digital scan fit', 'Durable crack-resistant thermoplastic', 'Fixed internal wire options', 'Fast laboratory turnaround']
  },
  {
    id: 'restorative-fillings',
    name: 'Tooth-Coloured Composite Fillings',
    category: 'general',
    categoryLabel: 'General & Preventative',
    tagline: 'Seamless, mercury-free tooth restoration matching your natural enamel shade',
    description: 'Micro-invasive decay removal followed by layered nano-hybrid composite resin that bonds molecularly to your natural tooth structure for strength and invisible aesthetics.',
    durationMinutes: 45,
    guidePrice: 210,
    itemCode: 'Item 531 / 532',
    popular: false,
    rebateNote: 'Covered under General Dental on almost all health funds',
    features: ['100% mercury-free and BPA-safe', 'Precise shade matching', 'Strengthens remaining tooth structure', 'Smooth bite-checked polish']
  },
  {
    id: 'teeth-whitening',
    name: 'Professional In-Chair & Take-Home Whitening',
    category: 'cosmetic',
    categoryLabel: 'Cosmetic Dentistry',
    tagline: 'Safely brighten your smile up to 8 shades with dental-grade hydrogen peroxide',
    description: 'Administered under clinical supervision to protect enamel and prevent gum sensitivity. Custom-made laboratory vacuum trays and professional gel kits deliver luminous results safely.',
    durationMinutes: 60,
    guidePrice: 395,
    itemCode: 'Item 118',
    popular: false,
    rebateNote: 'Cosmetic treatment; Afterpay 4x payments available',
    features: ['Custom precision fit whitening trays', 'Desensitising potassium nitrate formula', 'Noticeable brightening in 7–10 days', 'Post-braces smile finishing']
  },
  {
    id: 'sports-mouthguards',
    name: 'Custom Laminated Sports Mouthguard',
    category: 'kids',
    categoryLabel: 'Kids & Sports Protection',
    tagline: 'Dual-laminated protective mouthguard tailored for rugby, AFL, hockey & martial arts',
    description: 'Over-the-counter boil-and-bite guards offer minimal impact shock absorption. Our custom multi-laminated mouthguards fit snug around braces and natural teeth, cushioning against concussion and broken teeth.',
    durationMinutes: 20,
    guidePrice: 195,
    itemCode: 'Item 151',
    popular: false,
    rebateNote: 'High rebate with major health funds under Preventative care',
    features: ['Custom colors and school team shades', 'Compatible with braces archwires', 'Superior airway flow while running', 'Maximum shock absorption']
  }
];

export const HEALTH_FUNDS: HealthFund[] = [
  {
    id: 'bupa',
    name: 'Bupa Members First',
    tier: 'Preferred Provider Network',
    averageRebatePct: 75,
    note: 'HICAPS instant claims with predictable gap coverage for examinations and orthodontic treatment.'
  },
  {
    id: 'medibank',
    name: 'Medibank Members’ Choice',
    tier: 'Preferred Network',
    averageRebatePct: 70,
    note: '100% back on 1-2 dental checkups per year on eligible extras policies + orthodontic allowances.'
  },
  {
    id: 'hcf',
    name: 'HCF More for Teeth',
    tier: 'Participating Network',
    averageRebatePct: 80,
    note: 'Generous preventative benefits and established orthodontic lifetime limits for families.'
  },
  {
    id: 'cbhs',
    name: 'CBHS Health Fund',
    tier: 'Choice Network',
    averageRebatePct: 75,
    note: 'Exceptional benefits for Commonwealth Bank employees and family members.'
  },
  {
    id: 'nib',
    name: 'NIB First Choice',
    tier: 'Open Network',
    averageRebatePct: 65,
    note: 'Simple on-the-spot electronic HICAPS claims processing with competitive rebate rates.'
  },
  {
    id: 'cdbs',
    name: 'Medicare Child Dental Benefits Schedule (CDBS)',
    tier: 'Government Funded',
    averageRebatePct: 100,
    note: 'Up to $1,095 over 2 calendar years for eligible kids aged 0-17. Zero out-of-pocket gap.'
  },
  {
    id: 'dva',
    name: 'Department of Veterans’ Affairs (DVA)',
    tier: 'Veterans Health Care',
    averageRebatePct: 100,
    note: 'Gold card holders receive comprehensive bulk-billed dental services without copayments.'
  },
  {
    id: 'private-self-pay',
    name: 'Direct Private Pay / Afterpay / Zip',
    tier: 'Self-Funded',
    averageRebatePct: 0,
    note: 'Flexible interest-free instalments across 4 fortnightly payments or customized in-house payment schedules.'
  }
];

export const SYMPTOM_TRIAGE_ITEMS: TriageItem[] = [
  {
    id: 'poking-wire-bracket',
    title: 'Poking Orthodontic Wire or Detached Bracket',
    severity: 'Same-Day Priority',
    severityColor: 'text-amber-700 bg-amber-50 border-amber-200',
    badgeBg: 'bg-amber-600',
    symptoms: ['Sharp wire scratching inside cheek or lip', 'Loose bracket sliding along wire', 'Cut or ulcerated inner mucosa'],
    whatItMeans: 'Orthodontic archwires can occasionally shift as teeth move, or a hard food item may dislodge the composite bond holding a bracket.',
    whatToDoNow: [
      'Take a small ball of orthodontic wax (or sugar-free chewing gum in an emergency) and press firmly over the sharp protruding end.',
      'Use the smooth eraser end of a clean pencil to gently nudge a poking ligature wire flush against the tooth.',
      'If a bracket is completely detached but still on the wire, cover it in wax to prevent it turning.',
      'Do NOT attempt to cut thick steel archwires with nail clippers at home.'
    ],
    recommendedServiceId: 'emergency-relief'
  },
  {
    id: 'severe-toothache',
    title: 'Severe Throbbing Toothache or Night Pain',
    severity: 'Immediate Emergency',
    severityColor: 'text-rose-700 bg-rose-50 border-rose-200',
    badgeBg: 'bg-rose-600',
    symptoms: ['Continuous throbbing pain keeping you awake', 'Extreme sensitivity to hot drinks lasting > 30 seconds', 'Pain when biting down or tapping tooth'],
    whatItMeans: 'Deep dental decay or trauma has reached the inner dental pulp (nerve tissue), triggering acute irreversible pulpitis or localized apical inflammation.',
    whatToDoNow: [
      'Rinse gently with warm salt water (1/2 tsp salt in warm water) to soothe tissues and clear debris.',
      'Take over-the-counter pain relief (such as Paracetamol and/or Ibuprofen) according to packet guidelines.',
      'Do NOT place an aspirin tablet directly against the gum—this causes severe chemical burns to the tissue.',
      'Avoid icy cold drinks, piping hot liquids, and chewing directly on the painful quadrant.'
    ],
    recommendedServiceId: 'emergency-relief'
  },
  {
    id: 'knocked-out-tooth',
    title: 'Knocked-Out (Avulsed) Adult Permanent Tooth',
    severity: 'Immediate Emergency',
    severityColor: 'text-red-800 bg-red-100 border-red-300',
    badgeBg: 'bg-red-700',
    symptoms: ['Complete tooth displaced from dental socket following sports collision or fall', 'Bleeding socket in jaw'],
    whatItMeans: 'A critical dental emergency where survival of the periodontal ligament cells depends on reimplantation within 30 to 60 minutes.',
    whatToDoNow: [
      'Pick up the tooth by the smooth white crown ONLY—never touch the root surfaces.',
      'If visibly dirty, rinse gently for 5 seconds under cold milk or saline (do NOT scrub or scrape).',
      'If confident, re-insert the tooth gently back into the socket and bite down softly on a clean handkerchief.',
      'If unable to re-insert, store immediately in a cup of fresh cold milk or inside the patient’s cheek pouch and call us immediately at 02 6331 2788.'
    ],
    recommendedServiceId: 'emergency-relief'
  },
  {
    id: 'chipped-tooth',
    title: 'Chipped or Fractured Tooth Enamel',
    severity: 'Urgent 24-48h',
    severityColor: 'text-sky-700 bg-sky-50 border-sky-200',
    badgeBg: 'bg-sky-600',
    symptoms: ['Rough jagged edge catching your tongue', 'Sensitivity to cold air or sweets', 'Piece of tooth broke off while eating'],
    whatItMeans: 'The outer enamel and part of the underlying dentin have fractured. While often not an immediate threat to the nerve, early composite bonding restores cosmetics and seals vulnerable tubules.',
    whatToDoNow: [
      'Locate and preserve any broken tooth fragments in a small container of milk or saline (we can often bond original enamel back).',
      'Rinse your mouth with warm water to clear loose grit.',
      'Cover the sharp edge with orthodontic wax or sugar-free gum to prevent tongue lacerations.',
      'Avoid hard, crunchy, or sticky foods until repaired.'
    ],
    recommendedServiceId: 'restorative-fillings'
  },
  {
    id: 'facial-swelling-abscess',
    title: 'Facial Swelling, Gumboil, or Jaw Fever',
    severity: 'Immediate Emergency',
    severityColor: 'text-purple-700 bg-purple-50 border-purple-200',
    badgeBg: 'bg-purple-700',
    symptoms: ['Visible facial puffiness near cheek or jawline', 'Tender pimple-like bump on gum discharging salty fluid', 'Fever, malaise, or difficulty swallowing'],
    whatItMeans: 'A bacterial dental infection has spread from the tooth root into the surrounding alveolar bone and soft facial fascial spaces, requiring immediate drainage and antibiotic/dental intervention.',
    whatToDoNow: [
      'Apply an external cold pack wrapped in a towel to the outside of your cheek (15 mins on, 15 mins off).',
      'Do NOT apply hot water bottles or heating pads externally—heat draws the infection outward toward the skin.',
      'If swelling begins to compromise your breathing, eye vision, or swallowing, proceed directly to Bathurst Base Hospital Emergency Department.',
      'Call our clinic right away for same-day clinical assessment.'
    ],
    recommendedServiceId: 'emergency-relief'
  },
  {
    id: 'lost-broken-aligner',
    title: 'Lost or Cracked Invisalign® Aligner / Retainer',
    severity: 'Urgent 24-48h',
    severityColor: 'text-teal-700 bg-teal-50 border-teal-200',
    badgeBg: 'bg-teal-600',
    symptoms: ['Aligner tray cracked or split down the middle', 'Forgot or misplaced aligners while traveling', 'Retainer no longer sits fully seated'],
    whatItMeans: 'Without regular aligner or retainer wear, teeth naturally begin to shift and relapse within 48 to 72 hours due to elastic gingival memory.',
    whatToDoNow: [
      'If you have your previous week’s aligner tray, put it back in to maintain tooth position.',
      'If the current aligner is only cracked but still firmly grips the teeth, wear it carefully without aggressive chewing.',
      'Do not attempt to superglue aligners—superglue is toxic and ruins precision 3D alignment.',
      'Contact our Bathurst clinic for a priority 3D digital scan or replacement fabrication.'
    ],
    recommendedServiceId: 'retainers-replacement'
  }
];

export const CLINIC_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Sarah M.',
    location: 'Bathurst, NSW',
    rating: 5,
    date: '2 weeks ago',
    treatment: 'Invisalign® Clear Aligners',
    quote: 'Dr. Emma Bowman and the team at Creating Great Smiles are simply the best! From my very first 3D scan to finishing my aligners, the whole process was so smooth and comforting. I couldn’t be happier with my new smile!',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Lachlan P.',
    location: 'Kelso, Bathurst',
    rating: 5,
    date: '1 month ago',
    treatment: 'Metal Braces',
    quote: 'Both Dr. Mark Cordato and Dr. Emma Bowman treated our two teenagers. The staff are so welcoming and friendly every single visit. Having a specialist orthodontic clinic right here in Bentinck Street saved us endless trips to Sydney.',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Jessica K.',
    location: 'Orange / Bathurst Region',
    rating: 5,
    date: '2 months ago',
    treatment: 'General Checkup & Clean',
    quote: 'Dr. Gabii Starr was fantastic with my dental anxiety. Her background in psychology really shows—she explained every single step and made the clean completely painless. The ceiling TV is a wonderful touch!',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'David W.',
    location: 'Eglinton, NSW',
    rating: 5,
    date: '3 months ago',
    treatment: 'Emergency Orthodontic Relief',
    quote: 'Had a poking wire causing massive discomfort on a Thursday afternoon. Called Creating Great Smiles and they accommodated me within 45 minutes. Super efficient, kind, and relieved the pain instantly.',
    verified: true
  },
  {
    id: 'rev-5',
    author: 'Melissa T.',
    location: 'Bathurst, NSW',
    rating: 5,
    date: '4 months ago',
    treatment: 'Kids Oral Health & CDBS',
    quote: 'Angelina Bodycote is an absolute superstar with children! My 8-year-old son was terrified of dental visits until he met Angelina. Now he actually looks forward to his checkups. Couldn’t recommend this practice more.',
    verified: true
  }
];

export const CLINIC_TECHNOLOGY = [
  {
    id: 'itero-scanner',
    title: '3D Intraoral Digital Scanner',
    subtitle: 'Zero messy impressions, pinpoint microscopic accuracy',
    description: 'Our advanced handheld optical wand captures 6,000 high-definition frames per second, building a flawless 3D digital model of your teeth in under two minutes without gagging on gooey impression putty.',
    benefits: ['No gagging or putty trays', 'Real-time 3D smile visualization', 'Instant digital submission to labs', 'Micron-level orthodontic precision'],
    icon: 'Scan'
  },
  {
    id: 'digital-opg-ceph',
    title: 'Low-Dose Digital OPG & Cephalometric Imaging',
    subtitle: 'Up to 80% less radiation than legacy dental film',
    description: 'Comprehensive panoramic jaw views and lateral cephalometric radiographs providing vital bone, joint, and unerupted tooth insights with ultra-low radiation dosage for kids and adults alike.',
    benefits: ['Immediate digital display', '80% reduced radiation exposure', 'Detailed jaw alignment analysis', 'Crucial for early growth assessment'],
    icon: 'Radio'
  },
  {
    id: 'clincheck-simulation',
    title: 'ClinCheck 3D Virtual Treatment Outcome',
    subtitle: 'See your final finished smile before starting treatment',
    description: 'State-of-the-art biomechanical computer software maps out the exact movement of every individual tooth stage by stage, showing you precisely how your smile will look on the day braces or aligners finish.',
    benefits: ['Predictable treatment timelines', 'Visible step-by-step roadmap', 'Customized biological tooth physics', 'Peace of mind from day one'],
    icon: 'Sparkles'
  },
  {
    id: 'autoclave-sterilization',
    title: 'Hospital-Grade Autoclave & Thermal Sterilization',
    subtitle: 'Exceeding strict Australian AS/NZS 4815 infection control standards',
    description: 'Every reusable instrument undergoes ultrasonic enzymatic cavitation, class-B vacuum steam autoclaving at 134°C, and digital barcode tracking to guarantee complete patient biological safety.',
    benefits: ['Class-B hospital vacuum sterilization', 'Chemical & biological indicator validation', 'Individually sealed surgical cassettes', 'Zero cross-contamination risk'],
    icon: 'ShieldCheck'
  },
  {
    id: 'comfort-suite',
    title: 'Gentle Patient Comfort & Relaxation Suite',
    subtitle: 'Ergonomic memory foam dental chairs & ceiling entertainment',
    description: 'Designed specifically for patient peace of mind. Relax with overhead streaming monitors, noise-cancelling wireless headphones, warm blankets, and gentle nitrous oxide (happy gas) if desired.',
    benefits: ['Ceiling entertainment & Netflix', 'Noise-cancelling headphones', 'Nitrous oxide (happy gas) available', 'Calm, gentle regional atmosphere'],
    icon: 'HeartHandshake'
  }
];
