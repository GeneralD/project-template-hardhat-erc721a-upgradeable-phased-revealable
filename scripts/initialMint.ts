import env, { ethers } from 'hardhat'

import { Latest__SYMBOL__, latest__SYMBOL__Factory } from '../libraries/const'
import HardhatRuntimeUtility from '../libraries/HardhatRuntimeUtility'

async function main() {
    const util = new HardhatRuntimeUtility(env)
    const factory = await latest__SYMBOL__Factory
    const instance = factory.attach((await util.deployedProxies(1))[0].address) as Latest__SYMBOL__

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
