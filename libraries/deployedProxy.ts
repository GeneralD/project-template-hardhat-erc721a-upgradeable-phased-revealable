import { network, upgrades } from 'hardhat'

import config from '../hardhat.config'

export type Proxie = {
    address: string
    txHash: string
    kind: string
}

export const deployedProxies = async (numberOfProxies: number) => {
    const json = await import(`../.openzeppelin/${networkFileName()}.json`)
    if (!json.proxies.length) throw new Error("proxy is not deployed yet")

    const proxies: Proxie[] = json.proxies
    return proxies.slice(-numberOfProxies)
}

export const isProxiesDeployed = async (numberOfProxies: number) => {
    try {
        const proxies = await deployedProxies(numberOfProxies)

        // chain on localhost is disposable but json is left even the chain is discarded.
        // so need to check if the proxy is currently on chain.
        if (network.name == 'localhost') {
            const adminAddresses = await Promise.all(proxies.map(proxy => upgrades.erc1967.getAdminAddress(proxy.address)))
            return !adminAddresses.includes("0x0000000000000000000000000000000000000000")
        }
        return true
    } catch {
        return false
    }
}

const networkFileName = () => {
    if (network.name != 'localhost') return network.name
    const chainId = config.networks?.hardhat?.chainId || 1337
    return `unknown-${chainId}`
}
