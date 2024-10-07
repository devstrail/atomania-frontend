<script setup lang="ts">
    import {drones} from '~/config'
    import {useAuthStore} from '~/store'
    import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'
    import AppButton from '~/components/shared/AppButton.vue'
    import AppDroneCard from '~/components/shared/AppDroneCard.vue'

    const authStore = useAuthStore()
    const router = useRouter()

    const handleHireDrone = () => {
        if (authStore.user && authStore.user?.userRoles[0] === 'farmer') {
            router.push({ path: '/marketplace', query: { tab: 3 } })
        } else {
            authStore.isAuthAlertModalOpen = true
        }
    }
</script>

<template>
    <section class="py-10 laptop:py-[96px] bg-wispy-white-50">
        <div class="container">
            <div class="mb-7 laptop:mb-14 flex flex-col laptop:flex-row laptop:items-center justify-between gap-5">
                <app-breadcrumb
                    class="max-w-[780px]"
                    title="Du la următorul nivel modul în care faci agricultură cu tehnologia dronelor"
                    description="Folosiți drone aeriene de ultimă generație pentru a obține informații cuprinzătoare asupra sănătății culturilor, pentru a optimiza gestionarea câmpului și pentru a maximiza eficiența în cadrul operațiunilor agricole."
                />
                <app-button
                    class="shrink-0"
                    title="Închiriază drone"
                    :on-click-button="() => handleHireDrone()"
                />
            </div>
            <div class="grid laptop:grid-cols-3 gap-8">
                <template v-for="(drone, droneIndex) in drones.slice(0, 3)">
                    <app-drone-card :drone="drone"/>
                </template>
            </div>
        </div>
    </section>
</template>