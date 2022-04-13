const hre = require('hardhat');

async function main() {
  const GnosisPunksNFT = await hre.ethers.getContractFactory('GnosisPunksNFT');
  const gnosisPunksNFT = await GnosisPunksNFT.deploy();

  await gnosisPunksNFT.deployed();

  console.log('GnosisPunksNFT deployed to:', gnosisPunksNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
