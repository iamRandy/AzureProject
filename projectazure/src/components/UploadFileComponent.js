import './../App.css';
const { BlobServiceClient } = require("@azure/storage-blob");

const account = "teststorageazureforwork";
const sas = "sp=racwdli&st=2023-11-27T20:14:38Z&se=2024-01-03T04:14:38Z&spr=https&sv=2022-11-02&sr=c&sig=qMpbFV5MDLid7imGxf5YZ0%2FNMaHpHlbj9BeW3TolgDM%3D";

const containerName = 'myblob';
const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net?${sas}`);

const UploadFileComponent = () => {
  const uploadFile = async (file) => {
    // Replace these values with your actual storage account details
    // const connectionString = 'N9VOCIiuDbkiB8Rao2omYXAsCrZ8RbKr97JQKM8KGmV7piQsXWcGhbj0etvggD6BKhnaiTxgBqLI+ASthPw/ZQ==';
    // const storageName = 'teststorageazureforwork';
    
    const containerClient = blobServiceClient.getContainerClient(containerName);
    console.log("can you see me");

    // Generate a unique name for the blob (you can customize this logic)
    const blobName = `file_${new Date().getTime()}_${file.name}`;

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    // Upload the file to Azure Blob Storage
    const uploadBlobResponse = await blockBlobClient.uploadData(file, file.length);
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
    // await blockBlobClient.uploadData(file, {
    //   maxSingleShotSize: 4 * 1024 * 1024, // Adjust as needed
    // });

    // console.log(`File "${file.name}" uploaded successfully.`);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default UploadFileComponent;
