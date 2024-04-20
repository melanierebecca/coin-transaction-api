import { Module } from '@nestjs/common';
import { ScannerApiService } from './scanner-api.service';

@Module({
  providers: [ScannerApiService],
  exports: [ScannerApiService]
})
export class ScannerApiModule {}
