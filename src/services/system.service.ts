import os from "os";
import pkg from "../../package.json";

import { MESSAGES } from "../constants";
import { sequelize } from "../models";

export class SystemService {
  getStaticSystemMeta = () => {
    const totalMemory = os.totalmem();
    const cpuCount = os.cpus().length;

    return {
      platform: os.platform(),
      arch: os.arch(),
      cpus: cpuCount,
      totalMemory: {
        value: parseFloat((totalMemory / 1024 / 1024).toFixed(2)),
        unit: "MB",
      },
      nodeVersion: process.version,
      pid: process.pid,
      softwareVersion: pkg.version,
      name: pkg.name,
    };
  };

  getStreamableSystemStats = async () => {
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    const loadAverage = os.loadavg();
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemoryPercent = ((totalMemory - freeMemory) / totalMemory) * 100;
    const cpuInfo = os.cpus();
    const cpuCount = cpuInfo.length;
    const avgLoad = os.platform() === "win32" ? null : loadAverage[0];

    const totalCpuTimes = cpuInfo.reduce(
      (acc, cpu) => {
        acc.user += cpu.times.user;
        acc.nice += cpu.times.nice;
        acc.sys += cpu.times.sys;
        acc.idle += cpu.times.idle;
        acc.irq += cpu.times.irq;
        return acc;
      },
      { user: 0, nice: 0, sys: 0, idle: 0, irq: 0 }
    );

    const totalCpuTime = Object.values(totalCpuTimes).reduce(
      (a, b) => a + b,
      0
    );
    const usedCpuTime = totalCpuTime - totalCpuTimes.idle;
    const overallCpuUsagePercent = (usedCpuTime / totalCpuTime) * 100;

    const perCoreCpuUsage = cpuInfo.map((cpu, index) => {
      const total = Object.values(cpu.times).reduce((a, b) => a + b, 0);
      const used = total - cpu.times.idle;
      return {
        core: index,
        usagePercent: parseFloat(((used / total) * 100).toFixed(2)),
      };
    });

    let dbLatency = 0;
    let isDatabaseHealthy = false;
    let isNodeHealthy = true;

    const issues: string[] = [];
    const suggestions: string[] = [];

    if (uptime <= 60) {
      isNodeHealthy = false;
      issues.push(MESSAGES.SYSTEM.UPTIME_LOW);
      suggestions.push(MESSAGES.SYSTEM.SUGGESTIONS.UPTIME_LOW);
    }

    if (usedMemoryPercent >= 80) {
      isNodeHealthy = false;
      issues.push(MESSAGES.SYSTEM.MEMORY_HIGH);
      suggestions.push(MESSAGES.SYSTEM.SUGGESTIONS.MEMORY_HIGH);
    }

    if (avgLoad !== null && avgLoad / cpuCount >= 1) {
      isNodeHealthy = false;
      issues.push(MESSAGES.SYSTEM.CPU_HIGH);
      suggestions.push(MESSAGES.SYSTEM.SUGGESTIONS.CPU_HIGH);
    }

    try {
      const start = Date.now();
      await sequelize.query("SELECT 1");
      dbLatency = Date.now() - start;
      isDatabaseHealthy = true;
    } catch {
      issues.push(MESSAGES.SYSTEM.DATABASE_UNREACHABLE);
      suggestions.push(MESSAGES.SYSTEM.SUGGESTIONS.DATABASE_UNREACHABLE);
    }

    const overallHealthy = isNodeHealthy && isDatabaseHealthy;

    return {
      healthy: overallHealthy,
      status: overallHealthy ? MESSAGES.SYSTEM.OK : MESSAGES.SYSTEM.FAILED,
      issues,
      suggestions,
      node: {
        healthy: isNodeHealthy,
        memoryUsedPercent: {
          value: parseFloat(usedMemoryPercent.toFixed(2)),
          unit: "%",
        },
        cpuLoadAvg: {
          value: avgLoad !== null ? parseFloat(avgLoad.toFixed(2)) : null,
          unit: "load",
        },
        overallCpuUsagePercent: {
          value: parseFloat(overallCpuUsagePercent.toFixed(2)),
          unit: "%",
        },
        perCoreCpuUsage,
        uptime: {
          value: parseInt(uptime.toFixed(0)),
          unit: "s",
        },
        cpuUsage: {
          user: {
            value: cpuUsage.user / 1000,
            unit: "ms",
          },
          system: {
            value: cpuUsage.system / 1000,
            unit: "ms",
          },
        },
        memoryUsage: {
          rss: {
            value: parseFloat((memoryUsage.rss / 1024 / 1024).toFixed(2)),
            unit: "MB",
          },
          heapTotal: {
            value: parseFloat((memoryUsage.heapTotal / 1024 / 1024).toFixed(2)),
            unit: "MB",
          },
          heapUsed: {
            value: parseFloat((memoryUsage.heapUsed / 1024 / 1024).toFixed(2)),
            unit: "MB",
          },
          external: {
            value: parseFloat((memoryUsage.external / 1024 / 1024).toFixed(2)),
            unit: "MB",
          },
          arrayBuffers: {
            value: parseFloat(
              (memoryUsage.arrayBuffers / 1024 / 1024).toFixed(2)
            ),
            unit: "MB",
          },
        },
      },
      database: {
        healthy: isDatabaseHealthy,
        latency: {
          value: dbLatency,
          unit: "ms",
        },
      },
      timestamp: new Date().toISOString(),
    };
  };
}
