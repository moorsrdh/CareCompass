import { type Service, type InsertService } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getServices(): Promise<Service[]>;
  getServicesByCategory(category: string): Promise<Service[]>;
  searchServices(query: string): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
}

export class MemStorage implements IStorage {
  private services: Map<string, Service>;

  constructor() {
    this.services = new Map();
    this.seedData();
  }

  private seedData() {
    const sampleServices: InsertService[] = [
      {
        name: "St. Mary's Food Pantry",
        category: "food",
        description: "Free groceries, hot meals, no ID required",
        address: "123 Mission Street, San Francisco, CA 94103",
        phone: "+14155551234",
        hours: "Mon-Fri 9am-5pm, Sat 10am-2pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7874,
        longitude: -122.4082,
        services: ["food pantry", "hot meals", "groceries"],
        requirements: "None - no ID required"
      },
      {
        name: "Downtown Emergency Shelter",
        category: "shelter",
        description: "Emergency overnight shelter, meals included, case management",
        address: "456 Folsom Street, San Francisco, CA 94105",
        phone: "+14155555678",
        hours: "24/7 Emergency Intake",
        isOpen: true,
        status: "Limited Space",
        latitude: 37.7875,
        longitude: -122.4083,
        services: ["emergency shelter", "meals", "case management"],
        requirements: "Check-in required, first-come first-served"
      },
      {
        name: "Community Hygiene Center",
        category: "hygiene",
        description: "Free showers, laundry, toiletries provided",
        address: "789 Howard Street, San Francisco, CA 94103",
        phone: "+14155559012",
        hours: "Daily 7am-6pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7876,
        longitude: -122.4084,
        services: ["showers", "laundry", "toiletries"],
        requirements: "Sign-in required, 30-minute time limit for showers"
      },
      {
        name: "Mobile Health Clinic",
        category: "healthcare",
        description: "Free basic healthcare, mental health support, no insurance needed",
        address: "Union Square Park, Geary & Powell, San Francisco, CA 94108",
        phone: "+14155553456",
        hours: "Wed-Fri 10am-4pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7877,
        longitude: -122.4085,
        services: ["basic healthcare", "mental health", "prescriptions"],
        requirements: "No insurance needed, walk-ins welcome"
      },
      {
        name: "Comprehensive Social Services",
        category: "social",
        description: "Benefits assistance, housing support, case management, counseling",
        address: "321 Valencia Street, San Francisco, CA 94103",
        phone: "+14155557890",
        hours: "Mon-Fri 8am-5pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7878,
        longitude: -122.4086,
        services: ["benefits assistance", "housing support", "case management", "counseling"],
        requirements: "Appointment preferred, walk-ins accepted"
      },
      {
        name: "Clothing Closet",
        category: "clothing",
        description: "Free clothing for all ages, professional attire available",
        address: "555 Market Street, San Francisco, CA 94105",
        phone: "+14155552468",
        hours: "Tue, Thu, Sat 10am-4pm",
        isOpen: false,
        status: "Closed - Opens Tuesday",
        latitude: 37.7879,
        longitude: -122.4087,
        services: ["clothing", "professional attire", "shoes", "accessories"],
        requirements: "Limit 5 items per visit"
      },
      {
        name: "Job Training Center",
        category: "employment",
        description: "Job training, resume help, interview prep, computer access",
        address: "888 Third Street, San Francisco, CA 94158",
        phone: "+14155551357",
        hours: "Mon-Fri 9am-4pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7880,
        longitude: -122.4088,
        services: ["job training", "resume assistance", "interview preparation", "computer lab"],
        requirements: "Registration required for programs"
      },
      {
        name: "Family Resource Center",
        category: "social",
        description: "Family support services, childcare assistance, parenting classes",
        address: "222 Bryant Street, San Francisco, CA 94107",
        phone: "+14155559753",
        hours: "Mon-Fri 8am-6pm, Sat 9am-1pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7881,
        longitude: -122.4089,
        services: ["family support", "childcare", "parenting classes", "referrals"],
        requirements: "Family-focused services, children welcome"
      },
      {
        name: "St. Francis Community Church",
        category: "community",
        description: "Daily hot meals, clothing closet, emergency financial aid, counseling services",
        address: "1025 Church Street, San Francisco, CA 94114",
        phone: "+14155552468",
        hours: "Daily 7am-8pm, Hot Meals: 12pm & 6pm daily, Services: Sun 10am & 6pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7582,
        longitude: -122.4291,
        services: ["hot lunch 12pm daily", "dinner 6pm daily", "clothing closet", "emergency rent assistance", "grocery bags", "counseling", "spiritual support", "job referrals"],
        requirements: "All faiths welcome, no religious requirement for services"
      },
      {
        name: "Grace Baptist Church Outreach",
        category: "community",
        description: "Weekly food pantry, free community dinners, homeless outreach, job assistance",
        address: "567 Divisadero Street, San Francisco, CA 94117",
        phone: "+14155558765",
        hours: "Wed-Sat 9am-5pm, Free Dinner: Tue & Thu 6pm, Food Pantry: Wed & Fri 10am-2pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7749,
        longitude: -122.4394,
        services: ["free dinner Tue & Thu 6pm", "food pantry Wed & Fri", "homeless outreach", "job training", "resume help", "computer access", "bus passes", "hygiene kits"],
        requirements: "Open to all, no documentation required"
      },
      {
        name: "Salvation Army Community Center",
        category: "community",
        description: "Comprehensive homeless services, shelter, meals, addiction recovery",
        address: "1500 Valencia Street, San Francisco, CA 94110",
        phone: "+14155556789",
        hours: "24/7 Emergency Services, Programs: Mon-Fri 8am-6pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7499,
        longitude: -122.4194,
        services: ["emergency shelter", "meals", "addiction recovery", "case management", "spiritual care"],
        requirements: "Intake assessment required for programs"
      },
      {
        name: "Islamic Society of SF Assistance",
        category: "community",
        description: "Daily meals, temporary shelter, zakat assistance, community support for all",
        address: "20 Jones Street, San Francisco, CA 94102",
        phone: "+14155554321",
        hours: "Daily 9am-7pm, Free Lunch: Mon-Fri 1pm, Friday Services: 1pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7849,
        longitude: -122.4094,
        services: ["free lunch Mon-Fri 1pm", "temporary shelter", "zakat financial assistance", "community support", "translation services", "immigration help", "medical referrals"],
        requirements: "Open to all regardless of faith or background"
      },
      {
        name: "St. Francis Community Church - Hot Meals",
        category: "food",
        description: "Daily hot meals, lunch at 12pm and dinner at 6pm, no questions asked",
        address: "1025 Church Street, San Francisco, CA 94114",
        phone: "+14155552468",
        hours: "Hot Lunch: Daily 12pm, Hot Dinner: Daily 6pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7582,
        longitude: -122.4291,
        services: ["hot lunch 12pm daily", "dinner 6pm daily", "grocery bags", "emergency food"],
        requirements: "No requirements, all are welcome"
      },
      {
        name: "Grace Baptist Church - Free Dinners",
        category: "food",
        description: "Free community dinners Tuesday and Thursday evenings, food pantry available",
        address: "567 Divisadero Street, San Francisco, CA 94117",
        phone: "+14155558765",
        hours: "Free Dinner: Tue & Thu 6pm, Food Pantry: Wed & Fri 10am-2pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7749,
        longitude: -122.4394,
        services: ["free dinner Tue & Thu 6pm", "food pantry Wed & Fri", "emergency food boxes"],
        requirements: "No documentation required"
      },
      {
        name: "Unity Methodist Soup Kitchen - Breakfast",
        category: "food",
        description: "Daily hot breakfast and weekend bag lunches, serving the community since 1985",
        address: "1933 Fillmore Street, San Francisco, CA 94115",
        phone: "+14155551122",
        hours: "Hot Breakfast: Daily 7am-11am, Bag Lunch: Sat-Sun 12pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7849,
        longitude: -122.4306,
        services: ["hot breakfast daily 7am-11am", "bag lunch weekends 12pm", "coffee and snacks"],
        requirements: "No requirements, all are welcome"
      },
      {
        name: "Sacred Heart Catholic - Lunch Program",
        category: "food",
        description: "Weekday lunch program, emergency food boxes, holiday meals for families",
        address: "1665 Church Street, San Francisco, CA 94131",
        phone: "+14155553344",
        hours: "Hot Lunch: Mon-Fri 11am-2pm, Emergency Food: Daily 9am-5pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7410,
        longitude: -122.4269,
        services: ["hot lunch Mon-Fri 11am-2pm", "emergency food boxes", "holiday meals", "senior meals"],
        requirements: "Open to all community members"
      },
      {
        name: "Islamic Society - Daily Lunch",
        category: "food",
        description: "Free daily lunch Monday through Friday, halal meals available",
        address: "20 Jones Street, San Francisco, CA 94102",
        phone: "+14155554321",
        hours: "Free Lunch: Mon-Fri 1pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7849,
        longitude: -122.4094,
        services: ["free lunch Mon-Fri 1pm", "halal meals", "emergency food assistance"],
        requirements: "Open to all regardless of faith or background"
      },
      {
        name: "Temple Beth Shalom - Community Dinner",
        category: "food",
        description: "Thursday community dinners, holiday meals, kosher options available",
        address: "2266 Geary Boulevard, San Francisco, CA 94115",
        phone: "+14155555566",
        hours: "Community Dinner: Thu 5:30pm-7pm, Holiday Meals: Seasonal",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7829,
        longitude: -122.4417,
        services: ["community dinner Thu 5:30pm", "holiday meals", "kosher meals available"],
        requirements: "All backgrounds welcome"
      },
      {
        name: "Unity Methodist Soup Kitchen",
        category: "community",
        description: "Daily breakfast, weekend bag lunches, clothing exchange, pastoral care",
        address: "1933 Fillmore Street, San Francisco, CA 94115",
        phone: "+14155551122",
        hours: "Daily 7am-11am Breakfast, Sat-Sun 12pm Bag Lunch, Clothing: Wed 10am-2pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7849,
        longitude: -122.4306,
        services: ["hot breakfast daily 7am-11am", "bag lunch weekends 12pm", "clothing exchange Wed", "pastoral counseling", "prayer support", "medical clinic referrals", "addiction support groups"],
        requirements: "No requirements, all are welcome"
      },
      {
        name: "Unity Methodist - Clothing Exchange",
        category: "clothing",
        description: "Weekly clothing exchange, professional attire, shoes and accessories",
        address: "1933 Fillmore Street, San Francisco, CA 94115",
        phone: "+14155551122",
        hours: "Clothing Exchange: Wed 10am-2pm",
        isOpen: false,
        status: "Closed - Opens Wednesday",
        latitude: 37.7849,
        longitude: -122.4306,
        services: ["clothing exchange", "professional attire", "shoes", "accessories", "winter coats"],
        requirements: "No requirements, all are welcome"
      },
      {
        name: "St. Francis - Clothing Closet",
        category: "clothing", 
        description: "Clothing closet with daily access, emergency clothing assistance",
        address: "1025 Church Street, San Francisco, CA 94114",
        phone: "+14155552468",
        hours: "Daily 7am-8pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7582,
        longitude: -122.4291,
        services: ["clothing closet", "emergency clothing", "shoes", "work clothes"],
        requirements: "All faiths welcome"
      },
      {
        name: "Sacred Heart Catholic Outreach",
        category: "community",
        description: "Weekday lunch program, emergency assistance, family support services",
        address: "1665 Church Street, San Francisco, CA 94131",
        phone: "+14155553344",
        hours: "Mon-Fri 11am-2pm Lunch, Emergency Help: Daily 9am-5pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7410,
        longitude: -122.4269,
        services: ["hot lunch Mon-Fri 11am-2pm", "emergency food boxes", "utility assistance", "rent help", "children's programs", "senior meals", "holiday meals", "school supplies"],
        requirements: "Open to all community members"
      },
      {
        name: "Temple Beth Shalom Community Kitchen",
        category: "community",
        description: "Thursday community dinners, holiday meals, social services referrals",
        address: "2266 Geary Boulevard, San Francisco, CA 94115",
        phone: "+14155555566",
        hours: "Thu 5:30pm-7pm Dinner, Holiday Meals: Check website, Office: Mon-Thu 9am-4pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7829,
        longitude: -122.4417,
        services: ["community dinner Thu 5:30pm", "holiday meals", "social services navigation", "mental health referrals", "legal aid referrals", "senior support", "youth programs"],
        requirements: "All backgrounds welcome, kosher meals available"
      },
      {
        name: "Grace Baptist - Job Training Center",
        category: "employment",
        description: "Job training programs, resume assistance, computer lab access",
        address: "567 Divisadero Street, San Francisco, CA 94117", 
        phone: "+14155558765",
        hours: "Job Programs: Wed-Fri 9am-4pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7749,
        longitude: -122.4394,
        services: ["job training", "resume help", "computer access", "interview prep", "job referrals"],
        requirements: "Open to all, registration helpful"
      },
      {
        name: "Sacred Heart - Family Services",
        category: "social",
        description: "Emergency assistance, utility help, family support programs",
        address: "1665 Church Street, San Francisco, CA 94131",
        phone: "+14155553344", 
        hours: "Emergency Help: Daily 9am-5pm, Family Programs: Mon-Fri",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7410,
        longitude: -122.4269,
        services: ["utility assistance", "rent help", "children's programs", "school supplies", "family counseling"],
        requirements: "Open to all community members"
      },
      {
        name: "Temple Beth Shalom - Social Services",
        category: "social",
        description: "Social services navigation, mental health referrals, senior support",
        address: "2266 Geary Boulevard, San Francisco, CA 94115",
        phone: "+14155555566",
        hours: "Office: Mon-Thu 9am-4pm",
        isOpen: true,
        status: "Open Now", 
        latitude: 37.7829,
        longitude: -122.4417,
        services: ["social services navigation", "mental health referrals", "legal aid referrals", "senior support", "benefits assistance"],
        requirements: "All backgrounds welcome"
      },
      {
        name: "Islamic Society - Support Services",
        category: "social",
        description: "Community support, translation services, immigration assistance",
        address: "20 Jones Street, San Francisco, CA 94102",
        phone: "+14155554321",
        hours: "Support Services: Daily 9am-7pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7849,
        longitude: -122.4094,
        services: ["translation services", "immigration help", "medical referrals", "community support", "financial assistance"],
        requirements: "Open to all regardless of faith or background"
      }
    ];

    sampleServices.forEach(service => {
      const id = randomUUID();
      const fullService: Service = {
        id,
        name: service.name,
        category: service.category,
        description: service.description,
        address: service.address,
        phone: service.phone,
        hours: service.hours,
        isOpen: service.isOpen ?? false,
        status: service.status,
        latitude: service.latitude,
        longitude: service.longitude,
        distance: Math.round((Math.random() * 2 + 0.1) * 10) / 10,
        services: service.services,
        requirements: service.requirements || null
      };
      this.services.set(id, fullService);
    });
  }

  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values()).sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    return Array.from(this.services.values())
      .filter(service => service.category === category)
      .sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }

  async searchServices(query: string): Promise<Service[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.services.values())
      .filter(service => 
        service.name.toLowerCase().includes(lowerQuery) ||
        service.description.toLowerCase().includes(lowerQuery) ||
        service.category.toLowerCase().includes(lowerQuery) ||
        service.services.some(s => s.toLowerCase().includes(lowerQuery))
      )
      .sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = {
      id,
      name: insertService.name,
      category: insertService.category,
      description: insertService.description,
      address: insertService.address,
      phone: insertService.phone,
      hours: insertService.hours,
      isOpen: insertService.isOpen ?? false,
      status: insertService.status,
      latitude: insertService.latitude,
      longitude: insertService.longitude,
      distance: Math.round((Math.random() * 2 + 0.1) * 10) / 10,
      services: insertService.services,
      requirements: insertService.requirements || null
    };
    this.services.set(id, service);
    return service;
  }
}

export const storage = new MemStorage();
