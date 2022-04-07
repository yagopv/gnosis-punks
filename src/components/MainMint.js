import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import { Box, Button, Flex, Input, Link, Spacer, Text } from '@chakra-ui/react';
import GnosisPunksNFT from '../GnosisPunksNFT.json';

const GNOSIS_PUNKS_NFT_ADDRESS = '0xf4aDE340e20bC1333bc1c60D786B71e449f4C76f';

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  const handleMint = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        GNOSIS_PUNKS_NFT_ADDRESS,
        GnosisPunksNFT,
        signer
      );

      try {
        const response = await contract.mint(BigNumber.from(mintAmount));
        console.log('RESPONSE: ', response);
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
    <Flex
      justify="center"
      align="center"
      flexDirection="column"
      height="100vh"
      paddingBottom="150px"
    >
      <Box width="250px">
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
        <p>Your must be connected to mint</p>
      )}
    </Flex>
  );
};

export default MainMint;
