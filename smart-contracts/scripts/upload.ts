import { ThirdwebStorage } from "@thirdweb-dev/storage";
 
// First, instantiate the thirdweb IPFS storage
const storage = new ThirdwebStorage({
  secretKey: "KUVekOPNenYr8zBZNHqd3YUhqZVyX6zKSyfRb_FyRQBA-9qj0TGF4Ax-bNzMtiwVGwGqPslaEHETETfK_X7pjA", // You can get one from dashboard settings
});
const object = {
    name: "blessed",
    occupation: "wealthy"
}
async function main() {
    await uploadToThirdWeb(object);
}
 
async function uploadToThirdWeb(metadata: any) {
    // Here we get the IPFS URI of where our metadata has been uploaded
// const uri = await storage.upload(metadata);
// // This will log a URL like ipfs://QmWgbcjKWCXhaLzMz4gNBxQpAHktQK6MkLvBkKXbsoWEEy/0
// console.info("uri:", uri);

const uri = "ipfs://Qma5YBPyrAeXSxhYzEbd4eMz6XgrMjAMydJkLjKGo2UEvi/0"
 
// Here we a URL with a gateway that we can look at in the browser
const url = await storage.resolveScheme(uri);
// This will log a URL like https://ipfs.thirdwebstorage.com/ipfs/QmWgbcjKWCXhaLzMz4gNBxQpAHktQK6MkLvBkKXbsoWEEy/0
console.info("url:", url);
 
// You can also download the data from the uri
const data = await storage.downloadJSON(uri);
console.log("data:", data)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
