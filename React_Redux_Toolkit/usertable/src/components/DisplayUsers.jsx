import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

const DisplayUsers = () => {

    const data = useSelector((state) => state.users);

    console.log(data);

  return (
    <Wrapper>
        {
            data.map((user,id)=>{
                return <li key={id}>{user}</li>
            })
        }
    </Wrapper>
  )
}

const Wrapper = styled.section`
    li{
        text-align: start;
        padding: 10px 0 10px 0;
        font-size: 2.5rem;
        color: darkgray;
        /* text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5); */
        font-weight: 600;
        border-top: 1px solid #ccc;
    }
`;

export default DisplayUsers