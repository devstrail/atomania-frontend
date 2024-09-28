<script setup lang="ts">
    import dayjs from 'dayjs'
    import {slugify} from '~/utils'

    const props = defineProps({
        post: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <NuxtLink
        :to="`/blog/${slugify(post?.title)}`"
        class="flex flex-col justify-between group"
        v-motion="{
          initial: {
            y: 30,
            opacity: 0
          },
          visibleOnce: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 700
            },
          }
        }"
    >
        <NuxtImg
            width="384"
            height="240"
            :src="post?.image"
            :alt="post?.title"
            class="mb-4 rounded-2xl"
        />
        <p class="mb-3 text-primary-700 text-b4">
            {{ post?.category }}
        </p>
        <div class="mb-2 flex items-center justify-between gap-6 text-gray-900 group-hover:text-primary-600">
            <h6 class="font-semibold line-clamp-2 overflow-hidden transition">
                {{ post?.title }}
            </h6>
            <i class="dt-icon-arrow-up-right text-b1 transition"/>
        </div>
        <p class="mb-6 text-gray-500 text-b3 line-clamp-3 overflow-hidden">{{ post?.excerpts }}</p>
        <!--<div class="flex items-center gap-3">
            <NuxtImg
                width="40"
                height="40"
                :src="post?.author?.avatar"
                :alt="post?.author?.name"
            />
            <div>
                <p class="text-gray-900 text-b4">{{ post?.author?.name }}</p>
                <p class="text-gray-500 text-b5">{{ dayjs(post?.created_at).format('DD MMM YYYY') }}</p>
            </div>
        </div>-->
    </NuxtLink>
</template>