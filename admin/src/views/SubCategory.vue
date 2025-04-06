<template>
    <DashboardLayout>

        <div class="flex items-center mb-4">
            <button @click="goBack"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 mr-4">Back</button>
        </div>

        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Sub-Categories</h2>
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white">{{ category.name }}</h2>
            <button @click="openAddModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add
                Category</button>

        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="subCategory in paginatedSubCategories" :key="subCategory.id">

                        <tr
                            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                            <th scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <a @click="redirectToSubcategory(subCategory.id)"
                                    class="cursor-pointer hover:underline">{{ subCategory.name }}</a>

                            </th>

                            <td class="px-6 py-4  gap-2">
                                <button @click="openEditModal(subCategory)"
                                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                            </td>
                            <td class="px-6 py-4  gap-2">
                                <button v-if="subCategory.status" @click="openDisableModal(subCategory)"
                                    class="font-medium text-red-600 dark:text-red-500 hover:underline">Disable</button>
                                <button v-else @click="openEnableModal(subCategory)"
                                    class="font-medium text-green-600 dark:text-green-500 hover:underline">Enable</button>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <div class="flex justify-between items-center mt-4">
            <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Previous</button>
            <span class="text-white">Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Next</button>
        </div>

        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center z-40 justify-center">
            <div class="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold">{{ isEdit ? 'Edit Sub Category' : 'Add New Sub Category' }}</h2>
                    <button @click="closeModal" class="text-gray-500 hover:text-gray-700">&times;</button>
                </div>
                <form @submit.prevent="submitForm">
                    <label for="category">Category</label>
                    <input type="text" id="category" v-model="subCategoryForm.name"
                        class="w-full border border-gray-300 rounded-md p-2 mt-2 mb-4" placeholder="Enter the category">
                    <button type="submit"
                        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save</button>
                </form>
            </div>
        </div>

    </DashboardLayout>
</template>

<script>
import { fetchSubCategories, addSubCategories, updateSubCategories ,updateSubCategoryStatus } from '@/api';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import Swal from 'sweetalert2';

export default {
    name: 'SubCategory',
    components: {
        DashboardLayout
    },
    data() {
        return {
            pageId: this.$route.params.id,
            subCategories: [],
            category: {},
            showModal: false,
            isAdd: false,
            isEdit: false,
            subCategoryForm: {
                name: ''
            },
            currentPage: 1,
            itemsPerPage: 10,
        }
    },
    computed: {
        paginatedSubCategories() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.subCategories.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.subCategories.length / this.itemsPerPage);
        }
    },
    mounted() {
        console.log(this.pageId);
        this.fetchSubCategory();
    },
    methods: {
        async fetchSubCategory() {
            try {
                const response = await fetchSubCategories(this.pageId);
                console.log(response.data);
                this.category = response.data.category;
                this.subCategories = response.data.subCategory;
            } catch (error) {
                console.error(error);
            }
        },
        openAddModal() {
            this.showModal = true;
            this.isAdd = true;
            this.isEdit = false;
            console.log('Add Modal');

        },
        openEditModal(subCategory) {
            this.showModal = true;
            this.isEdit = true;
            this.isAdd = false;
            this.subCategoryForm.name = subCategory.name;
            this.editSubCategoryId = subCategory.id;
        },
        closeModal() {
            this.showModal = false;
        },
        submitForm() {
            if (this.isAdd) {
                this.addSubCategory();
            } else if (this.isEdit) {
                this.updateSubCategory();
            }
        },
        async addSubCategory() {

            const data = {
                name: this.subCategoryForm.name,
                category_id: this.pageId
            }

            try {
                await addSubCategories(data);
                this.fetchSubCategory();
                this.showModal = false;
            } catch (error) {
                console.error(error);
            }
        },
        async updateSubCategory() {
            const data = {
                name: this.subCategoryForm.name,
                category_id: this.editSubCategoryId
            }
            try {
                await updateSubCategories(data);
                this.fetchSubCategory();
                this.showModal = false;
            } catch (error) {
                console.error(error);
            }
        },
        redirectToSubcategory(id) {
            this.$router.push(`/subcategoryoptions/${id}`);
        },
        changePage(page) {
            if (page > 0 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        goBack() {
            this.$router.go(-1);
        },
        
        openDisableModal(subCategory) {
            Swal.fire({
                title: 'Are you sure?',
                // text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, disable it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.disablesubCategory(subCategory.id);                    
                    Swal.fire(
                        'Disabled!',
                        'Your license has been disabled.',
                        'success'
                    );
                }
            });
        },
        async disablesubCategory(subCategoryId) {
            try {
                const data = {
                    status: 0,
                    sub_category_id: subCategoryId
                }
                await updateSubCategoryStatus(data);
                this.fetchSubCategory();
            } catch (error) {
                console.error(error);
            }
        },
        openEnableModal(subCategory) {
            Swal.fire({
                title: 'Are you sure?',
                // text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, enable it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.enableSubCategory(subCategory.id);
                    Swal.fire(
                        'Enabled!',
                        'Your category has been enabled.',
                        'success'
                    );
                }
            });
        },
        async enableSubCategory(subCategoryId) {
            try {
                const data = {
                    status: 1,
                    sub_category_id: subCategoryId
                }
                await updateSubCategoryStatus(data);
                this.fetchSubCategory();
            } catch (error) {
                console.error(error);
            }
        },
        

    }
}
</script>