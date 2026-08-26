import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions } from "@nestjs/mongoose";

export const DatabaseConfig = (
  config: ConfigService,
): MongooseModuleOptions => ({
  uri: config.get<string>("DATABASE_URL"),
});
