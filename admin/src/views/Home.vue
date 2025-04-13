<template>
  <DashboardLayout>
    <!-- Stats Overview Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <!-- Total Users Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div class="p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
              <h3 class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ usersCount.toLocaleString() }}</h3>
            </div>
            <div class="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <span class="text-sm font-medium text-green-600 dark:text-green-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {{ userGrowth }}% 
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">from last month</span>
          </div>
        </div>
      </div>

      <!-- Total Business Profiles Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div class="p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Business Profiles</p>
              <h3 class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ businessCount.toLocaleString() }}</h3>
            </div>
            <div class="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <span class="text-sm font-medium text-green-600 dark:text-green-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {{ businessGrowth }}% 
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">from last month</span>
          </div>
        </div>
      </div>

      <!-- Total Partners Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div class="p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Partners</p>
              <h3 class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ partnersCount.toLocaleString() }}</h3>
            </div>
            <div class="bg-green-100 dark:bg-green-900 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <span class="text-sm font-medium text-green-600 dark:text-green-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {{ partnerGrowth }}% 
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">from last month</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Website Analytics Chart -->
    <div class="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
    <div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Website Analytics</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400">User activity over time</p>
    </div>
    
    <!-- Date range controls -->
    <div class="mt-3 sm:mt-0 flex flex-wrap gap-2 items-center">
      <input 
        type="date" 
        v-model="startDate"
        placeholder="Start date"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        :max="endDate || today"
      />
      <span class="text-gray-500 dark:text-gray-400">to</span>
      <input 
        type="date" 
        v-model="endDate"
        placeholder="End date"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        :min="startDate"
        :max="today"
      />
      <button 
        @click="fetchAnalyticsData"
        class="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Apply
      </button>
    </div>
  </div>
  
  <div class="w-full h-80">
    <canvas id="analyticsChart"></canvas>
  </div>
</div>

    <!-- Additional Analytics -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <!-- User Source Distribution -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Traffic Sources</h3>
        <div class="w-full h-60">
          <canvas id="sourcesChart"></canvas>
        </div>
      </div>

      <!-- New vs Returning Users -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">New vs Returning Users</h3>
        <div class="w-full h-60">
          <canvas id="usersChart"></canvas>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script>
import DashboardLayout from '../layouts/DashboardLayout.vue';
import Chart from 'chart.js/auto';
// import { getDashboardStats } from '../api/index';

