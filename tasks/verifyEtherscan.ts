import { HardhatRuntimeEnvironment } from 'hardhat/types'

import HardhatRuntimeUtility from '../libraries/HardhatRuntimeUtility'

export default async (arg: any, env: HardhatRuntimeEnvironment) => {
    const util = new HardhatRuntimeUtility(env)
    const proxies = await util.deployedProxies(1)
    const proxy = proxies[0]

    env.run("verify:verify", {
        address: proxy.address,
    })
}
