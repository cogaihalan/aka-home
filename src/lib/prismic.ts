import { createClient } from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";

export const repositoryName =
  process.env.PRISMIC_REPOSITORY_NAME || "aka-scissor";

export const routes = [
  { type: "page", path: "/pages/:uid" },
  { type: "blog_post", path: "/blog/:uid" },
];

export function createPrismicClient(config = {}) {
  const client = createClient(repositoryName, {
    routes,
    fetchOptions: { next: { revalidate: 0 } },
    ...config,
  });

  if (process.env.NODE_ENV === "development") {
    enableAutoPreviews({ client });
  }

  return client;
}

export const prismicClient = createPrismicClient();

export class PrismicPerformanceMonitor {
  private static cache = new Map<string, { data: any; timestamp: number }>();
  private static CACHE_TTL =
    process.env.NODE_ENV === "development" ? 30 * 1000 : 2 * 60 * 1000;

  static async measureFetch<T>(
    operation: string,
    fn: () => Promise<T>,
  ): Promise<T> {
    const start = performance.now();

    try {
      const result = await fn();
      const end = performance.now();

      if (process.env.NODE_ENV === "development") {
        console.log(`🚀 Prismic ${operation}: ${(end - start).toFixed(2)}ms`);
      }

      return result;
    } catch (error) {
      const end = performance.now();
      console.error(
        `❌ Prismic ${operation} failed: ${(end - start).toFixed(2)}ms`,
        error,
      );
      throw error;
    }
  }

  static getCached(key: string) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }
    return null;
  }

  static setCached(key: string, data: any) {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  static clearCache() {
    this.cache.clear();
  }
}

export class OptimizedPrismicClient {
  private client = prismicClient;

  async getByUID<T = any>(type: string, uid: string, options: any = {}) {
    const cacheKey = `${type}-${uid}`;
    const cached = PrismicPerformanceMonitor.getCached(cacheKey);

    if (cached) {
      return cached;
    }

    return PrismicPerformanceMonitor.measureFetch(
      `getByUID(${type}, ${uid})`,
      async () => {
        const result = await this.client.getByUID(type as any, uid, options);
        PrismicPerformanceMonitor.setCached(cacheKey, result);
        return result;
      },
    );
  }

  async getAllByType<T = any>(type: string, options: any = {}) {
    const cacheKey = `all-${type}`;
    const cached = PrismicPerformanceMonitor.getCached(cacheKey);

    if (cached) {
      return cached;
    }

    return PrismicPerformanceMonitor.measureFetch(
      `getAllByType(${type})`,
      async () => {
        const result = await this.client.getAllByType(type as any, options);
        PrismicPerformanceMonitor.setCached(cacheKey, result);
        return result;
      },
    );
  }

  async getByID<T = any>(id: string, options: any = {}) {
    return PrismicPerformanceMonitor.measureFetch(`getByID(${id})`, () =>
      this.client.getByID(id, options),
    );
  }

  async getSingle<T = any>(type: string, options: any = {}) {
    return PrismicPerformanceMonitor.measureFetch(`getSingle(${type})`, () =>
      this.client.getSingle(type as any, options),
    );
  }

  clearCache() {
    PrismicPerformanceMonitor.clearCache();
  }
}

export const optimizedPrismicClient = new OptimizedPrismicClient();
