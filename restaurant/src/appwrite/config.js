import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    users;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createFoodItem({ title, desc, images, orderprice, saleprice, category }) {
        try {
            console.log(Rideid, "inapprite")
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    desc,
                    images,
                    orderprice,
                    saleprice,
                    category
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createFoodItem :: error", error);
        }
    }

    async updateFoodItem(id, { title, desc, images, orderprice, saleprice, category }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {
                    title,
                    desc,
                    images,
                    orderprice,
                    saleprice,
                    category
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updateFoodItem :: error", error);
        }
    }

    async deleteFoodItem(id) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id

            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFoodItem :: error", error);
            return false
        }
    }

    async getFoodItem(id) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id

            )
        } catch (error) {
            console.log("Appwrite serive :: getFoodItem :: error", error, "i", id);
            return false
        }
    }

    async getFoodItems(queries = [Query.orderAsc('title')]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                // queries,
            )
        } catch (error) {
            console.log("Appwrite serive :: getFoodItems :: error", error);
            return false
        }
    }
    //code for order management

    async createOrder({ MobileNumber, Items, Address, GrandTotal, Message, Orderby }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdOrders,
                ID.unique(),
                {
                    MobileNumber,
                    Items,
                    Address,
                    GrandTotal,
                    Message,
                    Orderby
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createOrder :: error", error);
        }
    }

    async updateOrder(id, { MobileNumber, Items, Address, GrandTotal, Message, Orderby }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdOrders,
                id,
                {
                    MobileNumber,
                    Items,
                    Address,
                    GrandTotal,
                    Message,
                    Orderby
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updateOrder :: error", error);
        }
    }

    async deleteOrder(id) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdOrders,
                id

            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteOrder :: error", error);
            return false
        }
    }
    async getAllOrders(queries = [Query.orderAsc('')]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdOrders,
                // queries,
            )
        } catch (error) {
            console.log("Appwrite serive :: getAllOrders :: error", error);
            return false
        }
    }


}


const service = new Service()
export default service