
<template>
    <section class="min-h-screen bg-white dark:bg-gray-900">

        <Navbar />

        <Sidebar />

        <main class="p-4 md:ml-72 h-auto pt-24">

            <slot />

        </main>

    </section>
</template>

<script lang="ts">
    import Navbar from '../components/Navbar.vue';
    import Sidebar from '../components/Sidebar.vue';

    export default {
        name: 'DashboardLayout',
        components: { 
            Navbar,
            Sidebar
        },
        beforeMount() {
            this.checkAuthentication();
        },
        methods: {
            checkAuthentication() {
                // Check if token exists in cookies
                const hasToken = document.cookie.split(';').some(cookie => 
                    cookie.trim().startsWith('token=')
                );
                
                if (!hasToken) {
                    console.log('No authentication token found. Redirecting to login...');
                    this.$router.push('/login');
                }
            }
        }
    }
</script>

<style>
    ::-webkit-scrollbar {
        display: none;
    }
</style>