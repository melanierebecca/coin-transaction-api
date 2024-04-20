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
  }): Promise<any> => {
    try {
      const contractABI = JSON.parse(abi);
      const contract = new this.web3.eth.Contract(contractABI, coinAddress);
      const decimals: BigInt = await contract.methods.decimals().call();
      const name = await contract.methods.name().call();
      const symbol = await contract.methods.symbol().call();
      return {
        name: name,
        symbol: symbol,
        decimals: decimals.toString(),
        abi: abi,
        address: coinAddress,
      };
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  async getTransactionReceipt(transactionHash: string): Promise<any> {
    return await this.web3.eth.getTransactionReceipt(transactionHash);
  }

  #estimateGasFee = async (transfer: any, from: string): Promise<number> => {
    try {
      const gasAmount = await transfer.estimateGas({ from: from });
      return gasAmount;
    } catch (error) {
      console.log(error);
      return 30000;
    }
  };

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

  async transferTokens({
    pk,
    from,
    to,
    amount,
    tokenAbi,
    tokenAddress,
  }: {
    pk: string;
    from: string;
    to: string;
    amount: string;
    tokenAbi: any;
    tokenAddress: string;
  }): Promise<any> {
    try {
      const contractABI = JSON.parse(tokenAbi);
      const contractAddress = tokenAddress;

      const contract = new this.web3.eth.Contract(
        contractABI,
        contractAddress,
        { from: from },
      );
      const decimals = await contract.methods.decimals().call();
      console.log('decimals', decimals);
      const amountHex = this.web3.utils.toHex(
        `${parseFloat(amount) * parseFloat(`1e${decimals}`)}`,
      );

      const transfer = contract.methods.transfer(to, amountHex);
      const estimateGas = await this.#estimateGasFee(transfer, from);
      console.log(estimateGas);
      const data = transfer.encodeABI();

      const txObj = {
        gas: this.web3.utils.toHex(estimateGas),
        to: contractAddress,
        value: '0x0',
        data: data,
        from: from,
      };
      console.log(txObj);
      const signedTx = await this.web3.eth.accounts.signTransaction(txObj, pk);
      const res = await this.web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
}
