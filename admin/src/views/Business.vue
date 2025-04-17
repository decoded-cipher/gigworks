<template>
  <DashboardLayout>
    <div class="container mx-auto px-4 py-4 md:py-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Business Management</h1>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Review and manage business profiles</p>
        </div>

        <div class="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
          <!-- Filter controls can go here -->
          <button 
            @click="dataToExcel"
            class="flex items-center justify-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="hidden xs:inline">Convert to Excel</span>
            <span class="xs:hidden">Export</span>
          </button>
        </div>
      </div>

      <!-- Filter and search section -->
      <div class="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div class="flex flex-col sm:flex-row gap-4">
          <!-- Status filter dropdown -->
          <div class="sm:w-1/4">
            <label for="statusFilter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select id="statusFilter" v-model="statusFilter" @change="applyFilters" 
              class="w-full border border-gray-300 rounded-md px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="all">All</option>
              <option value="0">Pending</option>
              <option value="1">Active</option>
              <option value="2">Inactive</option>
            </select>
          </div>

          <!-- Search input -->
          <div class="sm:flex-1">
            <label for="searchTerm" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
            <input type="text" id="searchTerm" v-model="searchTerm" @input="debounceSearch" placeholder="Search by name or email"
              class="w-full border border-gray-300 rounded-md px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          </div>
          
          <!-- Days filter -->
          <div class="sm:w-1/5">
            <label for="daysFilter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiry Within (days)</label>
            <input type="number" id="daysFilter" v-model="daysFilter" @change="applyFilters" min="1" max="365"
              class="w-full border border-gray-300 rounded-md px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline"> {{ error }}</span>
      </div>

      <!-- Empty state -->
      <div v-else-if="businesses.length === 0" class="bg-gray-50 dark:bg-gray-700 p-6 text-center rounded-lg">
        <p class="text-gray-700 dark:text-gray-300">No businesses found</p>
      </div>

      <!-- Business listing -->
      <div v-else class="space-y-4">
        <BusinessCard v-for="business in filteredBusinesses" :key="business.id" 
          :business="business" 
          @business-updated="fetchBusinesses" />
      </div>
      
      <!-- Pagination controls if needed -->
      <div v-if="totalPages > 1" class="flex justify-center mt-6">
        <div class="inline-flex rounded-md shadow">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
            class="px-3 py-2 rounded-l-md border border-gray-300 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50">
            Previous
          </button>
          <span class="px-4 py-2 border-t border-b border-gray-300 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200">
            {{ currentPage }} / {{ totalPages }}
          </span>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
            class="px-3 py-2 rounded-r-md border border-gray-300 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
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
    name: 'BusinessView',
    
    components: {
      DashboardLayout,
      BusinessCard,
    },

    data() {
      return {
        businesses: [] as Array<any>,
        loading: true,
        error: null as string | null,
        currentPage: 1,
        totalPages: 1,
        limit: 50,
        statusFilter: 'all',
        searchTerm: '',
        daysFilter: 365,
        searchTimeout: null as number | null,
      };
    },

    computed: {
      filteredBusinesses() {
        let filtered = this.businesses;
        
        // Apply status filter if not set to 'all'
        if (this.statusFilter !== 'all') {
          const statusValue = parseInt(this.statusFilter);
          filtered = filtered.filter(business => business.status === statusValue);
        }
        
        // Apply search filter if search term exists
        if (this.searchTerm) {
          const search = this.searchTerm.toLowerCase();
          filtered = filtered.filter(business => 
            business.profileName?.toLowerCase().includes(search) ||
            business.email?.toLowerCase().includes(search) ||
            business.phone?.includes(search)
          );
        }
        
        return filtered;
      }
    },

    mounted() {
      this.fetchBusinesses();
    },

    methods: {
      async fetchBusinesses() {
        try {
          this.loading = true;
          this.error = null;
          
          const response = await getBusinesses({
            limit: this.limit,
            page: this.currentPage,
            days: this.daysFilter,
            status: this.statusFilter !== 'all' ? this.statusFilter : undefined
          });
          
          this.businesses = response.data.profiles;
          
          // Update pagination info if available in response
          if (response.data.totalPages) {
            this.totalPages = response.data.totalPages;
          } else {
            // Estimate total pages
            this.totalPages = Math.ceil(this.businesses.length / this.limit);
          }
          
        } catch (error) {
          console.error('Error fetching businesses:', error);
          this.error = 'Failed to load businesses. Please try again later.';
        } finally {
          this.loading = false;
        }
      },
      
      changePage(page:any) {
        if (page < 1 || page > this.totalPages) {
          return;
        }
        this.currentPage = page;
        this.fetchBusinesses();
      },
      
      applyFilters() {
        this.currentPage = 1;
        this.fetchBusinesses();
      },
      
      debounceSearch() {
        // Debounce search to avoid too many API calls
        if (this.searchTimeout) {
          clearTimeout(this.searchTimeout);
        }
        
        this.searchTimeout = setTimeout(() => {
          this.applyFilters();
        }, 500);
      },
      
      dataToExcel() {
        const formattedData = this.businesses.map((business) => {
          return {
            'Business Name': business.profileName,
            'Owner Name': business.owner,
            'Phone Number': business.phone,
            'Email Id': business.email,
            'Expiry Date': new Date(business.expiryDate).toISOString().split('T')[0],
            'Status': business.status === 0 ? 'Pending' : business.status === 1 ? 'Active' : 'Inactive',
            'Days Left': business.daysLeft,
            'Category': business.subCategoryOption || 'N/A'
          };
        });
        
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        worksheet['!cols'] = [
          { wch: 25 },  // Business Name column width
          { wch: 20 },  // Owner Name column width
          { wch: 15 },  // Phone Number column width
          { wch: 30 },  // Email Id column width
          { wch: 15 },  // Expiry Date column width
          { wch: 10 },  // Status column width
          { wch: 10 },  // Days Left column width
          { wch: 20 },  // Category column width
        ];
        
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Businesses');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        
        const today = new Date();
        const date = today.toISOString().split('T')[0]; // YYYY-MM-DD format
        const fileName = `Businesses_${date}.xlsx`;
        
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, fileName);
      }
    },
  };
</script>