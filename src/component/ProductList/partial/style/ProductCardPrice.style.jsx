import styled from 'styled-components';

export const ContainerProductCard = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-items: space-between;
    align-items: center;
    margin: 10px;
    max-width: fit-content;
    
 `
export const TextProductCard = styled.div`
  font-size: 12px;
  font-weight: 700;
  width: 100%;
  text-align: center;
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: red;
  margin-bottom: 12px;
  border-top-left-radius:12px ;
  border-top-right-radius:12px;
  border-bottom-left-radius:2px;
  border-bottom-right-radius:2px;
`


export const InputText = styled.input`
text-align: center;
::placeholder{
  color:#ffff
}
outline:none;
padding: 2px 5px;
border: 1px solid transparent;
border-radius:8px;
background: transparent;
appearance: none;
color: #ffff;
font-weight: inherit;
&:focus {
  border:1px solid lightgray;
  }
`


export const InputCustomNumber = styled(InputText)`
  color: #000000;
  width: 100%;
  max-width: 50px;
 `
export const ContainerProdctCardPrice = styled.div`
position:relative;
display: flex;
align-items: center;
flex-direction: column;
border:solid 1px #C9CDD6;
box-shadow: 2px 1px 2px rgb(0 0 0 / 30%);
-webkit-box-shadow:2px 1px 2px rgb(0 0 0 / 30%); 
border-radius:12px;
margin:10px 15px;
 `


export const ContainerInputs = styled.div`
display: flex;
align-items: center;
flex-direction: column;
width: 100%;
padding:0 12px;
`

export const InputWrapper = styled.div`
  width: 100%;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
  `


export const ContainerNumber = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
`

export const ButtonContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-between;
align-items: baseline;
padding: 12px;
width: 100%;
margin-top:15px;
gap: 10px;
`
export const ControlIcons = styled.div`
display:flex;
align-items: baseline;
gap: 24px;
`

export const Button = styled.button`
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.28px;
  white-space: nowrap;
  text-overflow:ellipsis;
  cursor: pointer;
  outline: none;
  border: 0;
 /*  &[disabled] {
    pointer-events: none;
     color: grey;
  } */
  transition: 0.3s;
  background-color: #ddd ;
  &:hover {
    color: white;
    opacity: 0.8;
    background-color: #3e8e41;
  }
  border-radius: 10px;
  font-weight: 500;
  font-size:14px;
  padding: 8px 16px;
  gap: 4px;
`

export const CustomSelect = styled.select`
outline: none;
border: none;
`
