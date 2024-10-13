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

                if (response.data?.data) {
                    paginationStore.updatePagination({
                        current_page: response.data.data.current_page,
                        last_page: response.data.data.last_page,
                        total: response.data.data.total,
                        per_page: response.data.data.per_page
                    })
                }

                return response.data
            })
        },
        async getBlog(id) {
            return await handleCommonActions(async () => {
                const response = await blogService.show(id)
                this.blog = response.data?.data ?? null
            });
        },
    }
});