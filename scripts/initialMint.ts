import { ethers } from 'hardhat'

import { Latest__SYMBOL__, latest__SYMBOL__Factory } from '../libraries/const'
import { deployedProxies } from '../libraries/deployedProxy'

async function main() {
    const factory = await latest__SYMBOL__Factory
    const instance = factory.attach((await deployedProxies(1))[0].address) as Latest__SYMBOL__

    if ((await instance.totalSupply()).gt(0)) throw new Error("already minted")

    const [deployer] = await ethers.getSigners()
    let nonce = await ethers.provider.getTransactionCount(deployer.address)

    // await instance.adminMintTo("0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", 1, { nonce: nonce++ })
    // await instance.adminMintTo("0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", 1, { nonce: nonce++ })
    // await instance.adminMintTo("0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", 1, { nonce: nonce++ })
    // await instance.adminMintTo("0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", 1, { nonce: nonce++ })
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
