import env, { upgrades } from 'hardhat'

import { latest__SYMBOL__Factory } from '../libraries/const'
import HardhatRuntimeUtility from '../libraries/HardhatRuntimeUtility'

async function main() {
    const util = new HardhatRuntimeUtility(env)
    const proxies = await util.deployedProxies(1)
    const instance = await upgrades.upgradeProxy(proxies[0].address, await latest__SYMBOL__Factory)
    await instance.deployed()
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
