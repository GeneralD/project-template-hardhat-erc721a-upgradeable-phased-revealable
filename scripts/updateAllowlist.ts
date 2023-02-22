import { ethers } from 'hardhat'

import { Latest__SYMBOL__, latest__SYMBOL__Factory } from '../libraries/const'
import createMerkleRoot from '../libraries/createMerkleRoot'
import { deployedProxies } from '../libraries/deployedProxy'
import { allowlistedAddresses } from '../libraries/envs'

async function main() {
    const factory = await latest__SYMBOL__Factory
    const instance = factory.attach((await deployedProxies(1))[0].address) as Latest__SYMBOL__

    const [deployer] = await ethers.getSigners()
    let nonce = await ethers.provider.getTransactionCount(deployer.address)
    await instance.setAllowlist(createMerkleRoot(allowlistedAddresses), { nonce: nonce++ })
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
