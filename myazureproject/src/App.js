import logo from './logo.svg';
import './App.css';

function App() {
  const [preview, setPreview] = useState();
  // const [limitURL, setLimitURL] = useState();

  const uploadFile = async (file) => {
    try {
      const containerClient = blobServiceClient.getContainerClient(containerName);

      // Generate a unique name for the blob (you can customize this logic)
      const blobName = `file_${new Date().getTime()}_${file.name}`;

      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      // Upload the file to Azure Blob Storage
      const uploadBlobResponse = await blockBlobClient.uploadData(file, file.length);
      console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);

      // Generating a unique link for the user to share:
      
      // const blobSASPermissions = new SAS.blobSASPermissions({ read: true });

      // const expiresOn = new Date();
      // expiresOn.setMinutes(expiresOn.getHours() + 5); // Valid for five hours

      // const sasToken = generateBlobSASQueryParameters({
      //   containerName,
      //   blobName,
      //   permissions: blobSASPermissions,
      //   expiresOn
      // });

      // const blobUrl = blockBlobClient.url + "?" + sasToken.toString();
      // setLimitURL(blobUrl);
      setPreview(URL.createObjectURL(file));
    } catch (err) {
      console.error('An error occurred: ', err.message);
    }
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
      <img alt = "N/A" src = { preview } />
      <p>
        {/* Limited Access URL Link (expires in 3 hours): {limitURL} */}
      </p>
    </div>
  );
}

export default App;