export default {
  name: 'HomeView',
  components: {
    DashboardLayout,
  },
  data() {
    return {
      usersCount: 0,
      businessCount: 0,
      partnersCount: 0,
      userGrowth: 0,
      businessGrowth: 0,
      partnerGrowth: 0,
      analyticsTimeframe: '30',
      loading: true,
      analyticsChart: null,
      sourcesChart: null,
      usersChart: null,

      startDate: this.getDefaultStartDate(),
    endDate: this.getDefaultEndDate(),
    today: this.getDefaultEndDate()
    }
  },
  mounted() {
    this.fetchDashboardData();
  },
  watch: {
    analyticsTimeframe() {
      this.updateAnalyticsChart();
    }
  },
  methods: {


    async fetchDashboardData() {
      try {
        this.loading = true;
        
        // For demo purposes, using mock data. Replace with actual API call:
        // const response = await getDashboardStats();
        // const data = response.data;
        
        // Mock data for demonstration
        const data = {
          users: {
            total: 8759,
            growth: 12.4
          },
          business: {
            total: 3254,
            growth: 8.7
          },
          partners: {
            total: 651,
            growth: 15.2
          },
          analytics: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            data: [1200, 1900, 3000, 5000, 4000, 3500, 6000, 7200, 8500, 8700, 9500, 10200]
          },
          sources: {
            labels: ['Direct', 'Social', 'Email', 'Affiliates', 'Search'],
            data: [35, 25, 15, 10, 15]
          },
          userTypes: {
            labels: ['New Users', 'Returning Users'],
            data: [65, 35]
          }
        };
        
        // Update the data
        this.usersCount = data.users.total;
        this.businessCount = data.business.total;
        this.partnersCount = data.partners.total;
        this.userGrowth = data.users.growth;
        this.businessGrowth = data.business.growth;
        this.partnerGrowth = data.partners.growth;
        
        // Initialize charts
        this.initCharts(data);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        this.loading = false;
      }
    },

    getDefaultStartDate() {
    const date = new Date();
    date.setDate(date.getDate() - 30); // Default to last 30 days
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  },
  
  // Get default end date (today)
  getDefaultEndDate() {
    return new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  },
  
  // Fetch analytics data based on selected date range
  async fetchAnalyticsData() {
    if (!this.startDate || !this.endDate) {
      alert("Please select both start and end dates");
      return;
    }
    
    try {
      this.loading = true;
      console.log(`Fetching analytics data from ${this.startDate} to ${this.endDate}`);
      
      // Here you would call your API with the date range params
      // const response = await getAnalyticsData({ 
      //   start_date: this.startDate,
      //   end_date: this.endDate 
      // });
      
      // For demo purposes, generate some random data
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      
      // Generate labels (dates between start and end)
      const labels = [];
      const data = [];
      
      for (let i = 0; i < diffDays; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);
        
        // Format date as 'MMM DD' (e.g., "Jan 01")
        const formattedDate = currentDate.toLocaleDateString('en-US', { 
          month: 'short', 
          day: '2-digit' 
        });
        
        labels.push(formattedDate);
        
        // Generate realistic-looking data
        const baseValue = 5000 + Math.floor(Math.random() * 2000);
        const dayOfWeekFactor = currentDate.getDay() === 0 || currentDate.getDay() === 6 ? 0.7 : 1.2;
        data.push(Math.floor(baseValue * dayOfWeekFactor));
      }
      
      // Update chart with the new data
      if (this.analyticsChart) {
        this.analyticsChart.data.labels = labels;
        this.analyticsChart.data.datasets[0].data = data;
        this.analyticsChart.update();
      }
      
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      this.loading = false;
    }
  },
    
    initCharts(data) {
      this.initAnalyticsChart(data.analytics);
      this.initSourcesChart(data.sources);
      this.initUsersChart(data.userTypes);
    },
    
    initAnalyticsChart(analytics) {
      const ctx = document.getElementById('analyticsChart');
      
      if (this.analyticsChart) {
        this.analyticsChart.destroy();
      }
      
      this.analyticsChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: analytics.labels,
          datasets: [{
            label: 'User Sessions',
            data: analytics.data,
            fill: true,
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderColor: 'rgb(59, 130, 246)',
            tension: 0.4,
            pointBackgroundColor: 'rgb(59, 130, 246)',
            pointRadius: 4,
            pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'rgba(0, 0, 0, 0.8)'
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              grid: {
                color: 'rgba(156, 163, 175, 0.1)'
              },
              beginAtZero: true
            }
          }
        }
      });
    },
    
    initSourcesChart(sources) {
      const ctx = document.getElementById('sourcesChart');
      
      if (this.sourcesChart) {
        this.sourcesChart.destroy();
      }
      
      this.sourcesChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: sources.labels,
          datasets: [{
            data: sources.data,
            backgroundColor: [
              'rgba(79, 70, 229, 0.8)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(239, 68, 68, 0.8)'
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          },
          cutout: '65%'
        }
      });
    },
    
    initUsersChart(userTypes) {
      const ctx = document.getElementById('usersChart');
      
      if (this.usersChart) {
        this.usersChart.destroy();
      }
      
      this.usersChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: userTypes.labels,
          datasets: [{
            data: userTypes.data,
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)'
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    },
    
    updateAnalyticsChart() {
      // In a real implementation, you would fetch new data based on the timeframe
      console.log(`Fetching data for the last ${this.analyticsTimeframe} days`);
      // For demo purposes, we'll just simulate a data change
      const mockData = {
        '7': [8500, 8700, 9000, 9300, 9600, 9800, 10200],
        '30': [6000, 6200, 6500, 6800, 7200, 7500, 7800, 8000, 8200, 8500, 8700, 9000, 9300, 9500, 9600, 9800, 10000, 10200],
        '90': [3000, 3200, 3500, 3800, 4000, 4200, 4500, 4800, 5000, 5200, 5400, 5600, 5800, 6000, 6200, 6500, 6800, 7000, 7300, 7500, 7800, 8000, 8200, 8500, 8700, 9000, 9300, 9500, 9800, 10000, 10200]
      };
      
      const labels = {
        '7': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        '30': ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        '90': ['Jan', 'Feb', 'Mar']
      };
      
      if (this.analyticsChart) {
        this.analyticsChart.data.labels = labels[this.analyticsTimeframe] || labels['30'];
        this.analyticsChart.data.datasets[0].data = mockData[this.analyticsTimeframe] || mockData['30'];
        this.analyticsChart.update();
      }
    }
  }
}
</script>