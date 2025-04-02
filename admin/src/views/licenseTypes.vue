<template>
    <DashboardLayout>
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white">License</h2>
            <button @click="openAddModal" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add license</button>

        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            License
                        </th>
                        <th scope="col" class="px-6 py-3">
                            description
                        </th>
                        <!-- <th scope="col" class="px-6 py-3">
                            Action
                        </th> -->
                    </tr>
                </thead>
                <tbody>
                    <template v-for="license in license" :key="license.id">

                        <tr
                            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200 h-auto">
                            <th scope="row" 
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <a class="cursor-pointer hover:underline">{{ license.name }}</a>

                            </th>
                            <th scope="row" 
                                class="px-6 py-4 font-medium text-gray-900  dark:text-white max-w-xs break-words ">
                                <a class="hover:underline max-w-[200px]">{{ license.description }}</a>
                            
                            </th>

                            <!-- <td class="px-6 py-4 flex gap-2">
                                <button @click="openEditModal(subCategoryOption)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                <a href="#"
                                    class="font-medium text-red-600 dark:text-red-500 hover:underline">Disable</a>
                            </td> -->
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center z-40 justify-center">
            <div class="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold">{{ isEdit ? 'Edit Sub Category options' : 'Add New license' }}</h2>
                    <button @click="closeModal" class="text-gray-500 hover:text-gray-700">&times;</button>
                </div>
                <form @submit.prevent="submitForm">
                    <label for="category">license</label>
                    <input type="text" id="category" v-model="licenseForm.name" class="w-full border border-gray-300 rounded-md p-2 mt-2 mb-4" placeholder="Enter the category">
                    <label for="category">description</label>
                    <input type="text" id="category" v-model="licenseForm.description" class="w-full border border-gray-300 rounded-md p-2 mt-2 mb-4" placeholder="Enter the description">
                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save</button>
                </form>
            </div>    
        </div>

    </DashboardLayout>
</template>

<script>
import { fetchLicense ,addLicenses} from '@/api';
import DashboardLayout from '@/layouts/DashboardLayout.vue';

export default {
    name: 'SubCategoryOptions',
    components: {
        DashboardLayout
    },
    data() {
        return {
            pageId: this.$route.params.id,
            license: [],
            showModal: false,
            isAdd: false,
            // isEdit: false,
            licenseForm: {
                name: '',
                description: ''
            },
        }
    },
    mounted() {
        console.log(this.pageId);
        this.fetchLicense();
    },
    methods: {
        async fetchLicense() {
            try {
                const response = await fetchLicense();
                console.log("sub options",response.data);
                this.license = response.data;                
            } catch (error) {
                console.error(error);
            }
        },
        openAddModal() {
            this.showModal = true;
            this.isAdd = true;
            this.isEdit = false;            
        },
        // openEditModal(subCategoryOption) {
        //     this.showModal = true;
        //     this.isEdit = true;
        //     this.isAdd = false;
        //     this.subCategoryOptionForm.name = subCategoryOption.name;
        //     this.editSubCategoryId = subCategoryOption.id;
        // },   
        closeModal() {  
            this.showModal = false;
        },
        submitForm() {
                this.addLicense();
        },
        async addLicense() {

            const data = {
                name: this.licenseForm.name,
                description: this.licenseForm.description
            }

            try {
                await addLicenses(data);
                this.fetchLicense();
                this.showModal = false;
            } catch (error) {
                console.error(error);
            }
        },
        // async updateSubCategory() {
        //     const data = {
        //         name: this.subCategoryForm.name,
        //         category_id: this.editSubCategoryId    
        //     }
        //     try {
        //         await updateSubCategories(data);
        //         this.fetchSubCategory();
        //         this.showModal = false;
        //     } catch (error) {
        //         console.error(error);
        //     }
        // },
        // redirectToSubcategory(id) {
        //     this.$router.push(`/subcategoryoptions/${id}`);
        // }

    }
}
</script>