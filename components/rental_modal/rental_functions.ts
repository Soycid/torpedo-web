import { Client } from "@xmtp/xmtp-js";
import { Contract, ethers, Signer } from "ethers";
import torpedoSessionAbi from "../hooks/torpedo_session_abi";
import { VMConfig } from "../RecommendedConfig";

const createSession = async (
  torpedo: Contract,
  price: number,
  signer: Signer,
  config: VMConfig
) => {
  console.log("HERE");
  const priceInWei = await torpedo.USDToWei(price);
  console.log(priceInWei);

  const withSigner = torpedo.connect(signer);
  const response = await withSigner.createSession(
    constructParamsFromConfig(config),
    {
      value: priceInWei,
    }
  );
  console.log(response);
  const res = await response.wait();
  if (!res.events) {
    throw new Error("No events emitted");
  }
  const { address } = res.events[0];
  const sessionContract = new ethers.Contract(
    address,
    torpedoSessionAbi,
    signer
  );
  return sessionContract;
};

const waitForVMToStart = async (sessionContract: Contract) => {
  let status = await sessionContract.status();
  while (status != 1) {
    await new Promise((r) => setTimeout(r, 1000));
    status = await sessionContract.status();
    console.log(status);
  }
  console.log(status);
  return status;
};

const startSession = async (sessionContract: Contract, xmtp: Client) => {
  await sessionContract.startSession();
  const conversations = await xmtp.conversations.list();
  const conversation = conversations.find(
    (convo) => convo.peerAddress === sessionContract.address
  );
  if (!conversation) {
    throw new Error("Conversation not found");
  }

  const messages = await conversation.messages();
  const message = messages[messages.length - 1];
  const { content } = message;

  return content;
};

const constructParamsFromConfig = (config: VMConfig) => {
  return {
    numCPUs: config.numCPUs,
    numGPUs: config.numGPUs,
    gpuType: config.gpuType, // later make this config.gpuType
    totalTime: config.time, // TODO: multiply by 3600
    serviceType: 2,
    diskSpace: 1,
    RAM: 1, // in seconds
  };
};

export {
  createSession,
  waitForVMToStart,
  startSession,
  constructParamsFromConfig,
};
