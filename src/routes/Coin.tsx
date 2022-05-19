import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useParams, useLocation, Routes, Route } from 'react-router';

import { useQuery } from 'react-query';

import { HelmetProvider, Helmet } from 'react-helmet-async';

import { fetchCoinInfo, fetchCoinTickers } from './api';

import Price from './Price';
import Chart from './Chart';

import styled from 'styled-components';

/*Styled*/
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
const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px 16px;
  border-radius: 8px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  span:first-of-type {
    font-size: 10px;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
`;

const Description = styled.p`
  padding: 16px 0;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  a {
    display: block;
    padding: 7px 0px;
    &.active,
    &:hover,
    &:focus {
      color: ${props => props.theme.accentColor};
    }
  }
`;

/*Interface*/
interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

/*APIs*/
interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface ITickersData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface ICoinProps {
  isDark: boolean;
}

function Coin({ isDark }: ICoinProps) {
  const location = useLocation();
  const navigation = useNavigate();
  const state = location.state as RouteState;

  const { coinId } = useParams<keyof RouteParams>();

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(['info', coinId], () => fetchCoinInfo(coinId), { refetchInterval: 10000 });

  const { isLoading: tickersLoading, data: tickersData } = useQuery<ITickersData>(['tickers', coinId], () => fetchCoinTickers(coinId));

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>{state?.name ? state.name : loading ? 'Loading...' : infoData?.name}</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        {/* <button type="button" onClick={() => navigation(-1)}>
          &larr;이전으로 가기
        </button> */}
        <Title>{state?.name ? state.name : loading ? 'Loading...' : infoData?.name}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab>
              <NavLink to="chart">Chart</NavLink>
            </Tab>
            <Tab>
              <NavLink to="price">Price</NavLink>
            </Tab>
          </Tabs>
          <Routes>
            <Route path="chart" element={<Chart isDark={isDark} coinId={coinId} />} />
            <Route path="price" element={<Price />} />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
