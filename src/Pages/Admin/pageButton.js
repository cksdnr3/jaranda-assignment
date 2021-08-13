import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  text-align: center;

  color: ${props => (props.select ? '#1685fd' : 'black')};
  padding-bottom: 2px;

  &:hover {
    border-bottom: 1px solid gray;
  }
`;

function PageButton({ size, maxPage, page, setPage}) {
  const [pageList, setPageList] = useState([]);

  const next = page < maxPage - 1;
  const prev = page > 0;

  const onPaging = page => {
    setPage(page);
  };

  useEffect(() => {
    setPageList(Array.from({ length: maxPage }, (_, i) => i));
  }, [maxPage, setPageList]);

  const createButton = (start, end) => (
    pageList.slice(start, end).map(v => (
      <Button
        key={v}
        select={page === v}
        onClick={() => onPaging(v)}
      >
        {v + 1}
      </Button>
    ))
  )

  return (
    <>
      {prev
        ? (
        <Button onClick={() => onPaging(page - 1)}>{'이전'}</Button>
      ) : (
        <div style={{ width: '36px', display: 'inline-block' }} />
      )}
      {maxPage < size
        ? createButton()
        : !(maxPage - page < size / 2 + 1)
        ? createButton(page - size / 2 > 0 ? page - parseInt(size / 2) : 0,
            (page - size / 2 > 0 ? page - parseInt(size / 2) : 0) + size)
        : createButton(maxPage - page < size / 2 + 1 && maxPage - size)
      }
      {next && <Button onClick={() => onPaging(page + 1)}>{'다음'}</Button>}
    </>
  );
}

export default PageButton;
