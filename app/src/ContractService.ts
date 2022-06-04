import {Result} from "@ethersproject/abi";
import {FakeNft} from "./contracts";

// todo: replace with actual contract addresses
export const FAKE_NFT_CONTRACT_ADDRESS = "0x11220b970933b03EB1e9F05C4dCF31c31cde7D53"
export const FAKE_COIN_CONTRACT_ADDRESS = "0x8565faFf1ACCEb4986eD64910C7C57Bf2Ef95D5a"
export const FAKE_STAKE_CONTRACT_ADDRESS = "0xe02eAcf0093Ea63Aa729D356652ec2930a0aE690"

export class ContractService {
    async listTokensOfOwner(contract: FakeNft, account: string): Promise<string[]> {
        const sentLogs = await contract.queryFilter(
            contract.filters.Transfer(account, null),
        );

        const receivedLogs = await contract.queryFilter(
            contract.filters.Transfer(null, account),
        );

        const logs = sentLogs.concat(receivedLogs)
            .sort((a, b) =>
                a.blockNumber - b.blockNumber ||
                a.transactionIndex - b.transactionIndex,
            );

        const owned = new Set<string>();

        for (const log of logs) {
            const {from, to, tokenId} = log.args as Result;

            if (this.addressEqual(to, account)) {
                owned.add(tokenId.toString());
            } else if (this.addressEqual(from, account)) {
                owned.delete(tokenId.toString());
            }
        }

        return Array.from(owned.values())
    };

    addressEqual(a: string, b: string) {
        return a.toLowerCase() === b.toLowerCase();
    }
}