import { BigNumber, Wallet, getDefaultProvider, utils } from "ethers";
require('dotenv').config()
import { ethers, run, network } from "hardhat";
import { NutritionistNFT__factory, UserNFT__factory, Treasury__factory, CommunityNetwork__factory } from "../typechain-types";

//const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
//const wallet = new ethers.Wallet(PRIVATE_KEY, ethers.provider);
//const encoder  =  new utils.AbiCoder()
const encoder = ethers.utils.defaultAbiCoder;
const treasuryAddr = "0x3168Be8281fa2D097d3DB9119143b0937e529a87"
const communityAddr = "0x48DF3348bb3810c4eec755152fA3a9c68897f0F2"
const nutritionistNFTAddr = "0x0Ac68437476A0aB3aC8e3fB03b01B030B4Ec5413"
const userNftAddr = "0xC862942EF3bb3D185F8154487A6af9ca9F5FB775"


const registryAddr = "0x819B58A646CDd8289275A87653a2aA4902b14fe6"
const registrarAddr = "0xD23D3D1b81711D75E1012211f1b65Cc7dBB474e2"
const linkTokenAddr = "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846"
const privateKey = process.env.PRIVATE_KEY as string;
const wallet = new Wallet(privateKey);

const avalancheRpc = "https://api.avax-test.network/ext/bc/C/rpc"


// const communityContract = "0x3a65168B746766066288B83417329a7F901b5569"
// const treasuryContract = "0x9E1eF5A92C9Bf97460Cd00C0105979153EA45b27"
// const nutritionistNftContract = "0xA39d26482B5c226Fd02A5f3e159C72ee03d63Fc0"
// const userNftContract = "0x6D919b8dC30BEf41b56Aa8b18b2052c9459F8E9A"

async function main() {
    //await deployCommunityContracts();

    await setupNFTs();
    //await joinCommunity("0x3A3bc7C19bE0381294d8E7Bd311C123b76b33982");


    // await verifyContract()
    // const chainID = network.config.chainId;
    // if (chainID != 31337) {
    //     await verifyContract()
    // }

    //await joinCommunity(communityContract);
}

async function deployTreasury() {
    //console.log("Deploying Treasury....");

    //const provider = getDefaultProvider(rpc)
    //const connectedWallet = wallet.connect(provider);
    //const TreasuryFactory = new Treasury__factory(connectedWallet);

    const TreasuryFactory = await ethers.getContractFactory("Treasury");
    const treasury = await TreasuryFactory.deploy();
    await treasury.deployed();
    console.log("---- Treasury Contract was deployed to: ---- ", treasury.address);
    return treasury.address;
}

async function deployUserNFT(_communityAddr: any) {
    //console.log("Deploying UserNFT....");
    const UserNFTFactory = await ethers.getContractFactory("UserNFT");
    const userNFT = await UserNFTFactory.deploy("User NFT", "UST", _communityAddr, { gasLimit: 8000000 });
    await userNFT.deployed();
    console.log("---- UserNFT Contract was deployed to: ---- ", userNFT.address);
    return userNFT.address;
}

async function deployNutritionistNFT(_communityAddr: any) {
    //console.log("Deploying NutrionistNFT....");
    const NutritionistNFTFactory = await ethers.getContractFactory("NutritionistNFT");
    const nutritionistNFT = await NutritionistNFTFactory.deploy("Nutritionist NFT", "NUT", _communityAddr, { gasLimit: 8000000 });
    await nutritionistNFT.deployed();
    console.log("---- NutritionistNFT Contract was deployed to: ---- ", nutritionistNFT.address);
    return nutritionistNFT.address;
}

async function joinCommunity(_communityAddr: any) {

    const provider = getDefaultProvider(avalancheRpc);
    const connectedWallet = wallet.connect(provider);

    const communityFactory = new CommunityNetwork__factory(connectedWallet);
    const community = communityFactory.attach(_communityAddr);

    console.log("joining community network...")
    const amount = ethers.utils.parseEther("0.01");
    //const tx = await community.registerUser("hello", "nft", {gasLimit: 6000000, value: amount})
    const tx = await community.nutritionistNFT()
    //await tx.wait();
    console.log(tx)
    console.log("community network successfully joined")
}

async function setupNFTs() {

    let userNFTAddr = "0x8cE89567ea2cB34DfDBa438a32991f4bA9aE0405"
    let nutritionistNFTAddr = "0x8dD80E558F9168D261b59792169C024568C9D943"
    let communityAddr = "0x5A55F1C417fB81D1066ecf34C5f1caFa38D498D2"

    const provider = getDefaultProvider(avalancheRpc);
    const connectedWallet = wallet.connect(provider);

    const communityFactory = new CommunityNetwork__factory(connectedWallet);
    const community = communityFactory.attach(communityAddr);

    try {
        console.log("Setting up NFTs for Avalanche")
        const tx = await community.setNFTs(userNFTAddr, nutritionistNFTAddr);
        await tx.wait();
        console.log("NFTs setup successful")
    }

    catch (error) {
        console.log(`[source] community.setNFTs ERROR!`);
        console.log(`[source]`, error);

    }
}


async function deployCommunityContracts() {
    console.log("Deploying Contracts for Avalanche....");
    let treasuryAddr;
    let communityAddr;
    try {
        console.log("Deploying treasury for Avalanche");
        treasuryAddr = await deployTreasury();

        const CommunityFactory = await ethers.getContractFactory("CommunityNetwork"/*, wallet*/);

        console.log("Deploying Community contract for Avalanche");
        const community = await CommunityFactory.deploy(treasuryAddr, linkTokenAddr, registrarAddr, registryAddr);
        await community.deployed();
        communityAddr = community.address;
        console.log("---- Community Contract for Avalanche was deployed to Avalanche testnet at this address: ---- ", community.address);
    }
    catch (error) {
        console.error("Error deploying Community for Avalanche:", error);
        throw error;
    }

    console.log("Deploying UserNFT for Avalanche....");
    let userNFT;
    try {
        userNFT = await deployUserNFT(communityAddr);
    }
    catch (error) {
        console.error("Error User NFT for Avalanche:", error);
        throw error;
    }

    console.log("Deploying NutritionistNFT for Avalanche....");
    let nutritionistNFT;
    try {
        nutritionistNFT = await deployNutritionistNFT(communityAddr);
    }
    catch (error) {
        console.error("Error Nutritionist NFT for Avalanche:", error);
        throw error;
    }
}

async function verifyContract() {

    console.log(`Verifying User NFT contract for Avalanche...`);

    try {
        await run("verify:verify", {
            address: "",
            constructorArguments: [],
        });
        //console.log(`contract for ${chain.name} verified`);
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!");
        } else {
            console.log(e);
        }
    }
}


main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
