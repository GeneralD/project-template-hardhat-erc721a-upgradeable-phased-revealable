import csv from 'csv-parser'
import { createReadStream } from 'fs'
import { ethers } from 'hardhat'
import { join } from 'path'

import { latest__SYMBOL__Factory } from '../libraries/const'
import { deployedProxies } from '../libraries/deployedProxy'

async function main() {
    const factory = await latest__SYMBOL__Factory
    const instance = factory.attach((await deployedProxies(1))[0].address)
    await instance.deployed()

    const rows: { address: string, balance: number }[] = []
    createReadStream(join(__dirname, "holders.csv"))
        .pipe(csv())
        .on("data", data => rows.push(data))
        .on("error", err => console.error(err.message))
        .on("end", () => console.log(`Start airdrop to ${rows.length} addresses.`))

    const [deployer] = await ethers.getSigners()
    let nonce = await ethers.provider.getTransactionCount(deployer.address)

    for (const row of rows) {
        await instance.adminMintTo(row.address, row.balance, { nonce: nonce++ })
    }
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
