import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { HeaderContainer, Logo, HeaderTitle, FlexContainer } from './styles';
import { IProps } from './IProps';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import { checkIfTokenValid, logoutUser } from 'utils/storage.util';

const Header = ({ logo }: IProps) => {
  const [showLogo, setShowLogo] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (logo) setShowLogo(true)
  }, [logo])

  const handelLogout = () => {
    logoutUser();
    navigate('/login');
  }

  return (
    <HeaderContainer>
      <FlexContainer>
        {showLogo && <Link href="/"><Logo src={logo} alt="logo" /></Link>}
        <HeaderTitle>Browse Asteroids</HeaderTitle>
      </FlexContainer>
      
      {checkIfTokenValid() && <Button variant='outlined' onClick={handelLogout}>sign out</Button>}
    </HeaderContainer>
  )
}

export default Header;
