import { upgrades } from 'hardhat'

import { latest__SYMBOL__Factory } from '../libraries/const'
import { deployedProxies } from '../libraries/deployedProxy'

async function main() {
    const proxies = await deployedProxies(1)

    const instance = await upgrades.upgradeProxy(proxies[0].address, await latest__SYMBOL__Factory)
    await instance.deployed()
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
