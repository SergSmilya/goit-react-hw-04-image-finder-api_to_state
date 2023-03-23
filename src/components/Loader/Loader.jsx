import { Dna } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export default function Loader() {
  return (
    <Dna
      height="240"
      width="240"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  );
}

Loader.propTypes = {
  visibleSpinerBool: PropTypes.bool.isRequired,
};
