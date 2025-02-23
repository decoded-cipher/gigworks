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
                        <th scope="col" class="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="category in categories" :key="category.id">

                        <tr
                            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                            <th scope="row" 
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <a @click="redirectToSubcategory(category.id)" class="cursor-pointer hover:underline">{{ category.name }}</a>

                            </th>

                            <td class="px-6 py-4 flex gap-2">
                                <button @click="openEditModal(category)"
                                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                <a href="#"
                                    class="font-medium text-red-600 dark:text-red-500 hover:underline">Disable</a>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
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
import { getCategories, addCategories, updateCategories } from '@/api';

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
        };
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
        }
    },
}
</script>