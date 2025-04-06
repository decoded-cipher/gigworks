<template>
    <DashboardLayout>


        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Categories</h2>
            <button @click="openAddModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Category</button>

        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th  class="px-6 py-3">
                            Category
                        </th>
                        <th  class="px-6 py-3">
                            Action
                        </th>
                        <th  class="px-6 py-3">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="category in paginatedCategories" :key="category.id">

                        <tr
                            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                            <td 
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <a @click="redirectToSubcategory(category.id)" class="cursor-pointer hover:underline">{{ category.name }}</a>

                            </td>

                            <td class="px-6 py-4  gap-2">
                                <button @click="openEditModal(category)"
                                    class="font-medium text-white bg-blue-700 py-2 px-5 rounded-lg hover:underline">Edit</button>
                            </td>
                            
                            <td class="px-6 py-4  gap-2">
                                <button v-if="category.status" @click="openDisableModal(category)" 
                                    class="font-medium text-white bg-red-700 py-2 px-5 rounded-lg hover:underline">Disable</button>
                                <button v-else @click="openEnableModal(category)" 
                                    class="font-medium text-white bg-green-700 py-2 px-5 rounded-lg hover:underline">Enable</button>
                            </td>
                            
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>


        <div class="flex justify-between items-center mt-4">
            <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Previous</button>
            <span class="text-white">Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Next</button>
        </div>



        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center z-40 justify-center">
            <div class="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold">{{ isEdit ? 'Edit Category' : 'Add New Category' }}</h2>
                    <button @click="closeModal" class="text-gray-500 hover:text-gray-700">&times;</button>
                </div>
                <form @submit.prevent="submitForm">
                    <label for="category">Category</label>
                    <input type="text" id="category" v-model="categoryForm.name" class="w-full border border-gray-300 rounded-md p-2 mt-2 mb-4" placeholder="Enter the category">
                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save</button>
                </form>
            </div>    
        </div>




    </DashboardLayout>
</template>
<script>
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import { getCategories, addCategories, updateCategories, disableCategory , enableCategory } from '@/api';
import Swal from 'sweetalert2'


export default {
    name: 'Category',
    components: {
        DashboardLayout,
    },
    data() {
        return {
            categories: [],
            showModal: false,
            isAdd: false,
            isEdit: false,
            categoryForm: {
                name: '',
            },
            editCategoryId: null,
            currentPage: 1,
            itemsPerPage: 10,
        };
    },
    computed: {
        paginatedCategories() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.categories.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.categories.length / this.itemsPerPage);
        }
    },
    mounted() {
        this.fetchCategories();
    },
    methods: {
        async fetchCategories() {
            try {
                const response = await getCategories();
                this.categories = response.data.categories;
                console.log(this.categories);
                
            } catch (error) {
                console.error(error);
            }
        },
        openAddModal() {
            this.showModal = true;
            this.isAdd = true;
            this.isEdit = false;
            this.categoryForm.name = '';
        },
        openEditModal(category) {
            this.showModal = true;
            this.isEdit = true;
            this.isAdd = false;
            this.categoryForm.name = category.name;
            this.editCategoryId = category.id;
        },
        closeModal() {
            this.showModal = false;
        },
        async addCategory() {
            try {                
                await addCategories(this.categoryForm);
                this.fetchCategories();
                this.showModal = false;
            } catch (error) {
                console.error(error);
            }
        },
        submitForm() {
            if (this.isAdd) {
                this.addCategory();
            } else if (this.isEdit) {
                this.updateCategory();
            }
        },
        async updateCategory() {
            try {
                const data ={
                    name: this.categoryForm.name,
                    id: this.editCategoryId
                }             
                
                await updateCategories(data);
                this.fetchCategories();
                this.showModal = false;
            } catch (error) {
                console.error(error);
            }
        },
        redirectToSubcategory(id) {
            this.$router.push(`/subcategory/${id}`);
        },
        changePage(page) {
            if (page > 0 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        openEnableModal(category) {
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
                    this.enableCategory(category.id);
                    Swal.fire(
                        'Enabled!',
                        'Your category has been enabled.',
                        'success'
                    );
                }
            });
        },
        async enableCategory(categoryId) {
            try {
                await enableCategory(categoryId);
                this.fetchCategories();
            } catch (error) {
                console.error(error);
            }
        },
        openDisableModal(category) {
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
                    this.disableCategory(category.id);
                    Swal.fire(
                        'Disabled!',
                        'Your category has been disabled.',
                        'success'
                    );
                }
            });
        },
        async disableCategory(categoryId) {
            try {
                await disableCategory(categoryId);
                this.fetchCategories();
            } catch (error) {
                console.error(error);
            }
        },
        
    },
}
</script>