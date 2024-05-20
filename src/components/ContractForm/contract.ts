import { PublicKey, Mina, Field, fetchAccount, UInt64 } from 'o1js';
import { SignTestContract } from '../../contract/contract';

export async function contract(value: number): Promise<string> {
  console.log('Contract', { value });
  const fieldValue = Field(value);
  console.log('FieldValue', fieldValue.toJSON());
  const field2 = Field(10);
  console.log('Field2', field2.toJSON());
  const result = fieldValue.add(field2);
  console.log('Result', result.toJSON());
  const resultNumber = Number(result.toBigInt());
  console.log('ResultNumber', resultNumber);
  const networkInstance = Mina.Network({
    mina: 'https://api.minascan.io/node/devnet/v1/graphql',
  });
  Mina.setActiveInstance(networkInstance);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const accounts = await (window as any)?.mina?.requestAccounts();
  console.log('Accounts', accounts);
  let address = '';
  if (accounts?.code === undefined && accounts?.length > 0) {
    address = accounts[0];
    console.log('Address', address);
  } else return '';

  const sender = PublicKey.fromBase58(address);
  console.log('Sender', sender.toBase58());

  console.log('Sender balance', await accountBalanceMina(sender));
  const zkAppPublicKey = PublicKey.fromBase58(
    'B62qk7nXjEzGJdyQFNVs5UauASTQJgiJSBpHJmDcFTiYQrDDTGDsNFT'
  );
  const zkApp = new SignTestContract(zkAppPublicKey);

  await fetchAccount({ publicKey: zkAppPublicKey });
  await fetchAccount({ publicKey: sender });

  const fee = 200_000_000;
  const memo = `value: ${value}`;

  const tx = await Mina.transaction({ sender, fee, memo }, async () => {
    await zkApp.setValue(fieldValue);
  });

  const transaction = tx.toJSON();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const txResult = await (window as any)?.mina?.sendTransaction({
    transaction,
    onlySign: true,
    feePayer: {
      fee: fee,
      memo: memo,
    },
  });
  const signedData = txResult?.signedData;
  const signedDataJson = JSON.parse(signedData);
  console.log('SignedDataJson', signedDataJson);

  tx.transaction.feePayer.authorization =
    signedDataJson.zkappCommand.feePayer.authorization;
  console.time('ProvedAndSent');
  console.log('Compiling contract');
  console.time('Compiled');
  await SignTestContract.compile();
  console.timeEnd('Compiled');
  console.time('Proved');
  await tx.prove();
  console.timeEnd('Proved');
  const txSent = await tx.send();
  console.log('TxSent', txSent);
  const hash = txSent?.hash;
  console.timeEnd('ProvedAndSent');
  console.log('Hash', hash);

  return hash;
}

/**
 * Fetches the account balance for a given public key
 * @param address the public key
 * @returns the account balance
 */
async function accountBalance(address: PublicKey): Promise<UInt64> {
  await fetchAccount({ publicKey: address });
  if (Mina.hasAccount(address)) return Mina.getBalance(address);
  else return UInt64.from(0);
}

/**
 * Fetches the account balance for a given public key and returns it in Mina
 * @param address the public key
 * @returns the account balance in MINA
 */
async function accountBalanceMina(address: PublicKey): Promise<number> {
  return Number((await accountBalance(address)).toBigInt()) / 1e9;
}
