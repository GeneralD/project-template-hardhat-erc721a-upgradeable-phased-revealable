import { BigNumber } from 'ethers'
import { writeFileSync } from 'fs'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { join } from 'path'

import { Latest__SYMBOL__ } from '../libraries/const'
import { deployedProxies } from '../libraries/deployedProxyForRuntimeEnvironment'
import { allowlistedAddresses } from '../libraries/envs'

export default async (arg: any, env: HardhatRuntimeEnvironment) => {
    const factory = await env.ethers.getContractFactory("__SYMBOL__Ver0")
    const instance = factory.attach((await deployedProxies(1, env))[0].address) as Latest__SYMBOL__

    const data = await Promise.all(allowlistedAddresses.map(address => instance.allowListMemberMintCount(address)
        .then(balance => ({ address, balance }))
        .catch(_ => ({ address, balance: BigNumber.from(0) }))
    ))
    const csvBody = data
        .sort((lhs, rhs) => rhs.balance.toNumber() - lhs.balance.toNumber())
        .map(d => `${d.address},${d.balance}`)
        .join("\n")
    const csvHeader = "Address,Balance"
    const csv = `${csvHeader}\n${csvBody}`
    const exportPath = join(__dirname, "allowlist_mint_quantity.csv")
    console.info(`writing a file to ${exportPath}`)
    writeFileSync(exportPath, csv, { flag: "w" })
}
