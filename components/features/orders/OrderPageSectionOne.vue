<script setup lang="ts">
    import {useOrderStore, usePaginationStore} from '~/store'
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import AppSkeletonLoader from "~/components/shared/AppSkeletonLoader.vue";
    import dayjs from "dayjs";

    /* -- Define stores -- */
    const paginationStore = usePaginationStore()
    const orderStore = useOrderStore()

    /* -- Fetch Orders -- */
    const isLoading = ref(false)
    const fetchOrders = async (payload = {}) => {
        isLoading.value = true
        await orderStore.fetchOrders(payload)
        isLoading.value = false
    }
    onMounted(() => {
        fetchOrders()
    })
</script>

<template>
    <section class="py-8">
        <div class="container">
            <div class="mb-5 laptop:mb-10 flex gap-4 flex-col laptop:flex-row laptop:items-center justify-between">
                <app-breadcrumb
                    title="Ordinele mele"
                    title-class="!mb-2"
                />
                <div class="flex gap-2 p-4 rounded-xl border border-primary-100 bg-primary-25">
                    <i class="dt-icon-info-circle text-primary-600"/>
                    <div>
                        <p class="mb-2 text-gray-700 font-medium text-b4">
                            Pentru a afla orice tip de comenzi va rugam sa sunati la numarul de mai jos
                        </p>
                        <a href="tel:+440157986574" class="text-primary-600 font-bold text-h6">
                            +440157986574
                        </a>
                    </div>
                </div>
            </div>
            <div class="overflow-hidden rounded-lg border border-gray-200">
                <app-skeleton-loader v-if="isLoading"/>
                <div v-else class="overflow-auto custom-scrollbar">
                    <table class="min-w-full border-collapse">
                        <colgroup>
                            <col style="min-width: 120px;">
                            <col style="min-width: 250px;">
                            <col style="min-width: 150px;">
                            <col style="min-width: 170px;">
                            <col style="min-width: 150px;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th class="border border-t-0 border-l-0 border-gray-200 px-6 py-2 text-gray-500 font-medium text-b5 text-left">
                                    ID comandă
                                </th>
                                <th class="border border-t-0 border-gray-200 px-6 py-2 text-gray-500 font-medium text-b5 text-left">
                                    Maşină
                                </th>
                                <th class="border border-t-0 border-gray-200 px-6 py-2 text-gray-500 font-medium text-b5 text-left">
                                    Data comandată
                                </th>
                                <!--<th class="border border-t-0 border-gray-200 px-6 py-2 text-gray-500 font-medium text-b5 text-left">
                                    Data finalizarii
                                </th>-->
                                <th class="border border-t-0 border-gray-200 px-6 py-2 text-gray-500 font-medium text-b5 text-left">
                                    Stare
                                </th>
                                <th class="border border-t-0 border-r-0 border-gray-200 px-6 py-2 text-gray-500 font-medium text-b5 text-left">
                                    Pret comandat
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(order, orderIndex) in orderStore.orders">
                                <tr>
                                    <td class="border border-l-0 border-gray-200 px-6 py-2 text-gray-900 font-medium text-b5 text-left">
                                        #{{ order?.transaction_id }}
                                    </td>
                                    <td class="border border-gray-200 px-6 py-2 text-left">
                                        <div class="flex flex-col laptop:flex-row gap-2">
                                            <NuxtImg
                                                width="32"
                                                height="32"
                                                :src="order?.farming_tool?.cover_photo ? order?.farming_tool?.cover_photo : '/images/placeholder-image.png'"
                                                alt="Machine name"
                                                class="object-cover"
                                            />
                                            <div>
                                                <p class="text-gray-700 text-b4 capitalize">{{ order?.farming_tool?.name }}</p>
                                                <p class="text-gray-500 text-b6">€{{ order?.farming_tool?.cost }}/ hector</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="border border-gray-200 px-6 py-2 text-gray-500 font-medium text-b5 text-left">
                                        {{ dayjs(order?.created_at).format('MMM D, YYYY') }}
                                    </td>
                                    <!--<td class="border border-gray-200 px-6 py-2 text-gray-500 font-medium text-b5 text-left">
                                        Jan 6, 2022
                                    </td>-->
                                    <td class="border border-gray-200 px-6 py-2 text-left">
                                    <span
                                        :class="[
                                            `inline-flex gap-1 items-center py-1 px-3 font-medium text-b5 capitalize rounded-2xl`,
                                            {'text-pale-sky-800 bg-pale-sky-50': order?.status === 'completed'},
                                            {'text-fuzzy-duckling-700 bg-fuzzy-duckling-50': order?.status === 'in_cart'},
                                            {'text-royal-flycatcher-crest-700 bg-royal-flycatcher-crest-50': order?.status === 'in_progress'},
                                            {'text-success-700 bg-success-50': order?.status === 'confirmed'},
                                            {'text-creamy-avocado-800 bg-creamy-avocado-50': order?.status === 'delivered'},
                                        ]"
                                    >
                                        <i v-if="order?.status === 'completed'" class="dt-icon-check-circle-broken"/>
                                        <i v-if="order?.status === 'in_cart'" class="dt-icon-shopping-bag-02"/>
                                        <i v-if="order?.status === 'in_progress'" class="dt-icon-rocket-02"/>
                                        <i v-if="order?.status === 'confirmed'" class="dt-icon-check"/>
                                        <i v-if="order?.status === 'delivered'" class="dt-icon-check-heart"/>
                                        {{ order?.status.replace('_', ' ') }}
                                    </span>
                                    </td>
                                    <td class="border border-r-0 border-gray-200 px-6 py-2 text-gray-900 font-medium text-b5 text-left">
                                        €{{ order?.total_cost }}
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </section>
</template>