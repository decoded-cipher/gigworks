<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
        <!-- Card content that adapts from stacked (mobile) to row layout (desktop) -->
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <!-- Partner basic info - takes full width on mobile, 1/4 on desktop -->
            <div class="w-full lg:w-1/4 flex items-center gap-4">
                <div class="text-gray-400">
                    <template v-if="partner.partner.avatar">
                        <img class="w-16 h-16 lg:w-20 lg:h-20 rounded-full border border-gray-600"
                            :src="getAvatarUrl(partner.partner.avatar)" alt="Partner avatar" />
                    </template>
                    <template v-else>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5"
                            stroke="currentColor" class="w-16 h-16 lg:w-20 lg:h-20">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </template>
                </div>

                <div class="flex flex-col">
                    <h1 class="font-bold text-gray-900 dark:text-white">{{ partner.user.name }}</h1>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ partner.partner.referral_code }}</p>
                </div>
            </div>

            <!-- Middle section - Analytics and Contact - grid on mobile, 1/2 on desktop -->
            <div class="grid grid-cols-2 gap-4 w-full lg:w-1/2 mt-4 lg:mt-0">
                <!-- Analytics summary -->
                <div class="flex flex-col text-center">
                    <p class="text-sm text-gray-500 dark:text-gray-400">Total Business</p>
                    <h2 class="text-lg font-bold text-gray-900 dark:text-white">{{ getTotalCount() }}</h2>
                </div>

                <!-- Contact options -->
                <div class="flex flex-col text-center gap-1">
                    <p class="text-sm text-gray-500 dark:text-gray-400">Connect user</p>
                    <div class="flex gap-2 justify-center">
                        <button class="text-gray-600 dark:text-white hover:text-green-500 transition-colors duration-300 ease-in-out"
                            @click="connectWhatsApp(partner.user.phone)">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24"
                                viewBox="0,0,256,256">
                                <g fill="currentColor" fill-rule="nonzero" stroke="none" stroke-width="1"
                                    stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray=""
                                    stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none"
                                    text-anchor="none" style="mix-blend-mode: normal">
                                    <g transform="scale(10.66667,10.66667)">
                                        <path
                                            d="M12.01172,2c-5.506,0 -9.98823,4.47838 -9.99023,9.98438c-0.001,1.76 0.45998,3.47819 1.33398,4.99219l-1.35547,5.02344l5.23242,-1.23633c1.459,0.796 3.10144,1.21384 4.77344,1.21484h0.00391c5.505,0 9.98528,-4.47937 9.98828,-9.98437c0.002,-2.669 -1.03588,-5.17841 -2.92187,-7.06641c-1.886,-1.887 -4.39245,-2.92673 -7.06445,-2.92773zM12.00977,4c2.136,0.001 4.14334,0.8338 5.65234,2.3418c1.509,1.51 2.33794,3.51639 2.33594,5.65039c-0.002,4.404 -3.58423,7.98633 -7.99023,7.98633c-1.333,-0.001 -2.65341,-0.3357 -3.81641,-0.9707l-0.67383,-0.36719l-0.74414,0.17578l-1.96875,0.46484l0.48047,-1.78516l0.2168,-0.80078l-0.41406,-0.71875c-0.698,-1.208 -1.06741,-2.58919 -1.06641,-3.99219c0.002,-4.402 3.58528,-7.98437 7.98828,-7.98437zM8.47656,7.375c-0.167,0 -0.43702,0.0625 -0.66602,0.3125c-0.229,0.249 -0.875,0.85208 -0.875,2.08008c0,1.228 0.89453,2.41503 1.01953,2.58203c0.124,0.166 1.72667,2.76563 4.26367,3.76563c2.108,0.831 2.53614,0.667 2.99414,0.625c0.458,-0.041 1.47755,-0.60255 1.68555,-1.18555c0.208,-0.583 0.20848,-1.0845 0.14648,-1.1875c-0.062,-0.104 -0.22852,-0.16602 -0.47852,-0.29102c-0.249,-0.125 -1.47608,-0.72755 -1.70508,-0.81055c-0.229,-0.083 -0.3965,-0.125 -0.5625,0.125c-0.166,0.25 -0.64306,0.81056 -0.78906,0.97656c-0.146,0.167 -0.29102,0.18945 -0.54102,0.06445c-0.25,-0.126 -1.05381,-0.39024 -2.00781,-1.24024c-0.742,-0.661 -1.24267,-1.47656 -1.38867,-1.72656c-0.145,-0.249 -0.01367,-0.38577 0.11133,-0.50977c0.112,-0.112 0.24805,-0.2915 0.37305,-0.4375c0.124,-0.146 0.167,-0.25002 0.25,-0.41602c0.083,-0.166 0.04051,-0.3125 -0.02149,-0.4375c-0.062,-0.125 -0.54753,-1.35756 -0.76953,-1.85156c-0.187,-0.415 -0.3845,-0.42464 -0.5625,-0.43164c-0.145,-0.006 -0.31056,-0.00586 -0.47656,-0.00586z">
                                        </path>
                                    </g>
                                </g>
                            </svg>
                        </button>
                        <button class="text-gray-600 dark:text-white hover:text-blue-500 transition-colors duration-300 ease-in-out"
                            @click="makePhoneCall(partner.user.phone)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Status and actions - full width on mobile, 1/4 on desktop -->
            <div class="w-full lg:w-1/4 flex flex-col items-center lg:items-end mt-4 lg:mt-0">
                <div>
                    <span :class="[
                        'mb-2 inline-block text-xs font-medium px-2.5 py-0.5 rounded',
                        partner.partner.status === 1 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    ]">
                        {{ partner.partner.status === 1 ? 'Approved' : 'Pending' }}
                    </span>
                </div>

                <button @click="showDetails" :class="[
                    'mt-1 px-4 py-2 text-white rounded transition-colors w-full lg:w-auto text-center',
                    partner.partner.status === 1 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
                ]">
                    {{ partner.partner.status === 1 ? 'View Details' : 'Review ' }}
                </button>
            </div>
        </div>

        <!-- Details Modal -->
        <div v-if="detailsVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            @click.self="closeDetails">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Partner Details</h2>
                    <button @click="closeDetails" class="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Personal Info -->
                <div class="mb-6">
                    <h3 class="text-lg font-medium mb-2 text-gray-900 dark:text-white">Personal Information</h3>
                    <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Name</p>
                                <p class="font-medium text-gray-900 dark:text-white">{{ partner.user.name }}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                                <p class="font-medium text-gray-900 dark:text-white">{{ partner.user.phone }}</p>
                            </div>
                            <div class="col-span-1 md:col-span-2">
                                <p class="text-sm text-gray-500 dark:text-gray-400">Address</p>
                                <p class="font-medium text-gray-900 dark:text-white">{{ partner.partner.address }}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Referral Code</p>
                                <p class="font-medium text-gray-900 dark:text-white">{{ partner.partner.referral_code }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bank Details -->
                <div class="mb-6">
                    <h3 class="text-lg font-medium mb-2 text-gray-900 dark:text-white">Bank Details</h3>
                    <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Account Holder</p>
                                <p class="font-medium text-gray-900 dark:text-white">{{
                                    partner.partnerBank.account_holder }}
                                </p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Account Number</p>
                                <p class="font-medium text-gray-900 dark:text-white">{{
                                    partner.partnerBank.account_number }}
                                </p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Bank Name</p>
                                <p class="font-medium text-gray-900 dark:text-white">{{ partner.partnerBank.bank_name }}
                                </p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">IFSC Code</p>
                                <p class="font-medium text-gray-900 dark:text-white">{{ partner.partnerBank.ifsc }}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Branch</p>
                                <p class="font-medium text-gray-900 dark:text-white">{{ partner.partnerBank.branch_name
                                }}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">UPI ID</p>
                                <p class="font-medium text-gray-900 dark:text-white">{{ partner.partnerBank.upi_id || 'Not provided' }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ID proof -->
                <div class="mb-6" v-if="partner.partnerIdProof">
                    <h3 class="text-lg font-medium mb-2 text-gray-900 dark:text-white">ID Proof</h3>
                    <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Proof Type</p>
                                <p class="font-medium text-gray-900 dark:text-white">{{
                                    getProofTypeName(partner.partnerIdProof.proof_type_id) }}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Proof Number</p>
                                <p class="font-medium text-gray-900 dark:text-white">{{
                                    partner.partnerIdProof.proof_number }}
                                </p>
                            </div>
                        </div>

                        <!-- ID Proof Image -->
                        <div class="mt-4">
                            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">ID Proof Document</p>
                            <div class="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                                <img v-if="partner.partnerIdProof.proof_url"
                                    :src="getProofUrl(partner.partnerIdProof.proof_url)" alt="ID Proof"
                                    class="w-full h-auto max-h-48 object-contain bg-white dark:bg-gray-900"
                                    @click="openImageInNewTab(getProofUrl(partner.partnerIdProof.proof_url))" />
                                <div v-else class="bg-gray-100 dark:bg-gray-700 h-32 flex items-center justify-center">
                                    <span class="text-gray-400">No proof image available</span>
                                </div>
                            </div>
                            <p class="text-xs text-gray-500 mt-1 italic">Click on the image to view full size</p>
                        </div>
                    </div>
                </div>

                <div class="mb-6" v-else>
                    <h3 class="text-lg font-medium mb-2 text-gray-900 dark:text-white">ID Proof</h3>
                    <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-center h-24">
                        <p class="text-gray-500 dark:text-gray-400">No ID proof information available</p>
                    </div>
                </div>

                <!-- Analytics -->
                <div class="mb-6">
                    <h3 class="text-lg font-medium mb-2 text-gray-900 dark:text-white">Analytics</h3>
                    <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead
                                    class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-4 py-2">Month</th>
                                        <th scope="col" class="px-4 py-2">Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in partner.analytics" :key="index"
                                        class="bg-white dark:bg-gray-800">
                                        <td class="px-4 py-2">{{ formatMonth(item.month) }}</td>
                                        <td class="px-4 py-2">{{ item.count }}</td>
                                    </tr>
                                    <tr v-if="!partner.analytics || partner.analytics.length === 0">
                                        <td colspan="2" class="px-4 py-2 text-center">No analytics data available</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Approval Button -->
                <div class="flex flex-col sm:flex-row justify-end gap-2 mt-6">
                    <button v-if="partner.partner.status !== 1" @click="approvePartner"
                        class="px-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors w-full sm:w-auto">
                        Approve Partner
                    </button>
                    <div v-else class="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
                        <button @click="onDeactivated"
                            class="px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors w-full sm:w-auto">
                            Deactivate
                        </button>
                        <button @click="closeDetails"
                            class="px-6 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors w-full sm:w-auto">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import { updatePartnerStatus } from '../api/index';

export default {
    name: 'PartnerCard',
    props: {
        partner: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            detailsVisible: false
        };
    },
    methods: {
        showDetails() {
            this.detailsVisible = true;
        },
        closeDetails() {
            this.detailsVisible = false;
        },
        connectWhatsApp(phone) {
            window.open(`https://wa.me/${phone}`, '_blank');
        },
        makePhoneCall(phone) {
            if (phone) {
                window.open(`tel:${phone}`, '_blank');
            } else {
                alert('No phone number available');
            }
        },
        getTotalCount() {
            if (!this.partner.analytics || !Array.isArray(this.partner.analytics)) {
                return 0;
            }

            return this.partner.analytics.reduce((total, item) => {
                return total + (item.count || 0);
            }, 0);
        },
        async approvePartner() {
            try {
                const result = await Swal.fire({
                    title: 'Are you sure?',
                    text: `Do you want to approve ${this.partner.user.name}?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, approve it!'
                });

                if (result.isConfirmed) {
                    try {
                        // Call the API to approve the partner
                        const data = {
                            partnerId: this.partner.partner.id,
                            status: 1
                        };
                        const res = await updatePartnerStatus(data);
                        if (res.status === 200) {
                            alert('Partner approved!');
                            Swal.fire(
                                'Approved!',
                                'The partner has been approved.',
                                'success'
                            );
                        } else {
                            throw new Error('Failed to approve partner');
                        }
                    } catch (error) {
                        console.error('Error approving partner:', error);
                    }
                }
            } catch (error) {
                console.error('Error approving partner:', error);
            } finally {
                this.detailsVisible = false; // Close the details modal after action
            }
        },
        async onDeactivated() {
            try {
                Swal.fire({
                    title: 'Are you sure?',
                    text: `Do you want to deactivate ${this.partner.user.name}?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, deactivate it!'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            // Call the API to deactivate the partner
                            const data = {
                                partnerId: this.partner.partner.id,
                                status: 0
                            };
                            const res = await updatePartnerStatus(data);
                            if (res.status === 200) {
                                // Handle success response
                                console.log('Partner deactivated successfully!');
                                alert('Partner deactivated!');
                                Swal.fire(
                                    'Deactivated!',
                                    'The partner has been deactivated.',
                                    'success'
                                );
                            } else {
                                // Handle error response
                                console.error('Failed to deactivate partner:', res.data.message);
                            }
                        } catch (error) {
                            console.error('Error deactivating partner:', error);
                        }
                    }
                });
            } catch (error) {
                console.error('Error deactivating partner:', error);
            }
        },
        truncateText(text, length) {
            if (!text) return '';
            return text.length > length ? text.substring(0, length) + '...' : text;
        },
        getAvatarUrl(avatarPath) {
            return `${import.meta.env.VITE_ASSET_BASE_URL}/${avatarPath}`;
        },
        formatMonth(monthStr) {
            const [year, month] = monthStr.split('-');
            const date = new Date(parseInt(year), parseInt(month) - 1);
            return date.toLocaleString('default', { month: 'long', year: 'numeric' });
        },
        getProofUrl(proofPath) {
            return `${import.meta.env.VITE_ASSET_BASE_URL}/${proofPath}`;
        },
        getProofTypeName(proofTypeId) {
            const proofTypes = {
                1: 'Passport',
                2: 'Driver\'s License',
                3: 'Voter ID',
                4: 'Aadhaar Card',
                5: 'PAN Card',
                6: 'Other Government ID'
            };

            return proofTypes[proofTypeId] || 'Unknown ID Type';
        },
        openImageInNewTab(imageUrl) {
            window.open(imageUrl, '_blank');
        }
    }
};
</script>