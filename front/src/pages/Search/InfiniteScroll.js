import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const InfiniteScroll = ({ setPage }) => {
  const trigger = useRef(null);
  const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      setPage((cur) => cur + 1);
    }
  });

  useEffect(() => {
    fetchMoreObserver.observe(trigger.current);
    return () => {
      fetchMoreObserver.unobserve(trigger.current);
    };
  }, []);

  return <Ref ref={trigger} />;
};

export default InfiniteScroll;

const Ref = styled.div`
  position: absolute;
  bottom: 0;
`;
