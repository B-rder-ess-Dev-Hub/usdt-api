import { http, createConfig } from '@wagmi/core'
import { liskSepolia } from '@wagmi/core/chains'


export default createConfig({
  chains: [liskSepolia],
  transports: {
    [liskSepolia.id]: http()
  },
  ssr: true
})
