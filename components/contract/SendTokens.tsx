import { useCallback, useEffect, useState } from 'react';
import { useAccount, useNetwork, useWaitForTransaction } from 'wagmi';
import { Loading, Toggle } from '@geist-ui/core';
import { tinyBig } from 'essential-eth';
import { useAtom } from 'jotai';
import { checkedTokensAtom } from '../../src/atoms/checked-tokens-atom';
import { globalTokensAtom } from '../../src/atoms/global-tokens-atom';
import { httpFetchTokens, Tokens } from '../../src/fetch-tokens';

const usdFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'USD',
});

const TokenRow: React.FunctionComponent<{ token: Tokens[number] }> = ({
  token,
}) => {
  const [checkedRecords, setCheckedRecords] = useAtom(checkedTokensAtom);
  const { chain } = useNetwork();
  const pendingTxn =
    checkedRecords[token.contract_address as `0x${string}`]?.pendingTxn;
  
  const setTokenChecked = (tokenAddress: string, isChecked: boolean) => {
    setCheckedRecords((old) => ({
      ...old,
      [tokenAddress]: { isChecked },
    }));
  };

  const { address } = useAccount();
  const { balance, contract_address, contract_ticker_symbol } = token;
  const unroundedBalance = tinyBig(token.quote).div(token.quote_rate);
  
  const roundedBalance = unroundedBalance.lt(0.001)
    ? unroundedBalance.round(10)
    : unroundedBalance.gt(1000)
    ? unroundedBalance.round(2)
    : unroundedBalance.round(5);

  const { isLoading } = useWaitForTransaction({
    hash: pendingTxn?.blockHash || undefined,
  });

  return (
    <div key={contract_address}>
      {isLoading && <Loading />}
      <Toggle
        checked={checkedRecords[contract_address as `0x${string}`]?.isChecked}
        onChange={(e) => {
          setTokenChecked(contract_address, e.target.checked);
        }}
        style={{ marginRight: '18px' }}
        disabled={Boolean(pendingTxn)}
      />
      <span style={{ fontFamily: 'monospace' }}>
        {roundedBalance.toString()}{' '}
      </span>
      <a
        href={`${chain?.blockExplorers?.default.url}/token/${token.contract_address}?a=${address}`}
        target="_blank"
        rel="noreferrer"
      >
        {contract_ticker_symbol}
      </a>{' '}
      (valeur de{' '}
      <span style={{ fontFamily: 'monospace' }}>
        {usdFormatter.format(token.quote)}
      </span>
      )
    </div>
  );
};

export const GetTokens = () => {
  const [tokens, setTokens] = useAtom(globalTokensAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkedRecords, setCheckedRecords] = useAtom(checkedTokensAtom);

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const fetchData = useCallback(async () => {
    if (!address || !chain?.id) {
      setError("Adresse ou chaîne non définie !");
      return;
    }

    setLoading(true);
    try {
      setError('');
      const newTokens = await httpFetchTokens(chain.id, address);

      // On assume que `newTokens` a la structure attendue
      setTokens(newTokens.data.erc20s);
    } catch (error: unknown) {
      if (error instanceof Error) {
        // On peut maintenant accéder à `error.message` sans problème
        setError(`Erreur de récupération des tokens : ${error.message}`);
      } else {
        setError('Erreur de récupération des tokens : Erreur inconnue');
      }
    }
    setLoading(false);
  }, [address, chain?.id, setTokens]);

  useEffect(() => {
    if (address && chain?.id) {
      fetchData();
      setCheckedRecords({});
    }
  }, [address, chain?.id, fetchData, setCheckedRecords]);

  useEffect(() => {
    if (!isConnected) {
      setTokens([]);
      setCheckedRecords({});
    }
  }, [isConnected, setTokens, setCheckedRecords]);

  if (loading) {
    return <Loading>Chargement...</Loading>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ margin: '20px' }}>
      {isConnected && tokens?.length === 0 && `Aucun token sur ${chain?.name}`}
      {tokens.map((token) => (
        <TokenRow token={token} key={token.contract_address} />
      ))}
    </div>
  );
};
