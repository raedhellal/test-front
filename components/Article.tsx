import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  flex-direction: column;
  display: flex;
  align-items:center;
  justify-content: center
`;

const Article = (props) => {
  let {title, text, src, date} = props.article;
  return (
      <Wrapper>
        <div>
        <p>
          {title?title:null}
        </p>
        <p>
          {text?text:null}
        </p>
        {src?<img src={"https://upply-interview.herokuapp.com/images/" + src}/>:null}
        <p>
          {date? date: null}
        </p>
      </div>
      </Wrapper>
  )
}

export default Article;
