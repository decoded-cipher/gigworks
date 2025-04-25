<template>

    <aside
        class="fixed top-0 left-0 z-40 w-72 h-screen pt-16 transition-transform -translate-x-full bg-gray-50 border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidenav" id="drawer-navigation">
        <div class="overflow-y-auto py-5 px-3 h-full bg-gray-50 dark:bg-gray-800">

            <ul class="space-y-2">
                <template v-for="item in navItems">

                    <template v-if="item.children">
                        <li>

                            <button type="button"
                                class="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                @click="openNav(item)">
                                <span v-html="item.icon"></span>
                                <span class="flex-1 ml-3 text-left whitespace-nowrap"> {{ item.name }} </span>
                                <svg aria-hidden="true" :class="{ 'rotate-180': item.open }" class="w-6 h-6"
                                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </button>

                            <ul v-if="item.open" class="space-y-1 my-2">
                                <template v-for="child in item.children">
                                    <li>
                                        <a :href="child.link"
                                            class="flex items-center px-2 py-1.5 pl-11 w-full text-base font-medium text-gray-500 rounded group hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                            :class="{ 'bg-gray-100 dark:bg-gray-700': currentRoute === child.link }">
                                            <span class="flex-1 ml-3 text-left whitespace-nowrap"> {{ child.name }}
                                            </span>
                                        </a>
                                    </li>
                                </template>
                            </ul>

                        </li>
                    </template>

                    <template v-else>
                        <li>
                            <template v-if="item.active">
                                <a :href="item.link"
                                    class="flex items-center p-2 text-base font-medium text-gray-900 rounded dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                    :class="{ 'bg-gray-100 dark:bg-gray-700': currentRoute === item.link }">
                                    <span v-html="item.icon"></span>
                                    <span class="ml-3"> {{ item.name }} </span>
                                </a>
                            </template>
                            <template v-else>
                                <button
                                    class="w-full flex items-center p-2 text-base font-medium cursor-not-allowed text-gray-400 rounded dark:text-gray-500 group">
                                    <span v-html="item.icon"></span>
                                    <span class="ml-3"> {{ item.name }} </span>
                                </button>
                            </template>
                        </li>

                    </template>

                </template>
            </ul>

            <div class="pt-5 mt-2 space-y-2 border-t border-gray-200 dark:border-gray-700">
                <button @click="interakt"
                    class="flex items-center p-2 w-full text-base font-medium text-black rounded transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                    <!-- WhatsApp icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20"
                        viewBox="0,0,256,256">
                        <g fill="currentColor" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                            stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                            font-family="none" font-weight="none" font-size="none" text-anchor="none"
                            style="mix-blend-mode: normal">
                            <g transform="scale(10.66667,10.66667)">
                                <path
                                    d="M12.01172,2c-5.506,0 -9.98823,4.47838 -9.99023,9.98438c-0.001,1.76 0.45998,3.47819 1.33398,4.99219l-1.35547,5.02344l5.23242,-1.23633c1.459,0.796 3.10144,1.21384 4.77344,1.21484h0.00391c5.505,0 9.98528,-4.47937 9.98828,-9.98437c0.002,-2.669 -1.03588,-5.17841 -2.92187,-7.06641c-1.886,-1.887 -4.39245,-2.92673 -7.06445,-2.92773zM12.00977,4c2.136,0.001 4.14334,0.8338 5.65234,2.3418c1.509,1.51 2.33794,3.51639 2.33594,5.65039c-0.002,4.404 -3.58423,7.98633 -7.99023,7.98633c-1.333,-0.001 -2.65341,-0.3357 -3.81641,-0.9707l-0.67383,-0.36719l-0.74414,0.17578l-1.96875,0.46484l0.48047,-1.78516l0.2168,-0.80078l-0.41406,-0.71875c-0.698,-1.208 -1.06741,-2.58919 -1.06641,-3.99219c0.002,-4.402 3.58528,-7.98437 7.98828,-7.98437zM8.47656,7.375c-0.167,0 -0.43702,0.0625 -0.66602,0.3125c-0.229,0.249 -0.875,0.85208 -0.875,2.08008c0,1.228 0.89453,2.41503 1.01953,2.58203c0.124,0.166 1.72667,2.76563 4.26367,3.76563c2.108,0.831 2.53614,0.667 2.99414,0.625c0.458,-0.041 1.47755,-0.60255 1.68555,-1.18555c0.208,-0.583 0.20848,-1.0845 0.14648,-1.1875c-0.062,-0.104 -0.22852,-0.16602 -0.47852,-0.29102c-0.249,-0.125 -1.47608,-0.72755 -1.70508,-0.81055c-0.229,-0.083 -0.3965,-0.125 -0.5625,0.125c-0.166,0.25 -0.64306,0.81056 -0.78906,0.97656c-0.146,0.167 -0.29102,0.18945 -0.54102,0.06445c-0.25,-0.126 -1.05381,-0.39024 -2.00781,-1.24024c-0.742,-0.661 -1.24267,-1.47656 -1.38867,-1.72656c-0.145,-0.249 -0.01367,-0.38577 0.11133,-0.50977c0.112,-0.112 0.24805,-0.2915 0.37305,-0.4375c0.124,-0.146 0.167,-0.25002 0.25,-0.41602c0.083,-0.166 0.04051,-0.3125 -0.02149,-0.4375c-0.062,-0.125 -0.54753,-1.35756 -0.76953,-1.85156c-0.187,-0.415 -0.3845,-0.42464 -0.5625,-0.43164c-0.145,-0.006 -0.31056,-0.00586 -0.47656,-0.00586z">
                                </path>
                            </g>
                        </g>
                    </svg>
                    <span class="ml-3">interakt</span>
                </button>
            </div>
            <div class="mt-2 space-y-2 ">
                <button @click="phonePe"
                    class="flex items-center p-2 w-full text-base font-medium text-white rounded transition duration-75 group hover:bg-gray-100  dark:hover:bg-gray-700">
                    <!-- Indian Rupee symbol -->

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill-rule="evenodd"
                        stroke-linejoin="round" stroke-miterlimit="2" clip-rule="evenodd" id="rupee-sign"
                        fill="currentColor">
                        <path
                            d="M610.012,376L598,376L598,378L604,378C605.105,378 606,378.895 606,380L606,380L598,380L598,382L606,382C606,383.105 605.105,384 604,384C604,384 599,384 599,384C598.596,384 598.231,384.244 598.076,384.617C597.921,384.991 598.007,385.421 598.293,385.707L604.293,391.707L605.707,390.293L601.414,386C601.414,386 604,386 604,386C606.209,386 608,384.209 608,382L608,382L610.012,382L610.012,380L608,380L608,380C608,379.271 607.805,378.588 607.465,378L610.012,378L610.012,376Z"
                            transform="translate(-592 -372)"></path>
                    </svg>
                    <span class="ml-3">PhonePe</span>
                </button>
            </div>
            <div class="mt-2 space-y-2 ">
                <button @click="Zoho"
                    class="flex items-center p-2 w-full text-base font-medium text-white rounded transition duration-75 group hover:bg-gray-100  dark:hover:bg-gray-700">

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" xml:space="preserve" id="people" x="0" y="0" version="1.1"
                        viewBox="0 0 512 512">
                        <path d="M349.2 334.8c11.3 3.9-11.2-3.9 0 0z" fill="#ffffff" class="color000000 svgShape">
                        </path>
                        <path
                            d="M349.2 334.8c-13.5-4.7-28.1-5-41.6-9.7-4.1-1.4-12.2-3.1-13.9-7.8-1.6-4.6-1.6-10-1.9-14.8-.2-3.8-.3-7.6-.3-11.4 0-2.5 6.4-7.8 7.8-10.1 5.4-9 5.9-21.1 6.9-31.3 8.7 2.4 9.8-13.7 11.3-18.6 1.1-3.4 7.8-26.8-2.6-23.6 2.5-4.4 3.5-9.8 4.2-14.7 2-12.8 2.8-26.8-1.1-39.3-8.1-26-33-40.6-59.3-41.4-26.7-.9-53.5 11.9-63.5 37.8-4.8 12.6-4.4 26.3-2.8 39.5.7 6 1.7 12.7 4.7 18.1-9.7-2.9-4.5 17.7-3.4 21.3 1.6 5.1 3 23.4 12.1 20.9.8 8.1 1.7 16.4 3.9 24.3 1.5 5.3 4.6 9.8 8.2 13.9 1.8 2 2.7 2.2 2.6 4.8-.1 7.8.1 16.2-1.9 23.8-2 7.6-18.7 10.8-25.4 12.2-18 3.7-34.6 5.4-49.6 16.6-17.5 12.9-26.6 33-26.6 54.7h278c0-29.5-17.8-55.5-45.8-65.2z"
                            fill="#ffffff" class="color000000 svgShape"></path>
                        <path d="M143.3 322.5l1.6-.8c-.3.1-.6.3-.8.4-.3.1-.5.2-.8.4z" fill="#ffffff"
                            class="color000000 svgShape">
                        </path>
                        <path
                            d="M143.3 322.5c-3.4 1.7-7.5 3.8.8-.4l.8-.4c6.8-3.2 14.1-4 21.4-4.7 2.8-.3 4.1-2.2 2-4.9-4-5.1-17.8-6.1-23.6-8.4-3.6-1.4-4.6-2.7-4.9-6.7-.1-1.8-1.1-9.8.3-11.1 1-1 7.3-.6 8.7-.8 5.7-.7 11.5-1.9 16.9-4 2.3-.9 4.5-2 6.5-3.4 2.4-1.8-1.8-6.2-2.9-8.6-3.4-7.5-4.9-15.7-5.4-23.9-1-16.1 1.5-32.3-1.5-48.3-4.5-24.5-23.4-36.8-47.5-36.8-14.9 0-29.6 5.1-37.9 18.1-9.2 14.3-8.7 32.1-8.2 48.4.3 9.3.7 18.7-.6 28-.6 4-1.5 7.9-2.9 11.7-1.1 2.9-6.7 10.1-4.5 11.6 8.3 5.9 22.3 7.9 32.3 7.1.3 4.9 1.2 11.2-.6 15.8-2.8 7.2-23.7 9.1-30 11.2C45 317.8 32 332 32 352h79.5c1.3 0 6.3-9.3 7.7-10.8 6.8-7.5 15.1-14 24.1-18.7zM449.3 311.9c-8.1-2.6-23.7-3.4-29.5-10.4-2.9-3.5-1.3-12.4-1-16.6 4.4.4 9.2-.3 13.7-.9 4.1-.6 8.1-1.4 12-2.8 1.8-.7 3.6-1.4 5.3-2.4 3.9-2.3 2.1-2.7.1-6.1-10.9-18.3-6-41.5-6.5-61.6-.4-16.7-4.8-35-20-44.4-13.7-8.5-34-8.8-48.7-2.8-42.4 17-17.4 73.2-31.9 105.4-2.5 5.4-6.1 7.3.2 10.5 3.5 1.8 7.3 3 11.1 3.9 5.8 1.4 11.8 2.2 17.8 2.4 1 0 .3 12.6 0 13.9-1.1 4.9-11.8 6.3-15.8 7.4-4.1 1.1-10.9 1.4-12.9 5.7-3 6.4 9.9 4.8 13.1 5.4 10.3 1.9 19.4 7.6 27.4 14.1 6 4.9 14.1 11.5 16.3 19.5h80.2c-.2-20.1-13.3-34.4-30.9-40.2z"
                            fill="#ffffff" class="color000000 svgShape"></path>
                    </svg>
                    <span class="ml-3">Zoho</span>
                </button>
            </div>
            <div class="mt-2 space-y-2 ">
                <button @click="blog"
                    class="flex items-center p-2 w-full text-base font-medium text-white rounded transition duration-75 group hover:bg-gray-100  dark:hover:bg-gray-700">
                    <!-- Indian Rupee symbol -->

                    <img src="../../public/favicon.ico" alt="">
                    <span class="ml-3">Blog</span>
                </button>
            </div>
            <div class="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
                <button @click="logout"
                    class="flex items-center p-2 w-full text-base font-medium text-red-600 rounded transition duration-75 group hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd"
                            d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                            clip-rule="evenodd" />
                        <path fill-rule="evenodd"
                            d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
                            clip-rule="evenodd" />
                    </svg>
                    <span class="ml-3">Logout</span>
                </button>
            </div>
        </div>
    </aside>

