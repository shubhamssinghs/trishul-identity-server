export interface SystemInformationResponse {
  platform: NodeJS.Platform;
  arch: NodeJS.Architecture;
  cpus: number;
  totalMemory: {
    value: number;
    unit: string;
  };
  nodeVersion: string;
  pid: number;
  softwareVersion: string;
  name: string;
}

export interface UnitValue<T = number> {
  value: T;
  unit: string;
}

export interface CpuUsage {
  user: UnitValue;
  system: UnitValue;
}

export interface MemoryUsage {
  rss: UnitValue;
  heapTotal: UnitValue;
  heapUsed: UnitValue;
  external: UnitValue;
  arrayBuffers: UnitValue;
}

export interface NodeStats {
  healthy: boolean;
  memoryUsedPercent: UnitValue;
  cpuLoadAvg: UnitValue<number | null>;
  overallCpuUsagePercent: UnitValue;
  perCoreCpuUsage: number[];
  uptime: UnitValue;
  cpuUsage: CpuUsage;
  memoryUsage: MemoryUsage;
}

export interface DatabaseStats {
  healthy: boolean;
  latency: UnitValue;
}

export interface SystemHealthResponse {
  healthy: boolean;
  status: string;
  issues: string[];
  suggestions: string[];
  node: NodeStats;
  database: DatabaseStats;
  timestamp: string;
}
