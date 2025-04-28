import {
  CalendarDays,
  Landmark,
  Newspaper,
  Trophy,
  UsersRound,
  BookOpen,
  Music,
  Film,
  Coffee,
  DollarSign,
} from "lucide-react";

export type Category = {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
};

export const categories: Category[] = [
  {
    id: "academic",
    name: "Academic",
    icon: BookOpen,
    description: "Lectures, seminars, and academic events",
  },
  {
    id: "sports",
    name: "Sports",
    icon: Trophy,
    description: "Sports matches and fitness activities",
  },
  {
    id: "cultural",
    name: "Cultural",
    icon: Music,
    description: "Cultural and artistic performances",
  },
  {
    id: "social",
    name: "Social",
    icon: UsersRound,
    description: "Social gatherings and networking events",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: Film,
    description: "Entertainment and recreational activities",
  },
  {
    id: "career",
    name: "Career",
    icon: DollarSign,
    description: "Career fairs and professional development",
  },
  {
    id: "campus",
    name: "Campus Life",
    icon: Coffee,
    description: "General campus life events",
  },
  {
    id: "other",
    name: "Other",
    icon: CalendarDays,
    description: "Other university events",
  },
];

export type Location = {
  id: string;
  name: string;
  address: string;
  building?: string;
  room?: string;
  latitude?: number;
  longitude?: number;
  capacity?: number;
  accessibilityNotes?: string;
};

export const locations: Location[] = [
  {
    id: "great-hall",
    name: "Great Hall",
    address: "1 Jan Smuts Avenue, Braamfontein, Johannesburg",
    building: "Central Block",
    capacity: 1000,
    latitude: -26.1927,
    longitude: 28.032,
  },
  {
    id: "senate-house",
    name: "Senate House",
    address: "Jorissen St, Johannesburg",
    building: "Senate House",
    capacity: 200,
    latitude: -26.1933,
    longitude: 28.0317,
  },
  {
    id: "science-stadium",
    name: "Science Stadium",
    address: "Yale Road, Johannesburg",
    building: "Science Campus",
    capacity: 500,
    latitude: -26.1939,
    longitude: 28.0298,
  },
  {
    id: "varsity-theatre",
    name: "varsity Theatre",
    address: "Performing Arts Complex, Johannesburg",
    building: "East Campus",
    capacity: 350,
    latitude: -26.1921,
    longitude: 28.0334,
  },
  {
    id: "bidvest-stadium",
    name: "Bidvest Stadium",
    address: "Sturrock Park, Braamfontein",
    capacity: 5000,
    latitude: -26.1878,
    longitude: 28.0291,
  },
];

export type Event = {
  id: string;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  location: Location;
  capacity?: number;
  category: Category;
  imageUrl: string;
  isPublished: boolean;
  createdAt: string;
  creatorId?: string;
  isFeatured?: boolean;
};

export const events: Event[] = [
  {
    id: "1",
    title: "Freshers Welcome Ceremony",
    description:
      "Welcome ceremony for all first-year students at varsity University. Learn about campus services, meet faculty, and connect with fellow students.",
    startDateTime: "2025-01-20T09:00:00",
    endDateTime: "2025-01-20T13:00:00",
    location: locations[0],
    capacity: 800,
    category: categories[3],
    imageUrl: "/placeholder.svg",
    isPublished: true,
    createdAt: "2024-12-01T12:00:00",
    isFeatured: true,
  },
  {
    id: "2",
    title: "Engineering Innovation Showcase",
    description:
      "Annual showcase of innovative projects from the Faculty of Engineering and the Built Environment.",
    startDateTime: "2025-02-15T10:00:00",
    endDateTime: "2025-02-15T16:00:00",
    location: locations[2],
    capacity: 300,
    category: categories[0],
    imageUrl: "/placeholder.svg",
    isPublished: true,
    createdAt: "2024-12-10T09:30:00",
    isFeatured: true,
  },
  {
    id: "3",
    title: "varsity vs UCT Rugby Match",
    description:
      "Varsity Cup Rugby match between varsity and University of Cape Town.",
    startDateTime: "2025-03-05T18:30:00",
    endDateTime: "2025-03-05T20:30:00",
    location: locations[4],
    category: categories[1],
    imageUrl: "/placeholder.svg",
    isPublished: true,
    createdAt: "2025-01-15T14:00:00",
    isFeatured: true,
  },
  {
    id: "4",
    title: "Annual Cultural Festival",
    description:
      "A celebration of diverse cultures represented at varsity University featuring performances, food, and exhibitions.",
    startDateTime: "2025-04-10T12:00:00",
    endDateTime: "2025-04-11T22:00:00",
    location: locations[0],
    category: categories[2],
    imageUrl: "/placeholder.svg",
    isPublished: true,
    createdAt: "2025-01-20T11:15:00",
  },
  {
    id: "5",
    title: "Career Fair 2025",
    description:
      "Connect with potential employers from various industries. Bring your CV and professional attire.",
    startDateTime: "2025-03-20T09:00:00",
    endDateTime: "2025-03-20T16:00:00",
    location: locations[1],
    capacity: 200,
    category: categories[5],
    imageUrl: "/placeholder.svg",
    isPublished: true,
    createdAt: "2025-01-25T10:00:00",
  },
  {
    id: "6",
    title: "Research Symposium",
    description:
      "Annual research symposium showcasing groundbreaking research from all faculties.",
    startDateTime: "2025-05-12T09:00:00",
    endDateTime: "2025-05-13T17:00:00",
    location: locations[2],
    category: categories[0],
    imageUrl: "/placeholder.svg",
    isPublished: true,
    createdAt: "2025-02-01T13:45:00",
  },
  {
    id: "7",
    title: "Student Society Fair",
    description:
      "Explore the diverse range of student societies and clubs at varsity.",
    startDateTime: "2025-02-05T10:00:00",
    endDateTime: "2025-02-05T15:00:00",
    location: locations[0],
    category: categories[6],
    imageUrl: "/placeholder.svg",
    isPublished: true,
    createdAt: "2024-12-20T09:00:00",
  },
  {
    id: "8",
    title: "Public Lecture: Climate Change",
    description:
      "Distinguished Professor James Smith discusses the latest climate change research and implications for Southern Africa.",
    startDateTime: "2025-03-10T18:00:00",
    endDateTime: "2025-03-10T20:00:00",
    location: locations[1],
    capacity: 150,
    category: categories[0],
    imageUrl: "/placeholder.svg",
    isPublished: true,
    createdAt: "2025-02-10T11:30:00",
  },
];

