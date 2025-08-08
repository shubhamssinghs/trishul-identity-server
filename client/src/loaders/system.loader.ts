import { apiServiceInstance } from "../services/api-service";

export class SystemLoader {
  async systemData() {
    try {
      const data = await apiServiceInstance.get("/system/meta");
      return data;
    } catch (error) {
      console.error("System health fetch failed:", error);
      throw error;
    }
  }
}

export const systemLoader = new SystemLoader();
