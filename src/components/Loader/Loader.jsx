import { Blocks } from 'react-loader-spinner';
import { LoaderStyled } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderStyled>
      <Blocks
        visible={true}
        height="200"
        width="200"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </LoaderStyled>
  );
};
