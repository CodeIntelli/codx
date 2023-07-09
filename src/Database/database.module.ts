import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// console.log(process.env.DB_URL);
@Module({
    imports: [MongooseModule.forRoot(process.env.DB_URL, { useNewUrlParser: true }),],
    controllers: [],
    providers: []
})
export class DatabaseModule { }
