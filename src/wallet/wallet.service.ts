import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { initWasm } from '@trustwallet/wallet-core';
import * as bip39 from 'bip39';
import { Wallet } from './wallet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {
  private currentWasm: any;

constructor(@InjectRepository(Wallet)
private walletRepository: Repository<Wallet>){
    // this.currentWasm = await initWasm();
}

  async getCoinType(coin: string): Promise<number> {
    if (!this.currentWasm) {
      this.currentWasm = await initWasm();
    }
    const { CoinType } = this.currentWasm;
    let coinType = CoinType.bitcoin;

    switch (coin) {
      case 'TRC20':
        coinType = CoinType.tron;
        break;
      case 'ERC20':
        coinType = CoinType.ethereum;
        break;
      case 'BSC':
        coinType = CoinType.smartChain;
        break;
      case 'MATIC':
        coinType = CoinType.polygon;
        break;
      default:
        coinType = CoinType.bitcoin;
    }
    return coinType;
  }

  async #generateWalletAddress(): Promise<WalletAddress> {
    try {
      const coin = process.env.WALLET_COIN
      if (!this.currentWasm) {
        this.currentWasm = await initWasm();
      }
      const mnemonic: string = bip39.generateMnemonic();
      const { HexCoding, HDWallet, Derivation } = this.currentWasm;
      const wallet = HDWallet.createWithMnemonic(`${mnemonic.toString()}`, '');
      const key = wallet.getKeyForCoin(coin);
      const pubKey = key.getPublicKeySecp256k1(true);
      const address = wallet.getAddressForCoin(coin);
      const testAddress = wallet.getAddressDerivation(coin, Derivation.bitcoinTestnet);
      const privateKey = HexCoding.encode(key.data());

      const walletAddress: WalletAddress = {
        address: address,
        testAddress: testAddress,
        xpub: `${HexCoding.encode(pubKey.data())}`,
        mnemonic: wallet.mnemonic(),
        privateKey: privateKey,
        coin: coin,
      };
      return walletAddress;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async create(): Promise<Wallet> {
    const walletData = await this.#generateWalletAddress()
    // TODO: encrypt key
    const wallet = this.walletRepository.create(walletData);
    return await this.walletRepository.save(wallet);
  }


}

interface WalletAddress {
  address: string;
  testAddress: string;
  xpub: string;
  mnemonic: string;
  privateKey: string;
  coin: string;
}
