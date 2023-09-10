import styled from 'styled-components';

export const ImageGalleryPart = styled.li`
  flex-basis: calc((100% - 16px * 2) / 3);
  box-shadow: 0px 1px 6px rgba(46, 47, 66, 0.08),
    0px 1px 1px rgba(46, 47, 66, 0.16), 0px 2px 1px rgba(46, 47, 66, 0.08);
  border-radius: 0px 0px 4px 4px;

  transition: transform ease-in 400ms;

  &:is(:hover, :focus) {
    transform: scale(1.05);
  }
`;

export const ImageGalleryImage = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
`;
