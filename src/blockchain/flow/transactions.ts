export const TransferFlowScript = `
  import FungibleToken from 0xFungibleToken
  import FlowToken from 0xFlowToken

  transaction(amount: UFix64, to: Address) {
    let sentVault: @FungibleToken.Vault

    prepare(signer: AuthAccount) {
      let vaultRef = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
        ?? panic("Could not borrow reference to the user's FlowToken Vault")

      self.sentVault <- vaultRef.withdraw(amount: amount)
    }

    execute {
      let recipient = getAccount(to)
      let receiverRef = recipient.getCapability(/public/flowTokenReceiver)!.borrow<&{FungibleToken.Receiver}>()
        ?? panic("Could not borrow receiver reference to the recipient's Vault")

      receiverRef.deposit(from: <-self.sentVault)
    }
  }
`;
