import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class ScannerApiService {
  getTokenAbi = async (address: string): Promise<string | false> => {
    try {
      const endpoint = process.env.SCANNER_API_URL;
      const apiKey = process.env.SCANNER_API_KEY;

      const tokenAbiResponse: AxiosResponse<any> = await axios.get(
        `${endpoint}/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`,
      );
      if (tokenAbiResponse.data.status === '1') {
        return tokenAbiResponse.data.result;
      } else {
        throw tokenAbiResponse.data;
      }
    } catch (e) {}
  };
}
