<template>
  <DashboardLayout>

    <div class="w-full flex flex-col gap-4">
      <div class="flex items-center mb-4">
            <button @click="dataToExcel"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 mr-4">Convert to Excel</button>
        </div>
      <template v-for="business in businesses" :key="business.id">
        <BusinessCard :business="business" @business-updated="fetchBusinesses" />
      </template>
    </div>

  </DashboardLayout>
</template>

<script lang="ts">
  import BusinessCard from '@/components/BusinessCard.vue';
  import DashboardLayout from '../layouts/DashboardLayout.vue';

  import { getBusinesses } from '@/api';
  import * as XLSX from 'xlsx';
  import { saveAs } from 'file-saver'; 

  export default {
    name: 'HomeView',
    
    components: {
      DashboardLayout,
      BusinessCard,
    },

    data() {
      return {
        businesses: [] as Array<{
          id: number;
          name: string;
          type: string;
          address: string;
          phone: string;
          email: string;
          website: string;
          description: string;
          expiryDate: string;
          owner: string;
          profileName: string;
          
        }>,
      };
    },

    mounted() {
      this.fetchBusinesses();
    },

    methods: {
      async fetchBusinesses() {
        try {
          const response = await getBusinesses({
            limit: 100,
            page: 1,
            days:365
          });
          this.businesses = response.data.profiles;
          console.log(this.businesses);
        } catch (error) {
          console.error(error);
        }
      },
      dataToExcel(){
        console.log(this.businesses);
        
        const formattedData = this.businesses.map((business) => {
          return {
            'Business Name': business.profileName,
            'Owner Name': business.owner,
            'Phone Number': business.phone,
            'Email Id': business.email,
            'Expiry Date': new Date(business.expiryDate).toISOString().split('T')[0],
            // 'Business ': business.expiryDate,
            // 'Business Description': business.description,
          };
        });
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        worksheet['!cols'] = [
    { wch: 25 },  // Business Name column width
    { wch: 20 },  // Owner Name column width
    { wch: 15 },  // Phone Number column width
    { wch: 30 },  // Email Id column width
    { wch: 15 },  // Expiry Date column width
  ];
        const workbook = XLSX.utils.book_new();
        console.log(worksheet);
        console.log(workbook);
        
        
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Businesses');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const today = new Date();
        const date = today.toISOString().split('T')[0]; // YYYY-MM-DD format
        const fileName = `Data Sheet${date}.xlsx`;
        
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, fileName);
      }
    },
  };
</script>