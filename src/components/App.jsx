import { useState, useEffect } from 'react';
import css from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import galleryApi from '../Utils/Api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

const notify = () => {
  toast('Not found', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export default function App() {
  const [value, setValue] = useState('');
  const [visibleSpinerBool, setVisibleSpinerBool] = useState(false);
  const [gallerys, setGallerys] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);

  const handleWriteValueInStateOfSubmit = valueString => {
    setValue(valueString);
    setPage(1);
    setGallerys([]);
  };

  useEffect(() => {
    if (value === '') return;

    setVisibleSpinerBool(true);

    galleryApi(value, page)
      .then(({ data: { totalHits, hits } }) => {
        if (totalHits > 0) {
          // hits це масив
          setGallerys(s => [...s, ...hits]);
          setTotalHits(totalHits);
        } else {
          notify();
        }
      })
      .catch(console.log)
      .finally(setVisibleSpinerBool(false));
  }, [page, value]);

  const handleLoadMore = () => {
    setVisibleSpinerBool(true);
    setPage(s => s + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmited={handleWriteValueInStateOfSubmit} />

      {visibleSpinerBool ? <Loader /> : <ImageGallery gallerys={gallerys} />}

      {gallerys.length !== totalHits && (
        <Button
          handleLoadMore={handleLoadMore}
          visibleSpinerBool={visibleSpinerBool}
        >
          Load More
        </Button>
      )}
      <ToastContainer />
    </div>
  );
}
