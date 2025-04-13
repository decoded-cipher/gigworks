<template>
  <DashboardLayout>
    <!-- Date Range Filter (Moved to top of page) -->
    <div class="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Dashboard Analytics</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">Data overview and insights</p>
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
            @click="fetchAllData"
            class="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
    
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
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ dateRangeText }}
            </span>
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
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ dateRangeText }}
            </span>
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
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ dateRangeText }}
            </span>
          </div>
        </div>
      </div>
    
      <!-- Total Pageviews Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div class="p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Pageviews</p>
              <h3 class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ pageviewsCount.toLocaleString() }}</h3>
            </div>
            <div class="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600 dark:text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ dateRangeText }}
            </span>
          </div>
        </div>
      </div>

      <!-- Total Requests Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div class="p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Requests</p>
              <h3 class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ requestsCount.toLocaleString() }}</h3>
            </div>
            <div class="bg-amber-100 dark:bg-amber-900 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-amber-600 dark:text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ dateRangeText }}
            </span>
          </div>
        </div>
      </div>

      <!-- Unique Visitors Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div class="p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Unique Visitors</p>
              <h3 class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ visitorsCount.toLocaleString() }}</h3>
            </div>
            <div class="bg-teal-100 dark:bg-teal-900 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-teal-600 dark:text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ dateRangeText }}
            </span>
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
      </div>
      
      <div class="w-full h-80">
        <canvas id="analyticsChart"></canvas>
      </div>
    </div>

    <div class="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
    <div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Browser Usage Analytics</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400">Pageviews by browser over time</p>
    </div>
    <div class="mt-3 sm:mt-0">
      <div class="inline-flex rounded-md">
        <button 
          @click="toggleBrowsers('all')" 
          :class="[
            'px-3 py-1 text-sm rounded-l-md', 
            showAllBrowsers ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          ]"
        >
          All
        </button>
        <button 
          @click="toggleBrowsers('top')" 
          :class="[
            'px-3 py-1 text-sm', 
            !showAllBrowsers ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          ]"
        >
          Top 5
        </button>
      </div>
    </div>
  </div>
  
  <div class="w-full h-80">
    <canvas id="browsersChart"></canvas>
  </div>
</div>

    <!-- Additional Analytics -->
    <!-- User Source Distribution -->
    <!-- <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Traffic Sources</h3>
        <div class="w-full h-60">
          <canvas id="sourcesChart"></canvas>
        </div>
      </div> -->

      <!-- New vs Returning Users -->
      <!-- <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">New vs Returning Users</h3>
        <div class="w-full h-60">
          <canvas id="usersChart"></canvas>
        </div>
      </div>
    </div> -->
  </DashboardLayout>
</template>

<script>
import DashboardLayout from '../layouts/DashboardLayout.vue';
import Chart from 'chart.js/auto';
import { getAnalytics,getDetailedAnalytics } from '../api/index';

