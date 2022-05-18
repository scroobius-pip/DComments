import { Result, ok } from 'neverthrow'
import _SDK, { SDK } from '@distive/sdk'
import { DistiveHookParam, useDistive, DistiveHook } from './hook'

// export { useDistive } from './hook'
export type { ThreadState, DistiveHook, DistiveHookParam, PostStatus } from './hook'

interface Config {
    serverId: string
    host?: string
    sdk?: SDK
}

const initDistiveHookWithDefault = ({ serverId, sdk, host }: Config): Result<(params: DistiveHookParam) => DistiveHook, string> => {
    if (sdk) {
        return ok((params) => useDistive(sdk, params))
    } else {
        return _SDK({ serverId, host })
            .map(sdk => (params: DistiveHookParam) => useDistive(sdk, params))
            .mapErr(err => err.message)
    }
}

export default initDistiveHookWithDefault