import { Module } from '@nestjs/common';
import { ScannerApiService } from './scanner-api.service';

@Module({
  providers: [ScannerApiService]
})
export class ScannerApiModule {}
