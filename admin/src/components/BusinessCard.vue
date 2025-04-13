<template>
    <div class="w-full shadow-lg rounded-lg overflow-hidden px-3 py-4 sm:px-4 sm:py-3 bg-white dark:bg-gray-800">
        <!-- Responsive layout that stacks on mobile and becomes flex row on larger screens -->
        <div class="flex flex-col sm:flex-row gap-4 sm:items-center">
            <!-- Business profile info - Full width on mobile, 1/4 on desktop -->
            <div class="flex items-center gap-3 mb-3 sm:mb-0 sm:w-1/4">
                <div class="text-gray-400 flex-shrink-0">
                    <template v-if="business.avatar">
                        <img class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border border-gray-600"
                            alt="User Avatar" :src="`${cdn_url}/${business.avatar}`" />
                    </template>
                    <template v-else>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5"
                            stroke="currentColor" class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </template>
                </div>

                <div class="flex flex-col">
                    <h1 class="font-bold text-gray-900 dark:text-white">{{ business.profileName }}</h1>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ business.subCategoryOption }}</p>
                </div>
            </div>

            <!-- Middle sections - Grid on mobile, flex on desktop -->
            <div class="grid grid-cols-2 gap-4 sm:flex sm:flex-1 sm:justify-around mb-3 sm:mb-0">
                <!-- Expiry info -->
                <div class="flex flex-col items-center text-center">
                    <p class="text-sm text-gray-500 dark:text-gray-400">Account expires in</p>
                    <h2 class="text-base md:text-lg font-bold text-gray-900 dark:text-white">{{ business.daysLeft }} Days</h2>
                </div>

                <!-- Contact options -->
                <div class="flex flex-col items-center text-center gap-1">
                    <p class="text-sm text-gray-500 dark:text-gray-400">Connect user</p>
                    <div class="flex gap-2 justify-center">
                        <button class="text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors duration-300 ease-in-out"
                            @click="connectWhatsApp(business.phone)">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20"
                                viewBox="0,0,256,256">
                                <g fill="currentColor" fill-rule="nonzero" stroke="none" stroke-width="1"
                                    stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10"
                                    stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none"
                                    font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                                    <g transform="scale(10.66667,10.66667)">
                                        <path
                                            d="M12.01172,2c-5.506,0 -9.98823,4.47838 -9.99023,9.98438c-0.001,1.76 0.45998,3.47819 1.33398,4.99219l-1.35547,5.02344l5.23242,-1.23633c1.459,0.796 3.10144,1.21384 4.77344,1.21484h0.00391c5.505,0 9.98528,-4.47937 9.98828,-9.98437c0.002,-2.669 -1.03588,-5.17841 -2.92187,-7.06641c-1.886,-1.887 -4.39245,-2.92673 -7.06445,-2.92773zM12.00977,4c2.136,0.001 4.14334,0.8338 5.65234,2.3418c1.509,1.51 2.33794,3.51639 2.33594,5.65039c-0.002,4.404 -3.58423,7.98633 -7.99023,7.98633c-1.333,-0.001 -2.65341,-0.3357 -3.81641,-0.9707l-0.67383,-0.36719l-0.74414,0.17578l-1.96875,0.46484l0.48047,-1.78516l0.2168,-0.80078l-0.41406,-0.71875c-0.698,-1.208 -1.06741,-2.58919 -1.06641,-3.99219c0.002,-4.402 3.58528,-7.98437 7.98828,-7.98437zM8.47656,7.375c-0.167,0 -0.43702,0.0625 -0.66602,0.3125c-0.229,0.249 -0.875,0.85208 -0.875,2.08008c0,1.228 0.89453,2.41503 1.01953,2.58203c0.124,0.166 1.72667,2.76563 4.26367,3.76563c2.108,0.831 2.53614,0.667 2.99414,0.625c0.458,-0.041 1.47755,-0.60255 1.68555,-1.18555c0.208,-0.583 0.20848,-1.0845 0.14648,-1.1875c-0.062,-0.104 -0.22852,-0.16602 -0.47852,-0.29102c-0.249,-0.125 -1.47608,-0.72755 -1.70508,-0.81055c-0.229,-0.083 -0.3965,-0.125 -0.5625,0.125c-0.166,0.25 -0.64306,0.81056 -0.78906,0.97656c-0.146,0.167 -0.29102,0.18945 -0.54102,0.06445c-0.25,-0.126 -1.05381,-0.39024 -2.00781,-1.24024c-0.742,-0.661 -1.24267,-1.47656 -1.38867,-1.72656c-0.145,-0.249 -0.01367,-0.38577 0.11133,-0.50977c0.112,-0.112 0.24805,-0.2915 0.37305,-0.4375c0.124,-0.146 0.167,-0.25002 0.25,-0.41602c0.083,-0.166 0.04051,-0.3125 -0.02149,-0.4375c-0.062,-0.125 -0.54753,-1.35756 -0.76953,-1.85156c-0.187,-0.415 -0.3845,-0.42464 -0.5625,-0.43164c-0.145,-0.006 -0.31056,-0.00586 -0.47656,-0.00586z">
                                        </path>
                                    </g>
                                </g>
                            </svg>
                        </button>
                        <button class="text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors duration-300 ease-in-out"
                            @click="connectMail(business.email)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Action buttons - Full width on mobile, aligned right on desktop -->
            <div class="flex justify-center sm:justify-end gap-2 text-sm text-white sm:w-1/4">
                <div v-if="business.status === 0" class="flex gap-2 flex-col xs:flex-row sm:justify-end w-full">
                    <button @click="rejectBusiness(business.profileId)"
                        class="bg-red-500 hover:bg-red-600 transition-colors duration-300 ease-in-out px-3 py-1.5 sm:px-4 sm:py-2 rounded text-xs sm:text-sm">
                        Reject
                    </button>
                    <button @click="acceptBusiness(business.profileId)"
                        class="bg-green-500 hover:bg-green-600 transition-colors duration-300 ease-in-out px-3 py-1.5 sm:px-4 sm:py-2 rounded text-xs sm:text-sm">
                        Accept
                    </button>
                </div>
                <button v-else-if="business.status === 1" @click="deactivateBusiness(business.profileId)"
                    class="bg-green-500 hover:bg-green-600 transition-colors duration-300 ease-in-out px-3 py-1.5 sm:px-4 sm:py-2 rounded text-xs sm:text-sm">
                    Deactivate
                </button>
                <button v-else-if="business.status === 2" @click="reactivateBusiness(business.profileId)"
                    class="bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300 ease-in-out px-3 py-1.5 sm:px-4 sm:py-2 rounded text-xs sm:text-sm">
                    Reactivate
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { updateBusinessStatus } from '@/api';
import Swal from 'sweetalert2';

