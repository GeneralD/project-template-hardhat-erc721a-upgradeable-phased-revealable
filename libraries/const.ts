import { ethers } from 'hardhat'

import { ZEROVer0 } from '../typechain'

export const latestZEROFactory = ethers.getContractFactory("ZEROVer0")
export type LatestZERO = ZEROVer0
