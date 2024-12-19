
<template>
    <ErrorLayout>


        <section class="bg-gray-100 dark:bg-gray-900">
            <div class="flex h-screen mx-auto w-screen p-4 items-center justify-center">

                <div class="w-full lg:w-1/3">
                    <img class="w-full h-full" src="/assets/404.svg" alt="404" />
                </div>

            </div>
        </section>


    </ErrorLayout>
</template>


<script lang="ts">
    import ErrorLayout from "../layouts/ErrorLayout.vue"
    export default {
        name: '404',
        components: {
            ErrorLayout,
        }
    }
</script>