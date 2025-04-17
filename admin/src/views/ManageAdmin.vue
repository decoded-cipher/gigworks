<template>
    <DashboardLayout>
        <div class="p-4">
            <!-- Header with title and add button -->
            <div class="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">Manage Administrators</h1>
                <button @click="openModal" 
                    class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add New Admin
                </button>
            </div>

            <!-- Admin List -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">S.No</th>
                                <th scope="col" class="px-6 py-3">Name</th>
                                <th scope="col" class="px-6 py-3">Email</th>
                                <th scope="col" class="px-6 py-3">Role</th>
                                <th scope="col" class="px-6 py-3">Status</th>
                                <th scope="col" class="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(admin, index) in paginatedAdmins" :key="admin.id" 
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td class="px-6 py-4">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                                <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">{{ admin.name }}</td>
                                <td class="px-6 py-4">{{ admin.email }}</td>
                                <td class="px-6 py-4">{{ admin.role }}</td>
                                <td class="px-6 py-4">
                                    <span :class="[
                                        'text-xs font-medium px-2.5 py-0.5 rounded',
                                        admin.isActive 
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                    ]">
                                        {{ admin.isActive ? 'Active' : 'Inactive' }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 flex gap-2">
                                    <button @click="editAdmin(admin)" 
                                        class="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                                            stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" 
                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                                        </svg>
                                    </button>
                                    <button @click="toggleStatus(admin)" 
                                        :class="[
                                            admin.isActive 
                                                ? 'text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300' 
                                                : 'text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300'
                                        ]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                                            stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" 
                                                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    </button>
                                    <button @click="deactivateAdmin(admin)" 
                                        class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                                            stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" 
                                                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="paginatedAdmins.length === 0">
                                <td colspan="6" class="px-6 py-4 text-center">No administrators found</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Pagination Controls -->
            <div class="flex justify-between items-center mt-6">
                <button 
                    @click="changePage(currentPage - 1)" 
                    :disabled="currentPage === 1" 
                    :class="[
                        'px-4 py-2 rounded-md transition-colors',
                        currentPage === 1 
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                    ]"
                >
                    Previous
                </button>
                <span class="text-gray-700 dark:text-gray-300">
                    Page {{ currentPage }} of {{ totalPages }}
                </span>
                <button 
                    @click="changePage(currentPage + 1)" 
                    :disabled="currentPage === totalPages" 
                    :class="[
                        'px-4 py-2 rounded-md transition-colors',
                        currentPage === totalPages 
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                    ]"
                >
                    Next
                </button>
            </div>

            <!-- Admin Form Modal -->
            <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                @click.self="closeModal">
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 w-full max-w-md">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                            {{ isEditing ? 'Edit Administrator' : 'Add New Administrator' }}
                        </h2>
                        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form @submit.prevent="submitForm">
                        <div class="space-y-4">
                            <!-- Name Field -->
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Full Name
                                </label>
                                <input type="text" id="name" v-model="formData.name" required
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Enter full name">
                            </div>

                            <!-- Email Field -->
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Email
                                </label>
                                <input type="email" id="email" v-model="formData.email" required
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Enter email address">
                            </div>

                            <!-- Role Field -->
                            <div>
                                <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Role
                                </label>
                                <select id="role" v-model="formData.role" required
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                                    <option value="" disabled selected>Select a role</option>
                                    <option v-for="role in roles" :key="role.id" :value="role.name">
                                        {{ role.name }}
                                    </option>
                                </select>
                            </div>

                            <!-- Password Field (only for new admins) -->
                            <div v-if="!isEditing">
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input type="password" id="password" v-model="formData.password" required
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Enter password">
                            </div>

                            <!-- Form Buttons -->
                            <div class="flex items-center justify-end gap-3 pt-3">
                                <button type="button" @click="closeModal"
                                    class="text-gray-500 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-300 text-sm font-medium px-5 py-2.5 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                    Cancel
                                </button>
                                <button type="submit"
                                    class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    {{ isEditing ? 'Update' : 'Add' }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </DashboardLayout>
</template>

<script>
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import Swal from 'sweetalert2';

export default {
    name: 'ManageAdmin',
    components: {
        DashboardLayout,
    },
    data() {
        return {
            admins: [
                { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Super Admin', isActive: true },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Content Manager', isActive: true },
                { id: 3, name: 'David Wilson', email: 'david@example.com', role: 'Support Admin', isActive: false },
                { id: 4, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Billing Manager', isActive: true },
                { id: 5, name: 'Michael Brown', email: 'michael@example.com', role: 'Analytics Admin', isActive: true },
                { id: 6, name: 'Emily Davis', email: 'emily@example.com', role: 'Support Admin', isActive: true },
                { id: 7, name: 'Robert Taylor', email: 'robert@example.com', role: 'Content Manager', isActive: false },
                { id: 8, name: 'Jessica Wilson', email: 'jessica@example.com', role: 'Billing Manager', isActive: true },
                { id: 9, name: 'Thomas Moore', email: 'thomas@example.com', role: 'Analytics Admin', isActive: true },
                { id: 10, name: 'Jennifer Lee', email: 'jennifer@example.com', role: 'Support Admin', isActive: false },
                { id: 11, name: 'William Clark', email: 'william@example.com', role: 'Content Manager', isActive: true },
                { id: 12, name: 'Amanda Lewis', email: 'amanda@example.com', role: 'Super Admin', isActive: true },
            ],
            roles: [
                { id: 1, name: 'Super Admin' },
                { id: 2, name: 'Content Manager' },
                { id: 3, name: 'Support Admin' },
                { id: 4, name: 'Billing Manager' },
                { id: 5, name: 'Analytics Admin' }
            ],
            showModal: false,
            isEditing: false,
            editId: null,
            formData: {
                name: '',
                email: '',
                role: '',
                password: ''
            },
            currentPage: 1,
            itemsPerPage: 10
        };
    },
    computed: {
        paginatedAdmins() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.admins.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.admins.length / this.itemsPerPage);
        }
    },
    methods: {
        changePage(page) {
            if (page > 0 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        
        openModal() {
            this.showModal = true;
            this.isEditing = false;
            this.resetForm();
        },
        
        closeModal() {
            this.showModal = false;
        },
        
        resetForm() {
            this.formData = {
                name: '',
                email: '',
                role: '',
                password: ''
            };
        },
        
        editAdmin(admin) {
            this.isEditing = true;
            this.editId = admin.id;
            this.formData = {
                name: admin.name,
                email: admin.email,
                role: admin.role,
                password: ''
            };
            this.showModal = true;
        },
        
        submitForm() {
            if (this.isEditing) {
                // Update existing admin
                const index = this.admins.findIndex(admin => admin.id === this.editId);
                if (index !== -1) {
                    this.admins[index] = {
                        ...this.admins[index],
                        name: this.formData.name,
                        email: this.formData.email,
                        role: this.formData.role
                    };
                }
            } else {
                // Add new admin
                const newAdmin = {
                    id: this.admins.length + 1,
                    name: this.formData.name,
                    email: this.formData.email,
                    role: this.formData.role,
                    isActive: true
                };
                this.admins.push(newAdmin);
            }
            
            // In a real application, you would make an API call here
            // to save the changes to the backend
            
            this.closeModal();
            
            // Show success message
            Swal.fire({
                icon: 'success',
                title: this.isEditing ? 'Admin Updated!' : 'Admin Added!',
                text: this.isEditing 
                    ? `${this.formData.name}'s information has been updated.`
                    : `${this.formData.name} has been added as a new administrator.`,
                confirmButtonColor: '#3085d6',
            });
        },
        
        async toggleStatus(admin) {
            const newStatus = !admin.isActive;
            const action = newStatus ? 'activate' : 'deactivate';
            
            const result = await Swal.fire({
                title: `${newStatus ? 'Activate' : 'Deactivate'} Administrator?`,
                text: `Are you sure you want to ${action} ${admin.name}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: newStatus ? '#3085d6' : '#d33',
                cancelButtonColor: '#6c757d',
                confirmButtonText: `Yes, ${action} it!`,
                cancelButtonText: 'Cancel'
            });
            
            if (result.isConfirmed) {
                // Update admin status
                admin.isActive = newStatus;
                
                // In a real application, you would make an API call here
                // to update the admin's status on the backend
                
                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: `Administrator ${newStatus ? 'Activated' : 'Deactivated'}!`,
                    text: `${admin.name} has been ${newStatus ? 'activated' : 'deactivated'} successfully.`,
                    confirmButtonColor: '#3085d6',
                });
            }
        },
        
        async deactivateAdmin(admin) {
            // Only show confirmation if the admin is currently active
            if (!admin.isActive) {
                Swal.fire({
                    icon: 'info',
                    title: 'Administrator Already Inactive',
                    text: `${admin.name} is already deactivated.`,
                    confirmButtonColor: '#3085d6',
                });
                return;
            }
            
            const result = await Swal.fire({
                title: 'Deactivate Administrator?',
                text: `Are you sure you want to deactivate ${admin.name}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, deactivate it!',
                cancelButtonText: 'Cancel'
            });
            
            if (result.isConfirmed) {
                // Update admin status to inactive
                admin.isActive = false;
                
                // In a real application, you would make an API call here
                // to update the admin's status on the backend
                
                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: 'Administrator Deactivated!',
                    text: `${admin.name} has been deactivated successfully.`,
                    confirmButtonColor: '#3085d6',
                });
            }
        }
    }
};
</script>