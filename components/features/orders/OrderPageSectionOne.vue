<script setup lang="ts">

import AppBreadcrumb from "~/components/shared/AppBreadcrumb.vue";
</script>

<template>
    <section class="py-8">
        <div class="container">
            <div class="mb-5 laptop:mb-10 flex gap-4 flex-col laptop:flex-row laptop:items-center justify-between">
                <app-breadcrumb
                    title="My orders"
                    title-class="!mb-2"
                    description="You have 3 orders now"
                />
                <div class="flex gap-2 p-4 rounded-xl border border-primary-100 bg-primary-25">
                    <i class="dt-icon-info-circle text-primary-600"/>
                    <div>
                        <p class="mb-2 text-gray-700 font-medium text-b4">
                            To know any type of orders infor please call below’s number
                        </p>
                        <a href="tel:+440157986574" class="text-primary-600 font-bold text-h6">
                            +440157986574
                        </a>
                    </div>
                </div>
            </div>
            <div class="overflow-hidden rounded-lg border border-gray-200">
                <table class="min-w-full border-collapse">
                    <thead>
                        <tr>
                            <th class="border border-t-0 border-l-0 border-gray-200 px-6 py-2 text-gray-500 font-medium text-b5 text-left">
                                Order ID
                            </th>
                            <th class="border border-t-0 border-gray-200 px-6 py-2 text-gray-500 font-medium text-b5 text-left">
                                Machine
                            </th>
                            <th class="border border-t-0 border-gray-200 px-6 py-2 text-gray-500 font-medium text-b5 text-left">
                                Ordered Date
                            </th>
                            <th class="border border-t-0 border-gray-200 px-6 py-2 text-gray-500 font-medium text-b5 text-left">
                                Completed Date
                            </th>
                            <th class="border border-t-0 border-gray-200 px-6 py-2 text-gray-500 font-medium text-b5 text-left">
                                Status
                            </th>
                            <th class="border border-t-0 border-r-0 border-gray-200 px-6 py-2 text-gray-500 font-medium text-b5 text-left">
                                Ordered price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border border-l-0 border-gray-200 px-6 py-2 text-gray-900 font-medium text-b5 text-left">
                                #3066
                            </td>
                            <td class="border border-gray-200 px-6 py-2 text-left">
                                <div class="flex gap-2">
                                    <NuxtImg
                                        width="32"
                                        height="32"
                                        src="/images/machines/machine-image-2.jpg"
                                        alt="Machine name"
                                        class="object-cover"
                                    />
                                    <div>
                                        <p class="text-gray-700 text-b4">Herbicide Spraying Machine</p>
                                        <p class="text-gray-500 text-b6">€2700/ hector</p>
                                    </div>
                                </div>
                            </td>
                            <td class="border border-gray-200 px-6 py-2 text-gray-500 font-medium text-b5 text-left">
                                Jan 6, 2022
                            </td>
                            <td class="border border-gray-200 px-6 py-2 text-gray-500 font-medium text-b5 text-left">
                                Jan 6, 2022
                            </td>
                            <td class="border border-gray-200 px-6 py-2 text-left">
                                <span class="inline-flex gap-1 items-center py-1 px-3 text-success-700 font-medium text-b5 rounded-2xl bg-success-50">
                                    <i class="dt-icon-check"/> Completed
                                </span>
                            </td>
                            <td class="border border-r-0 border-gray-200 px-6 py-2 text-gray-900 font-medium text-b5 text-left">
                                €5000
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </section>
</template>