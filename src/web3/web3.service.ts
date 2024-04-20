import { Injectable } from '@nestjs/common';
import Web3 from 'web3';

@Injectable()
export class Web3Service {
  private web3: Web3;

  constructor() {
    // assuming system supports only one chain
    console.log(process.env.WEB3_PROVIDER_URL)
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER_URL),
    );
  }

  async getTransactionReceipt(transactionHash: string): Promise<any> {
    return await this.web3.eth.getTransactionReceipt(transactionHash);
  }

  async getCoinBalance(
    walletAddress: string,
    coinAddress: string,
    abi: string,
  ): Promise<number|any> {
    const contractABI = JSON.parse(abi);
    const contract = new this.web3.eth.Contract(contractABI, coinAddress);
    const balance = await contract.methods.balanceOf(walletAddress).call();
    return balance;
  }
}