export type NewsArticle = {
  id: string;
  title: string;
  summary: string;
  content: string;
  publishDate: string;
  imageUrl: string;
  author: string;
  category: string;
  isFeatured: boolean;
};

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "varsity University Ranks Among Top Global Institutions",
    summary:
      "varsity achieves its highest-ever global ranking in the latest QS World University Rankings.",
    content:
      "varsity University has achieved its highest-ever position in the QS World University Rankings, placing it among the top 1% of universities globally. This remarkable achievement reflects the university's commitment to academic excellence and groundbreaking research.",
    publishDate: "2025-03-15T09:00:00",
    imageUrl: "/placeholder.svg",
    author: "University Communications",
    category: "Achievements",
    isFeatured: true,
  },
  {
    id: "2",
    title: "New State-of-the-Art Science Laboratory Opens",
    summary:
      "The Faculty of Science unveils cutting-edge research facilities to advance scientific discovery.",
    content:
      "The Faculty of Science has officially opened its new state-of-the-art laboratory complex, representing a R50 million investment in advanced research infrastructure. The facility will support groundbreaking research in fields ranging from quantum physics to biotechnology.",
    publishDate: "2025-02-28T10:30:00",
    imageUrl: "/placeholder.svg",
    author: "Faculty of Science",
    category: "Facilities",
    isFeatured: true,
  },
  {
    id: "3",
    title: "Student Innovation Team Wins International Competition",
    summary:
      "varsity engineering students take top prize at global innovation challenge.",
    content:
      "A team of undergraduate engineering students has won first place at the International Student Innovation Challenge in Zurich, Switzerland. Their sustainable water filtration system impressed judges and earned the university global recognition in the field of engineering innovation.",
    publishDate: "2025-02-20T14:15:00",
    imageUrl: "/placeholder.svg",
    author: "Engineering Faculty",
    category: "Student Achievements",
    isFeatured: false,
  },
];

export type SportsTeam = {
  id: string;
  name: string;
  sport: string;
  logoUrl: string;
  coach: string;
  contactEmail: string;
};

export const sportsTeams: SportsTeam[] = [
  {
    id: "1",
    name: "varsity Rugby",
    sport: "Rugby",
    logoUrl: "/placeholder.svg",
    coach: "Michael Johnson",
    contactEmail: "rugby@varsity.ac.za",
  },
  {
    id: "2",
    name: "varsity Soccer",
    sport: "Soccer",
    logoUrl: "/placeholder.svg",
    coach: "Sarah Williams",
    contactEmail: "soccer@varsity.ac.za",
  },
  {
    id: "3",
    name: "varsity Cricket",
    sport: "Cricket",
    logoUrl: "/placeholder.svg",
    coach: "James Anderson",
    contactEmail: "cricket@varsity.ac.za",
  },
];

export type SportsFixture = {
  id: string;
  team: SportsTeam;
  opponent: string;
  fixtureDate: string;
  location: Location;
  isHomeGame: boolean;
  result?: string;
  score?: string;
  summary?: string;
};

export const sportsFixtures: SportsFixture[] = [
  {
    id: "1",
    team: sportsTeams[0],
    opponent: "University of Johannesburg",
    fixtureDate: "2025-03-05T18:30:00",
    location: locations[4],
    isHomeGame: true,
  },
  {
    id: "2",
    team: sportsTeams[1],
    opponent: "University of Pretoria",
    fixtureDate: "2025-03-12T15:00:00",
    location: locations[4],
    isHomeGame: true,
  },
  {
    id: "3",
    team: sportsTeams[0],
    opponent: "Stellenbosch University",
    fixtureDate: "2025-03-19T14:00:00",
    location: {
      id: "stellenbosch-stadium",
      name: "Stellenbosch Stadium",
      address: "Stellenbosch, Western Cape",
      capacity: 4500,
    },
    isHomeGame: false,
  },
];