</template>

<script lang="ts">
export default {
    name: 'Sidebar',
    data() {
        return {
            openedItem: null as any,
            currentRoute: '',
            navItems: [
                {
                    name: 'Overview',
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M15.5 2A1.5 1.5 0 0 0 14 3.5v13a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 16.5 2h-1ZM9.5 6A1.5 1.5 0 0 0 8 7.5v9A1.5 1.5 0 0 0 9.5 18h1a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10.5 6h-1ZM3.5 10A1.5 1.5 0 0 0 2 11.5v5A1.5 1.5 0 0 0 3.5 18h1A1.5 1.5 0 0 0 6 16.5v-5A1.5 1.5 0 0 0 4.5 10h-1Z" /></svg>`,
                    link: '/',
                    active: true,
                },
                {
                    name: 'Partners',
                    icon: `<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clip-rule="evenodd" /></svg>`,
                    link: '/partners',
                    active: true,
                },
                {
                    name: 'Business Profiles',
                    icon: `<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.52.104 1.05.104 1.59 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 0 1-.332 0C5.26 16.564 2 12.163 2 7c0-.538.035-1.069.104-1.589a.5.5 0 0 1 .48-.425 11.947 11.947 0 0 0 7.077-2.75Zm4.196 5.954a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" /></svg>`,
                    link: '/business',
                    active: true,
                },
                {
                    name: 'Manage Content',
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-1.503.204A6.5 6.5 0 1 1 7.95 3.83L6.927 5.62a1.453 1.453 0 0 0 1.91 2.02l.175-.087a.5.5 0 0 1 .224-.053h.146a.5.5 0 0 1 .447.724l-.028.055a.4.4 0 0 1-.357.221h-.502a2.26 2.26 0 0 0-1.88 1.006l-.044.066a2.099 2.099 0 0 0 1.085 3.156.58.58 0 0 1 .397.547v1.05a1.175 1.175 0 0 0 2.093.734l1.611-2.014c.192-.24.296-.536.296-.842 0-.316.128-.624.353-.85a1.363 1.363 0 0 0 .173-1.716l-.464-.696a.369.369 0 0 1 .527-.499l.343.257c.316.237.738.275 1.091.098a.586.586 0 0 1 .677.11l1.297 1.297Z" clip-rule="evenodd" /></svg>`,
                    open: true,
                    children: [
                        {
                            name: 'Category',
                            link: '/category',
                            active: true,
                        },
                        // {
                        //     name: 'Sub-category',
                        //     link: '/sub-category',
                        //     active: true,
                        // },
                        // {
                        //     name: 'Sub-category Options',
                        //     link: '/sub-category-options',
                        //     active: true,
                        // },
                        {
                            name: 'License Types',
                            link: '/license-types',
                            active: true,
                        },
                        // {
                        //     name: 'Tags',
                        //     link: '/tags',
                        //     active: true,
                        // }
                    ]
                },
                // {
                //     name: 'Activity Log',
                //     icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" /></svg>`,
                //     link: '/activity-log',
                //     active: false,
                // },
                // {
                //     name: 'Cron Jobs',
                //     icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clip-rule="evenodd" /></svg>`,
                //     link: '/cron-jobs',
                //     active: false,
                // },
            ],
        }
    },

    methods: {
        openNav(item: any) {
            if (this.openedItem && this.openedItem !== item) {
                this.openedItem.open = false;
            }
            item.open = !item.open;
            this.openedItem = item;
        },
        logout() {
            // Clear the token from cookies by setting it to expire in the past
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            // Redirect to the login page
            this.$router.push('/login');
        },
        interakt() {
            window.open('https://www.interakt.shop/', '_blank');
        },
        phonePe() {
            window.open('https://www.phonepe.com/business-solutions/payment-gateway/', '_blank');
        },
        Zoho() {
            window.open('https://accounts.zoho.in/signin?servicename=ZohoHome&signupurl=https://www.zoho.com/signup.html', '_blank');
        },
        blog() {
            window.open('https://blog.gigwork.co.in/ghost/', '_blank');
        },
    },

    mounted() {
        this.currentRoute = window.location.pathname;

        if (this.currentRoute === '/nanodegree' || this.currentRoute === '/projects' || this.currentRoute === '/blogs' || this.currentRoute === '/inora') {
            this.navItems[4].open = true;
        }

        if (this.currentRoute === '/socials' || this.currentRoute === '/teams' || this.currentRoute === '/news' || this.currentRoute === '/reports' || this.currentRoute === '/testimonials' || this.currentRoute === '/stories') {
            this.navItems[3].open = true;
        }
    },

};
</script>