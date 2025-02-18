<template>
  <DashboardLayout>

    <div class="w-full flex flex-col gap-4">
      <template v-for="business in businesses" :key="business.id">
        <BusinessCard :business="business" />
      </template>
    </div>

  </DashboardLayout>
</template>

<script lang="ts">
  import BusinessCard from '@/components/BusinessCard.vue';
  import DashboardLayout from '../layouts/DashboardLayout.vue';

  import { getBusinesses } from '@/api';

  export default {
    name: 'HomeView',
    
    components: {
      DashboardLayout,
      BusinessCard,
    },

    data() {
      return {
        businesses: [],
      };
    },

    mounted() {
      this.fetchBusinesses();
    },

    methods: {
      async fetchBusinesses() {
        try {
          const response = await getBusinesses({
            // limit: 10,
            // page: 1,
            days:365
          });
          this.businesses = response.data.profiles;
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
</script>