import { Module } from '@nestjs/common';
import { CostExplorerController } from './cost-explorer.controller';
import { CostExplorerService } from './cost-explorer.service';

@Module({
  controllers: [CostExplorerController],
  providers: [CostExplorerService],
  exports: [CostExplorerService],
})
export class CostExplorerModule {}
