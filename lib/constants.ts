import {
  BookOpen,
  Bus,
  Calendar,
  Droplet,
  GraduationCap,
  HandHeart,
  Heart,
  type LucideIcon,
  Sprout,
  Users,
} from "lucide-react";
import { PHOTOS, TEAM_PHOTOS } from "@/lib/assets";

export const SITE = {
  name: "Avtar Virdee Children's Foundation",
  shortName: "AVCF",
  tagline: "Brightening futures, one child at a time.",
  mission:
    "The Avtar Virdee Children's Foundation exists to help children and families build brighter futures through education, opportunity, and community support.",
  email: "hello@avcf.org",
  phone: "+44 20 7946 0000",
  location: "West Sussex, United Kingdom",
} as const;

export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/mission", label: "Mission" },
  { href: "/programs", label: "Programs" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const HERO_STATS = [
  { value: "12,400", label: "children supported" },
  { value: "$2.3M", label: "raised since 2009" },
  { value: "100%", label: "goes to the children" },
] as const;

export interface ImpactArea {
  icon: LucideIcon;
  tone: "primary" | "secondary" | "accent" | "care";
  title: string;
  description: string;
}

export const IMPACT_AREAS: ImpactArea[] = [
  {
    icon: GraduationCap,
    tone: "primary",
    title: "Special Education",
    description:
      "Classrooms, trained teachers and materials for children with learning disabilities who are excluded from state-run schools.",
  },
  {
    icon: HandHeart,
    tone: "care",
    title: "Family Support",
    description:
      "Meals, uniforms and health services so families can keep children learning, growing and in school.",
  },
  {
    icon: Droplet,
    tone: "secondary",
    title: "Clean Water",
    description:
      "Safe water and sanitation projects that keep children healthy and able to attend class every day.",
  },
  {
    icon: Sprout,
    tone: "accent",
    title: "Opportunity",
    description:
      "Vocational skills and mentorship that open real pathways for young people entering adulthood.",
  },
];

export interface Program {
  image: string;
  imageAlt: string;
  category: string;
  tone: "primary" | "secondary" | "accent" | "care";
  title: string;
  description: string;
  raised: number;
  goal: number;
  donors: number;
}

export const PROGRAMS: Program[] = [
  {
    image: PHOTOS.heroChildren,
    imageAlt: "Children of Prayas Schools laughing together",
    category: "Education",
    tone: "primary",
    title: "Educate a Prayas Child",
    description:
      "Fund a year of special education, meals and uniforms for one child at Prayas Schools in India.",
    raised: 31200,
    goal: 50000,
    donors: 486,
  },
  {
    image: PHOTOS.classroom,
    imageAlt: "Students learning in a Prayas classroom",
    category: "Health",
    tone: "care",
    title: "Therapy & Care Room",
    description:
      "Equip a sensory and physiotherapy room for children with physical and mental challenges.",
    raised: 18400,
    goal: 30000,
    donors: 213,
  },
  {
    image: PHOTOS.community,
    imageAlt: "The Prayas school community gathered together",
    category: "Opportunity",
    tone: "accent",
    title: "School Transport Fund",
    description:
      "Keep the Prayas bus running so more children across the region can reach the classroom.",
    raised: 9600,
    goal: 15000,
    donors: 154,
  },
];

export const IMPACT_METRICS = [
  { value: "12,400", label: "Children supported", icon: Heart, tone: "primary" },
  { value: "38", label: "Classrooms funded", icon: GraduationCap, tone: "secondary" },
  { value: "$2.3M", label: "Raised since 2009", icon: HandHeart, tone: "accent" },
  { value: "3,200+", label: "Active donors", icon: Users, tone: "care" },
] as const;

export const TIMELINE = [
  {
    year: "2009",
    title: "AVCF founded",
    tone: "primary",
    description:
      "Started in loving memory of Avtar Virdee, who devoted his life to teaching children with special needs.",
  },
  {
    year: "2014",
    title: "The Prayas bus",
    tone: "secondary",
    description:
      "AVCF donated a bus to Prayas Schools, giving children across the region a safe way to reach class.",
  },
  {
    year: "2019",
    title: "Therapy & care wing",
    tone: "accent",
    description: "Opened sensory and physiotherapy facilities for Prayas students.",
  },
  {
    year: "2024",
    title: "12,400 children reached",
    tone: "care",
    description: "And growing — every year, with every supporter.",
  },
] as const;

export interface Story {
  quote: string;
  name: string;
  role: string;
  tone: "primary" | "secondary" | "accent";
  image?: string;
}

export const STORIES: Story[] = [
  {
    tone: "primary",
    quote:
      "We at AVCF thank our donors — without them, none of the things we do for Prayas would be possible. Our success is all due to your help.",
    name: "Tim Virdee",
    role: "Trustee & business owner",
    image: TEAM_PHOTOS.tim,
  },
  {
    tone: "secondary",
    quote:
      "I volunteer because I see exactly where the help goes — straight to the children of Prayas Schools.",
    name: "Aleena Virdee",
    role: "Volunteer & medical student",
    image: TEAM_PHOTOS.aleena,
  },
  {
    tone: "accent",
    quote:
      "Here at AVCF we strive to do our best. Please accept our heartfelt thanks for your support.",
    name: "Harjeet Virdee",
    role: "Trustee & business owner",
    image: TEAM_PHOTOS.harj,
  },
];

export const VOLUNTEERS = [
  { name: "Lindsay Virdee", role: "Nurse", image: TEAM_PHOTOS.lindsay },
  { name: "Aleena Virdee", role: "Medical student", image: TEAM_PHOTOS.aleena },
  { name: "Andrew Virdee", role: "Student", image: TEAM_PHOTOS.andrew },
  { name: "Oscar Virdee", role: "Student", image: TEAM_PHOTOS.oscar },
  { name: "Alex Virdee", role: "Web developer", image: TEAM_PHOTOS.alex },
  { name: "Satranjan Virdee", role: "Pediatrician", image: TEAM_PHOTOS.sat },
] as const;

export const VOLUNTEER_ROLES = [
  {
    icon: BookOpen,
    tone: "primary",
    title: "Tutor & mentor",
    description: "Support learning, in person or online.",
  },
  {
    icon: Calendar,
    tone: "accent",
    title: "Events crew",
    description: "Help run galas, meetups and fundraising drives.",
  },
  {
    icon: Bus,
    tone: "care",
    title: "Fundraising",
    description: "Rally your own community to give.",
  },
] as const;

export const FAQS = [
  {
    question: "Where does my donation actually go?",
    answer:
      "100% of public donations fund the children directly — education, meals, uniforms, transport and health care at Prayas Schools. The foundation's running costs are covered separately by the Virdee family.",
  },
  {
    question: "Who are the children AVCF supports?",
    answer:
      "Prayas Schools provide children in need with free education, food, uniforms and health services. Most students have learning disabilities, mental challenges or physical handicaps — and the Indian government does not offer them admission into state-run schools. AVCF gives them another chance at education.",
  },
  {
    question: "Is my donation tax-deductible?",
    answer:
      "Yes. AVCF is a registered charity, and you'll receive a receipt for every gift by email. UK taxpayers can add Gift Aid to increase their donation by 25% at no extra cost.",
  },
  {
    question: "Can I choose which program my gift supports?",
    answer:
      "Absolutely. During donation you can designate your gift to Educate Children, Prayas Schools, Clean Water for Life — or simply \"where it's needed most\" and we'll apply it to the most urgent priority.",
  },
  {
    question: "How do I volunteer if I don't live near London?",
    answer:
      "Many of our volunteer roles are remote — tutoring online, fundraising in your own community, or lending professional skills like design and admin. Tell us your availability and we'll find a fit.",
  },
  {
    question: "How will I know the impact of my support?",
    answer:
      "Donors receive our impact updates with photos and stories from the schools, plus the annual report with full figures — what was raised, what it funded, and what changed for the children.",
  },
] as const;

export const EVENTS = [
  {
    month: "DEC",
    day: "12",
    title: "Online meetup & chat",
    time: "5:00–7:30 pm",
    location: "London",
    tone: "primary",
    description: "Meet the team and hear this year's plans for Prayas Schools.",
  },
  {
    month: "JAN",
    day: "20",
    title: "Winter fundraising gala",
    time: "7:00 pm",
    location: "Westminster",
    tone: "accent",
    description: "An evening of stories, music and giving for our community.",
  },
] as const;

/* ---- Donation UI ---- */

export const DONATION_AMOUNTS = [25, 50, 100, 250] as const;

export const DONATION_DESIGNATIONS = [
  "Educate Children",
  "Prayas Schools",
  "Clean Water for Life",
  "Campaign for Child Poverty",
  "Where it's needed most",
] as const;

export const IMPACT_TIERS = [
  { amount: 25, impact: "a week of nutritious meals for a child" },
  { amount: 50, impact: "school supplies for a child this term" },
  { amount: 100, impact: "a month of meals and learning materials for 4 children" },
  { amount: 250, impact: "a full term of education for a child" },
] as const;

export function impactForAmount(amount: number): string {
  const tier = [...IMPACT_TIERS].reverse().find((t) => amount >= t.amount);
  return tier?.impact ?? "a meaningful start for a child in need";
}
