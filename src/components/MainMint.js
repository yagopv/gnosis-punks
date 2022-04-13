import { useState, useEffect } from 'react';
import { ethers, BigNumber } from 'ethers';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import GnosisPunksNFT from '../GnosisPunksNFT.json';

const GNOSIS_PUNKS_NFT_ADDRESS =
  process.env.REACT_APP_GNOSIS_PUNKS_CONTRACT_ADDRESS;

const MainMint = ({ accounts, setAccounts }) => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [mintAmount, setMintAmount] = useState(1);
  const [maxSupply, setMaxSupply] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);
  const isConnected = Boolean(accounts[0]);

  useEffect(() => {
    setProvider(new ethers.providers.Web3Provider(window.ethereum));
  }, []);

  useEffect(() => {
    if (!provider) return;

    const signer = provider.getSigner();
    setContract(
      new ethers.Contract(GNOSIS_PUNKS_NFT_ADDRESS, GnosisPunksNFT, signer)
    );
  }, [provider]);

  useEffect(() => {
    (async () => {
      if (contract) {
        setMaxSupply((await contract.maxSupply()).toNumber());
        setTotalSupply((await contract.totalSupply()).toNumber());
      }
    })();
  }, [contract]);

  const handleMint = async () => {
    if (window.ethereum && contract) {
      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
        });

        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDecrement = () => {
    if (mintAmount < 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <>
      <Flex
        justify="center"
        align="center"
        flexDirection="column"
        height="100vh"
        paddingBottom="150px"
      >
        <Box width="50%">
          <div>
            <Text fontSize="48px" textShadow="0 5px #000">
              Gnosis Punks
            </Text>
            <Text
              fontSize="30px"
              letterSpacing="-5.5%"
              fontFamily="VT323"
              textShadow="0 2px 20x #000"
            >
              Mint Gnosis Punks
            </Text>
            <Text
              fontSize="30px"
              letterSpacing="-5.5%"
              fontFamily="VT323"
              textShadow="0 2px 20x #000"
            >
              {`${totalSupply} / ${maxSupply}`} already minted
            </Text>
          </div>
        </Box>

        {isConnected ? (
          <div>
            <Flex align="center" justify="center">
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0f0f0f"
                color="white"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleDecrement}
              >
                -
              </Button>
              <Input
                type="number"
                readOnly
                width="100px"
                height="40px"
                textAlign="center"
                paddingLeft="19px"
                marginTop="10px"
                value={mintAmount}
              />
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0f0f0f"
                color="white"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleIncrement}
              >
                +
              </Button>
            </Flex>
            <Button
              backgroundColor="#D6517D"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0f0f0f"
              color="white"
              fontFamily="inherit"
              padding="15px"
              marginTop="10px"
              onClick={handleMint}
            >
              Mint
            </Button>
          </div>
        ) : (
          <Text
            margin="70px"
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 3px #000"
            color="#d6517d"
          >
            Your must be connected to mint
          </Text>
        )}
      </Flex>
    </>
  );
};

export default MainMint;