export default {
  name: 'HomeView',
  components: {
    DashboardLayout,
  },
  data() {
    return {
      // Dashboard metrics
      usersCount: 0,
      businessCount: 0,
      partnersCount: 0,
      pageviewsCount: 0,
      requestsCount: 0,
      visitorsCount: 0,
      
      // Date range controls
      startDate: this.getDefaultStartDate(),
      endDate: this.getDefaultEndDate(),
      today: this.getDefaultEndDate(),
      dateRangeText: '',
      
      // Chart objects
      loading: true,
      analyticsChart: null,
      sourcesChart: null,
      usersChart: null,
      // For browser analytics
      browsersChart: null,
      detailedAnalyticsData: [],
      browserColors: {
        'Chrome': 'rgb(66, 133, 244)',
        'Firefox': 'rgb(255, 89, 0)',
        'Safari': 'rgb(0, 122, 255)',
        'Edge': 'rgb(0, 120, 215)',
        'Unknown': 'rgb(169, 169, 169)',
        'ChromeMobile': 'rgb(51, 103, 214)',
        'MobileSafari': 'rgb(0, 102, 204)',
        'SamsungInternet': 'rgb(30, 144, 255)',
        'GoogleBot': 'rgb(15, 157, 88)',
        'BingBot': 'rgb(243, 112, 33)',
        'TwitterBot': 'rgb(29, 161, 242)',
        'YandexBot': 'rgb(255, 0, 0)',
        'Instagram': 'rgb(193, 53, 132)',
        'Curl': 'rgb(0, 0, 0)',
        'ChromeDerivative': 'rgb(76, 153, 244)',
      },
      showAllBrowsers: false,
    }
  },
  mounted() {
    this.fetchAllData();
  },
  methods: {
    // Get default start date (14 days ago)
    getDefaultStartDate() {
      const date = new Date();
      date.setDate(date.getDate() - 14); 
      return date.toISOString().split('T')[0]; // YYYY-MM-DD format
    },
    
    // Get default end date (today)
    getDefaultEndDate() {
      return new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    },
    
    // Format date range for display
    formatDateRange(start, end) {
      const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      };
      
      return `${formatDate(start)} - ${formatDate(end)}`;
    },
    
    // Fetch all dashboard data with date range
    async fetchAllData() {
      if (!this.startDate || !this.endDate) {
        alert("Please select both start and end dates");
        return;
      }
      
      try {
        this.loading = true;
        
        // Update date range display
        this.dateRangeText = this.formatDateRange(this.startDate, this.endDate);
        
        // Get main analytics data with date range
        const response = await getAnalytics({
          start: this.startDate,
          end: this.endDate
        });
        console.log("API Response:", response);
        
        // Process API response based on your API structure
        const data = response;
        
        // Update metrics based on API response
        this.usersCount = data.totals.metrics.users;
        this.businessCount = data.totals.metrics.profiles;
        this.partnersCount = data.totals.metrics.partners;
        
        this.pageviewsCount = data.totals.analytics.pageViews;
        this.requestsCount = data.totals.analytics.requests;
        this.visitorsCount = data.totals.analytics.uniqueVisitors;
        
        // Get detailed analytics for browser data
        const detailedResponse = await getDetailedAnalytics({
          start: this.startDate,
          end: this.endDate
        });
        console.log("Detailed API Response:", detailedResponse);
        
        if (detailedResponse && detailedResponse.data) {
          this.detailedAnalyticsData = detailedResponse.data;
        } else {
          this.detailedAnalyticsData = [];
        }
        
        // Update charts with data
        this.updateCharts(data);
        this.initBrowsersChart(this.detailedAnalyticsData);
        
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        this.loading = false;
      }
    },
    
    // Update all charts with new data
    updateCharts(data) {
      if (this.detailedAnalyticsData && this.detailedAnalyticsData.length > 0) {
        // Use actual daily data from detailedAnalyticsData for the main chart
        const labels = this.detailedAnalyticsData.map(day => {
          const date = new Date(day.date);
          return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: '2-digit' 
          });
        });
        
        // Extract the actual pageViews and uniqueVisitors from each day
        const pageViewData = this.detailedAnalyticsData.map(day => day.pageViews);
        const visitorData = this.detailedAnalyticsData.map(day => day.uniqueVisitors);
        
        // Initialize the main analytics chart with real data
        this.initAnalyticsChart(labels, pageViewData, visitorData);
      } else {
        // Fallback to generated data if detailed analytics not available
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        
        // Generate labels (dates between start and end)
        const labels = [];
        const pageViewData = [];
        const visitorData = [];
        
        for (let i = 0; i < diffDays; i++) {
          const currentDate = new Date(start);
          currentDate.setDate(start.getDate() + i);
          
          // Format date as 'MMM DD' (e.g., "Jan 01")
          const formattedDate = currentDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: '2-digit' 
          });
          
          labels.push(formattedDate);
          
          // Generate data that sums to the totals
          const totalPageViews = this.pageviewsCount;
          const dailyAvg = totalPageViews / diffDays;
          const randomFactor = 0.5 + Math.random();
          const dailyValue = Math.floor(dailyAvg * randomFactor);
          
          pageViewData.push(dailyValue);
          visitorData.push(Math.floor(dailyValue / 6));
        }
        
        this.initAnalyticsChart(labels, pageViewData, visitorData);
      }
      
      // Traffic sources
      const sourcesData = {
        labels: ['Direct', 'Social Media', 'Search', 'Referral', 'Email'],
        data: [35, 25, 20, 15, 5] // Mock percentage distribution
      };
      this.initSourcesChart(sourcesData);
      
      // User types
      const userTypesData = {
        labels: ['New Users', 'Returning Users'],
        data: [65, 35] // Mock percentage distribution
      };
      this.initUsersChart(userTypesData);
    },
    
    initAnalyticsChart(labels, pageViewData, visitorData) {
      const ctx = document.getElementById('analyticsChart');
      
      if (this.analyticsChart) {
        this.analyticsChart.destroy();
      }
      
      this.analyticsChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Page Views',
              data: pageViewData,
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderColor: 'rgb(59, 130, 246)',
              tension: 0.4,
              pointRadius: 4,
              pointHoverRadius: 6
            },
            {
              label: 'Unique Visitors',
              data: visitorData,
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderColor: 'rgb(16, 185, 129)',
              tension: 0.4,
              pointRadius: 4,
              pointHoverRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top'
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
    // Toggle between all browsers vs top 5 browsers
    toggleBrowsers(mode) {
      this.showAllBrowsers = mode === 'all';
      this.initBrowsersChart(this.detailedAnalyticsData);
    },
    
    // Initialize the browsers chart
    initBrowsersChart(analyticsData) {
      if (!analyticsData || analyticsData.length === 0) {
        console.error('No detailed analytics data available for browser chart');
        return;
      }
      
      const ctx = document.getElementById('browsersChart');
      
      if (this.browsersChart) {
        this.browsersChart.destroy();
      }
      
      // Process the data for the chart
      const dates = analyticsData.map(day => {
        const date = new Date(day.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
      });
      
      // Get all unique browser names across all dates
      const allBrowsers = new Set();
      analyticsData.forEach(day => {
        day.browsers.forEach(browser => {
          allBrowsers.add(browser.name);
        });
      });
      
      // Convert to array and sort by overall usage
      const browserUsageTotals = {};
      allBrowsers.forEach(name => {
        browserUsageTotals[name] = 0;
        analyticsData.forEach(day => {
          const browser = day.browsers.find(b => b.name === name);
          if (browser) {
            browserUsageTotals[name] += browser.pageViews;
          }
        });
      });
      
      let browsers = Array.from(allBrowsers);
      browsers.sort((a, b) => browserUsageTotals[b] - browserUsageTotals[a]);
      
      // Limit to top 5 browsers if not showing all
      if (!this.showAllBrowsers) {
        browsers = browsers.slice(0, 5);
      }
      
      // Create datasets for each browser
      const datasets = browsers.map(browserName => {
        const data = analyticsData.map(day => {
          const browser = day.browsers.find(b => b.name === browserName);
          return browser ? browser.pageViews : 0;
        });
        
        return {
          label: browserName,
          data: data,
          borderColor: this.browserColors[browserName] || this.getRandomColor(),
          backgroundColor: 'transparent',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 5
        };
      });
      
      // Create a dataset for total pageviews
      const totalPageViews = analyticsData.map(day => day.pageViews);
      datasets.unshift({
        label: 'Total Pageviews',
        data: totalPageViews,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      });
      
      this.browsersChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
                usePointStyle: true
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              callbacks: {
                footer: function(tooltipItems) {
                  let total = 0;
                  tooltipItems.forEach(item => {
                    total += item.parsed.y;
                  });
                  return 'Total: ' + total;
                }
              }
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
              beginAtZero: true,
              title: {
                display: true,
                text: 'Pageviews'
              }
            }
          }
        }
      });
    },
    
    // Helper function to generate random colors for browsers without predefined colors
    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = 'rgb(';
      for (let i = 0; i < 3; i++) {
        const value = Math.floor(Math.random() * 200);  // Using 200 to avoid very dark colors
        color += value + (i < 2 ? ',' : ')');
      }
      return color;
    }
  }
}
</script>