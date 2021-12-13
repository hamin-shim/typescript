import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.tabColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    padding: 20px;
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

interface ICoinsProps {}

const Toggle = styled.div`
  background-color: ${(props) => props.theme.tabColor};
  padding: 15px 20px;
  border-radius: 10px;
  margin-left: 10px;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  transition: 0.4s;
  &:hover {
    color: ${(props) => props.theme.reverseAccentColor};
    background-color: ${(props) => props.theme.reverseTabColor};
  }
`;
function Coins({}: ICoinsProps) {
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
  const setterFn = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => {
    setterFn((prev) => !prev);
  };
  return (
    <Container>
      <Header>
        <Title>코인</Title>
        <Toggle onClick={toggleDarkAtom}>Change Mode</Toggle>
      </Header>
      {isLoading ? (
        "Loading..."
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
