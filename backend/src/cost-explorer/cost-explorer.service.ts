import { Injectable } from '@nestjs/common';
import {
  CostExplorerClient,
  GetCostAndUsageCommand,
  Granularity,
  Expression,
  DimensionValues,
} from '@aws-sdk/client-cost-explorer';

@Injectable()
export class CostExplorerService {
  private readonly costexplorer: CostExplorerClient;

  constructor() {
    this.costexplorer = new CostExplorerClient({ region: 'ap-northeast-2' });
  }

  async getCostAndUsage(accountId: string): Promise<any> {
    const now = new Date();
    const start = `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(-2)}-01`;
    const end = `${now.getFullYear()}-${('0' + (now.getMonth() + 2)).slice(-2)}-01`;

    const params = {
      TimePeriod: {
        Start: start,
        End: end,
      },
      Granularity: Granularity.MONTHLY,
      Metrics: ['BlendedCost'],
      Filter: {
        Dimensions: {
          Key: 'LINKED_ACCOUNT',
          Values: [accountId],
        } as DimensionValues,
      } as Expression,
    };

    const command = new GetCostAndUsageCommand(params);
    try {
      const data = await this.costexplorer.send(command);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
