import React from 'react';
import { useStore } from 'store/store';
import { LateralColumn } from './partial/LateralColumn/LateralColumn.component';
import {FlexContainer, HeaderContainer} from './style/Header.style'

export const Header = () => {
    const selectUser = useStore((state) => state.selectUser)
    const isLogged = useStore((state) => state.isLogged)

    
  return (
  <>
      <HeaderContainer > 
        <FlexContainer>
            {'Logo'}
        </FlexContainer>
        <LateralColumn />
        { isLogged &&
        <FlexContainer>
        {'Ciao '+ selectUser?.name} 
        <div>
             <button> 
                {'LOGOUT'}
            </button>
        </div>
        </FlexContainer>
        }
      </HeaderContainer>
    </>
  );
};

