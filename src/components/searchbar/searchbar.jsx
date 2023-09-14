import style from "./searchbar.css";

const SearchBar = ({ handleChange, handleSubmit }) => {
  return (
    <div className={style.searchBarContainer}>
      <form name="searchbar" onChange={handleChange}>
        <input
          type="search"
          className={style.searchInput}
          placeholder="Búsqueda"
        />
        <button
          type="submit"
          className={style.searchButton}
          onClick={handleSubmit}
        >
          Buscar
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
