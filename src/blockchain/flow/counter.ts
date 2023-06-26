import * as fcl from "@onflow/fcl";
import { signer } from "./signer";
const readCounter = async () => {
  const cadence = `
    import Basic from 0xBasic

    pub fun main(): UInt {
      return Basic.counter
    }
  `;

  const response = await fcl.send([fcl.script(cadence)]);

  const counter = await fcl.decode(response);
  console.log({ counter });
};

const shiftCounter = async (value: number) => {
  console.log("%cSigning Transaction", `color: teal`);

  const cadence = `
      import Basic from 0xBasic
  
      transaction(shift: UInt8) {
        prepare(signer: AuthAccount) {
          Basic.incrementCounterBy(shift)
        }
      }
    `;

  const args = [value];
  const proposer = fcl.currentUser().authorization;
  const payer = fcl.currentUser().authorization;
  const authorizations = [fcl.currentUser().authorization];

  const response = await fcl.send([fcl.transaction(cadence), fcl.args(args), fcl.proposer(proposer), fcl.payer(payer), fcl.authorizations(authorizations), fcl.limit(999)]);

  const txId = await fcl.decode(response);
  console.log(`Submitted transaction ${txId} to the network`);
  console.log("%cWaiting for transaction to be sealed...", `color: teal`);

  const label = "Transaction Sealing Time";
  console.time(label);

  const txDetails = await fcl.tx(txId).onceSealed();

  console.timeEnd(label);
  return txDetails;
};

(async () => {
  console.clear();
  await readCounter();

  const txDetails = await shiftCounter(12);
  console.log({ txDetails });

  // we will call "readCounter" function second time to ensure
  // that value of counter has changed
  await readCounter();
})();