export default {
    name: 'BusinessCard',
    data() {
        return {
            cdn_url: "https://pub-3aaf2182691d4cb6b5270a8f14ad704a.r2.dev",
        }
    },
    props: {
        business: {
            type: Object,
            required: true,
        },
    },
    methods: {
        
        connectWhatsApp(phone: string) {
            window.open(`https://wa.me/${phone}`, '_blank');
        },
        connectMail(email: string) {
            window.open(`mailto:${email}`, '_blank');
        },
        acceptBusiness(id: number) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, activate it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Call the API to activate the business
                    const data = {
                        status: 1,
                        profileId: id
                    }
                    this.updateBusinessStatus(data);

                    console.log(`Business with ID ${id} activated`);
                    Swal.fire(
                        'Activated!',
                        'Your file has been activated.',
                        'success'
                    )
                }
            })
        },
        rejectBusiness(id: number) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, reject it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Call the API to reject the business
                    const data = {
                        status: 2,
                        profileId: id
                    }
                    this.updateBusinessStatus(data);

                    // await updateBusinessStatus(data);
                    console.log(`Business with ID ${id} rejected`);
                    Swal.fire(
                        'Rejected!',
                        'Your file has been rejected.',
                        'success'
                    )
                }
            })
        },
        deactivateBusiness(id: number) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, deactivate it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Call the API to deactivate the business
                    const data = {
                        status: 2,
                        profileId: id
                    }
                    this.updateBusinessStatus(data);

                    console.log(`Business with ID ${id} deactivated`);
                    Swal.fire(
                        'Deactivated!',
                        'Your file has been deactivated.',
                        'success'
                    )
                }
            })
        },
        reactivateBusiness(id: number) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, reactivate it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Call the API to reactivate the business
                    const data = {
                        status: 1,
                        profileId: id
                    }
                    this.updateBusinessStatus(data);
                    console.log(`Business with ID ${id} reactivated`);
                    Swal.fire(
                        'Reactivated!',
                        'Your file has been reactivated.',
                        'success'
                    )
                }
            })
        },
        async updateBusinessStatus(data: any) {
            try {
                let res = await updateBusinessStatus(data);
                console.log(res);
                this.$emit('business-updated');
                console.log("Business status updated successfully");
            } catch (error) {
                console.error("Error updating business status:", error);
            }
        },
        
    }
}
</script>