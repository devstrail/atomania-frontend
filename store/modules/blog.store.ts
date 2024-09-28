import {defineStore} from 'pinia'
import {blogService} from '~/services'
import {handleCommonActions} from '~/utils'
import {usePaginationStore} from '~/store'

export const useBlogStore = defineStore({
    id: 'blog',
    state: () => ({
        searchParam: {
            query: null
        },
        blogs: [],
        blog: null,
    }),
    actions: {
        initiateSearchParam(payload = {}){
            this.searchParam = {
                ...{
                    query: null
                },
                ...payload
            }
        },
        getPayload(payload = {}){
            const paginationStore = usePaginationStore()

            return {
                ...paginationStore.paginationDataForRequest,
                ...this.searchParam,
                ...payload
            }
        },
        async fetchBlogs(payload = {}) {
            const paginationStore = usePaginationStore()

            return await handleCommonActions(async () => {
                const response = await blogService.get(this.getPayload(payload))
                this.blogs = response.data?.data?.data ?? []
                paginationStore.setPaginationData(response.data?.meta ?? {})
            });
        },
        async getBlog(id) {
            return await handleCommonActions(async () => {
                const response = await blogService.show(id)
                this.blog = response.data?.data ?? null
            });
        },
    }
});