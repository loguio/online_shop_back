import { Module } from "@nestjs/common";
import { FormationModule } from "./formations/formation.module";

@Module({
    imports: [FormationModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
