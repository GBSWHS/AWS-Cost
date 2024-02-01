import { Controller, Get, Query } from '@nestjs/common';
import { CostExplorerService } from './cost-explorer.service';

@Controller('costs')
export class CostExplorerController {
  constructor(private readonly costExplorerService: CostExplorerService) {}

  @Get()
  getCostAndUsage(@Query('accountId') accountId: string) {
    return this.costExplorerService.getCostAndUsage(accountId);
  }
}
