import express from 'express';
import { ethers } from 'ethers';

import { readContract, writeContract } from '@wagmi/core';
import config  from './wagmi.js'

import abi from './TokenAbi.js'

const app = express()
const USDT_CONTRACT_ADDRESS = '0x2728DD8B45B788e26d12B13Db5A244e5403e7eda'

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/test', (req, res) => {
  res.send('hello world')
})

app.get('/read-balance', async (req, res) => {
  const result = await readBalance()
  
  res.json({balance: ethers.formatUnits(result, 18) })
})

app.post('/send-usd', async (req, res) =>{

  try {
    // console.log(req)
    let { recevier, amount } = req.body
    amount = ethers.parseEther(String(amount))
    const result = await writeContract(config, {
      abi,
      address: USDT_CONTRACT_ADDRESS,
      functionName: 'transfer',
      args: [
        recevier,
        amount,
      ],
      account: '0x6dbd545d00b84d32ed24f8c1153012127bca15a5edfc9f98f33c8777d3e386ea', 
    })
    console.log(result)
    res.json({
      result
    })
  } catch (error) {
    console.log(error)
  }
})

// Read balance

const readBalance = async () => {
  const result = await readContract(config, {
    abi,
    address: USDT_CONTRACT_ADDRESS,
    args: ['0x4d074b7a9b16417764D4Bc31FC3914dC53101b66'],
    functionName: 'balanceOf',
  })

  return result;
}


app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});

