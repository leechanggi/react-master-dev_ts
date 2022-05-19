import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { fetchCoins } from './api';
import { isDarkAtom } from '../atoms';

/*styled*/
const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${props => props.theme.cardBgColor};
  color: ${props => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  border: 1px solid white;
  a {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
    transition: color 0.16s ease-in;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
`;

const Img = styled.img`
  display: block;
  width: 32px;
  height: 32px;
  margin-right: 8px;
`;

/*APIs*/
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const setteDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => {
    setteDarkAtom(prev => !prev);
  };

  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>코인</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Title>코인</Title>
        <button type="button" onClick={toggleDarkAtom}>
          Toggle Mode
        </button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map(coin => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt={coin.name} />
                <h2>{coin.name} &rarr;</h2>
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
