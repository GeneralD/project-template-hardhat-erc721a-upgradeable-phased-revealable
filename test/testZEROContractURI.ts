import { expect } from 'chai'
import { upgrades } from 'hardhat'
import { describe, it } from 'mocha'

import { LatestZERO, latestZEROFactory } from '../libraries/const'

describe("ZERO Contract URI", () => {
    it("Check contractURI", async () => {
        const factory = await latestZEROFactory
        const instance = await upgrades.deployProxy(factory) as LatestZERO

        await instance.setBaseURI("https://test.com/")
        expect(await instance.contractURI()).to.equal("https://test.com/index.json")
    })
})
