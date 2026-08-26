import { ThrottlerModuleOptions } from "@nestjs/throttler";

export const ThrottleConfig: ThrottlerModuleOptions = [
  {
    name: "Default",
    ttl: 60000,
    limit: 5,
  },
];
