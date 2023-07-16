import { Module } from '@nestjs/common';
import { RolesController } from './controller/roles.controller';
import { RolesService } from './services/roles.service';
import { ContextService } from 'src/common/services/context.service';
import { CommonModule } from 'src/common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import RolesSchema from 'src/Models/roles.schema';
import PermissionSchema from 'src/Models/permission.schema';



@Module({
  imports: [MongooseModule.forFeature([{ name: 'Roles', schema: RolesSchema }, { name: 'Permission', schema: PermissionSchema }]), CommonModule],
  controllers: [RolesController],
  providers: [RolesService, ContextService],
  exports: [ContextService],
})
export class RolesModule { }
