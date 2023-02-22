import { HardhatRuntimeEnvironment } from 'hardhat/types'

import config from '../hardhat.config'

export type Proxie = {
    address: string
    txHash: string
    kind: string
}

export const deployedProxies = async (numberOfProxies: number, env: HardhatRuntimeEnvironment) => {
    const jsonPath = `../.openzeppelin/${networkFileName(env)}.json`
    console.log(`finding ${jsonPath}`)
    const json = await import(jsonPath)
    if (!json.proxies.length) throw new Error("proxy is not deployed yet")

    const proxies: Proxie[] = json.proxies
    return proxies.slice(-numberOfProxies)
}

export const isProxiesDeployed = async (numberOfProxies: number, env: HardhatRuntimeEnvironment) => {
    try {
        const proxies = await deployedProxies(numberOfProxies, env)

        // chain on localhost is disposable but json is left even the chain is discarded.
        // so need to check if the proxy is currently on chain.
        if (env.network.name == 'localhost') {
            const adminAddresses = await Promise.all(proxies.map(proxy => env.upgrades.erc1967.getAdminAddress(proxy.address)))
            return !adminAddresses.includes("0x0000000000000000000000000000000000000000")
        }
        return true
    } catch {
        return false
    }
}

const networkFileName = (env: HardhatRuntimeEnvironment) => {
    if (env.network.name != 'localhost') return env.network.name
    const chainId = config.networks?.hardhat?.chainId || 1337
    return `unknown-${chainId}`
}
