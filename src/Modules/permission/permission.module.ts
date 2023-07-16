import { Module } from '@nestjs/common';
import { PermissionController } from './controller/permission.controller';
import { PermissionService } from './services/permission.service';
import { ContextService } from 'src/common/services/context.service';
import { CommonModule } from 'src/common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import RolesSchema from 'src/Models/roles.schema';
import PermissionSchema from 'src/Models/permission.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Roles', schema: RolesSchema }, { name: 'Permission', schema: PermissionSchema }]), CommonModule],
  controllers: [PermissionController],
  providers: [PermissionService, ContextService],
  exports: [ContextService],
})
export class PermissionModule { }
