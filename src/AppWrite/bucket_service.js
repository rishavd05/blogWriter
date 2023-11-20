import config from "../config/config";
import { ID, Client, Storage } from "appwrite";

export class BucketService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Error in BucketService :: createFile ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Error in BucketService :: deleteFile ", error);
      return false;
    }
  }

  previewFile(fileId) {
    return this.storage.getFilePreview(config.appwriteBucketId, fileId);
  }
}

const bucketService = new BucketService();
export default bucketService;
