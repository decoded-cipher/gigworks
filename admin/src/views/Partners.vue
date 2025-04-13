<template>
    <DashboardLayout>
        <div class="container mx-auto px-4 py-4 md:py-8">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Partners Management</h1>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Review and approve partners</p>
                </div>
                
                <!-- Excel export button -->
                <button 
                    @click="exportToExcel"
                    class="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span class="hidden sm:inline">Convert to Excel</span>
                    <span class="sm:hidden">Export</span>
                </button>
            </div>

            <!-- Date filters -->
            <div class="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div class="flex flex-col sm:flex-row gap-4">
                    <div class="flex-1">
                        <label for="startDate"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                        <input type="date" id="startDate" v-model="startDate"
                            class="w-full border border-gray-300 rounded-md p-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div class="flex-1">
                        <label for="endDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End
                            Date</label>
                        <input type="date" id="endDate" v-model="endDate"
                            class="w-full border border-gray-300 rounded-md p-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div class="flex items-end">
                        <button @click="fetchPartners"
                            class="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                            Apply Filter
                        </button>
                    </div>
                </div>
            </div>

            <!-- Loading state -->
            <div v-if="loading" class="flex justify-center items-center h-64">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>

            <!-- Error state -->
            <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert">
                <strong class="font-bold">Error!</strong>
                <span class="block sm:inline"> {{ error }}</span>
            </div>

            <!-- Empty state -->
            <div v-else-if="partners.length === 0" class="bg-gray-50 dark:bg-gray-700 p-6 text-center rounded-lg">
                <p class="text-gray-700 dark:text-gray-300">No partners found</p>
            </div>

            <!-- Partners list -->
            <div v-else>
                <!-- Partner cards -->
                <div class="space-y-4">
                    <PartnerCard v-for="partner in partners" :key="partner.partner.id" :partner="partner"
                        @approve="approvePartner" />
                </div>
            </div>
        </div>
    </DashboardLayout>
</template>

<script>
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import PartnerCard from '@/components/PartnerCard.vue';
import { getPartners } from '../api/index';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default {
    name: 'Partners',
    components: {
        DashboardLayout,
        PartnerCard
    },
    data() {
        return {
            partners: [],
            loading: true,
            error: null,
            startDate: this.getDefaultStartDate(),
            endDate: this.getDefaultEndDate()
        };
    },
    mounted() {
        this.fetchPartners();
    },
    methods: {
        getDefaultStartDate() {
            // Set default start date to first day of current month
            const date = new Date();
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;
        },
        getDefaultEndDate() {
            // Set default end date to today
            const date = new Date();
            return date.toISOString().split('T')[0]; // YYYY-MM-DD format
        },
        async fetchPartners() {
            try {
                this.loading = true;
                this.error = null;

                // Validate date inputs
                if (!this.startDate || !this.endDate) {
                    this.error = "Start and end dates are required";
                    return; // Don't set loading=false here, let finally block handle it
                }

                // Convert to proper format if needed (API might expect different format)
                const params = {
                    start: this.startDate,
                    end: this.endDate
                };

                const response = await getPartners(params);
                console.log("API Response:", response);

                // The API returns { message: "All partners fetched successfully", data: [...] }
                if (response && response.data) {
                    if (Array.isArray(response.data)) {
                        this.partners = response.data;
                    } else if (response.data.data && Array.isArray(response.data.data)) {
                        // API returns { data: [...] } inside response.data
                        this.partners = response.data.data;
                    } else {
                        console.error("Unexpected API response format:", response.data);
                        this.error = "Invalid data format received from server";
                        this.partners = [];
                    }
                } else {
                    this.error = "No data received from server";
                    this.partners = [];
                }
            } catch (error) {
                console.error('Error fetching partners:', error);
                if (error.response && error.response.data && error.response.data.message) {
                    this.error = error.response.data.message;
                } else {
                    this.error = 'Failed to load partners.';
                }
                this.partners = []; // Reset partners array on error
            } finally {
                this.loading = false; // Set loading=false only once, in the finally block
            }
        },
        exportToExcel() {
      // Format the data for Excel
      const formattedData = this.partners.map((partner) => {
        return {
          'Name': partner.user.name,
          'Phone': partner.user.phone,
          'Referral Code': partner.partner.referral_code,
          'Address': partner.partner.address,
          'Status': partner.partner.status === 1 ? 'Approved' : 'Pending',
          'Bank Name': partner.partnerBank?.bank_name || 'N/A',
          'Account Holder': partner.partnerBank?.account_holder || 'N/A',
          'Account Number': partner.partnerBank?.account_number || 'N/A',
          'IFSC': partner.partnerBank?.ifsc || 'N/A',
          'Total Business': this.calculateTotalBusiness(partner.analytics)
        };
      });
      
      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      
      // Set column widths
      worksheet['!cols'] = [
        { wch: 20 },  // Name
        { wch: 15 },  // Phone
        { wch: 15 },  // Referral Code
        { wch: 30 },  // Address
        { wch: 10 },  // Status
        { wch: 20 },  // Bank Name
        { wch: 20 },  // Account Holder
        { wch: 20 },  // Account Number
        { wch: 12 },  // IFSC
        { wch: 15 },  // Total Business
      ];
      
      // Create workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Partners');
      
      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const today = new Date();
      const date = today.toISOString().split('T')[0]; // YYYY-MM-DD format
      const fileName = `Partners_${date}.xlsx`;
      
      // Save file
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, fileName);
    },
    
    calculateTotalBusiness(analytics) {
      if (!analytics || !Array.isArray(analytics)) {
        return 0;
      }
      return analytics.reduce((sum, item) => sum + (item.count || 0), 0);
    },
    
           
    }
}
</script>