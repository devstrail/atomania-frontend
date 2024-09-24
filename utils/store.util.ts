import {useErrorStore} from '~/store'

export const handleCommonActions = async (actionCallback) => {
    const errorStore = useErrorStore()
    
    try {
        errorStore.setError()

        return await actionCallback()
    } catch (error) {
        errorStore.setError(error)
    }
};