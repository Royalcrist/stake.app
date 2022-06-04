import {useAccount, useProvider, useSigner} from 'wagmi'

import {ContractService, FAKE_NFT_CONTRACT_ADDRESS} from "./ContractService";

import {useEffect, useMemo, useState} from "react";
import {FakeNft__factory} from './contracts';

export function Example() {
    const {data: account} = useAccount()
    const {data: signer} = useSigner()

    const provider = useProvider()

    const contractService = useMemo(() => {
        return new ContractService()
    }, []);

    const [tokens, setTokens] = useState<string[]>([])

    useEffect(() => {
        (async () => {
                if (account && account.address) {
                    let tokens = await contractService.listTokensOfOwner(
                        FakeNft__factory.connect(FAKE_NFT_CONTRACT_ADDRESS, provider),
                        account.address
                    )

                    setTokens(tokens)
                }
            }
        )()
    }, [provider, account, contractService])

    const mint = async () => {
        if (account && account.address && signer) {
            let contract = FakeNft__factory.connect(FAKE_NFT_CONTRACT_ADDRESS, signer);
            await contract.mint(account.address)
        }
    }

    return (
        <div>
            {account ? (
                <div>
                    <button onClick={mint}>Mint NFT</button>
                    <div>
                        {tokens.map(t => {
                            return <p>{t}</p>
                        })}
                    </div>
                </div>
            ) : <>Connect your wallet first</>}
        </div>
    )
}