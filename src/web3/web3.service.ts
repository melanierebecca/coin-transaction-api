import { Injectable } from '@nestjs/common';
import Web3 from 'web3';

@Injectable()
export class Web3Service {
  private web3: Web3;

  constructor() {
    // assuming system supports only one chain
    console.log(process.env.WEB3_PROVIDER_URL);
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER_URL),
    );
  }

  getTokenDetails = async ({
    coinAddress,
    abi,
  }: {
    coinAddress: string;
    abi: string;
  }): Promise<any>  => {
    try {
      const contractABI = JSON.parse(abi);
      const contract = new this.web3.eth.Contract(contractABI, coinAddress);
      const decimals : BigInt = await contract.methods.decimals().call();
      const name = await contract.methods.name().call();
      const symbol = await contract.methods.symbol().call();
      return {
        name: name,
        symbol: symbol,
        decimals: decimals.toString(),
        abi: abi,
        address: coinAddress
      };
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  async getTransactionReceipt(transactionHash: string): Promise<any> {
    return await this.web3.eth.getTransactionReceipt(transactionHash);
  }

  async getCoinBalance(
    walletAddress: string,
    coinAddress: string,
    abi: string,
  ): Promise<number | any> {
    const contractABI = JSON.parse(abi);
    const contract = new this.web3.eth.Contract(contractABI, coinAddress);
    const balance = await contract.methods.balanceOf(walletAddress).call();
    return balance;
  }
}
