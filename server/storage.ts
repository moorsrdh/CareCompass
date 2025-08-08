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
        description: "Free meals, clothing closet, emergency assistance, spiritual support",
        address: "1025 Church Street, San Francisco, CA 94114",
        phone: "+14155552468",
        hours: "Daily 8am-8pm, Services: Sun 10am & 6pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7582,
        longitude: -122.4291,
        services: ["free meals", "clothing", "emergency assistance", "counseling", "spiritual support"],
        requirements: "All faiths welcome, no religious requirement for services"
      },
      {
        name: "Grace Baptist Church Outreach",
        category: "community",
        description: "Food pantry, homeless assistance, job training programs, community meals",
        address: "567 Divisadero Street, San Francisco, CA 94117",
        phone: "+14155558765",
        hours: "Wed-Sat 9am-5pm, Community Meals: Tue & Thu 6pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7749,
        longitude: -122.4394,
        services: ["food pantry", "homeless assistance", "job training", "community meals"],
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
        description: "Food assistance, temporary shelter, community support for all faiths",
        address: "20 Jones Street, San Francisco, CA 94102",
        phone: "+14155554321",
        hours: "Daily 9am-7pm, Friday Services: 1pm",
        isOpen: true,
        status: "Open Now",
        latitude: 37.7849,
        longitude: -122.4094,
        services: ["food assistance", "temporary shelter", "community support", "financial aid"],
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
