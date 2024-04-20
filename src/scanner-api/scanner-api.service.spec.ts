import { Test, TestingModule } from '@nestjs/testing';
import { ScannerApiService } from './scanner-api.service';

describe('ScannerApiService', () => {
  let service: ScannerApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScannerApiService],
    }).compile();

    service = module.get<ScannerApiService>(ScannerApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
