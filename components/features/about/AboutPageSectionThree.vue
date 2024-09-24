<script setup lang="ts">

    import AppBreadcrumb from "~/components/shared/AppBreadcrumb.vue";
</script>

<template>
    <section class="py-10 laptop:py-[96px] bg-white">
        <div class="container">
            <app-breadcrumb
                class="mb-8 laptop:mb-16"
                title="Construim o comunitate agricolă digitale "
                subtitle="Povestea noastră"
                description="Un marketplace pentru fermierii români, de la fermieri, la fermieri."
            />
            <div class="grid laptop:grid-cols-2 gap-8 laptop:gap-16">
                <p class="text-gray-500">
                    Atomania Corporation SRL (alias: Atomania.ro) este o companie de tehnologie cu sediul în România,
                    care oferă un marketplace pentru fermierii români, pentru a partaja utilaje, echipamente și alte
                    tehnologii cu operatori calificați. Revoluționăm agricultura românească oferind o soluție unică
                    pentru fermieri și întreprinderile agricole care să fie conectate într-o platformă pentru toți.
                    Oferim cea mai bună experiență de partajare a utilajelor agricole pentru fermieri. Oferim de
                    asemenea, servicii de expertiză, stație meteo bazată pe IoT și analiză imaginară prin satelit. Este
                    un serviciu la cerere, rapid și ușor de obținut. Deci, partajarea utilajelor și tehnologiilor
                    agricole nu vă va da bătăi de cap.
                </p>
                <p class="text-gray-500">
                    Oferiți, de asemenea, servicii expert, stație meteo bazată pe IoT și analiză imaginară prin satelit.
                    Este la cerere, rapid și ușor de obținut. Deci, nicio bătaie de cap pentru partajarea mașinilor și
                    tehnologiilor agricole.
                    <br><br>
                    Partajează, evoluează, reușește cu Atomania
                </p>
            </div>
        </div>
    </section>
</template>