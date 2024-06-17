const conf={
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteCollectionIdOrders: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_ORDERS),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    SecureToken: String(import.meta.env.VITE_SECURETOKEN),
    maheshmail:String(import.meta.env.VITE_MAHESHMAIL),
    mailjsserviceid:String(import.meta.env.VITE_MAILJSSERVICEID),
    mailjstemplate:String(import.meta.env.VITE_MAILJSTEMPLATE_ID),
    mailjspublickey:String(import.meta.env.VITE_MAILJSKEY),

}

export default conf;